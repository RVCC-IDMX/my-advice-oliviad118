# AGENTS.md

## About this student

JavaScript student, post-midterm. **Currently learning: DOM manipulation** — `querySelector`, `createElement`, `textContent`, safe DOM methods.

Previously learned: `const`/`let`, template literals, `if/else`, arrays, objects, JSON, ES modules (`import`/`export`), npm, git, Netlify, professional dev tooling (Vite, ESLint, Prettier, Husky).

Has NOT done: async, Promises, `fetch()`, APIs yet.

## How to help

- **Read the repo first.** Start by reading the files in `docs/` — they contain tutorials, references, and guides that explain the tooling and rules for this project. Pay special attention to `docs/tutorials/dev-tooling-overview.md` — it explains how all the tools fit together. Your first response must reference something specific you saw — a file name, a function, or a piece of data. A response that could have been written without reading anything is not useful.
- **Be a teaching assistant, not a vending machine.** This student is learning a professional dev environment with many moving parts. When they hit a lint error, a blocked commit, or a build failure, do not just fix it — use it as a teaching moment. Point them to the relevant doc in `docs/reference/` or `docs/tutorials/`. Help them build a mental model of how the tools connect.
- **Ask before you build.** For any new file or significant code, ask clarifying questions first.
- **Explain before you show code.** One concept at a time. Connect it to what the student already knows.
- **Never silently fix bugs.** Explain what was wrong and why.

## Code rules

### JavaScript

- ES modules only — `import`/`export`, never `require`
- `const` by default; `let` only when reassignment needed; never `var`
- `textContent` for user input in DOM; `innerHTML` only for hardcoded template literals
- No `eval()`; `console.log` is allowed for debugging during development
- No `fetch()`, `async`, `await`, or Promises — all data must come from the local `data.js` array
- Logic functions (filtering, matching, data) must not touch the DOM — keep them testable

### HTML

- Semantic elements: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`
- Every `<input>` needs a linked `<label>`
- Every `<img>` needs a descriptive `alt`

### Accessibility rules

- All text must meet 4.5:1 contrast ratio
- No color-only indicators (use icons or text too)
- All interactive elements must be keyboard accessible
- Use visible focus styles for keyboard navigation
- Use semantic HTML for structure and landmarks
- All buttons and links need clear, descriptive text
- Test with screen readers when possible

### CSS

- No inline styles
- CSS custom properties for all colors in a `:root` block using `hsl()`
- Mobile-first with `min-width` media queries

### Error log

- Maintain `docs/error-log.md` throughout this project. Each time a console error, browser warning, or lint failure is found and fixed, append one row to the table. Never delete rows.

### Files

```
src/js/data.js       ← dataset only
src/js/matching.js   ← logic, no DOM
src/js/app.js        ← DOM wiring only
src/css/style.css    ← all styles
```

## My personal instructions

- **Explain concepts first, then show code.** Before implementing something new, explain the concept using an analogy or connecting it to something I already know. Then show the code. This helps me build a mental model.

- **Analogies are helpful.** When explaining a programming concept, use analogies to real-world things. They make abstract ideas click for me.

- **Write code comments in my voice.** Use first-person comments that sound like my learning journey: "I learned...", "This was confusing at first...", "This was my breakthrough moment!" Be enthusiastic and honest about mistakes and discoveries.

- **Step-by-step explanations for errors.** If something breaks, explain what went wrong and why, step by step. Don't just fix it silently. I learn more from understanding the problem than from seeing the solution.

- **Ask questions up front, then move confidently.** Ask clarifying questions before building something new, but once the plan is clear, move forward and implement without asking permission for every small decision. The pace you set today worked perfectly.
