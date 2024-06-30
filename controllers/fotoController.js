import fotoModel from "../models/fotoModel.js";

export const Upload = async (req, res) => {
    try {
        console.log("File received:", req.file);

        // Check file jika nik sudah ada
        if (!req.file || !req.body.nik) {
            console.log("No file or NIK received");
            return res.status(400).json({ message: "No file or NIK received" });
        }

        const baseURL = "http://localhost:3000";
        const url = `${baseURL}/staticsss/images/${req.file.filename}`;
        const nik = req.body.nik;
        const filename = req.file.originalname;

        // Simpan atau gantikan file di database
        await fotoModel.upsert({ nik, filename, url });

        // Respon File Berhasil
        console.log("File uploaded successfully");
        res.status(200).json({ message: "berhasil", url, filename, nik });
    } catch (error) {
        console.error(error.message); 
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getByNik = async (req, res) => {
    try {
        const response = await fotoModel.findOne({
            where: {
                nik: req.params.nik
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}