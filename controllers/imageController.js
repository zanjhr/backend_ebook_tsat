import { v4 as uuidv4 } from 'uuid';
import Image from "../models/imageModel.js";
import supabase from '../config/supabase.js'; // Import your Supabase client

export const uploadImage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const { originalname, buffer, mimetype } = req.file;
        const uniqueFilename = `${uuidv4()}-${originalname}`;

        // Upload to Supabase storage
        const { data, error } = await supabase
            .storage
            .from('ebook') // Replace with your Supabase bucket name
            .upload(`pictures/${uniqueFilename}`, buffer, {
                contentType: mimetype,
            });

        // Check for upload error
        if (error) {
            console.error('Upload error:', error);
            return res.status(500).json({
                success: false,
                message: "Failed to upload file",
                error: error.message,
            });
        }

        // Retrieve public URL
        const { publicURL } = supabase
            .storage
            .from('ebook')
            .getPublicUrl(`pictures/${uniqueFilename}`);

        // Check if public URL is generated
        if (!publicURL) {
            throw new Error("Failed to retrieve public URL for the uploaded file");
        }

        if (id) {
            const existingImage = await Image.findByPk(id);

            if (existingImage) {
                // If ID found, replace the existing image
                await existingImage.update({ filename: publicURL });

                return res.status(200).json({
                    success: true,
                    message: "Image replaced successfully",
                    data: existingImage,
                });
            }
        }

        // If ID not found, create a new image entry
        const newImage = await Image.create({ filename: publicURL });

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            data: newImage,
        });
    } catch (error) {
        console.error('General error:', error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};


export const getImageByID = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByPk(id);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }

        res.status(200).json({
            success: true,
            data: image,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};
