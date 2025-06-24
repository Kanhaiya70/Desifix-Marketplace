import Booking from "../models/Booking.js";
import Service from '../models/Service.js';

export const createBooking = async (req, res) => {
  try {
    const { serviceId, scheduleDate } = req.body;

    if(req.user.role !== 'user') {
      return res.status(403).json({ message: 'Only users can book services'});
    }

    if (!serviceId || !scheduleDate) {
      return res.status(400).json({ message: 'Missing fields'});
    }
    console.log("📥 Received booking data:", { serviceId, scheduleDate });

    const booking = new Booking({
      service: serviceId,
      user: req.user._id,
      scheduleDate,
    });

    console.log("📥 Received scheduleDate:", scheduleDate);

    const savedBooking = await booking.save();
    console.log("✅ Booking saved:", savedBooking);
    res.status(201).json(savedBooking);
  } catch (err) {
    console.log('Booking error:', err);
    res.status(500).json({ message: 'Server error while booking service' });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('service')
      .sort({ scheduleDate: -1 });
    res.json(bookings);
  } catch (err) {
    console.log("Error fetching user bookings:", err);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if(!booking)
      return res.status(404).json({ message: 'Booking not found' });

    booking.status = status;
    await booking.save();

    res.json({ message: 'Booking status updated', booking });
  } catch (err) {
    console.log('Error updating booking status', err);
    res.status(500).json({ message: 'Error updating booking status' });
  }
};

export const getProviderBookings = async (req, res) => {
  try {
    if (req.user.role !== 'provider') {
      return res.status(403).json({ message: 'Access Denied' });
    }
    const providerId = req.user.id;
    const services = await Service.find({ provider: providerId });

    const serviceIds = services.map(s => s._id);

    const bookings = await Booking.find({ service: { $in: serviceIds } }).populate('service');

    res.json(bookings);
  } catch (err) {
    console.log('Error fetching provider bookings:', err);
    res.status(500).json({ message: 'Failed to fetch provider bookings' });
  }
};