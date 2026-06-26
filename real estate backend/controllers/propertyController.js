
const Property = require("../models/property");

// ADD PROPERTY (SELLER ONLY)
exports.addProperty = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "seller") {
      return res.status(403).json({
        success: false,
        message: "Only sellers can add property",
      });
    }

    const property = await Property.create({
      ...req.body,
      listedBy: req.user._id, // ✅ NEVER NULL
    });

    res.status(201).json({
      success: true,
      property,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL PROPERTIES
exports.getAllProperties = async (req, res) => {
  const properties = await Property.find().populate("listedBy", "name email");
  res.json({
    success: true,
    properties,
  });
};

// GET PROPERTY BY ID
exports.getPropertyById = async (req, res) => {
  const property = await Property.findById(req.params.id).populate(
    "listedBy",
    "name email"
  );

  if (!property) {
    return res.status(404).json({
      success: false,
      message: "Property not found",
    });
  }

  res.json({ success: true, property });
};

// UPDATE PROPERTY
exports.updateProperty = async (req, res) => {
  const property = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ success: true, property });
};

// DELETE PROPERTY
exports.deleteProperty = async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Property deleted" });
};


