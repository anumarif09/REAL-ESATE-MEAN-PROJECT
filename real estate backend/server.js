require("dotenv").config();
const express = require("express");

require("express-async-errors");

const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/properties");
const messageRoutes = require("./routes/messages");
const purchaseRoutes = require("./routes/purchases");
const buyRequestRoutes = require("./routes/buyRequestRoutes");
const contactRoutes = require("./routes/contact"); // ✅ Contact route added
const serviceRoutes = require("./routes/services");

const app = express();

// Middleware
// Allow local dev origins (Vite, Angular) during development
app.use(
  cors({ origin: ["http://localhost:5173", "http://localhost:4200", "http://localhost:52042"], credentials: true })
);
app.use(express.json());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/buy-requests", buyRequestRoutes);
app.use("/api/contact", contactRoutes); // ✅ Contact route
app.use("/api/service", serviceRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running...");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message,
  });
});

// Start server
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

start();
