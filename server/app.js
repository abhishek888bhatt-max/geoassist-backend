require("dotenv").config(); 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const { doubleCsrf } = require("csrf-csrf");
const cookieParser = require("cookie-parser");

const app = express();

// =======================
// CSRF PROTECTION
// =======================
const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET || "your-csrf-secret-change-in-production",
  cookieName: "x-csrf-token",
  cookieOptions: {
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
});

// =======================
// MIDDLEWARE
// =======================
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(",") 
  : ["http://localhost:3000"];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(mongoSanitize());

// CSRF token endpoint
app.get("/api/csrf-token", (req, res) => {
  const token = generateToken(req, res);
  res.json({ token });
});

// Apply CSRF protection to state-changing routes
app.use("/api/auth", doubleCsrfProtection, require("./routes/authRoutes"));
app.use("/api/users", doubleCsrfProtection, require("./routes/userRoutes"));

// ==========================
// ROUTES
// ==========================

// =======================
// DATABASE
// =======================
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/geoassist";

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
