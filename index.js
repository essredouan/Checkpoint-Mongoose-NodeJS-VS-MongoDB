require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const personRoutes = require("./routes/personRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON body requests
app.use(express.json());

// Use the person routes for any /api/person requests
app.use("/api/person", personRoutes);

// Connect to MongoDB and start the server
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
  }
};

connectToDB();
