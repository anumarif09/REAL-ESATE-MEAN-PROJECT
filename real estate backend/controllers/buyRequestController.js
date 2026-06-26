
const BuyRequest = require("../models/BuyRequest");
const Property = require("../models/property");

// BUYER → CREATE REQUEST

exports.createRequest = async (req, res) => {
  try {
    const property = await Property.findById(req.params.propertyId);

    console.log("===========");
    console.log("PROPERTY:", property);
    console.log("LISTED BY:", property?.listedBy);

    if (!property) return res.status(404).json({ message: "Property not found" });

    if (!property.listedBy) {
      return res.status(400).json({ message: "Property does not have a seller assigned" });
    }

    const exists = await BuyRequest.findOne({
      property: property._id,
      buyer: req.user._id,
    });

    if (exists) {
      // If buyer already sent a request, return the existing request (idempotent)
     await exists.populate('property');
await exists.populate('buyer', 'name email');
      return res.status(200).json(exists);
    }

    const { amount, message } = req.body || {};
    const parsedAmount = typeof amount === 'string' ? Number(amount) : amount;

    const request = await BuyRequest.create({
      property: property._id,
      buyer: req.user._id,
      seller: property.listedBy,
      amount: parsedAmount || undefined,
      message: typeof message === 'string' ? message.trim() : undefined,
    });

    // populate for client convenience
    await request.populate([
  { path: 'property' },
  { path: 'buyer', select: 'name email' }
]);

    res.status(201).json(request);
  } catch (error) {
    console.error('BuyRequest.createRequest error:', error);
    return res.status(500).json({ message: error.message || 'Failed to create buy request' });
  }
};

// BUYER → MY REQUESTS
exports.myRequests = async (req, res) => {
  const requests = await BuyRequest.find({ buyer: req.user._id })
    .populate("property")
    .populate("buyer", "name email");
  res.json(requests);
};

// SELLER → GET REQUESTS
exports.getSellerRequests = async (req, res) => {
  const requests = await BuyRequest.find({ seller: req.user._id })
    .populate("property")
    .populate("buyer", "name email");

  res.json(requests);
};

// SELLER → ACCEPT
exports.acceptRequest = async (req, res) => {
  const request = await BuyRequest.findById(req.params.id);

  if (!request) return res.status(404).json({ message: "Request not found" });

  if (request.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  request.status = "approved"; // ✅ FIX
  await request.save();

  await Property.findByIdAndUpdate(request.property, {
    status: "sold",
    soldTo: request.buyer,
  });

  res.json(request);
};

// SELLER → REJECT
exports.rejectRequest = async (req, res) => {
  const request = await BuyRequest.findById(req.params.id);

  if (!request) return res.status(404).json({ message: "Request not found" });

  if (request.seller.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  request.status = "rejected";
  await request.save();

  res.json(request);
};
