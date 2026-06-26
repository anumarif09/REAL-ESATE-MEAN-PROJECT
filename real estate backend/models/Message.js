// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', default: null },
//   message: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Message', messageSchema);


// models/Message.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional if linked to user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
