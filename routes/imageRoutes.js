    import express from "express";
import upload from "../middlewares/multerMiddleware.js";
import { uploadImage, getImageByID } from "../controllers/imageController.js";

const router = express.Router();

router.post("/upload-image/:id?", upload.single("image"), uploadImage);

router.get("/get-image/:id", getImageByID);

export default router;
