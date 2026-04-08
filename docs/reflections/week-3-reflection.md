# Week 3 reflection

Take a few minutes to think about what happened this week — not just what you built, but how the process went.

---

## Your code

What changed about how you think about your project's structure after creating views.js and wiring events?

> The biggest shift was understanding that **separation of concerns is real, not theoretical**. Before this week, I knew app.js handled DOM stuff and matching.js had logic, but it felt arbitrary. Creating views.js made it click: app.js coordinates (listens for events, decides what to show), views.js renders (builds the HTML for each screen), and matching.js filters (pure logic). Each file has a clear job.
>
> The SPA pattern was mind-blowing. I can build what feels like multiple pages (results screen, detail screen) without creating separate HTML files or reloading the page. The whole app lives in one HTML file, and JavaScript swaps out what the user sees. That's how modern web apps work! It felt like leveling up from making static pages to making an actual interactive application.
>
> Event delegation also changed how I think about connecting user actions to code. Instead of "this button does this thing," it's "the container listens, and whatever gets clicked bubbles up." One listener handling many elements feels elegant and efficient.

---

## Your agent

Did preparing your AGENTS.md with modern JS rules before coding change the quality of what your agent produced? What did you notice?

> Absolutely! Week 2 felt like "write code, then fix patterns," but Week 3 felt like "write code correctly the first time." Because I added the modern JS rules to AGENTS.md in Part 0 (before any coding), the agent naturally used `addEventListener`, `dataset`, `.find()`, and event delegation throughout. I didn't have to go back and refactor old patterns.
>
> The code the agent generated included comments explaining WHY patterns mattered ("I learned: Event delegation is more efficient than adding listeners to every card"), which made it feel less like magic and more like teaching. The agent even used named callback functions (`handleCardClick`, `handleFormSubmit`) instead of anonymous functions, which made the code way more readable.
>
> The lesson from `context-engineering.md` about AGENTS.md being a "token budget" really paid off. Those 7 carefully chosen rules steered the entire week's work in the right direction. Quality over quantity works.

---

## The rules

Which modern JS rule from `docs/rules/` stuck with you most? What clicked about it?

> **`dataset` over `getAttribute('data-*')`** stuck with me most because I used it constantly for event delegation.
>
> What clicked: When I set `data-name="Demon Slayer"` on a card element, I can read it as `card.dataset.name` (camelCase!) instead of the clunky `card.getAttribute('data-name')`. It's cleaner, feels more like working with JavaScript objects, and the automatic camelCase conversion is smart.
>
> I used this pattern in every card click: grab the card with `event.target.closest('.recommendation-card')`, read `card.dataset.name`, then look up the anime with `data.options.find()`. Without dataset, that flow would have been messier and harder to read.
>
> Honorable mention: **`.find()` over `.filter()[0]`**. The first time I saw it stop searching after finding the first match instead of scanning the whole array, it clicked that method names signal intent. `.filter()` means "give me all matches" while `.find()` means "stop at the first one." Choosing the right method makes code self-documenting.

---

## Biggest win or biggest loss

What was the moment this week that affected you most — something that finally worked, or something that really frustrated you?

> **Biggest win: The first time I clicked a card and the detail view appeared.**
>
> I submitted the form, saw the numbered cards, clicked #3, and BAM — the whole container swapped from results to a detailed view of that one anime, with ALL its properties displayed and a back button that actually worked. When I clicked back, the results reappeared perfectly. It felt like I had built an app with real navigation, not just a static page that displays filtered data.
>
> That moment connected everything: event delegation caught the click, `dataset.name` identified which anime, `data.options.find()` looked it up, `showDetail()` rendered the new view, and `lastResults` made the back button work. Every part of Week 3 came together in one smooth flow. I literally said "I BUILT THAT!" out loud.
>
> The breakthrough wasn't just that it worked — it was understanding that JavaScript can create different "screens" by swapping DOM content. No page reloads, no separate HTML files, just functions that build and display different views. That's the SPA pattern, and now I get why modern web apps feel so fluid and responsive. This week transformed my mental model of what JavaScript can do.
