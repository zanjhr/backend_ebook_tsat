import { Router } from "express";
import { Upload, getByNik } from "../controllers/fotoController.js";

const router = Router();

router.post("/upload", Upload);
router.get("/upload/:nik", getByNik);

export default router;