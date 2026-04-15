# My code map

Fill out each section below by reading your actual code. Do not guess — open each file and look. This map is your reference for the rest of the assignment. When instructions say "your results container" or "your card class," they mean what you write here.

---

## Files and their purposes

For each file, write one sentence about what it does.

| File                    | What it does |
| ----------------------- | ------------ |
| `src/js/app.js`         | Handles all DOM manipulation - gets form values, creates card elements, and displays recommendations on the page |
| `src/js/matching.js`    | Contains pure logic functions for filtering anime by criteria (no DOM code) |
| `src/js/data.js`        | Stores the anime dataset - 46 anime objects with 9 properties each |
| `src/js/experiments.js` | Temporary practice file with 7 DOM experiments for learning querySelector, createElement, classList, etc. |
| `src/css/style.css`     | All styling for the site using CSS custom properties, HSL colors, and mobile-first responsive design |
| `index.html`            | Main HTML structure with form (8 select dropdowns) and results container |

---

## Form

Look at your `index.html` and find the form element.

- Form ID: `#anime-form`
- Select element ID: `#mood`

- What moods/options are in the select?

  - Lighthearted
  - Dark
  - Emotional
  - Exciting
  - Relaxing
  - Intense
  - Uplifting

---

## Results container

Where do results appear on the page?

- Container ID or class: `#recommendation-list`
- What element type is it? (`div`, `section`, etc.): `div`

---

## Card structure

Look at how your app.js builds each result card. What elements make up one card?

- Card element type: `div`
- Card class name: `recommendation-card`

- What is inside each card? (list the child elements and what data they show)
  - `h3` - anime name with genre emoji (e.g., "⚔️ Demon Slayer")
  - `div.anime-details` containing 7 `p` elements:
    - Genre paragraph (shows genre like "action")
    - Mood paragraph (shows mood like "intense")
    - Audio paragraph (shows audio language preference)
    - Rating paragraph (shows content rating like "teen")
    - Status paragraph (shows completion status like "ongoing")
    - Length paragraph (shows episode count and length in minutes)
    - User rating paragraph (shows star rating 1-5)
  - `p.description` - text description of the anime

---

## Existing event listeners

Look through your app.js for any `addEventListener` calls. List each one.

| Where in the code | Event type | What it does |
| ----------------- | ---------- | ------------ |
| Line 75 on `form` | `submit` | Prevents default, gathers form values, filters anime, displays results |
| Line 166 on `resultsList` | `click` | Delegates all clicks - routes to card detail view OR back button based on what was clicked |
| Line 193 on `form` | `reset` | Clears results and shows placeholder message when user clicks "Clear All Filters" |

If you do not see any `addEventListener` calls, write "none found" — and then look again, because the form handler uses one.

---

## Data shape

Open `src/js/data.js` and look at one item in your dataset.

- How many items total? `46`

- Properties on each item

  - `name` (string) - the anime title
  - `genre` (string) - action, romance, comedy, horror, etc.
  - `mood` (string) - lighthearted, dark, emotional, etc.
  - `audioLanguage` (string) - sub, dub, or both
  - `rating` (string) - kids, teen, or mature
  - `completionStatus` (string) - completed, ongoing, hiatus, or cancelled
  - `episodeCount` (number) - total number of episodes
  - `episodeLengthMinutes` (number) - length of each episode in minutes
  - `userRating` (number) - my personal rating from 1-5 stars

---

## CSS classes for show/hide

Do you have a `.hidden` class or similar in your CSS? If so, what does it do?

- Class name: `___________`
- What CSS rule does it apply? `___________`

If you do not have one, you will create one this week.
