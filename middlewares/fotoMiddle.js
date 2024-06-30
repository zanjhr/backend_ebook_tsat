import crypto from "crypto";
import multer from "multer";
import fotoModel from "../models/fotoModel.js";
import { unlink } from "node:fs/promises";

export const TYPE_IMAGE = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png"
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "public/images")
    },
    async filename(req, file, cb) {
        try {
            const nik = req.body.nik;

            // Cari file yang sudah ada dengan NIK yang sama
            const existingFile = await fotoModel.findOne({ where: { nik } });

            if (existingFile) {
                // Hapus file lama jika sudah ada
                await unlink(existingFile.url);
                // Hapus entri file lama dari database
                await existingFile.destroy();
            }

            // Buat nama file baru
            const uuid = crypto.randomUUID();
            const ext = TYPE_IMAGE[file.mimetype]
            cb(null, `${uuid}.${ext}`);
        } catch (error) {
            console.error('Error in generating filename:', error);
            cb(error);
        }
    },
});

const fileFilter = (req, file, cb) => {
    const acceptMime = Object.keys(TYPE_IMAGE);

    if (!acceptMime.includes(file.mimetype)) {
        cb({ message: "Type File No Support" }, false);
    } else {
        cb(null, true);
    }
};

const maxSize = 5 * 1024 * 1024; // 1MB

const uploadFile = multer({ storage, fileFilter, limits: { fileSize: maxSize }, }).single("image");


export default uploadFile;