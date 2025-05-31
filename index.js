const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Setup multer for file upload
const upload = multer({ dest: "uploads/" });

// API endpoint to handle file upload
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Your app is listening on port " + port);
});
