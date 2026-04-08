# Week 2 reflection — DOM Fundamentals

## Reading the agent's code

**What was the hardest part of your code to understand? What made it click?**

The hardest part was understanding the data flow in `findRecommendations` — specifically how the data gets filtered through `meetsAllCriteria` and then sorted before being passed to the display function. What made it click was tracing one anime object through the entire pipeline: form submission → data extraction → filtering → sorting → rendering. Once I saw that the functions were like stations in an assembly line, it all made sense.

**Did you find anything in the agent's code that surprised you — something you would not have written yourself?**

The agent created a separate helper function (`createDetailParagraph`) inside `createAnimeCard`. I didn't know you could nest functions like that! At first I thought it was weird, but then I realized it made sense — the helper is only used inside that one function, so keeping it local prevents namespace pollution. I probably would have made it a top-level function, but the nested approach is actually cleaner.

## Modernizing

**How many `getElementById` calls did you replace? Was the switch to `querySelector` straightforward?**

Zero! My agent already used `querySelector` everywhere. I got lucky on this one — no changes needed. But reading the queryselector-guide.md helped me understand *why* it's better: CSS selector syntax means one method can find anything (by ID, class, tag, attribute), while `getElementById` only works for IDs.

**Did you find any `innerHTML` that was risky? How did you decide what to replace?**

I found one big `innerHTML` block in `createAnimeCard` that was building HTML from anime data using template literals. The agent's comment said it was "safe because it's hardcoded template content," but that wasn't quite right — the template had variables like `${anime.name}` in it, which means it WAS inserting data. I replaced it with `createElement` + `textContent` + `appendChild` because that's the defensive pattern: always use `textContent` for data, even if you trust the source.

## DOM experiments

**Which experiment was your favorite? Why?**

Experiment 5 (modify every card) was my favorite because it felt like real DOM manipulation — finding multiple elements with `querySelectorAll`, looping through them, and adding numbered badges. I also liked that I had to think about *when* to run the code — the cards don't exist until the user submits the form, so I wrapped it in a function that checks if cards exist first.

**Which experiment was the hardest? What tripped you up?**

Experiment 7 (the subtitle fade animation with `setInterval`) was the hardest because I'd never used timers before. I didn't realize `setInterval` runs *forever* unless you stop it — I thought it would run once. Also, I used `.style.opacity` instead of `classList` because I wanted smooth fading, which was a new concept (CSS via JavaScript).

**Did any experiment give you an idea for a feature you want to add to your site later?**

Yes! The hide/show experiment (Experiment 4) made me realize I could add a "show more details" button on each anime card that reveals extra info when clicked. That would make the cards cleaner by default while still showing all the data when someone wants it.

## AGENTS.md

**What new rules or instructions did you add to AGENTS.md this week?**

I updated my "About this student" section to reflect that I'm now learning DOM manipulation — I added `querySelector`, `createElement`, and `textContent` to the list of what I know. I didn't add any new personal instructions this week, but I plan to add one about `textContent` vs `innerHTML` after seeing it come up multiple times.

**Compare your "About this student" section from the start of the week to the end. What changed?**

Start of week: "Has NOT done DOM, async, or APIs yet."

End of week: "Currently learning: DOM manipulation — querySelector, createElement, textContent, safe DOM methods."

The change shows I went from zero DOM knowledge to understanding how JavaScript manipulates HTML in real-time. That's a big shift — the DOM was always this abstract thing, and now it's concrete: it's just an API for changing what's on the page.

## Reflection

**What is one thing you understand about the DOM now that you did not understand before this week?**

I understand that the DOM is a *live tree* — when you change it with JavaScript, the browser updates the page immediately. Before this week, I thought of HTML as static and JavaScript as separate. Now I understand they're connected: JavaScript reaches into the HTML (via `querySelector`), grabs elements (which are objects!), and modifies them (`textContent`, `classList`, `appendChild`). The page isn't a document; it's a living data structure you can manipulate.

**What would you do differently if you were starting this week's work over?**

I would read `safe-dom-manipulation.md` *before* looking at my code, not after. I spent time modernizing the `innerHTML` without fully understanding *why* it was risky until I read the reference doc. If I'd read it first, I would have caught the issue immediately and understood the security implications (XSS) from the start. Next time: read the docs, then examine the code.
