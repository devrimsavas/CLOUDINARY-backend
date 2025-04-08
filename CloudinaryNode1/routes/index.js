//require("dotenv").config();
var express = require("express");
var router = express.Router();
var cloudinary = require("cloudinary").v2;

const {
  getFromCloudinary,
  uploadLocalFile,
  getAllImages,
} = require("../services/cloudinaryService");


router.get("/", (req, res) => {
  res.send("hello world");
});

//get an image route
router.get("/getimage", async (req, res) => {
  const image = await getFromCloudinary("cld-sample-5");
  console.log(image);
  res.send(image);
});

//get all images route
router.get("/getallimages", async (req, res) => {
  try {
    const imagesUrls = await getAllImages();
    res.json({ images: imagesUrls });
  } catch (error) {
    res.status(500).json({ error: "FAiled to fetch" });
  }
});

//upload image route
router.post("/uploadimage", async (req, res) => {
  const { filePath, publicId } = req.body;

  if (!filePath || !publicId) {
    return res
      .status(400)
      .json({ message: "filePath and publicId are required" });
  }

  try {
    const result = await uploadLocalFile(filePath, publicId);
    return res.json({
      message: "Image uploaded",
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
});

//delete
router.delete("/deleteimage", async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({ message: "publicId is required" });
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    res.json({ message: "Image deleted", result });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Delete failed", error: error.message });
  }
});

module.exports = router;
