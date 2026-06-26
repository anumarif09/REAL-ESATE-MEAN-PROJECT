const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  addService,
  getServices,
} = require("../controllers/serviceController");

// SELLER → ADD SERVICE
router.post("/", auth, addService);

// GET ALL SERVICES
router.get("/", getServices);

module.exports = router; // ✅ VERY IMPORTANT
