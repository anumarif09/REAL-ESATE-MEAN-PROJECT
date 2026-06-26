const Message = require('../models/message');
const Property = require('../models/property');

// Send message (authenticated)
exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, propertyId, message } = req.body;
    if (!receiverId || !message) return res.status(400).json({ success:false, message: 'Missing fields' });

    if (propertyId) {
      const prop = await Property.findById(propertyId);
      if (!prop) return res.status(400).json({ success:false, message: 'Invalid propertyId' });
    }

    const msg = await Message.create({
      senderId: req.user._id,
      receiverId,
      propertyId,
      message
    });

    res.status(201).json({ success:true, message: msg });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

// Get inbox (received messages)
exports.getInbox = async (req, res) => {
  try {
    const msgs = await Message.find({ receiverId: req.user._id }).populate('senderId', 'name email').sort({ timestamp: -1 });
    res.json({ success:true, messages: msgs });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

// Conversation between authenticated user and other user (optionally by property)
exports.getConversation = async (req, res) => {
  try {
    const otherId = req.params.userId;
    const { propertyId } = req.query;
    const filter = {
      $or: [
        { senderId: req.user._id, receiverId: otherId },
        { senderId: otherId, receiverId: req.user._id }
      ]
    };
    if (propertyId) filter.propertyId = propertyId;
    const msgs = await Message.find(filter).sort({ timestamp: 1 }).populate('senderId', 'name email').populate('receiverId', 'name email');
    res.json({ success:true, messages: msgs });
  } catch (err) {
    res.status(500).json({ success:false, message: err.message });
  }
};
