// ============================================================
// EDIT THIS FILE TO CUSTOMIZE YOUR PORTFOLIO CONTENT
// ============================================================

export const personalInfo = {
  name: "Hemant Jangid",
  firstName: "Hemant",
  tagline: "Aspiring Software Engineer",
  subTagline: "Building elegant solutions with modern tech",
  bio: "Passionate B.Tech CSE student who loves crafting clean, high-performance web applications. I turn ideas into reality with code, coffee, and curiosity.",
  longBio: `Currently pursuing my B.Tech in Computer Science, I've spent the last 3 years building full-stack projects and sharpening my skills across the modern web ecosystem. I believe great software is as much about the experience as the logic behind it.`,
  location: "Jaipur, Rajasthan, India",
  email: "hemantjangid0008@email.com",
  phone: "+91 90247 88743",
  photo: "/profile1.png",
  resumeUrl: "/resume.pdf",
  availableForWork: true,
  social: {
    github: "https://github.com/hemantjangid24",
    linkedin: "https://linkedin.com/in/hemantjangid24",
    twitter: "https://x.com/HemantJangidx",
  },
};

export const skills = [
  // Languages
  { name: "JavaScript", level: 85, category: "Language", icon: "JS" },
  { name: "Python", level: 80, category: "Language", icon: "PY" },
  { name: "C++", level: 75, category: "Language", icon: "C++" },
  { name: "TypeScript", level: 65, category: "Language", icon: "TS" },

  // Frontend
  { name: "React.js", level: 88, category: "Frontend", icon: "⚛" },
  { name: "Next.js", level: 70, category: "Frontend", icon: "N" },
  { name: "Tailwind", level: 92, category: "Frontend", icon: "TW" },
  { name: "HTML/CSS", level: 95, category: "Frontend", icon: "H" },

  // Backend
  { name: "Node.js", level: 75, category: "Backend", icon: "ND" },
  { name: "Express.js", level: 72, category: "Backend", icon: "EX" },
  { name: "MongoDB", level: 70, category: "Backend", icon: "MG" },
  { name: "PostgreSQL", level: 60, category: "Backend", icon: "PG" },

  // AI & Machine Learning
  { name: "NumPy", level: 80, category: "AI & ML", icon: "NP" },
  { name: "TensorFlow", level: 75, category: "AI & ML", icon: "TF" },
  { name: "Scikit-learn", level: 70, category: "AI & ML", icon: "SK" },
  { name: "Vertex AI", level: 65, category: "AI & ML", icon: "VA" },

  // Tools & Infrastructure
  { name: "Git & GitHub", level: 88, category: "Tools", icon: "GH" },
  { name: "Linux", level: 70, category: "Tools", icon: "LX" },
  { name: "Docker", level: 55, category: "Tools", icon: "DK" },
  { name: "VS Code", level: 95, category: "Tools", icon: "VS" },
];

export const projects = [
  {
    id: 1, // Aapki list ke hisaab se ID set karein
    title: "ResuAI-Pulse",
    description: "AI-powered emergency response system for real-time incident classification and automated dispatch.",
    longDescription: "A full-stack emergency automation platform that uses NLP to analyze distress queries, triggers Twilio voice alerts, sends automated emails, and maps the nearest responders using OSRM and Overpass APIs.",
    tech: ["FastAPI", "React", "Firebase", "Twilio", "Leaflet"],
    category: "Full Stack / AI",
    github: "https://github.com/hemantjangid24/ResuAI", // Apna sahi repo link dalo
    live: "https://resuai-fast.vercel.app/", // Apna live link dalo
    featured: true,
    color: "#ef4444", // Emergency Red theme
    emoji: "🚨",
  },
  {
    id: 2,
    title: "AutoScrapX",
    emoji: "🚨",
    category: "Full Stack / AI",
    color: "#3b82f6", // Emergency Red / High-Performance Red
    featured: true,
    description: "AI-powered automotive marketplace for real-time part compatibility and intelligent inventory management.",
    longDescription: "A sophisticated industrial platform that leverages Machine Learning (Cosine Similarity) to match recycled car components with compatible vehicle chassis. Features a Node.js orchestration layer, a FastAPI-based AI engine, and a premium Bento-grid UI for seamless user discovery.",
    tech: ["FastAPI", "React", "Node.js", "MongoDB", "Framer Motion", "Tailwind v4"],
    github: "https://github.com/hemantjangid24/AutoScrapX",
    live: "https://autoscrapx.vercel.app/",
  },
  {
    id: 3,
    title: "PartX-Revive",
    description: "AI-powered automotive spare parts & salvage marketplace with CLIP visual search, 24-hour scrap bid auction, and multi-role seller system.",
    longDescription: "A full-stack, AI-integrated automotive platform featuring computer vision for part grading, automated bidding auctions, and government-compliant scrap processing using the MERN stack and FastAPI.",
    tech: ["React", "Node.js", "FastAPI", "MongoDB", "Python", "CLIP", "FAISS", "Razorpay", "Cloudinary", "Tailwind", "Zustand", "JWT"],
    category: "Full Stack + AI",
    github: "https://github.com/hemantjangid24/PartX-Revive",
    live: "https://partx-revive.vercel.app",
    featured: true,
    color: "#f97316",
    emoji: "🚗",
  },
  {
    id: 4,
    title: "EcoSort AI - Smart Waste Management",
    description: "A futuristic AI-powered ecosystem for automated waste segregation and real-time urban sanitation monitoring.",
    longDescription: "A dual-portal system integrating Computer Vision for waste classification and Geofencing for live fleet tracking. Citizens earn 'Eco-Karma' rewards for sustainable disposal, while administrators manage city-wide waste heatmaps and emergency strike actions.",
    tech: ["React", "FastAPI", "TensorFlow", "Leaflet.js", "Tailwind CSS"],
    category: "AI & Smart City",
    github: "https://github.com/hemantjangid24/EcoSort-AI",
    live: "https://ecosort-ai.vercel.app",
    featured: true,
    color: "#22c55e",
    emoji: "🌿",
  },
  {
    id: 5,
    title: "House Consultant Service",
    description: "A frontend real estate platform designed to make buying and selling houses, villas, and land effortless.",
    longDescription: "A dedicated real estate web application built to streamline property transactions. It provides an intuitive interface for users to explore, buy, and sell a wide variety of properties including houses, flats, luxury villas, warehouses, and commercial land.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    github: "https://github.com/hemantjangid24/House-Consultant-Service",
    live: "https://house-consultant-service.netlify.app/",
    featured: true  ,
    color: "#ff9f0a",
    emoji: "🏡",
  },
];

export const education = [
  {
    degree: "Bachelor of Technology — Computer Science & Engineering",
    institution: "Poornima Institute of Engineering & Technology",
    location: "Jaipur, Rajasthan",
    duration: "2023 — 2027",
    cgpa: "8.5 / 10",
    status: "Pursuing",
    highlights: ["Data Structures & Algorithms", "Operating Systems", "DBMS", "Computer Networks", "Web Technologies"],
  },
  {
    degree: "Senior Secondary — PCM",
    institution: "Eklavya International Academy",
    location: "Jaipur, Rajasthan",
    duration: "2021 — 2023",
    // cgpa: "92.4%",
    status: "Completed",
    highlights: ["Physics", "Chemistry", "Mathematics"],
  },
];

export const certifications = [
  { name: "Google Cloud Career Launchpad Generative AI Leader track", issuer: "Google Cloud Skills Boost", date: "Jan 2026", icon: "☁️", color: "#2997ff" },
  { name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional", issuer: "Oracle University", date: "Oct 2025", icon: "🐍", color: "#bf5af2" },
  { name: "Entrepreneurship", issuer: "NPTEL - IIT Madras", date: "Oct 2025", icon: "🎓", color: "#34c759" },
  { name: "MERN Stack Training", issuer: "Seldom India Technologies", date: "July 2025", icon: "⚛️", color: "#ff9f0a" },
];

export const stats = [
  { label: "Projects Built", value: "5+" },
  { label: "Lines of Code", value: "100K+" },
  { label: "Cloud Certifications", value: "1" },
  { label: "Leetcode Problems Solved", value: "150+" },
];
