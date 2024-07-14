import express from 'express';
import Ebook from '../controllers/ebookController.js';

import upload from '../middlewares/ebookMiddleware.js';  // Use import for middleware
const router = express.Router();

// Route to add a new Judul without file upload
router.post('/createbook', Ebook.addJudul);
router.get('/getAll', Ebook.getAllJudul);
router.post('/addSubjudul/:bookId', upload.single('pdf'), Ebook.addSubjudul);
router.get('/books/:bookId/subjudul/:subjudulId', Ebook.getSubjudulById);
router.get('/getSubjudul/:bookId', Ebook.getSubjudul);
router.delete('/books/:bookId', Ebook.deleteJudul);
router.delete('/books/subjudul/:subjudulId', Ebook.deleteSubjudul);
router.put('/update/:bookId', Ebook.updateJudul);
router.put('/update/:bookId/subjudul/:subjudulId', Ebook.updateSubjudul);
router.get('/pdfSubjudul/:subjudulId/:name', Ebook.getPdfBySubjudulIdAndName);
router.get('/getSubjudul', Ebook.getAllSubjudul);
router.get('/readPdf/:subjudulId', Ebook.readPdf)

export default router;
