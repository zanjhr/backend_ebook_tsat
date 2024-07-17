import Image from "../models/imageModel.js";
import supabase from '../config/supabase.js'; // Import your Supabase client
import fs from 'fs';

// Function to upload an image
export const uploadImage = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const { originalname } = req.file; // Get the original file name
        const filePath = req.file.path; // Path to the uploaded file

        // Read the file
        const fileBuffer = fs.readFileSync(filePath);

        // Upload to Supabase storage
        const { error } = await supabase
            .storage
            .from('ebook') // Replace with your Supabase bucket name
            .upload(`pictures/${originalname}`, fileBuffer, {
                contentType: req.file.mimetype,
            });

        if (error) {
            throw error;
        }

        // Get the public URL of the uploaded file
        const publicUrl = supabase
            .storage
            .from('ebook')
            .getPublicUrl(`pictures/${originalname}`).publicURL;

        if (id) {
            const existingImage = await Image.findByPk(id);

            if (existingImage) {
                // If ID found, replace the existing image
                await existingImage.update({ filename: publicUrl });

                return res.status(200).json({
                    success: true,
                    message: "Image replaced successfully",
                    data: existingImage,
                });
            }
        }

        // If ID not found, create a new image entry
        const newImage = await Image.create({ filename: publicUrl });

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            data: newImage,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    } finally {
        // Clean up the uploaded file
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
    }
};

// Function to retrieve an image by ID
export const getImageByID = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByPk(id, { attributes: ['id', 'filename'] });

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image Not Found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Image Retrieved Successfully",
            data: image,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
