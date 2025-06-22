import Booking from "../models/Booking.js";
import Service from '../models/Service.js';

export const createBooking = async (req, res) => {
  try {
    const { serviceId, scheduleDate } = req.body;

    if (!serviceId || !scheduleDate) {
      return res.status(400).json({ message: 'Missing fields'});
    }

    const booking = new Booking({
      service: serviceId,
      user: req.user._id,
      scheduledDate: scheduleDate
    });

    const savedBooking = await booking.save();
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