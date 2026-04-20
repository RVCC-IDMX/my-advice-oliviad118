# Week 4 reflection

Answer each question thoughtfully. There are no wrong answers — the goal is to reflect on what you learned and how your understanding changed.

---

## 1. The enforcement ladder

What did the new linter (ESLint 9 + unicorn plugin) catch that your AGENTS.md rules alone didn't prevent? On the flip side, what kinds of things can AGENTS.md catch that a linter can't check for?

The unicorn plugin caught things I never would have thought about - like preferring `Number.parseFloat()` over the global `parseFloat()`, using `for...of` instead of traditional `for` loops with indices, and enforcing `textContent` everywhere (it now blocks ALL `innerHTML` usage, even safe ones). It's super strict about modern JavaScript patterns.

But AGENTS.md catches bigger-picture stuff that a linter can't see - like keeping logic separate from DOM code (a linter can't tell if a function "should" touch the DOM or not), using named callback functions instead of anonymous ones (both are syntactically valid), and my project-specific patterns like "constants in UPPERCASE" for values that never change. AGENTS.md is the "why", the linter is the "what".

---

## 2. Hooks across contexts

You've now seen hooks in five places: browser events, Git pre-commit, npm lifecycle scripts, GitHub Actions, and serverless functions. What is the common pattern across all of them?

They all follow the same "when X happens, do Y" pattern. The hook is the trigger point - when a button is clicked, when a commit is attempted, when npm install runs, when code is pushed to GitHub, when a request hits the serverless endpoint. Each hook runs code at a specific moment in time automatically, without me having to remember to do it manually. It's like setting up dominoes - once configured, they just work when the right event happens. The pattern is: **register once, execute automatically**.

---

## 3. Which enforcement layer changed your habits

Advisory (AGENTS.md), linting (ESLint + unicorn), or blocking (pre-commit hook) — which one changed how you write code the most this week? Why?

The **unicorn linter** changed my habits the most. With AGENTS.md, I could forget and write old-style code. The pre-commit hook only runs when I commit. But the linter runs in my editor constantly - I see red squiggles WHILE I'm typing. It trained me to write modern patterns automatically because I got instant feedback. Now I write `for...of` and `Number.parseFloat()` without thinking. The linter shaped my muscle memory in a way that reading docs never did. The immediate visual feedback is what made the difference.

---

## 4. The data swap

What surprised you about working with a real API compared to your static `data.js`? Think about things like response shape, timing, missing fields, or error cases.

The biggest surprise was how **inconsistent** real API data is! My static data.js had every field filled in perfectly. But Jikan API? Some anime have English titles, some don't. Some have episode counts, some return `null`. Some durations say "23 min per ep", others say "Unknown". I had to add defaults EVERYWHERE (`|| 12`, `|| 'No description available'`, `|| null`). My serverless function is basically one big defensive transformation layer. Also, timing was weird - the first load feels slow (like a full second!), but cached loads are instant. I never thought about performance with static data because it was always just... there.

---

## 5. The transform challenge

What was the hardest part of mapping the API response to the shape your views expect? How did you solve it?

The hardest part was mapping Jikan's genre names to my mood categories. Jikan has like 50+ genre names ("Shounen", "Seinen", "Slice of Life", "Mecha") but my filters only have 5 moods ("exciting", "funny", "emotional", "mysterious", "chill"). I had to write a `mapGenreToMood()` function that looks at ALL of an anime's genres and picks the best mood match. "Action" → exciting, "Comedy" → funny, "Drama" → emotional. But what about "Psychological Thriller"? I ended up using a bunch of `.includes()` checks and falling back to the first genre if nothing matched. It's not perfect, but it works well enough that users can find anime by mood!

---

## 6. New API fields

What new field(s) did you add from the API? How did they improve your app compared to the static version?

I added **six new fields**: posterImage, synopsis, malScore, scoredBy, malId, and whereToWatch. The poster images were the game-changer - they transformed my app from a boring text list into a real visual browsing experience! Seeing actual anime artwork makes the cards SO much more engaging. The synopsis gives users full context before clicking (my static descriptions were just generic placeholder text). The malScore and scoredBy show community ratings from millions of real MyAnimeList users, which is way more credible than my made-up 1-5 star ratings. And whereToWatch tells users which streaming platforms probably have the anime. The static version felt like a homework assignment. The API version feels like a real app.

---

## 7. Error handling philosophy

You used try/catch in four different contexts this week: the serverless function, fetch in app.js, the localStorage wrapper, and the npm lint guard. What is the common pattern across all of them? What changes between contexts?
The pattern is always **try the risky thing, recover gracefully if it fails**. Every try/catch follows this: attempt an operation that MIGHT fail, and if it does, don't crash - do something sensible instead.

What changes is the recovery strategy:
- **Serverless function**: Return a proper HTTP error response (502 + JSON error message) so the browser gets structured error data
- **Fetch in app.js**: Show an error message in the DOM (not just console.log!) so users see what went wrong
- **localStorage wrapper**: Remove corrupt cache and return `null` (self-healing - app just fetches fresh data)
- **npm lint guard**: Exit with code 1 and print a helpful message ("Run npm install first")

The try block is always optimistic ("this will probably work"), the catch block is always defensive ("but if it doesn't, here's plan B"). That's the philosophy.