
// ebookController.js
import { Judul, Subjudul } from '../models/ebookModel.js';
import path from 'path';
import supabase from '../config/supabase.js'; // Import your Supabase client

// Fungsi untuk mendapatkan semua judul
const getAllJudul = async (req, res) => {
  try {
    // Mengambil semua judul dari database
    const allJudul = await Judul.findAll({
      include: { model: Subjudul, as: 'subjudul' },
    });

    // Send a success response with all Judul
    res.status(200).json({
      status: 'success',
      data: allJudul,
    });
  } catch (error) {
    // Log the error
    console.error(error);

    // Send an error response
    res.status(500).json({
      status: 'error',
      message: 'Failed to get all Judul',
    });
  }
};

const addJudul = async (req, res) => {
  try {
    // Extract title from request body
    const { title } = req.body;

    // Create a new Judul
    const newJudul = await Judul.create({
      title,
    });

    // Send a success response with the created Judul
    res.status(201).json({
      status: 'success',
      data: newJudul,
    });
  } catch (error) {
    // Log the error
    console.error(error);

    // Send an error response
    res.status(500).json({
      status: 'error',
      message: 'Failed to add Judul',
    });
  }
};

// const addSubjudul = async (req, res) => {
//   try {
//     const { bookId } = req.params; // Mengambil ID buku dari URL
//     const { subjudul } = req.body;

//     // Ambil informasi file yang diunggah dari request
//     const { filename, path: filePath } = req.file;

//     // Temukan buku berdasarkan ID yang diberikan
//     const existingBook = await Judul.findByPk(bookId, {
//       include: { model: Subjudul, as: 'subjudul' },
//     });

//     // Cek apakah buku ditemukan
//     if (!existingBook) {
//       return res.status(404).send({ message: 'Buku tidak ditemukan' });
//     }

//     // Tambahkan subjudul ke dalam array subjudul di buku yang ada
//     const newSubjudul = await Subjudul.create({
//       subjudul,
//       name: filename,
//       path: filePath,
//     });

//     // Hubungkan subjudul dengan buku
//     await existingBook.addSubjudul(newSubjudul);

//     res.status(201).send({ message: 'Subjudul berhasil ditambahkan', book: existingBook });
//   } catch (error) {
//     res.status(500).send({ message: 'Gagal menambahkan subjudul', error: error.message });
//   }
// };

const addSubjudul = async (req, res) => {
  try {
    const { bookId } = req.params; // Get book ID from URL
    const { subjudul } = req.body;

    // Get file information from request
    const file = req.file;

    if (!file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    const { originalname, buffer, mimetype } = file;

    // Find the book by the given ID
    const existingBook = await Judul.findByPk(bookId, {
      include: { model: Subjudul, as: 'subjudul' },
    });

    // Check if book is found
    if (!existingBook) {
      return res.status(404).send({ message: 'Book not found' });
    }

    // Upload the file to Supabase
    // const { data, error } = await supabase
    //   .storage
    //   .from('ebook') // Replace with your Supabase bucket name
    //   .upload(`documents/${originalname}`, buffer, {
    //     contentType: mimetype,
    //     upsert: true,
    //   });

    const { data, error } = await supabase
      .storage
      .from('ebook') // Replace with your Supabase bucket name
      .upload(`documents/${originalname}`, file);

    if (error) {
      return res.status(500).send({ message: 'Failed to upload file to Supabase', error: error.message });
    }

    // Create a new subjudul
    const newSubjudul = await Subjudul.create({
      subjudul,
      name: originalname,
      path: data.Key || data.path, // Use the key/path from Supabase response as the path
    });

    // Associate subjudul with book
    await existingBook.addSubjudul(newSubjudul);

    res.status(201).send({ message: 'Subjudul successfully added', book: existingBook });
  } catch (error) {
    res.status(500).send({ message: 'Failed to add subjudul', error: error.message });
  }
};

const getSubjudulById = async (req, res) => {
  try {
    const { bookId, subjudulId } = req.params; // Mengambil ID buku dan ID subjudul dari URL
    
    // Temukan buku berdasarkan ID yang diberikan, dan sertakan subjudul
    const existingBook = await Judul.findByPk(bookId, {
      include: { model: Subjudul, as: 'subjudul' },
    });

    // Cek apakah buku ditemukan
    if (!existingBook) {
      return res.status(404).send({ message: 'Buku tidak ditemukan' });
    }

    // Temukan subjudul berdasarkan ID yang diberikan
    const subjudul = existingBook.subjudul.find(sub => sub._id.toString() === subjudulId);

    // Cek apakah subjudul ditemukan dalam array
    if (!subjudul) {
      return res.status(404).send({ message: 'Subjudul tidak ditemukan' });
    }

    res.status(200).send({ message: 'Subjudul berhasil ditemukan', subjudul });
  } catch (error) {
    res.status(500).send({ message: 'Gagal mengambil subjudul', error: error.message });
  }
};

const getSubjudul = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Temukan buku berdasarkan ID yang diberikan, dan sertakan subjudul
    const existingBook = await Judul.findByPk(bookId, {
      include: { model: Subjudul, as: 'subjudul' },
    });

    // Cek apakah buku ditemukan
    if (!existingBook) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    // Ambil daftar subjudul dari buku yang sesuai
    const subjudulList = existingBook.subjudul;

    res.status(200).json(subjudulList);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteJudul = async (req, res) => {
  try {
    const { bookId } = req.params; // Mengambil ID buku dari URL

    // Hapus judul dan subjudul berdasarkan ID yang diberikan
    const deleteSub = await Subjudul.destroy({
      where: {judulId : bookId}
    })

    const deletedRows = await Judul.destroy({
      where: { _id: bookId },
    });

    // Cek apakah ada baris yang dihapus
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Judul tidak ditemukan' });
    }

    res.status(200).json({ message: 'Judul beserta subjudul berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus judul', error: error.message });
  }
};



const deleteSubjudul = async (req, res) => {
  try {
    const { subjudulId } = req.params; // Mengambil ID buku dan ID subjudul dari URL

    const deleteSub = Subjudul.destroy({
      where : {
        _id : subjudulId
      }
    })


    res.status(200).json({ message: 'Subjudul berhasil dihapus'});
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus subjudul', error: error.message });
  }
};

const updateJudul = async (req, res) => {
  try {
    const { bookId } = req.params; // Mengambil ID buku dari URL
    const { newTitle } = req.body; // Mengambil judul baru dari body request

    // Temukan buku berdasarkan ID yang diberikan
    const existingBook = await Judul.findByPk(bookId);

    // Cek apakah buku ditemukan
    if (!existingBook) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    // Update judul buku
    existingBook.title = newTitle;

    // Simpan perubahan ke dalam database
    const updatedBook = await existingBook.save();

    res.status(200).json({ message: 'Judul berhasil diupdate', book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengupdate judul', error: error.message });
  }
};

const updateSubjudul = async (req, res) => {
  try {
    const { bookId, subjudulId } = req.params; // Mengambil ID buku dan ID subjudul dari URL
    const { newSubjudul } = req.body; // Mengambil subjudul baru dari body request

    console.log('Book ID:', bookId);
    console.log('Subjudul ID:', subjudulId);
    console.log('New Subjudul:', newSubjudul);

    // Temukan buku berdasarkan ID yang diberikan, dan sertakan subjudul
    const existingBook = await Judul.findByPk(bookId, {
      include: { model: Subjudul, as: 'subjudul' },
    });

    // Cek apakah buku ditemukan
    if (!existingBook) {
      return res.status(404).json({ message: 'Buku tidak ditemukan' });
    }

    // Temukan subjudul berdasarkan ID yang diberikan
    const subjudulToUpdate = existingBook.subjudul.find(sub => sub._id.toString() === subjudulId);

    // Cek apakah subjudul ditemukan dalam array
    if (!subjudulToUpdate) {
      return res.status(404).json({ message: 'Subjudul tidak ditemukan' });
    }

    // Update subjudul
    subjudulToUpdate.subjudul = newSubjudul;

    // Simpan perubahan ke dalam database
    await subjudulToUpdate.save();

    res.status(200).json({ message: 'Subjudul berhasil diupdate', subjudul: subjudulToUpdate });
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengupdate subjudul', error: error.message });
  }
};

const getPdfBySubjudulIdAndName = async (req, res) => {
  try {
    const { subjudulId, name } = req.params;

    console.log('Subjudul ID:', subjudulId);
    console.log('PDF Name:', name);

    // Temukan subjudul berdasarkan ID dan nama yang diberikan
    const subjudul = await Subjudul.findOne({
      where: {
        _id: subjudulId,
        name: name
      },
      include: { model: Judul, as: 'Judul' } // Perbarui asosiasi dengan as yang sesuai
    });

    if (!subjudul) {
      console.log('Berkas PDF tidak ditemukan.');
      return res.status(404).json({ error: 'Berkas PDF tidak ditemukan' });
    }

    // Dapatkan alamat berkas PDF
    const pdfPath = subjudul.path;

    // Periksa apakah berkas tersebut memiliki ekstensi .pdf
    if (path.extname(pdfPath) !== '.pdf') {
      console.log('Berkas yang diminta bukan berkas PDF.');
      return res.status(400).json({ error: 'Berkas yang diminta bukan berkas PDF' });
    }

    // Set header respons untuk tipe konten PDF
    res.setHeader('Content-Type', 'application/pdf');

    // Kirimkan berkas PDF ke respons dengan path absolut
    res.sendFile(path.resolve(pdfPath));
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getAllSubjudul = async (req, res) => {
  try {
    // Temukan semua judul bersama dengan subjudulnya
    const judulsWithSubjudul = await Judul.findAll({
      include: [{
        model: Subjudul,
        as: 'subjudul',
      }],
    });

    // Ambil daftar semua subjudul dari seluruh judul
    const allSubjudulList = judulsWithSubjudul.reduce((result, judul) => {
      return result.concat(judul.subjudul);
    }, []);

    res.status(200).json(allSubjudulList);
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { addJudul, getAllJudul, addSubjudul, getSubjudulById, getSubjudul, deleteJudul, deleteSubjudul, updateJudul, updateSubjudul, getPdfBySubjudulIdAndName, getAllSubjudul };
