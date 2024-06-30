import Image from "../models/imageModel.js";


export const uploadImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { filename } = req.file;

        if (id) {
            const existingImage = await Image.findByPk(id);

            if (existingImage) {
                // Jika ID ditemukan ganti gambar yang sudah ada
                await existingImage.update({ filename });

                return res.status(200).json({
                    success: true,
                    message: "Image Replaced successfully",
                    data: existingImage,
                });
            }
        }

        // Jika ID belum ditemukan 
        const newImage = await Image.create({ filename });

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