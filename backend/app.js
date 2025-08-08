// backend/app.js
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
require("./db");

const productRoute = require("./routes/product");
const authRoute = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

/************ MIDDLEWARES *************/
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (fixes preflight OPTIONS + header issues)
app.use(
  cors({
    origin: "http://localhost:3000", // your React dev server
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

// Optional: fast-return for OPTIONS (some proxies like it explicit)
app.options("*", cors());

/************ ROUTES *************/
app.use("/api/v1", productRoute);       // e.g. /api/v1/product/...
app.use("/api/v1/user", authRoute);     // e.g. /api/v1/user/register

/************ STATIC (PROD) *************/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

/************ START *************/
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
