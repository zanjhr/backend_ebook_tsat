import Image from "../models/imageModel.js";
import supabase from '../config/supabase.js'; // Import your Supabase client
import fs from 'fs';


// export const uploadImage = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { filename } = req.file;

//         if (id) {
//             const existingImage = await Image.findByPk(id);

//             if (existingImage) {
//                 // Jika ID ditemukan ganti gambar yang sudah ada
//                 await existingImage.update({ filename });

//                 return res.status(200).json({
//                     success: true,
//                     message: "Image Replaced successfully",
//                     data: existingImage,
//                 });
//             }
//         }

//         // Jika ID belum ditemukan 
//         const newImage = await Image.create({ filename });

//         res.status(201).json({
//             success: true,
//             message: "Image uploaded successfully",
//             data: newImage,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error.message,
//         });
//     }
// };

export const uploadImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { filename } = req.file;
        const filePath = req.file.path; // The path to the file on your server

        // Read the file
        const fileBuffer = fs.readFileSync(filePath);

        // Upload to Supabase storage
        const { data, error } = await supabase
            .storage
            .from('ebook') // Replace with your Supabase bucket name
            .upload(`pictures/${filename}`, fileBuffer, {
                contentType: req.file.mimetype,
            });

        if (error) {
            throw error;
        }

        // Get the public URL of the uploaded file
        const publicUrl = supabase
            .storage
            .from('ebook')
            .getPublicUrl(`pictures/${filename}`).publicURL;

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