# My Portfolio

A modern, responsive developer portfolio built for an aspiring Computer Science Engineering student focused on software engineering, artificial intelligence, and defensive cybersecurity.

The site emphasizes honest representation: personal details, social links, developing skill levels, planned/in-development projects, education milestones, and resume availability are clearly marked and editable without fabricated claims.

## Features

- **Responsive Sticky Navigation**: Single-row desktop navigation with active section highlighting, smooth scrolling, and a mobile-friendly drawer menu.
- **Editable Identity & Sections**: Update your name, headline, contact email, social links, About Me details, skill proficiency levels, and education entries directly in the browser (persisted in `localStorage`, with a one-click reset to defaults).
- **Filterable Projects Showcase**: Filter projects by category (`All`, `Web Development`, `Artificial Intelligence`, `Software Systems`, `Cybersecurity`), inspect project scope in a modal, and attach real GitHub or live demo links when ready.
- **Honest Resume Handling**: Supports downloading a supplied `public/resume.pdf` file or attaching a local PDF resume in-browser without generating fake documents.
- **Validated Contact Form**: Client-side validation with clear field errors and an honest `mailto:` draft + clipboard fallback (disclosing that no backend email server is configured).

## Tech Stack

- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Vite**
- **Lucide React** (icons)

## Project Structure

```text
├── public/
│   └── favicon.svg                 # Minimalist SVG site icon
├── src/
│   ├── assets/images/              # Generated project & workspace visuals
│   ├── components/
│   │   ├── AboutSection.tsx        # Editable introduction & focus areas
│   │   ├── ContactSection.tsx      # Validated form with mailto & copy fallback
│   │   ├── EducationSection.tsx    # Editable academic timeline
│   │   ├── Footer.tsx              # Footer links & dynamic copyright year
│   │   ├── HeroSection.tsx         # Hero banner & primary actions
│   │   ├── Navbar.tsx              # Sticky top bar & mobile menu
│   │   ├── PortfolioCustomizerModal.tsx
│   │   ├── ProjectModal.tsx        # Project details & link editor
│   │   ├── ProjectsSection.tsx     # Filterable project cards
│   │   ├── ResilientImage.tsx      # Image wrapper with clean fallback UI
│   │   ├── ResumeModal.tsx         # PDF resume download & attachment modal
│   │   └── SkillsSection.tsx       # Categorized & editable skill levels
│   ├── data/
│   │   └── defaultPortfolio.ts     # Initial placeholder content
│   ├── hooks/
│   │   └── usePortfolioState.ts    # State management & localStorage persistence
│   ├── types/
│   │   └── portfolio.ts            # TypeScript interfaces
│   ├── App.tsx                     # Page layout & scroll-spy integration
│   ├── index.css                   # Tailwind & base accessibility styles
│   └── main.tsx                    # React entry point
├── index.html                      # SEO metadata & font imports
└── package.json
```

## Getting Started Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Run type checking**:
   ```bash
   npm run lint
   ```

4. **Create a production build**:
   ```bash
   npm run build
   ```
   The static production bundle is emitted to `dist/`.

## Customizing Your Content Before Deploying

- To permanently ship your own resume PDF, place it at `public/resume.pdf`.
- To make your personal name, email, links, and project URLs permanent in source control (rather than only browser `localStorage`), update `src/data/defaultPortfolio.ts`.
- No environment variables are required for this static frontend build.

## Uploading to GitHub

1. Initialize a Git repository (if not already initialized):
   ```bash
   git init
   git add .
   git commit -m "Initial developer portfolio"
   ```
2. Create a new empty repository on GitHub and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

## Deploying to Vercel

1. Sign in to [Vercel](https://vercel.com) and click **Add New → Project**.
2. Import your GitHub repository.
3. Vercel automatically detects Vite:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy** (no environment variables are required).
