import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

// Load konfigurasi dari file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Tes koneksi ke database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to the database.');
});

// Endpoint untuk mendapatkan data banjir
app.get('/api/reports', (req, res) => {
    const query = 'SELECT id, lokasi, status_banjir, level, timestamp FROM data_banjir';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).send('Error fetching data from database.');
        } else {
            res.json(results);
        }
    });
});

// Tambah laporan baru
app.post('/api/reports', (req, res) => {
    const { lokasi, status_banjir, level } = req.body;
    const query = 'INSERT INTO data_banjir (lokasi, status_banjir, level) VALUES (?, ?, ?)';
    db.query(query, [lokasi, status_banjir, level], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).send('Error inserting data.');
        } else {
            res.status(201).send('Report added successfully.');
        }
    });
});

// Perbarui laporan berdasarkan ID
app.put('/api/reports/:id', (req, res) => {
    const { id } = req.params;
    const { lokasi, status_banjir, level } = req.body;
    const query = 'UPDATE data_banjir SET lokasi = ?, status_banjir = ?, level = ? WHERE id = ?';
    db.query(query, [lokasi, status_banjir, level, id], (err, results) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).send('Error updating data.');
        } else {
            res.send('Report updated successfully.');
        }
    });
});

// Hapus laporan berdasarkan ID
app.delete('/api/reports/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM data_banjir WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting data:', err);
            res.status(500).send('Error deleting data.');
        } else {
            res.send('Report deleted successfully.');
        }
    });
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
