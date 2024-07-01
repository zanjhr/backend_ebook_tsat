// import axios from 'axios';
// import UserAdmin from '../models/UserAdmin.js';

// const authenticateUser = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     const externalApiUrl = 'https://3easy2.telkomsat.co.id/portal/api/auth';
//     const formData = new URLSearchParams();
//     formData.append('username', username);
//     formData.append('password', password);

//     const externalApiResponse = await axios.post(externalApiUrl, formData, {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });

//     if (externalApiResponse.status === 200) {
//       const responseData = externalApiResponse.data;

//       if (responseData.status == 'success') {
//         // Ceks di database Lokal
//         const nik = responseData.data.nik;

//         const userAdmin = await UserAdmin.findOne({ where: { nik } });

//         // Cek role dari pengguna
//         if (userAdmin) {
//           res.json({ role: 'admin', nik, id: userAdmin.id, nama: responseData.data.nama });
//         } else {
//           res.json({ role: 'user', nik, nama: responseData.data.nama });
//         }
//       } else {
//         // Authentikasi Gagal
//         res.status(401).json({ error: 'Authetikasi Gagal'});
//       }
//     } else {
//       // Autentikasi gagal
//       res.status(401).json({ error: 'Autentikasi gagal' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Terjadi kesalahan server atau data' });
//   }
// };

// export default { authenticateUser };