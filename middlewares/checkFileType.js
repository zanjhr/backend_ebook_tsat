import { fileTypeFromFile } from "file-type";
import { TYPE_IMAGE } from "../middlewares/fotoMiddle.js";
import { unlink } from "node:fs/promises";



export default async function checkFileType(req, res, next) {
    const file = req.file;
    const acceptMime = Object.keys(TYPE_IMAGE);
    const fileType = await fileTypeFromFile(file.path);

    if (!acceptMime.includes(fileType.mime)) {

        await unlink(file.path);

        res.status(500).json({ message: "file is not image" });
    }

    next();

}