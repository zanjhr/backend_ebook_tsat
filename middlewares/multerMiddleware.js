// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/homePic"); // Folder untuk menyimpan file yang diunggah
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;
