# Orelio Website

The official landing page for **Orelio**.

This repository contains the source code and interactive components powering the public website for Orelio.

---

## ⚡ Tech Stack

- **Markup:** Semantic HTML5
- **Styling:** Vanilla CSS3 with custom design tokens, CSS variables, and fluid typography
- **Interactivity:** Vanilla JavaScript (ES modules) with zero heavy framework overhead
- **Tooling & Bundler:** [Vite](https://vitejs.dev/) (v8+)
- **Package Manager / Runtime:** [Bun](https://bun.sh/) (or Node.js / npm)
- **Typography:** Google Fonts (*Hanken Grotesk*, *Outfit*, and *Plus Jakarta Sans*) + Material Symbols Outlined

---

## 🚀 Getting Started

### Prerequisites

You can use either **Bun** (recommended) or **Node.js** (v18+).

### 1. Clone the repository

```bash
git clone https://github.com/oreliolabs/orelio-website.git
cd orelio-website
```

### 2. Install dependencies

Using Bun:
```bash
bun install
```

Or using npm:
```bash
npm install
```

### 3. Run the development server

Using Bun:
```bash
bun run dev
```

Or using npm:
```bash
npm run dev
```

---

## 🛠️ Build & Deployment

### Build for production

Generates optimized, minified production assets in the `dist/` directory:

```bash
bun run build
# or: npm run build
```

### Preview production build

Test the compiled production bundle locally:

```bash
bun run preview
# or: npm run preview
```

---

## 📄 License

This website project is licensed under the [MIT License](LICENSE).