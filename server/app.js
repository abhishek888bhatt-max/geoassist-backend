require("dotenv").config(); 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(express.json());

// ==========================
// ROUTES
// ==========================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


// =======================
// DATABASE
// =======================
mongoose
  .connect("mongodb://127.0.0.1:27017/geoassist")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// =======================
// START SERVER
// =======================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
