# VibeMart - Modern Marketplace Application

Aplikasi marketplace modern yang dibangun dengan React, menampilkan desain editorial yang bold dengan fitur lengkap termasuk autentikasi, keranjang belanja, checkout, dan manajemen produk.

## ✨ Fitur

### 📄 Halaman
- **Beranda** - Hero section dengan featured products & kategori
- **Daftar Produk** - Grid produk dengan search & filter kategori
- **Detail Produk** - Informasi lengkap produk dengan quantity selector
- **Keranjang** - Manajemen cart dengan update quantity
- **Checkout** - Form pengiriman & metode pembayaran
- **Login** - Autentikasi user sederhana
- **Admin/Manage Products** - CRUD produk (Create, Read, Update, Delete)

### 🔧 Teknologi
- ✅ React 18 dengan Hooks (useState, useEffect, useContext)
- ✅ React Router custom (hash-based routing)
- ✅ State Management dengan Context API
- ✅ LocalStorage untuk persistence
- ✅ Responsive dengan Flexbox & CSS Grid
- ✅ Analytics integration (Google Analytics & LogRocket)

### 🎨 Desain
- Tema **Modern Editorial** dengan typography unik
- Font: Playfair Display (heading), DM Sans (body), Space Mono (logo)
- Color palette vibrant dengan gradients
- Animations & transitions smooth
- Responsive untuk mobile & desktop

## 📂 Struktur Project

```
marketplace-app/
├── public/
│   └── index.html              # HTML template dengan analytics scripts
├── src/
│   ├── components/
│   │   ├── Router.jsx          # Custom routing components
│   │   ├── Navbar.jsx          # Navigation bar
│   │   └── Footer.jsx          # Footer component
│   ├── pages/
│   │   ├── HomePage.jsx        # Landing page
│   │   ├── ProductsPage.jsx    # Product listing
│   │   ├── ProductDetailPage.jsx  # Product details
│   │   ├── CartPage.jsx        # Shopping cart
│   │   ├── CheckoutPage.jsx    # Checkout process
│   │   ├── LoginPage.jsx       # User login
│   │   └── AdminProductsPage.jsx  # Product management (CRUD)
│   ├── contexts/
│   │   └── AppContext.jsx      # Global state management
│   ├── utils/
│   │   ├── data.js             # Initial product data
│   │   └── analytics.js        # Analytics utilities
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global styles
│   └── index.js                # App entry point
└── package.json                # Dependencies
```

## 🚀 Instalasi & Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Development Server
```bash
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

### 3. Build untuk Production
```bash
npm run build
```

## 📊 Integrasi Analytics

### Google Analytics
1. Ganti `GA_MEASUREMENT_ID` di `public/index.html` dengan ID Google Analytics Anda
2. Event tracking sudah diimplementasikan untuk:
   - User login/logout
   - Add to cart
   - Product CRUD operations
   - Checkout completion

### LogRocket
1. Uncomment dan ganti `'your-app-id'` di `public/index.html` dengan App ID LogRocket Anda
2. LogRocket akan merekam user sessions secara otomatis

## 🔐 Autentikasi

Aplikasi menggunakan autentikasi sederhana untuk demo:
- Gunakan email apapun untuk login
- Password tidak divalidasi (untuk demo purposes)
- User data disimpan di localStorage

## 🛒 Fitur Keranjang

- Add to cart dari product listing atau detail page
- Update quantity di cart page
- Remove items dari cart
- Persistent cart menggunakan localStorage
- Real-time total calculation

## 📝 CRUD Operations

Admin dapat:
- **Create** - Tambah produk baru dengan form
- **Read** - Lihat semua produk yang ada
- **Update** - Edit informasi produk
- **Delete** - Hapus produk (dengan konfirmasi)

Akses halaman admin di `/admin/products` (memerlukan login)

## 🎨 Customization

### Mengubah Warna
Edit CSS variables di `src/App.css`:
```css
:root {
  --primary: #FF6B35;
  --secondary: #004E89;
  --accent: #F7B801;
  --dark: #1A1A2E;
  --light: #FAFAFA;
}
```

### Menambah Produk
Edit file `src/utils/data.js` untuk menambah produk default

### Mengubah Font
Edit import di `src/App.css` untuk menggunakan font berbeda

## 📱 Responsive Design

- Desktop: 1400px max-width
- Tablet: Optimized grid layouts
- Mobile: Hamburger menu, single column layouts

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - bebas digunakan untuk project pribadi atau komersial

## 🤝 Contributing

Contributions, issues, dan feature requests welcome!

## 👨‍💻 Author

VibeMart Marketplace - Modern E-commerce Solution
