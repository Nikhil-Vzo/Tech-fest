# Amispark x Rahasya 2026

This is the official web application for **Amispark x Rahasya**, featuring a dual-theme experience (Bollywood & Cyberpunk Noir).

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine.

### 📋 Prerequisites

Make sure you have **Node.js** installed on your laptop.
- Download Node.js: [https://nodejs.org/](https://nodejs.org/) (Recommended: LTS version)

### 📂 Installation

1.  **Open your terminal** (Command Prompt, PowerShell, or Terminal).
2.  **Navigate to the project root directory**.
    - If you downloaded the folder to your `Downloads`, the command might look like:
      ```bash
      cd c:\Users\nikhi\Downloads\amisparkxrahasya-main
      ```
    - *Tip: You should be in the folder that contains `package.json`, `client`, and `server` folders.*

3.  **Install Dependencies**.
    - Run the following command in the **ROOT** folder. This will automatically install dependencies for both the `client` (frontend) and `server` (backend) because this project uses **Workspaces**.
      ```bash
      npm install
      ```

### ▶️ Running the Application

1.  **Start the Development Server**.
    - From the same **ROOT** folder, run:
      ```bash
      npm run dev
      ```
    - This command uses `concurrently` to start both the React frontend and the backend server at the same time.

2.  **Open in Browser**.
    - The terminal will show you the local address (usually `http://localhost:5173` for the frontend).
    - Open your web browser and go to that URL.

### 🛠️ Troubleshooting

- **"npm is not recognized"**: You probably haven't installed Node.js yet. Install it and restart your terminal.
- **"Missing modules"**: If you get errors about missing packages (like `framer-motion`, `three`, etc.), run `npm install` again in the root folder.
- **"EADDRINUSE"**: Something else is already running on the port. Close other terminal windows or running node processes.

## 📂 Project Structure

- **`client/`**: Contains the React Frontend code.
  - `pages/`: All the page components (Home, About, RahasyaTimeline, etc.).
  - `components/`: Reusable UI components.
- **`server/`**: Contains the Backend code.
- **`package.json`**: The main configuration file in the root directory.

## ✨ What's New (The 'Rahasya' Overhaul)

We have completely upgraded the visuals and experience:

### 🎭 Amispark (Premiere Mode)
- **Visuals**: Added dynamic "Stage Spotlights", paparazzi flashbulbs, and rising gold dust particles.
- **Vibe**: Transformed from a generic party to a high-end "Red Carpet Premiere" feel.

### 🕵️‍♂️ Rahasya (Cyberpunk / Noir Mode)
- **3D Environment**: Integrated a 3D digital background with glitch effects.
- **New Pages**:
  - **Classified About**: A "Dossier" style team page with redacted text and HUD elements.
  - **Evidence Events**: A grid of "Case Files" that decrypt on hover.
  - **Incident Log**: A vertical timeline with reticle markers and trace connections.
- **Mobile Optimized**: Full responsiveness for the timeline and navigation menu.

