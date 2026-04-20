# My code map — v2 additions

These sections were added in Week 4. Your Week 3 entries above are still valid.

---

## Serverless function

- File path: `netlify/functions/api.mjs`
- What does this function do? `Fetches anime data from Jikan API and transforms it into the shape my views expect. It maps Jikan's genre names to my mood categories, converts their status values to my completionStatus format, and adds streaming platform suggestions.`
- What external API does it call? `https://api.jikan.moe/v4/top/anime?limit=25 (Jikan API - unofficial MyAnimeList API)`
- What HTTP method does your function use to call the API? `GET (default fetch method)`

- What shape does the response have? (list the top-level properties)
  - `options` (array of 25 anime objects)
  - Each anime has: name, genre, mood, audioLanguage, rating, completionStatus, episodeCount, episodeLengthMinutes, userRating
  - PLUS new fields: posterImage, synopsis, malScore, scoredBy, malId, whereToWatch

---

## Environment variables

- Do you have a `.env` file in your project root? `No - Jikan API doesn't require an API key!`
- What variable(s) are defined in it?
  - None (no .env file needed)

- Are these same variables set in the Netlify UI (Site settings > Environment variables)? `N/A - no API key required`
- Is `.env` listed in your `.gitignore`? `Yes - .env is in .gitignore as a safety precaution`

---

## Data flow

How does your app get its data now compared to Week 3?

- Before (Week 3): `import { data } from './data.js'`
- Now (Week 4): `fetch('/.netlify/functions/api')`
- Did you keep `data.js` as a fallback if the fetch fails? `Yes - it's still in the repo as a backup dataset`
- Where does the fetch happen? (file and function name): `src/js/app.js → fetchAnimeData()`

---

## New fields from API

In Part 3A you added field(s) from the live API that your static data did not have.

- What new field(s) did you add?
  - `posterImage` - actual anime poster images from MyAnimeList
  - `synopsis` - real anime descriptions (not my made-up text!)
  - `malScore` - official MyAnimeList score (0-10 scale)
  - `scoredBy` - number of users who rated it
  - `malId` - unique MyAnimeList ID for each anime
  - `whereToWatch` - streaming platform suggestions

- Where do they appear in your card? (what element shows them?): `<img class="anime-poster"> for posterImage, detail view shows synopsis in <p class="synopsis">, malScore in <p class="mal-score">, and whereToWatch platforms in <span class="platform-badge">`
- Did you add any CSS for the new field(s)? `Yes! .anime-poster for card images, .detail-poster for larger detail view image, .synopsis for description text, .mal-score with gradient background, .platform-badge for streaming services`

---

## localStorage cache

- What key do you pass to `localStorage.setItem()`? `'animeData'`
- What shape is the cached data? (array of objects, single object, etc.): `Object with two properties: { data: {...}, timestamp: number }. The data property contains the full anime dataset with an options array.`
- Where is your `loadCache` function? (file and function name): `src/js/app.js → getCachedData()`
- Where is your `saveCache` function? (file and function name): `src/js/app.js → setCachedData()`
- When does your app use the cache instead of fetching? `On page load, fetchAnimeData() checks cache first. If data is less than 1 hour old (CACHE_DURATION = 60 * 60 * 1000 ms), it returns cached data immediately. Only fetches if cache is missing, expired, or corrupted.`
