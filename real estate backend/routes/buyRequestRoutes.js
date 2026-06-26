

const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  createRequest,
  myRequests,
  getSellerRequests,
  acceptRequest,
  rejectRequest,
} = require("../controllers/buyRequestController");

// BUYER
router.post("/:propertyId", auth, createRequest);
router.get("/my", auth, myRequests);

// SELLER
router.get("/seller", auth, getSellerRequests);
router.put("/:id/accept", auth, acceptRequest);
router.put("/:id/reject", auth, rejectRequest);

module.exports = router;
