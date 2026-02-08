# 🚀 VibeMart - Panduan Setup Lengkap

## 📋 Daftar Isi
1. [Persiapan](#persiapan)
2. [Instalasi](#instalasi)
3. [Konfigurasi Analytics](#konfigurasi-analytics)
4. [Menjalankan Aplikasi](#menjalankan-aplikasi)
5. [Struktur File](#struktur-file)
6. [Troubleshooting](#troubleshooting)

---

## Persiapan

### Requirements
- Node.js (versi 14 atau lebih tinggi)
- npm atau yarn
- Browser modern (Chrome, Firefox, Safari, Edge)

### Cek Versi Node
```bash
node --version
npm --version
```

---

## Instalasi

### 1. Install Dependencies

```bash
cd marketplace-app
npm install
```

Atau menggunakan yarn:
```bash
yarn install
```

### Dependencies yang Terinstall:
- **react** (^18.2.0) - Library UI
- **react-dom** (^18.2.0) - React DOM rendering
- **lucide-react** (^0.263.1) - Icon library
- **react-scripts** (5.0.1) - Build tools

---

## Konfigurasi Analytics

### Google Analytics Setup

1. **Buat Google Analytics Account**
   - Kunjungi https://analytics.google.com
   - Buat property baru
   - Dapatkan Measurement ID (format: G-XXXXXXXXXX)

2. **Update File `public/index.html`**
   ```html
   <!-- Ganti GA_MEASUREMENT_ID dengan ID Anda -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

### LogRocket Setup (Opsional)

1. **Buat LogRocket Account**
   - Kunjungi https://logrocket.com
   - Buat aplikasi baru
   - Dapatkan App ID

2. **Update File `public/index.html`**
   ```html
   <!-- Uncomment dan ganti 'your-app-id' -->
   <script>
     window.LogRocket && window.LogRocket.init('your-app-id');
   </script>
   ```

---

## Menjalankan Aplikasi

### Development Mode

```bash
npm start
```

Aplikasi akan buka otomatis di browser pada `http://localhost:3000`

**Fitur Development:**
- Hot reload otomatis saat file berubah
- Error overlay di browser
- Source maps untuk debugging

### Production Build

```bash
npm run build
```

Build files akan tersimpan di folder `/build`

### Test Build Locally

```bash
npm install -g serve
serve -s build
```

---

## Struktur File

```
marketplace-app/
│
├── public/
│   └── index.html              # HTML template + analytics scripts
│
├── src/
│   ├── components/             # Reusable components
│   │   ├── Router.jsx          # Custom routing (Route, Link)
│   │   ├── Navbar.jsx          # Navigation bar
│   │   └── Footer.jsx          # Footer
│   │
│   ├── pages/                  # Page components
│   │   ├── HomePage.jsx        # Landing page
│   │   ├── ProductsPage.jsx    # Product listing
│   │   ├── ProductDetailPage.jsx  # Product details
│   │   ├── CartPage.jsx        # Shopping cart
│   │   ├── CheckoutPage.jsx    # Checkout
│   │   ├── LoginPage.jsx       # Authentication
│   │   └── AdminProductsPage.jsx  # Product CRUD
│   │
│   ├── contexts/               # State management
│   │   └── AppContext.jsx      # Global state (cart, user, products)
│   │
│   ├── utils/                  # Utilities
│   │   ├── data.js             # Initial product data
│   │   └── analytics.js        # Analytics helpers
│   │
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global styles
│   └── index.js                # Entry point
│
├── package.json                # Dependencies & scripts
├── .gitignore                  # Git ignore rules
└── README.md                   # Documentation
```

---

## Fitur-Fitur

### 🏠 Beranda (HomePage)
- Hero section dengan animasi
- Featured products grid
- Category cards
- Responsive layout

### 📦 Daftar Produk (ProductsPage)
- Search functionality
- Category filtering (All, Electronics, Fashion)
- Product grid dengan hover effects
- Favorite button
- Quick add to cart

### 🔍 Detail Produk (ProductDetailPage)
- Product images
- Rating display
- Features list
- Quantity selector
- Add to cart dengan quantity

### 🛒 Keranjang (CartPage)
- List semua items di cart
- Update quantity (+ / -)
- Remove items
- Subtotal & shipping calculation
- Proceed to checkout button

### 💳 Checkout (CheckoutPage)
- Shipping information form
- Payment method selection (Bank, E-Wallet, COD)
- Order summary sidebar
- Form validation

### 🔐 Login (LoginPage)
- Email & password input
- Simple authentication (demo mode)
- Redirect after login

### ⚙️ Admin Panel (AdminProductsPage)
**CRUD Operations:**
- **Create**: Add new products
- **Read**: View all products
- **Update**: Edit product details
- **Delete**: Remove products

---

## Troubleshooting

### Port 3000 Sudah Digunakan

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

Atau gunakan port lain:
```bash
PORT=3001 npm start
```

### Dependencies Error

```bash
# Hapus node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Error

```bash
# Clear cache
npm cache clean --force
rm -rf build
npm run build
```

### Icons Tidak Muncul

Pastikan lucide-react terinstall:
```bash
npm install lucide-react@0.263.1
```

---

## Customization

### Mengubah Warna Brand

Edit `src/App.css`:
```css
:root {
  --primary: #FF6B35;      /* Warna utama */
  --secondary: #004E89;    /* Warna sekunder */
  --accent: #F7B801;       /* Warna aksen */
}
```

### Menambah Produk Default

Edit `src/utils/data.js`:
```javascript
export const INITIAL_PRODUCTS = [
  {
    id: 7,
    name: 'Your Product',
    price: 999000,
    image: 'https://...',
    category: 'Electronics',
    rating: 4.5,
    stock: 10,
    description: 'Description here',
    features: ['Feature 1', 'Feature 2']
  },
  // ... existing products
];
```

### Mengganti Font

Edit import di `src/App.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');

body {
  font-family: 'Your Font', sans-serif;
}
```

---

## Deployment

### Vercel (Recommended)

1. Push ke GitHub
2. Import di Vercel
3. Deploy otomatis

### Netlify

```bash
npm run build
# Drag & drop folder 'build' ke Netlify
```

### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Update package.json
"homepage": "https://username.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

---

## Testing User Flow

### 1. Browse Products
- Buka homepage
- Lihat featured products
- Klik "Explore Collection"

### 2. Search & Filter
- Gunakan search box
- Filter by category
- Klik product untuk detail

### 3. Add to Cart
- Pilih quantity
- Klik "Add to Cart"
- Check cart badge di navbar

### 4. Checkout
- Buka cart page
- Review items
- Klik "Proceed to Checkout"
- Isi form shipping
- Pilih payment method
- Place order

### 5. Admin Panel
- Login dengan email apapun
- Klik "Manage" di navbar
- Test CRUD operations:
  - Add new product
  - Edit existing product
  - Delete product

---

## Analytics Events

Event yang di-track:
- `User Login` - Saat user login
- `User Logout` - Saat user logout
- `Add to Cart` - Saat add product ke cart
- `Remove from Cart` - Saat remove dari cart
- `Product Create` - Saat tambah product baru
- `Product Update` - Saat edit product
- `Product Delete` - Saat hapus product
- `Checkout Complete` - Saat order selesai

---

## Tips Development

### VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Prettier - Code formatter
- ESLint

### Keyboard Shortcuts
- `Ctrl + C` - Stop server
- `Ctrl + Shift + R` - Hard reload browser

### Chrome DevTools
- React Developer Tools
- Redux DevTools (jika pakai Redux)

---

## Support

Jika ada masalah atau pertanyaan:
1. Check [Troubleshooting](#troubleshooting)
2. Check React documentation: https://react.dev
3. Check Lucide icons: https://lucide.dev

---

**Happy Coding! 🚀**
