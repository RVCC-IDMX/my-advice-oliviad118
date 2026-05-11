# My Advice - Anime Finder

An intelligent anime recommendation app that helps you find the perfect anime to watch! Search using natural language powered by Groq AI, or use the detailed filter form to browse 100 top-rated anime from MyAnimeList.

## ✨ Features

### 🤖 AI-Powered Search (Pattern A + B)
- **Natural Language Input**: Type "something chill before bed" and let Groq translate it to filters
- **Personalized Narration**: Get a friendly 2-3 sentence intro explaining why these anime match your request
- Built with safety: input validation, JSON mode, delimited user input, system prompts

### 🎯 Detailed Filtering
- Search by genre, mood, audio language, rating, completion status
- Filter by episode count and episode length
- Real-time search and MAL score slider
- View full details for any anime

### ⚡ Performance
- localStorage caching with 1-hour expiry
- Serverless functions for API proxying
- 100 top anime from Jikan (MyAnimeList) API

This repo uses a fully configured professional tooling setup with linting, formatting, pre-commit hooks, CI, and Netlify deployment.

## Getting started

1. **Install dependencies**:
```bash
npm install
```

2. **Set up Groq API key** (required for AI features):
   - Get a free API key at [console.groq.com](https://console.groq.com)
   - Create a `.env` file in the project root:
   ```
   GROQ_API_KEY=your_key_here
   ```
   - ⚠️ Never commit `.env` to git - it's in `.gitignore`

3. **Start the dev server**:
```bash
npm run dev
# OR for serverless functions:
npx netlify dev
```

After `npm install`, Husky sets up pre-commit hooks automatically. The Netlify dev server runs both Vite (frontend) and serverless functions (API + Groq).

## Tech Stack

- **Frontend**: Vanilla JavaScript (ES modules), Vite 7.3.3
- **APIs**: Jikan (MyAnimeList), Groq (llama-3.3-70b-versatile)
- **Serverless**: Netlify Functions (ESM)
- **Storage**: localStorage with TTL caching
- **Linting**: ESLint 9 + unicorn plugin
- **Formatting**: Prettier
- **CI/CD**: GitHub Actions → Netlify

## Learning objectives

- Set up and work inside a professional JavaScript tooling harness
- Understand what linting and formatting do and why teams use them
- Experience pre-commit quality gates that catch problems before they reach GitHub
- Read and understand a CI workflow with GitHub Actions
- Use an AI agent conversation to plan and generate a complete site from a build prompt

## File guide

Your docs folder has everything you need:

- [docs/INSTRUCTIONS.md](docs/INSTRUCTIONS.md) — step-by-step assignment walkthrough
- [docs/CHECKLIST.md](docs/CHECKLIST.md) — completion checklist for each part
- [docs/a-good-agents-md.md](docs/a-good-agents-md.md) — what makes an effective AGENTS.md
- [docs/error-log.md](docs/error-log.md) — error tracking table (maintained throughout the project)
- [docs/tutorials/dev-tooling-overview.md](docs/tutorials/dev-tooling-overview.md) — the big picture: how all the tools fit together
- [docs/tutorials/logic-vs-dom.md](docs/tutorials/logic-vs-dom.md) — why logic and DOM code live in separate files
- [docs/tutorials/why-linting.md](docs/tutorials/why-linting.md) — what linting is and why it matters
- [docs/tutorials/how-husky-works.md](docs/tutorials/how-husky-works.md) — how pre-commit hooks work
- [docs/tutorials/github-actions-101.md](docs/tutorials/github-actions-101.md) — understanding CI with GitHub Actions
- [docs/tutorials/project-structure.md](docs/tutorials/project-structure.md) — how src, dist, and public relate through Vite and Netlify
- [docs/reference/eslint-rules.md](docs/reference/eslint-rules.md) — every rule in this project explained
- [docs/reference/prettier-options.md](docs/reference/prettier-options.md) — formatting options reference
- [docs/reference/vite-vitest-basics.md](docs/reference/vite-vitest-basics.md) — what Vite and Vitest do
- [docs/reference/cli-tools.md](docs/reference/cli-tools.md) — installing and using the Netlify CLI and GitHub CLI
- [docs/reference/why-no-live-server.md](docs/reference/why-no-live-server.md) — why we use Vite's dev server instead of Live Server
- [docs/guides/choosing-your-model.md](docs/guides/choosing-your-model.md) — how to pick the right Copilot model for the task
- [docs/guides/adding-features.md](docs/guides/adding-features.md) — stretch goals and extra features
- [docs/guides/modifying-context.md](docs/guides/modifying-context.md) — how to customize your AGENTS.md
- [docs/planning-conversation-guide.md](docs/planning-conversation-guide.md) — planning guide used in Part 1 (also available as a [gist](https://gist.github.com/cynthiateeters/b2aa58e6f6c67fb2400309c8543febc5))
- [docs/course/how-agents-md-and-reflections-work.md](docs/course/how-agents-md-and-reflections-work.md) — how AGENTS.md and weekly reflections work across the project
- [docs/course/weekly-updates-how-it-works.md](docs/course/weekly-updates-how-it-works.md) — how you receive weekly instruction updates via GitHub PRs

## Project Structure

```
src/
  js/
    app.js          # DOM wiring, event handlers, API calls
    data.js         # Static anime dataset (deprecated, now uses API)
    matching.js     # Filter logic (no DOM)
    views.js        # View rendering functions
    greeting.js     # Time-based greeting helper
  css/
    style.css       # All styles with CSS custom properties
  images/           # Image assets

netlify/functions/
  api.mjs           # Jikan API proxy (transforms data)
  groq.mjs          # Groq AI integration (Pattern A + B)

docs/               # Tutorials, references, guides
index.html          # Main HTML structure
```

The app follows **separation of concerns**:
- **Logic** (matching.js) - Pure functions, no DOM
- **Views** (views.js) - Rendering functions  
- **DOM** (app.js) - Event handlers, wiring
- **Serverless** - API proxying and AI integration
