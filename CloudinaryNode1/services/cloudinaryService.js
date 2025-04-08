const cloudinary = require("../config/cloudinaryConfig");

//get an image

function getFromCloudinary(publicId) {
  const imageUrl = cloudinary.url(publicId, { secure: true });
  return imageUrl;
}

//upload

async function uploadLocalFile(filePath, publicId) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
    });
    return result;
  } catch (error) {
    throw error;
  }
}

//get all images
async function getAllImages() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type: "image",
      max_results: 100,
    });

    //image urls
    const imageUrls = result.resources.map((img) => img.secure_url);
    return imageUrls;
  } catch (error) {
    console.error("error", error);
    throw error;
  }
}

module.exports = {
  getFromCloudinary,
  uploadLocalFile,
  getAllImages,
};
