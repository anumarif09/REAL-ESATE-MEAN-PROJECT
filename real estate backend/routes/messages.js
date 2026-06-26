// const express = require("express");
// const router = express.Router();

// // Public route for contact form submissions (no auth needed usually)
// router.post("/contact", async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     // Here you can:
//     // - save message to DB
//     // - send an email notification
//     // - or just log it

//     console.log("Contact message received:", { name, email, message });

//     res.status(200).json({ message: "Message received successfully" });
//   } catch (error) {
//     console.error("Failed to process contact message:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;


// routes/messages.js
const router = require("express").Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// Get all messages (protected)
router.get("/", auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err });
  }
});

// Send a message (optional for contact form)
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully", data: newMessage });
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err });
  }
});

module.exports = router;
