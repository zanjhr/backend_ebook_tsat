import Image from "../models/imageModel.js";
import supabase from '../config/supabase.js'; // Import your Supabase client
import fs from 'fs';


export const uploadImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { originalname } = req.file;
        const fileBuffer = req.file.buffer;

        // Create a unique filename for Supabase storage
        const uniqueFilename = `${Date.now()}-${originalname}`;

        // Upload to Supabase storage
        const { data, error } = await supabase
            .storage
            .from('ebook')
            .upload(`pictures/${uniqueFilename}`, fileBuffer, {
                contentType: req.file.mimetype,
            });

        if (error) {
            throw error;
        }

        // Get the public URL of the uploaded file
        const publicUrl = supabase
            .storage
            .from('ebook')
            .getPublicUrl(`pictures/${uniqueFilename}`).publicURL;

        if (id) {
            const existingImage = await Image.findByPk(id);

            if (existingImage) {
                // If ID found, update the existing image filename to "edi"
                await existingImage.update({ filename: `${uniqueFilename}` });

                return res.status(200).json({
                    success: true,
                    message: "Image replaced successfully",
                    data: existingImage,
                });
            }
        }

        // If ID not found, create a new image entry with filename "edi"
        const newImage = await Image.create({ filename: `${uniqueFilename}` });

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
    }
};





// Mengambil Gambar berdasarkan ID
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

export const displayImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByPk(id, { attributes: ['id', 'filename'] });

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image Not Found",
            });
        }

        // Dapatkan data gambar dari Supabase
        const { data, error } = await supabase.storage.from('ebook').download(`pictures/${image.filename}`);

        if (error) {
            return res.status(404).json({
                success: false,
                message: "Image download failed",
            });
        }

        // Mengatur header respons untuk gambar
        res.set({
            'Content-Type': 'image/jpeg', // Atur tipe konten sesuai gambar
            'Content-Disposition': `inline; filename="${image.filename}"`,
        });

        // Mengalirkan data gambar ke respons
        const buffer = await data.arrayBuffer(); // Mengambil data sebagai array buffer
        res.end(Buffer.from(buffer)); // Mengirim buffer sebagai respons
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};