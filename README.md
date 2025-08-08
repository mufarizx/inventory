# Sistem Inventory ERP - Trima Laksana

Website sistem manajemen inventory modern yang dibuat berdasarkan spesifikasi ERP brochure. Sistem ini menyediakan solusi lengkap untuk mengelola inventory, produk, dan laporan dengan antarmuka yang intuitif dan responsif.

## 🚀 Fitur Utama

### 📊 Dashboard
- Overview sistem inventory dengan statistik real-time
- Total produk, stok, dan nilai inventory
- Indikator stok rendah dan habis
- Aktivitas dan stok terbaru

### 📦 Manajemen Produk
- Tambah, edit, dan hapus produk
- Kategorisasi produk (Elektronik, Fashion, Makanan, Kesehatan, dll)
- Penetapan harga dan stok minimum
- Status otomatis (Tersedia, Stok Rendah, Habis)

### 📋 Manajemen Stok
- Monitoring stok real-time
- Update stok (masuk, keluar, koreksi)
- Filter berdasarkan kategori dan status
- Pencarian produk
- Histori pergerakan stok

### 📈 Laporan & Analitik
- Laporan stok komprehensif
- Histori pergerakan barang
- Kalkulasi nilai total inventory
- Prediksi kebutuhan stok
- Export laporan ke CSV

### ⚙️ Pengaturan Sistem
- Konfigurasi perusahaan
- Pengaturan mata uang
- Notifikasi stok rendah
- Email laporan otomatis

## 🛠️ Teknologi

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, Gradients
- **Icons**: Font Awesome
- **Responsive**: Mobile-first design
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 🎨 Desain

- **Theme**: Purple gradient dengan aksen modern
- **Typography**: Segoe UI font family
- **Colors**: Professional purple palette (#667eea, #764ba2)
- **Layout**: Clean, minimalist, user-friendly
- **Animations**: Smooth transitions dan hover effects

## 📱 Responsif

Website ini sepenuhnya responsif dan dapat diakses dengan baik di:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🚀 Cara Menjalankan

1. Clone repository atau download files
2. Buka terminal/command prompt di folder project
3. Jalankan web server lokal:
   ```bash
   python3 -m http.server 8000
   ```
   atau
   ```bash
   python -m http.server 8000
   ```
4. Buka browser dan akses: `http://localhost:8000`

## 📂 Struktur File

```
inventory/
├── index.html          # Halaman utama
├── style.css           # Styling CSS
├── script.js           # Functionality JavaScript
├── README.md           # Dokumentasi
└── Trima_Laksana_Produk ERP 2023_Rekanan.pdf
```

## 🔧 Fitur JavaScript

### Data Management
- Local storage untuk persistensi data
- Sample data untuk demonstrasi
- CRUD operations untuk produk dan stok

### Interactive Features
- Modal dialogs untuk input data
- Dynamic table updates
- Real-time calculations
- Form validations
- Notifications system

### Navigation
- Single Page Application (SPA)
- Smooth section transitions
- Active state management

## 📊 Data Sample

Website dilengkapi dengan data sample untuk demonstrasi:
- 4 produk dengan berbagai kategori
- Status stok yang beragam (Tersedia, Stok Rendah, Habis)
- Harga dalam format Rupiah
- Minimum stok threshold

## 🎯 Use Cases

Website ini cocok untuk:
- UMKM yang membutuhkan sistem inventory sederhana
- Toko retail dengan variasi produk
- Gudang dengan kebutuhan tracking stok
- Bisnis yang memerlukan laporan inventory

## 🔐 Keamanan

- Client-side validation
- XSS protection considerations
- Safe data handling practices

## 🌟 Highlights

- **User Experience**: Interface intuitif dan mudah digunakan
- **Performance**: Fast loading dan smooth interactions
- **Accessibility**: Readable fonts dan proper contrast
- **Maintainability**: Clean, organized code structure

## 📝 Catatan

Sistem ini dibuat sebagai proof-of-concept berdasarkan ERP brochure requirements. Untuk production use, disarankan untuk:
- Implementasi backend database
- User authentication system
- API integration
- Advanced security measures
- Data backup solutions

## 🤝 Kontribusi

Untuk pengembangan lebih lanjut atau customization, silakan modifikasi sesuai kebutuhan spesifik bisnis Anda.

---

**Developed by**: AI Assistant  
**Version**: 1.0  
**Last Updated**: Agustus 2025