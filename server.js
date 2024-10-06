const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { verifyAdmin } = require("./middleware/authMiddleware");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors()); // this line to enable CORS for all origins
// Optionally, you can restrict CORS to specific origins, like this:
// app.use(cors({ origin: "http://localhost:3000" }));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Body parser middleware

// Routes
app.use("/api/users", userRoutes); // User routes
app.use("/api/admin", verifyAdmin, adminRoutes); // Admin routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
