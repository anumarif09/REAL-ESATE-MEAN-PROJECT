const Purchase = require("../models/purchase");
const Property = require("../models/property");

// Buyer sends purchase request
exports.requestToBuy = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    if (!property) return res.status(404).json({ message: "Property not found" });

    // Buyer cannot buy own property
    if (property.listedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot buy your own property" });
    }

    const newRequest = await Purchase.create({
      property: property._id,
      buyer: req.user._id,
      seller: property.listedBy,
    });

    res.status(201).json({ success: true, request: newRequest });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Seller gets incoming requests
exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await Purchase.find({ seller: req.user._id })
      .populate("property")
      .populate("buyer", "name email");

    res.json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buyer sees their own requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Purchase.find({ buyer: req.user._id })
      .populate("property")
      .populate("seller", "name email");

    res.json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Seller approves request
exports.approveRequest = async (req, res) => {
  try {
    const request = await Purchase.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    // Only seller can approve
    if (request.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not allowed" });
    }

    request.status = "approved";
    await request.save();

    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Seller rejects request
exports.rejectRequest = async (req, res) => {
  try {
    const request = await Purchase.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.seller.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not allowed" });

    request.status = "rejected";
    await request.save();

    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mark property as sold
exports.markAsSold = async (req, res) => {
  try {
    const request = await Purchase.findById(req.params.id);

    if (!request) return res.status(404).json({ message: "Request not found" });

    if (request.seller.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Not allowed" });

    request.status = "sold";
    await request.save();

    // Update property as sold
    await Property.findByIdAndUpdate(request.property, { sold: true });

    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
