# Error Log

Every console error, browser warning, or lint failure gets a row here. Don't delete rows — the log is a record of how you got better.

| Date | Error message | File + line | My hypothesis | Fix | Blamed |
| ---- | ------------- | ----------- | ------------- | --- | ------ |
| 2026-04-15 | unicorn/prefer-number-properties: Prefer Number.parseFloat() over parseFloat() | app.js:195 | Global parseFloat works but unicorn wants the Number.parseFloat method instead | Changed `parseFloat(malSlider.value)` to `Number.parseFloat(malSlider.value)` | unicorn rules upgrade |
| 2026-04-15 | unicorn/no-array-for-each: Use for...of instead of forEach | app.js:202 | forEach works but can't use break/continue, unicorn enforces for...of | Changed `filtered.forEach(anime => {...})` to `for (const anime of filtered) {...}` | unicorn rules upgrade |
| 2026-05-08 | Loading spinner never disappears - CSS specificity bug | style.css:43 & 342 | `.hidden` and `.spinner` have equal specificity but `.spinner` comes later, so it wins | Switched to HTML `hidden` attribute (Strategy C) - changed `loadingSpinner.classList.add('hidden')` to `loadingSpinner.hidden = true` in app.js, and `class="spinner hidden"` to `class="spinner" hidden` in index.html. ALSO added `.spinner[hidden] { display: none; }` in CSS because `.spinner { display: flex }` was overriding the hidden attribute | me - didn't understand CSS specificity and source order |

Blamed: who or what introduced the error — you, the agent, or the starter code.
