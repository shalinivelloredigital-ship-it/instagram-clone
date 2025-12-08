Instagram Clone – React + Vite

This project is a functional Instagram-like clone created using React + Vite. It includes core features such as user authentication, posting images, viewing posts in a feed, liking posts, and profile-based navigation.

This setup provides a fast React development environment with HMR, ESLint configuration, and production-ready builds.

Tech Stack Used

This application was built using:

React + Vite

Firebase (Authentication, Firestore, Storage)

React Router DOM

Modern CSS / Tailwind (if used)

Axios / Fetch API (where applicable)

Key Features

User Login & Signup

Image Upload (Posts)

Homepage Feed

Like & Comment System

Profile Page

Real-time Data Handling

Responsive UI

Available Vite Plugins Used

@vitejs/plugin-react

This provides Fast Refresh support during development.

Project Folder Structure
/src
 ├─ assets/           # images/icons
 ├─ components/       # reusable components like PostCard, Navbar, Stories
 ├─ pages/            # Feed, Login, Signup, Profile, etc.
 ├─ firebase/         # firebase config files
 ├─ context/          # auth or app context (if applicable)
 ├─ App.jsx
 └─ main.jsx

/public               # static files

Getting Started
Install Dependencies
npm install

Run Development Server
npm run dev

Build Production Version
npm run build

Preview Production Build
npm run preview
