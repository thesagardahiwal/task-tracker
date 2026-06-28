# MERN Task Tracker - Production Ready

![Task Tracker Banner](https://img.shields.io/badge/MERN%20Stack-Task%20Tracker-blue?style=for-the-badge&logo=react)

A modern, production-grade Task Tracker web application built using the MERN stack (MongoDB, Express.js, React, Node.js).

## 🌐 Live Demo

- **Frontend (Client)**: [https://task-flow-neon-six.vercel.app](https://task-flow-neon-six.vercel.app)
- **Backend API (Server)**: [https://task-tracker-hdp0.onrender.com/api](https://task-tracker-hdp0.onrender.com/api)

## 🚀 Features

- **Full-Stack Application**: Robust frontend and backend architecture.
- **Authentication**: JWT-based secure user authentication (Registration, Login, Refresh tokens).
- **Task Management**: Full CRUD capabilities for managing tasks.
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS v4 and Framer Motion for micro-animations.
- **Containerized**: Fully Dockerized for production deployment with multi-stage builds.

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19, Vite, TypeScript, React Router v7
- **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`
- **State & Data**: TanStack Query (React Query)
- **Forms & Validation**: React Hook Form, Zod
- **UI Components & Icons**: Lucide React, Framer Motion, Sonner (Toasts)
- **Networking**: Axios

### Backend

- **Runtime & Framework**: Node.js, Express.js, TypeScript
- **Database**: MongoDB Atlas, Mongoose
- **Validation**: Zod
- **Security & Middlewares**: Helmet, Morgan, Compression, CORS, JWT Auth, `dotenv`

## 🏗️ Architecture

- **Layered Backend Architecture:**
  `Routes -> Controllers -> Services -> Data Access`
  This ensures clean separation of concerns and maintainability.
- **Feature-Based Frontend Structure:** Grouping by domains (e.g., `src/features/tasks`, `src/features/auth`) rather than types, for better scalability.
- **Strict Validation:** Using Zod on both ends ensures type-safety across the network boundary.

## 💻 Running Locally (Development)

### Prerequisites

- Node.js (v18+)
- MongoDB instance (local or Atlas)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thesagardahiwal/task-tracker.git
   cd task-tracker
   ```

2. **Backend Setup:**

   ```bash
   cd server
   npm install
   # Create a .env file based on environment requirements (PORT, MONGO_URI, JWT_SECRET, etc.)
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../client
   npm install
   # Create a .env file (VITE_API_URL, etc.)
   npm run dev
   ```

## 🐳 Running via Docker (Production)

This project includes a `docker-compose.yml` file for easy production orchestration.

1. **Build and Run the Containers:**
   In the root directory, run:

   ```bash
   docker compose up -d --build
   ```

2. **Architecture behind Docker:**
   - **Client**: Multi-stage build that compiles Vite to static assets, served by an Nginx container (port 80).
   - **Server**: Node.js runtime container serving the Express API.
   - **Database**: Connects to the provided MongoDB instance.

## 📝 Git Workflow

We use Conventional Commits and a strict phase-by-phase development approach to ensure clean history and easy tracking of features, bug fixes, and chores.

## 📜 License

[MIT](LICENSE)
