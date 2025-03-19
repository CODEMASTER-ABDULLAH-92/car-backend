import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "car-images", // Change folder name if needed
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Allow multiple file uploads
const upload = multer({ storage });

export default upload;
