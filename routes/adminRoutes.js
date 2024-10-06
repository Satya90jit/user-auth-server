const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/adminController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// Admin: Delete a User
router.post("/delete-user", verifyAdmin, deleteUser);

// Admin: Get All Users
router.get("/all-users", verifyAdmin, getAllUsers);

module.exports = router;
