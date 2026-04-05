// Memanggil alat (library) yang dibutuhkan
const mysql = require("mysql2/promise"); // Menggunakan versi promise agar mendukung async/await
require("dotenv").config(); // Membaca file .env yang baru saja kita buat

// Membuat "kolam" koneksi (Connection Pool)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Maksimal koneksi antrean
  queueLimit: 0,
});

// Mengetes apakah koneksi berhasil
async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("Berhasil terhubung ke database MariaDB (JobLokerDB)!");
    connection.release(); // Melepaskan koneksi agar bisa dipakai yang lain
  } catch (error) {
    console.error("Gagal terhubung ke database:", error.message);
  }
}

testConnection();

// Mengekspor 'db' agar bisa digunakan di file lain (seperti index.js nanti)
module.exports = db;
