import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";

dotenv.config({
  path: './.env'
})

cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET 
  });


  export const uploadToCloudinary = async (filePath) => {
    try {
      return cloudinary.uploader.upload(filePath)
    } catch (error) {
      return error
    }
  }

  export const deleteFromCloudinary = async (publicId) => {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      return error
    }
  }

  
