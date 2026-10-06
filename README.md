# Masaraddi Neuro Care Center — React Application

Production-ready React application built with pure React (JSX) and Tailwind CSS for **Masaraddi Neuro Care Center, Bagalkot**.

---

## 🚀 Quick Start (Local PC & VS Code)

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### 2. Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The app will start at:
👉 **`http://localhost:3000`** (or the port displayed in your terminal).

---

## 🔐 How to Open the Staff Portal / Admin Panel

You have multiple convenient ways to open the Staff Portal in local PC:

1. **Top Navigation Bar**: Click the **Staff Portal** button in the top navbar header (with the shield icon).
2. **Floating Badge**: Click the floating **Staff Portal** button in the bottom right of the screen.
3. **Mobile Menu**: Open the hamburger menu and click **Hospital Staff Portal**.
4. **Footer**: Click **Staff Portal** in the footer copyright line.
5. **Direct Browser URL**: Open:
   - `http://localhost:3000/#staff`
   - or `http://localhost:3000/staff`
   - or `http://localhost:3000/#admin`
6. **Keyboard Shortcut**: Press `Ctrl + Shift + A` (or `Cmd + Shift + A` on Mac).
7. **Developer Console**: Type `window.openStaffPortal()` in your browser developer tools console.

---

## 🔑 Staff Access PIN / Credentials

- **Default PIN**: `1234`
- **Alternative keywords**: `admin`, `staff`, or `masaraddi`
- **One-Click Login**: Simply click the **"One-Click Auto Login (Local / Demo Access)"** button directly on the access modal!

---

## 🛠 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the Vite development server on `http://localhost:3000` |
| `npm run build` | Compiles and bundles production-ready assets into `dist/` |
| `npm run preview` | Previews the production build locally |
| `npm start` | Runs the Node.js / Express server (`node server.js`) |

---

## 📂 Project Structure

```text
├── public/                 # Static assets (favicons, manifest, robot.txt)
├── src/
│   ├── components/         # Standard React JSX components
│   │   ├── admin/
│   │   │   └── AdminPanel.jsx   # Staff Content Management & Admin System
│   │   ├── Navbar.jsx           # Sticky Header Navigation
│   │   ├── HeroSlideshow.jsx    # Hero section with hospital photo slideshow
│   │   ├── AboutSection.jsx     # Clinical Overview
│   │   ├── ServicesSection.jsx  # Neurological treatments & clinics
│   │   ├── DoctorsSection.jsx   # Dr. Shivkumar Masaraddi profile
│   │   ├── FacilitiesSection.jsx# ICU, OT, Pharmacy, Diagnostics
│   │   ├── PhotoGallery.jsx     # High-resolution gallery & lightbox
│   │   ├── FaqSection.jsx       # Patient FAQ accordion
│   │   ├── ContactSection.jsx   # Map, timings & contact details
│   │   ├── Footer.jsx           # Hospital footer with medical disclaimer
│   │   ├── TrustStatsBar.jsx    # Clinical stats bar
│   │   ├── StructuredData.jsx   # SEO Schema.org JSON-LD
│   │   └── MobileStickyBar.jsx  # Floating mobile CTA bar
│   ├── config/
│   │   └── hospitalConfig.js    # Default clinical data, doctors, facilities
│   ├── context/
│   │   └── HospitalContext.jsx  # React state provider with localStorage sync
│   ├── App.jsx             # Main App component with Staff Portal routing
│   ├── main.jsx            # React root entry point
│   └── index.css           # Global Tailwind CSS styles
├── index.html              # HTML entry point
├── package.json            # Project dependencies & scripts
├── server.js               # Full-stack Node.js Express server
└── vite.config.js          # Vite React plugin configuration
```
