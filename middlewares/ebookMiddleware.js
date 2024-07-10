// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/documents'); // Define the destination folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Use the original filename
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;
// // module.exports = upload;

import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

export default upload;

