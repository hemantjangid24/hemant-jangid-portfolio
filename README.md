# 🚀 Developer Portfolio — Hemant Jangid

A modern, animated, production-ready portfolio website built with **React + Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- ⚡ **React + Vite** — blazing fast development & build
- 🎨 **Tailwind CSS** — utility-first styling
- 🌊 **Framer Motion** — smooth scroll & hover animations
- 🌗 **Dark / Light mode** — persisted in localStorage
- 📱 **Fully responsive** — mobile, tablet, desktop
- 🔤 **Custom fonts** — Clash Display + Satoshi + JetBrains Mono
- 💎 **Glassmorphism UI** — modern glass cards
- 🔢 **Scroll progress bar** — top-of-page indicator
- ⌨️ **Typing animation** — role switcher in hero
- 🎛️ **Project filtering** — by category
- 📩 **Contact form** — ready to wire to EmailJS / Formspree

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── resume.pdf          ← Place YOUR resume here
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Education.jsx
│   │   │   └── Contact.jsx
│   │   ├── ui/
│   │   │   └── ScrollProgress.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useTheme.js
│   ├── data.js             ← ✏️ EDIT THIS to personalize content
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🛠️ Setup (Step by Step)

### Step 1 — Prerequisites
Make sure you have installed:
- **Node.js** v18+ → https://nodejs.org
- **npm** (comes with Node.js)

Check versions:
```bash
node -v    # should print v18.x.x or higher
npm -v     # should print 9.x.x or higher
```

### Step 2 — Install dependencies
```bash
cd portfolio
npm install
```

### Step 3 — Run development server
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### Step 4 — Personalize your content
Open `src/data.js` and update:
- `personalInfo` — your name, bio, email, social links
- `skills` — your tech stack and proficiency levels
- `projects` — your real projects with GitHub/live links
- `education` — your degree and certifications
- `certifications` — your online courses

### Step 5 — Add your resume
Place your resume PDF in the `public/` folder as `resume.pdf`.

### Step 6 — Build for production
```bash
npm run build
```
Output is in the `dist/` folder — ready to deploy!

### Step 7 — Preview production build locally
```bash
npm run preview
```

---

## 🚀 Deployment Options

### Vercel (Recommended — Free)
1. Push to GitHub
2. Go to https://vercel.com → New Project
3. Import your GitHub repo
4. Click Deploy — done! 🎉

### Netlify (Free)
1. Run `npm run build`
2. Drag the `dist/` folder to https://app.netlify.com/drop

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

---

## 📩 Setting up the Contact Form

### Option A — Formspree (Easiest)
1. Sign up at https://formspree.io
2. Create a new form
3. Copy your endpoint URL
4. In `Contact.jsx`, replace the `setTimeout` mock with:
```js
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
if (res.ok) setStatus('sent');
```

### Option B — EmailJS
1. Sign up at https://emailjs.com
2. Create a service, template, and get your public key
3. `npm install @emailjs/browser`
4. Follow the EmailJS React guide

---

## 🎨 Customization Guide

### Change color scheme
In `src/index.css`, update the CSS variables:
```css
:root {
  --accent: #6EE7B7;       /* Main accent color */
  --surface: #0D0F14;      /* Dark background */
  --surface-card: #13161E; /* Card background */
}
```

### Change fonts
In `index.html`, replace the Fontshare links. Then update `tailwind.config.js`:
```js
fontFamily: {
  display: ['"Your Display Font"', 'sans-serif'],
  body: ['"Your Body Font"', 'sans-serif'],
}
```

### Add more projects
In `src/data.js`, add to the `projects` array:
```js
{
  id: 6,
  title: "My New Project",
  description: "Short description",
  longDescription: "Detailed description",
  tech: ["React", "Node.js"],
  category: "Full Stack",
  github: "https://github.com/you/project",
  live: "https://project.vercel.app",
  featured: false,
  color: "#EC4899",
  emoji: "🚀",
}
```

---

## 📦 Creating a ZIP for sharing

### On Windows
1. Right-click the `portfolio` folder
2. Select "Compress to ZIP file"

### On Mac / Linux
```bash
cd ..
zip -r portfolio.zip portfolio --exclude "portfolio/node_modules/*" --exclude "portfolio/dist/*"
```

---

## 🔶 Resume Content — Copy-Paste Ready

### Portfolio Description (for your actual resume):
> Personal portfolio website built with React, Vite, and Tailwind CSS, featuring smooth Framer Motion animations, dark/light mode, project filtering, responsive design, and a contact form. Deployed on Vercel.

### Short Bio (for website About section):
> I'm a passionate B.Tech Computer Science student with hands-on experience in full-stack web development. I build fast, accessible, and visually polished web applications using React, Node.js, and modern tooling.

---

## 🤝 Credits

- Fonts: [Fontshare](https://www.fontshare.com/) (Clash Display, Satoshi), [Google Fonts](https://fonts.google.com/) (JetBrains Mono)
- Icons: [Lucide React](https://lucide.dev/)
- Animations: [Framer Motion](https://www.framer.com/motion/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)

---

Made with ❤️ by Hemant Jangid
