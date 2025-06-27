import Service from "../models/Service.js";
import mongoose from "mongoose";

export const createService = async(req, res) =>{
  try{
    const { title, description, category, price, location, image: imageLink } = req.body;

    const image = req.file
     ? `/uploads/${req.file.filename}`
     : imageLink?.startsWith("http")
     ? imageLink
     : null;

     
    const newService = new Service({
      title,
      description,
      category,
      price,
      location,
      image,
      provider: req.user._id,    // from auth middleware
    });
    console.log("req.user:", req.user); // Should print user object
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error while creating service'});
  }
};

export const getAllServices = async(req, res) =>{
  try{
    const { category, location } = req.query;

    const filter = {};
    if (category) filter.category = { $regex: new RegExp(category, 'i') };
    if (location) filter.location = { $regex: new RegExp(location, 'i') };

    const services = await Service.find(filter).populate('provider', 'name email');
    res.status(200).json(services);
  } catch (err) {
    console.log('Error fetching services:', err);
    res.status(500).json({ message: 'Server error while fetching services' });
  }
};

export const getServiceById = async(req, res) =>{
  try{
    const service = await Service.findById(req.params.id).populate('provider', 'name email');
    if(!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching service' });
  }
};

export const updateService = async(req, res) =>{
  try{
    const service = await Service.findById(req.params.id);
    if(!service) return res.status(404).json({ message: 'Service not found'});

    if(service.provider.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to update this service' });
    }

    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating service' });
  }
};

export const deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    console.log("Deleting service with ID:", serviceId);
    console.log("Logged-in user ID:", req.user._id);

    const service = await Service.findById(serviceId);

    if (!service) {
      console.log("Service not found");
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if the logged-in provider is the owner
    if (service.provider.toString() !== req.user._id.toString()) {
      console.log("Access denied: not the provider who created it");
      return res.status(403).json({ message: 'Access denied' });
    }

    await service.deleteOne();
    console.log("Service deleted successfully");
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error("Error deleting service:", err);
    res.status(500).json({ message: 'Server error while deleting service' });
  }
};

export const getMyServices = async (req, res) => {
  try {
    console.log("🔐 getMyServices route HIT");
    console.log("REQ.USER:", req.user);

    const services = await Service.find({ provider: req.user._id });
    res.json(services);
  } catch (err) {
    console.log('Error fetching provider services:', err);
    res.status(500).json({ message: 'Server error while fetching services'});
  }
};