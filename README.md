
#  Spotify Clone

A **Spotify-inspired music streaming web app** built using **React, TypeScript, Vite, and TailwindCSS**.
It replicates the core look and feel of Spotify, with a custom audio player and multiple views.

---

## Features

*  Music player with play/pause/skip controls
*  Different views: Home, Playlist, Search, Library
*  Modern responsive UI styled with TailwindCSS
*  Works on desktop & mobile
*  Mock data provided for demo songs

---

##  Tech Stack

* **Frontend:** React (TypeScript)
* **Bundler:** Vite
* **Styling:** TailwindCSS + PostCSS
* **Linting:** ESLint
* **Data:** Local mock data (`src/data/mockData.ts`)

---

##  Project Structure

```
project/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── tsconfig.json
├── src/
│   ├── index.css
│   ├── App.tsx
│   ├── main.tsx
│   ├── types.ts
│   ├── data/
│   │   ├── mockData.ts
│   ├── components/
│       ├── TopBar.tsx
│       ├── HomeView.tsx
│       ├── PlaylistView.tsx
│       ├── SearchView.tsx
│       ├── Sidebar.tsx
│       ├── LibraryView.tsx
│       ├── Player.tsx
```

---

##  Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/spotify-clone.git
   cd spotify-clone/project
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

---

##  Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature-new`)
3. Commit changes
4. Open a Pull Request

---

## License

This project is licensed under the **MIT License**.

---
