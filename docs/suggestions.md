# Final project suggestions for oliviasanimefinder

> [!IMPORTANT]
> Before starting the final, complete and close your "Pre-final feedback" issue.

## Your Week 4 starting point (recap)

Your Week 4 was the most thorough by document and reflection volume, comparable to William's by code quality. Your serverless function fetches Jikan's `/top/anime?limit=25` and synthesizes mood from genre via `mapGenreToMood()` — a substantive transform decision. Six enrichment fields (`posterImage`, `synopsis`, `malScore`, `scoredBy`, `malId`, synthesized `whereToWatch`). Your cache is the only one in the cohort with **time-based expiry** (`{ data, timestamp }` wrapper, 1-hour `CACHE_DURATION`, try/catch, self-heal). Your reflection was the longest and most specific — including a generalizable observation about loading-time perception that exceeded the assignment's expectations.

That timestamp-expiry cache and your `mapGenreToMood()` helper are the two pieces of your project that will inform your final-project pattern choice the most.

## How each pattern fits your project

### Pattern A — translate input to API params

Strong fit. Jikan supports rich query parameters — `genres`, `min_score`, `status`, `type` (TV vs movie), `rating` (PG vs R). Your current form has dropdowns for several of these; Pattern A collapses them. Your `mapGenreToMood()` work is the inverse of what Pattern A does — Jikan returns 50+ genres and you map them to 5 moods; Pattern A takes a mood description and maps it back to specific Jikan genre IDs. The pair of mappings closes the loop.

### Pattern B — narrate the API results

Strong fit. Anime recommendations benefit from synopsis-aware commentary ("here is why this fits your mood"), and your existing data already has the `synopsis` field. Your `whereToWatch` synthesis is a Pattern B-style move already (the function already generates content beyond the raw API), so Pattern B is a natural extension of the architectural decision you already made.

### Pattern A+B — both, chained

Worth the two calls. Both ends benefit; your code quality and reflection muscle suggest you have the bandwidth. Of all five active students, you and William are the two most likely to ship A+B end-to-end.

## What carries over (and what doesn't)

- **Your timestamp-expiry cache** — keep it. The wrapper is the only one in the cohort with this; it will serve you well for caching the REST results. See the _How the cache changes_ section in whichever pattern you pick.
- **Your `mapGenreToMood()` helper** — becomes one of two complementary mappings: `moodToGenres` for Pattern A (Groq returns moods → you map to genres → Jikan accepts genres) and the existing `mapGenreToMood` for displaying genres in your view.
- **Your six enrichment fields** — stay. The synthesized-vs-fetched distinction you documented stays useful.
- **Your views.js** — keeps `createElement` + `textContent`. Add a refusal renderer for `refused: true`. For Pattern B, add render hooks for narration.
- **What changes** — your form, depending on pattern. Pattern A replaces it; Pattern B keeps it.

## A sketched Pattern A schema for Jikan

```js
{
  "genres": number[] | null,                // Jikan genre IDs (e.g., [1, 4] for Action, Comedy)
  "min_score": number | null,               // 0–10 MAL score floor
  "status": "airing" | "complete" | null,
  "type": "tv" | "movie" | null,
  "rating": string | null,                  // e.g., "pg13"
  "refused": boolean,
  "refusal_reason": string
}
```

Your system prompt lists Jikan's genre IDs and valid query shapes so Groq returns shapes the API accepts. Or: write a `moodToGenres` helper that inverts your existing `mapGenreToMood()` and Groq returns moods directly — you do the mood→genre translation in code. Either is defensible.

## My soft recommendation

If I had to pick one for you, I would start with **Pattern A** because of the elegant complement to `mapGenreToMood()` — the inverse mapping closes the loop in a way that other students' projects would not. You can ship A cleanly and then layer B on top toward A+B; with your code quality and reflection depth, A+B is realistic in a one-week sprint.

## What to read next

- `INSTRUCTIONS.md` — the assignment overview
- `CHECKLIST.md` — concrete deliverables
- `docs/tutorials/pattern-a-translate-input.md` — Pattern A walkthrough with Open Library; translate the schema to Jikan
- `docs/tutorials/groq-moderation-floor.md` — the four required defenses
