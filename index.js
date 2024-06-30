import express from "express";
import cors from "cors";
import authRoutes from './routes/authRoutes.js';
import ebookRoutes from './routes/ebookRoutes.js';
import { resolve } from "path";
import router from "./routes/fotoRoute.js";
import uploadFile from "./middlewares/fotoMiddle.js";
import checkFileType from "./middlewares/checkFileType.js";
import imageRoutes from "./routes/imageRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware untuk menguraikan form data
app.use("/static", express.static(resolve("public")));
app.use('/api', authRoutes);
app.use('/ebook', ebookRoutes);

app.use("/images", imageRoutes);
// app.use(uploadFile, checkFileType);
app.use(router);



app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json(err);
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});


