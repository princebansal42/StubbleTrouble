const express = require("express");
const app = express();
const connectDB = require("./config/db");

// Connecting Database
connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running at " + PORT));
