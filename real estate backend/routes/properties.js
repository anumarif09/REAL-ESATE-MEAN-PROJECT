const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  addProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

router.post("/", auth, addProperty);   // ✅ AUTH REQUIRED
router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
router.put("/:id", auth, updateProperty);
router.delete("/:id", auth, deleteProperty);

module.exports = router;
