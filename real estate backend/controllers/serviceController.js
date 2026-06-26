const Service = require("../models/Service");

// ADD SERVICE
exports.addService = async (req, res) => {
  try {
    const service = await Service.create({
      title: req.body.title,
      description: req.body.description,
      createdBy: req.user._id,
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: "Failed to add service" });
  }
};

// GET SERVICES (optional but useful)
exports.getServices = async (req, res) => {
  const services = await Service.find().populate("createdBy", "name email");
  res.json(services);
};
