const router = require("express").Router();
const auth = require("../middleware/auth");

// example purchase route
router.post("/", auth, async (req, res) => {
  res.json({ message: "Purchase route working" });
});

module.exports = router;
