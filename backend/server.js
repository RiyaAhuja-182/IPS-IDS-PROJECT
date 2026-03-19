require('dotenv').config();

// ────────────────────────────────────────────────
// ENV DEBUG
console.log("───────────────────────────────────────────────");
console.log("Environment variables loaded from .env:");
console.log("PORT      =", process.env.PORT || "(not set)");
console.log("MONGO_URI =", process.env.MONGO_URI 
  ? process.env.MONGO_URI.substring(0, 60) + "..." 
  : "NOT FOUND!");
console.log("───────────────────────────────────────────────");

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

// ────────────────────────────────────────────────
// IMPORTS
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

const app = express();

// ────────────────────────────────────────────────
// MIDDLEWARE
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// LOG ALL REQUESTS
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.originalUrl}`);
  next();
});

// ────────────────────────────────────────────────
// 🔥 MONGODB CONNECTION (FIXED)
mongoose.connect(process.env.MONGO_URI, {
  dbName: "IPS-IDS",
  serverSelectionTimeoutMS: 8000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log("✅ MongoDB Connected Successfully");
  console.log("📂 Using Database: IPS-IDS");
})
.catch(err => {
  console.error("❌ MongoDB Connection FAILED");
  console.error(err);
  process.exit(1);
});

// Optional: monitor connection state
mongoose.connection.on("connected", () => {
  console.log("🟢 Mongoose connected");
});
mongoose.connection.on("error", (err) => {
  console.error("🔴 Mongoose error:", err);
});

// ────────────────────────────────────────────────
// REGISTER ROUTE
app.post("/api/register", async (req, res) => {
  try {
    console.log("🔥 REGISTER HIT");

    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const cleanUsername = username.trim().toLowerCase();

    const existing = await User.findOne({ username: cleanUsername });
    if (existing) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: cleanUsername,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    console.log("✅ User saved:", savedUser._id);

    return res.status(201).json({
      message: "Account created successfully",
      username: savedUser.username
    });

  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);
    return res.status(500).json({
      error: err.message
    });
  }
});

// ────────────────────────────────────────────────
// LOGIN ROUTE
app.post("/api/login", async (req, res) => {
  try {
    console.log("🔥 LOGIN HIT");

    const { username, password } = req.body;

    if (!username?.trim() || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const cleanUsername = username.trim().toLowerCase();

    const user = await User.findOne({ username: cleanUsername });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    console.log("✅ LOGIN SUCCESS:", cleanUsername);

    return res.json({
      message: "Login successful",
      username: user.username
    });

  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);
    return res.status(500).json({
      error: err.message
    });
  }
});

// ────────────────────────────────────────────────
// 🔥 TEST WRITE (STRONG DEBUG)
app.get("/api/test-db-write", async (req, res) => {
  try {
    console.log("🔥 TEST WRITE HIT");

    if (mongoose.connection.readyState !== 1) {
      console.log("❌ DB not connected");
      return res.status(500).json({ error: "Database not connected" });
    }

    const testUser = new User({
      username: `test_${Date.now()}`,
      password: "test123"
    });

    console.log("Saving test user...");

    const saved = await testUser.save();

    console.log("✅ Saved:", saved);

    res.json({
      success: true,
      savedId: saved._id
    });

  } catch (err) {
    console.error("❌ TEST WRITE ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// ────────────────────────────────────────────────
// TEST READ
app.get("/api/test-db-read", async (req, res) => {
  try {
    console.log("🔥 TEST READ HIT");

    const count = await User.countDocuments();
    const users = await User.find().limit(5);

    res.json({
      success: true,
      documentCount: count,
      users
    });

  } catch (err) {
    console.error("❌ TEST READ ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// ────────────────────────────────────────────────
// ROOT
app.get("/", (req, res) => {
  res.json({ message: "Backend running ✅" });
});

// ────────────────────────────────────────────────
// SERVER START
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("👉 Test: http://localhost:5000/api/test-db-write");
});