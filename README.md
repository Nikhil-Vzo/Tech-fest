# Amispark x Rahasya 2026

This is the official web application for **Amispark x Rahasya**, featuring a dual-theme experience (Bollywood & Cyberpunk Noir).

## 🚀 Getting Started

Follow these instructions to set up the project on your local machine.

### 📋 Prerequisites

Make sure you have **Node.js** installed on your laptop.
- Download Node.js: [https://nodejs.org/](https://nodejs.org/) (Recommended: LTS version)

### 📂 Installation (The Only Step)

1.  **Open your terminal** (Command Prompt, PowerShell, or Terminal).
2.  **Navigate to the project root directory**.
3.  **Run the Magic Command**:
    ```bash
    npm install
    ```
    > **Why just this one command?**
    > You do **NOT** need to manually install individual packages like `three`, `framer-motion`, or `supabase`.
    > The file `package.json` already contains a smart list of all required libraries. Running `npm install` reads this list and automatically downloads ensuring everyone uses the exact same versions.

### ▶️ Running the Application

1.  **Start the Development Server**:
    ```bash
    npm run dev
    ```
2.  **Open in Browser**:
    Go to `http://localhost:5173`.

## 📦 Tech Stack & Dependencies

The project is built with a modern stack. All of these are installed automatically via `npm install`:

| Category | Packages | Purpose |
|----------|----------|---------|
| **Core** | `react`, `react-dom`, `vite` | fast frontend framework |
| **Routing** | `react-router-dom` | Page navigation and URL management |
| **3D & WebGL** | `three`, `@react-three/fiber`, `@react-three/drei` | The 3D Rahasya background and effects |
| **Animation** | `framer-motion`, `gsap` | Complex page transitions and scroll effects |
| **Styling** | `lucide-react` | Beautiful, consistent icons |
| **Backend** | `@supabase/supabase-js` | Database connection for live bookings |
| **Forms** | `react-hook-form`, `zod` | Validation for ticket booking forms |
| **UX** | `lenis` | Smooth scrolling experience |

## 🚧 Project Progress & Features

We have successfully implemented a unified yet distinct dual-theme experience:

### ✅ Latest Updates
-   **Unified Booking System**: A single, powerful booking engine serving both themes.
    -   **Visual Venue Map**: Interactive seat selection (Stage, Ramp, Star Circle).
    -   **Smart Validation**: automatically restricts zones based on College (Amitian vs Non-Amitian).
    -   **Redirection Logic**: Users accessing "Buy Tickets" from the Rahasya Noir theme are intercepted with a thematic "Transmission Intercepted" modal before being guided to the central booking terminal.
-   **Global Navigation**: Dynamic Navbars that switch styles (Bollywood Gold vs Hacker Noir) based on the active route, with mobile menu support for both.

### 🎭 Amispark (Premiere Mode)
-   **Visuals**: Added dynamic "Stage Spotlights", paparazzi flashbulbs, and rising gold dust particles.
-   **Vibe**: Transformed from a generic party to a high-end "Red Carpet Premiere" feel.

### 🕵️‍♂️ Rahasya (Cyberpunk / Noir Mode)
-   **3D Environment**: Integrated a 3D digital background with glitch effects.
-   **Interactive Timeline**: A vertical, scroll-linked timeline tracking the "Rahasya" story.
-   **Evidence Board**: A grid of events styled as classified case files.

## 📂 Project Structure

-   **`client/`**: Contains the React Frontend code.
    -   `pages/`: All page components.
    -   `components/`: Reusable UI components.
-   **`client/package.json`**: The manifest file listing all the libraries mentioned above.
