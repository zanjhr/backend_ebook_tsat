    import express from "express";
import upload from "../middlewares/multerMiddleware.js";
import { uploadImage, getImageByID, displayImage } from "../controllers/imageController.js";

const router = express.Router();

// router.post("/upload-image/:id?", upload.single("image"), uploadImage);
router.post('/upload-image/:id?', upload.single('image'), uploadImage);

router.get("/get-image/:id", getImageByID);

router.get('/display/:id', displayImage);

// router.get('/display/:filename', displayImage);


export default router;
