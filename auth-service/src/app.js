const express = require("express");
const errorMiddleware = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const app = express();

app.use(express.json());

// Route par défaut
app.get("/", (req, res) => {
  res.send.json({
    authot: "LordKode",
    version: "1.0.0",
  });
});

// Authentification routes
app.use("/api/v1/auth", authRoutes);

// Middleware de gestion des erreurs
app.use(errorMiddleware);

module.exports = app;
