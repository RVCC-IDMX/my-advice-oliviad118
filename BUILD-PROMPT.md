# BUILD-PROMPT.md

## Project Overview

**Domain:** Anime Recommendations

**Site Title:** Olivia's Anime Finder 🎌

**Subtitle:** Find your next anime obsession!

**Purpose:** Help anime fans discover the perfect anime based on genre preferences, mood, available time, audio preferences, and age-appropriateness.

---

## Design Decisions

### Color Scheme
- **Primary colors:** Red to orange gradient (energetic, eye-catching)
- Use `hsl(0, 80%, 50%)` for red
- Use `hsl(25, 90%, 55%)` for orange
- Apply gradient to header or accent elements
- Keep text readable with good contrast

### Visual Style
- Clean, modern card-based layout
- Use emojis for visual interest (genres, ratings)
- Rounded corners on cards and buttons
- Subtle shadows for depth
- Responsive design that works on mobile

---

## Data Structure

Each anime in the dataset has these properties:

```javascript
{
  name: "Anime Title",
  genre: "action",                    // String: genre category
  mood: "exciting",                   // String: emotional tone
  audioLanguage: "both",              // String: sub, dub, or both
  rating: "teen",                     // String: kids, teen, mature
  completionStatus: "completed",      // String: completed, ongoing, hiatus, cancelled
  episodeCount: 24,                   // Number: total episodes
  episodeLengthMinutes: 24,          // Number: typical episode length
  userRating: 5                       // Number: 1-5 stars (Olivia's rating)
}
```

### Property Values

**genre** (12 options):
- action
- romance
- comedy
- horror
- slice-of-life
- fantasy
- sci-fi
- thriller
- sports
- mecha
- isekai
- supernatural

**mood** (7 options):
- lighthearted
- dark
- emotional
- exciting
- relaxing
- intense
- uplifting

**audioLanguage** (3 options):
- sub (Japanese audio with subtitles)
- dub (English dubbed audio)
- both (available in both formats)

**rating** (3 options):
- kids (appropriate for children)
- teen (suitable for teenagers)
- mature (adult content/themes)

**completionStatus** (4 options):
- completed (series finished)
- ongoing (still airing)
- hiatus (temporarily paused)
- cancelled (ended prematurely)

**episodeCount**: Number (examples: 12, 24, 50, 100+)

**episodeLengthMinutes**: Number (examples: 20, 24, 45)

**userRating**: Number 1-5 (Olivia's personal rating)

---

## Form Fields

The preference form should have these dropdowns:

1. **Genre** - "What genre are you in the mood for?"
   - Options: Any genre, action, romance, comedy, horror, slice-of-life, fantasy, sci-fi, thriller, sports, mecha, isekai, supernatural
   - Add genre emojis in options (⚔️ for action, 💗 for romance, etc.)

2. **Mood** - "What's your mood right now?"
   - Options: Any mood, lighthearted, dark, emotional, exciting, relaxing, intense, uplifting

3. **Audio Language** - "Sub or dub?"
   - Options: Any, sub, dub, both available

4. **Age Rating** - "What rating level?"
   - Options: Any rating, kids, teen, mature

5. **Completion Status** - "Do you prefer completed series?"
   - Options: Any status, completed, ongoing, hiatus, cancelled

6. **Maximum Episodes** - "How long of a series?"
   - Options: Any length, Short (1-12 episodes), Medium (13-26 episodes), Long (27-50 episodes), Very long (50+ episodes)
   - This filters by episodeCount

7. **Episode Length** - "How long are the episodes?"
   - Options: Any length, Short (≤20 min), Standard (21-25 min), Long (26+ min)
   - This filters by episodeLengthMinutes

8. **Minimum Rating** - "Show me only highly-rated anime?"
   - Options: Any rating, 3+ stars, 4+ stars, 5 stars only
   - This filters by userRating

### Additional Filter Concept (Optional for future)
Note: "Previously watched" and "My watchlist" are not properties in the data. These could be added as form checkboxes that say "Show only unwatched" or "Show only from my watchlist" - but the filtering logic would need real user data. For this assignment, these can be skipped or left as placeholder form elements that don't affect results yet.

---

## Dataset (45 Anime)

```javascript
const data = {
  domain: "Anime",
  description: "Find the perfect anime based on genre, mood, language preference, and viewing time",
  options: [
    // ACTION ANIME
    {
      name: "Demon Slayer",
      genre: "action",
      mood: "intense",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "ongoing",
      episodeCount: 55,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "My Hero Academia",
      genre: "action",
      mood: "exciting",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "ongoing",
      episodeCount: 138,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Attack on Titan",
      genre: "action",
      mood: "dark",
      audioLanguage: "both",
      rating: "mature",
      completionStatus: "completed",
      episodeCount: 87,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "One Punch Man",
      genre: "action",
      mood: "lighthearted",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "ongoing",
      episodeCount: 24,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Jujutsu Kaisen",
      genre: "action",
      mood: "exciting",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "ongoing",
      episodeCount: 47,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Fullmetal Alchemist: Brotherhood",
      genre: "action",
      mood: "emotional",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 64,
      episodeLengthMinutes: 24,
      userRating: 5
    },

    // ROMANCE ANIME
    {
      name: "Your Name",
      genre: "romance",
      mood: "emotional",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 1,
      episodeLengthMinutes: 107,
      userRating: 5
    },
    {
      name: "Toradora!",
      genre: "romance",
      mood: "lighthearted",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 25,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Horimiya",
      genre: "romance",
      mood: "uplifting",
      audioLanguage: "sub",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 13,
      episodeLengthMinutes: 24,
      userRating: 4
    },
    {
      name: "Kaguya-sama: Love is War",
      genre: "romance",
      mood: "lighthearted",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 37,
      episodeLengthMinutes: 24,
      userRating: 5
    },

    // COMEDY ANIME
    {
      name: "Spy x Family",
      genre: "comedy",
      mood: "lighthearted",
      audioLanguage: "both",
      rating: "kids",
      completionStatus: "ongoing",
      episodeCount: 37,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "The Disastrous Life of Saiki K.",
      genre: "comedy",
      mood: "lighthearted",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 120,
      episodeLengthMinutes: 5,
      userRating: 5
    },
    {
      name: "Ouran High School Host Club",
      genre: "comedy",
      mood: "lighthearted",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 26,
      episodeLengthMinutes: 24,
      userRating: 4
    },
    {
      name: "Gintama",
      genre: "comedy",
      mood: "exciting",
      audioLanguage: "sub",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 367,
      episodeLengthMinutes: 24,
      userRating: 5
    },

    // HORROR ANIME
    {
      name: "Another",
      genre: "horror",
      mood: "dark",
      audioLanguage: "both",
      rating: "mature",
      completionStatus: "completed",
      episodeCount: 12,
      episodeLengthMinutes: 24,
      userRating: 4
    },
    {
      name: "Parasyte",
      genre: "horror",
      mood: "intense",
      audioLanguage: "both",
      rating: "mature",
      completionStatus: "completed",
      episodeCount: 24,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Tokyo Ghoul",
      genre: "horror",
      mood: "dark",
      audioLanguage: "both",
      rating: "mature",
      completionStatus: "completed",
      episodeCount: 48,
      episodeLengthMinutes: 24,
      userRating: 4
    },

    // SLICE-OF-LIFE ANIME
    {
      name: "March Comes in Like a Lion",
      genre: "slice-of-life",
      mood: "emotional",
      audioLanguage: "sub",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 44,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Non Non Biyori",
      genre: "slice-of-life",
      mood: "relaxing",
      audioLanguage: "sub",
      rating: "kids",
      completionStatus: "completed",
      episodeCount: 36,
      episodeLengthMinutes: 24,
      userRating: 4
    },
    {
      name: "Barakamon",
      genre: "slice-of-life",
      mood: "uplifting",
      audioLanguage: "both",
      rating: "kids",
      completionStatus: "completed",
      episodeCount: 12,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "K-On!",
      genre: "slice-of-life",
      mood: "lighthearted",
      audioLanguage: "both",
      rating: "kids",
      completionStatus: "completed",
      episodeCount: 41,
      episodeLengthMinutes: 24,
      userRating: 4
    },

    // FANTASY ANIME
    {
      name: "Spirited Away",
      genre: "fantasy",
      mood: "uplifting",
      audioLanguage: "both",
      rating: "kids",
      completionStatus: "completed",
      episodeCount: 1,
      episodeLengthMinutes: 125,
      userRating: 5
    },
    {
      name: "Frieren: Beyond Journey's End",
      genre: "fantasy",
      mood: "emotional",
      audioLanguage: "sub",
      rating: "teen",
      completionStatus: "ongoing",
      episodeCount: 28,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Fairy Tail",
      genre: "fantasy",
      mood: "exciting",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 328,
      episodeLengthMinutes: 24,
      userRating: 4
    },
    {
      name: "Magi: The Labyrinth of Magic",
      genre: "fantasy",
      mood: "exciting",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 50,
      episodeLengthMinutes: 24,
      userRating: 4
    },

    // SCI-FI ANIME
    {
      name: "Steins;Gate",
      genre: "sci-fi",
      mood: "intense",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 24,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Cowboy Bebop",
      genre: "sci-fi",
      mood: "relaxing",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 26,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Psycho-Pass",
      genre: "sci-fi",
      mood: "dark",
      audioLanguage: "both",
      rating: "mature",
      completionStatus: "completed",
      episodeCount: 41,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Dr. Stone",
      genre: "sci-fi",
      mood: "exciting",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "ongoing",
      episodeCount: 58,
      episodeLengthMinutes: 24,
      userRating: 5
    },

    // THRILLER ANIME
    {
      name: "Death Note",
      genre: "thriller",
      mood: "intense",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 37,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Monster",
      genre: "thriller",
      mood: "dark",
      audioLanguage: "sub",
      rating: "mature",
      completionStatus: "completed",
      episodeCount: 74,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Erased",
      genre: "thriller",
      mood: "emotional",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 12,
      episodeLengthMinutes: 24,
      userRating: 4
    },

    // SPORTS ANIME
    {
      name: "Haikyuu!!",
      genre: "sports",
      mood: "exciting",
      audioLanguage: "both",
      rating: "kids",
      completionStatus: "completed",
      episodeCount: 85,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Kuroko's Basketball",
      genre: "sports",
      mood: "exciting",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 75,
      episodeLengthMinutes: 24,
      userRating: 4
    },
    {
      name: "Run with the Wind",
      genre: "sports",
      mood: "uplifting",
      audioLanguage: "sub",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 23,
      episodeLengthMinutes: 24,
      userRating: 5
    },

    // MECHA ANIME
    {
      name: "Neon Genesis Evangelion",
      genre: "mecha",
      mood: "dark",
      audioLanguage: "both",
      rating: "mature",
      completionStatus: "completed",
      episodeCount: 26,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Code Geass",
      genre: "mecha",
      mood: "intense",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 50,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Gurren Lagann",
      genre: "mecha",
      mood: "exciting",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 27,
      episodeLengthMinutes: 24,
      userRating: 5
    },

    // ISEKAI ANIME
    {
      name: "Re:Zero",
      genre: "isekai",
      mood: "dark",
      audioLanguage: "both",
      rating: "mature",
      completionStatus: "ongoing",
      episodeCount: 50,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Konosuba",
      genre: "isekai",
      mood: "lighthearted",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 20,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "That Time I Got Reincarnated as a Slime",
      genre: "isekai",
      mood: "uplifting",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "ongoing",
      episodeCount: 72,
      episodeLengthMinutes: 24,
      userRating: 4
    },
    {
      name: "Sword Art Online",
      genre: "isekai",
      mood: "exciting",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "ongoing",
      episodeCount: 96,
      episodeLengthMinutes: 24,
      userRating: 4
    },

    // SUPERNATURAL ANIME
    {
      name: "Mob Psycho 100",
      genre: "supernatural",
      mood: "uplifting",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 37,
      episodeLengthMinutes: 24,
      userRating: 5
    },
    {
      name: "Noragami",
      genre: "supernatural",
      mood: "exciting",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "hiatus",
      episodeCount: 25,
      episodeLengthMinutes: 24,
      userRating: 4
    },
    {
      name: "The Promised Neverland",
      genre: "supernatural",
      mood: "intense",
      audioLanguage: "both",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 23,
      episodeLengthMinutes: 24,
      userRating: 4
    },
    {
      name: "Mushishi",
      genre: "supernatural",
      mood: "relaxing",
      audioLanguage: "sub",
      rating: "teen",
      completionStatus: "completed",
      episodeCount: 46,
      episodeLengthMinutes: 24,
      userRating: 5
    }
  ]
};
```

---

## Matching Functions

Create these matching functions in `matching.js`:

### Single Criteria Matches

```javascript
/**
 * Checks if an anime matches the desired genre
 */
function matchesGenre(anime, desiredGenre) {
  if (!desiredGenre) return true;
  return anime.genre === desiredGenre;
}

/**
 * Checks if an anime matches the desired mood
 */
function matchesMood(anime, desiredMood) {
  if (!desiredMood) return true;
  return anime.mood === desiredMood;
}

/**
 * Checks if an anime has the desired audio language option
 */
function matchesAudioLanguage(anime, desiredLanguage) {
  if (!desiredLanguage) return true;
  // "both" matches any preference
  if (anime.audioLanguage === "both") return true;
  return anime.audioLanguage === desiredLanguage;
}

/**
 * Checks if an anime matches the desired age rating
 */
function matchesRating(anime, desiredRating) {
  if (!desiredRating) return true;
  return anime.rating === desiredRating;
}

/**
 * Checks if an anime matches the desired completion status
 */
function matchesCompletionStatus(anime, desiredStatus) {
  if (!desiredStatus) return true;
  return anime.completionStatus === desiredStatus;
}
```

### Range/Numeric Matches

```javascript
/**
 * Checks if an anime's episode count fits the user's preference
 */
function fitsEpisodeCountPreference(anime, maxEpisodes) {
  if (!maxEpisodes) return true;
  return anime.episodeCount <= maxEpisodes;
}

/**
 * Checks if an anime's episode length fits the user's preference
 */
function fitsEpisodeLengthPreference(anime, maxLength) {
  if (!maxLength) return true;
  return anime.episodeLengthMinutes <= maxLength;
}

/**
 * Checks if an anime meets the minimum rating requirement
 */
function meetsMinimumRating(anime, minRating) {
  if (!minRating) return true;
  return anime.userRating >= minRating;
}
```

### Combined Match

```javascript
/**
 * Checks if an anime matches ALL user preferences
 */
function meetsAllCriteria(anime, preferences) {
  return (
    matchesGenre(anime, preferences.genre) &&
    matchesMood(anime, preferences.mood) &&
    matchesAudioLanguage(anime, preferences.audioLanguage) &&
    matchesRating(anime, preferences.rating) &&
    matchesCompletionStatus(anime, preferences.completionStatus) &&
    fitsEpisodeCountPreference(anime, preferences.maxEpisodes) &&
    fitsEpisodeLengthPreference(anime, preferences.maxEpisodeLength) &&
    meetsMinimumRating(anime, preferences.minUserRating)
  );
}
```

### Helper Functions

```javascript
/**
 * Returns an emoji based on the anime genre
 */
function getGenreEmoji(genre) {
  const emojis = {
    action: "⚔️",
    romance: "💗",
    comedy: "😂",
    horror: "👻",
    "slice-of-life": "🏡",
    fantasy: "🐉",
    "sci-fi": "🚀",
    thriller: "🔪",
    sports: "⚽",
    mecha: "🤖",
    isekai: "🌀",
    supernatural: "✨"
  };
  return emojis[genre] || "📺";
}

/**
 * Returns a description message based on anime properties
 */
function getAnimeDescription(anime) {
  if (anime.episodeCount === 1) {
    return "Perfect movie-length experience!";
  } else if (anime.episodeCount <= 12) {
    return "Quick binge - perfect for a weekend!";
  } else if (anime.episodeCount <= 26) {
    return "Short series with a complete story!";
  } else if (anime.episodeCount <= 50) {
    return "Medium-length series with depth!";
  } else {
    return "Epic long-running series - lots to enjoy!";
  }
}

/**
 * Formats episode count for display
 */
function formatEpisodeCount(count) {
  if (count === 1) return "Movie";
  return `${count} episodes`;
}
```

---

## Application Logic (app.js)

### Form Submission Handler

```javascript
form.addEventListener("submit", function(event) {
  event.preventDefault();
  
  // Get all form values
  const preferences = {
    genre: document.getElementById("genre").value,
    mood: document.getElementById("mood").value,
    audioLanguage: document.getElementById("audio-language").value,
    rating: document.getElementById("rating").value,
    completionStatus: document.getElementById("completion-status").value,
    maxEpisodes: document.getElementById("max-episodes").value,
    maxEpisodeLength: document.getElementById("max-episode-length").value,
    minUserRating: document.getElementById("min-rating").value
  };
  
  // Convert numeric strings to numbers
  if (preferences.maxEpisodes) {
    preferences.maxEpisodes = Number(preferences.maxEpisodes);
  }
  if (preferences.maxEpisodeLength) {
    preferences.maxEpisodeLength = Number(preferences.maxEpisodeLength);
  }
  if (preferences.minUserRating) {
    preferences.minUserRating = Number(preferences.minUserRating);
  }
  
  // Find and display matches
  const recommendations = findRecommendations(preferences);
  displayRecommendations(recommendations, preferences);
});
```

### Finding Recommendations

```javascript
function findRecommendations(preferences) {
  const matches = [];
  
  for (let i = 0; i < data.options.length; i++) {
    const anime = data.options[i];
    if (meetsAllCriteria(anime, preferences)) {
      matches.push(anime);
    }
  }
  
  // Sort by rating (5 stars first), then alphabetically
  matches.sort((a, b) => {
    if (a.userRating !== b.userRating) {
      return b.userRating - a.userRating;
    }
    return a.name.localeCompare(b.name);
  });
  
  return matches;
}
```

### Display Results

```javascript
function displayRecommendations(recommendations, preferences) {
  const resultsList = document.getElementById("recommendation-list");
  resultsList.innerHTML = "";
  
  if (recommendations.length === 0) {
    resultsList.innerHTML = '<p class="no-results">No anime match your preferences. Try adjusting your filters! 📺</p>';
    return;
  }
  
  // Show count
  const countMessage = document.createElement("p");
  countMessage.className = "match-count";
  countMessage.textContent = `Found ${recommendations.length} anime for you!`;
  resultsList.appendChild(countMessage);
  
  // Create cards for each anime
  for (let i = 0; i < recommendations.length; i++) {
    const anime = recommendations[i];
    const card = createAnimeCard(anime);
    resultsList.appendChild(card);
  }
}

function createAnimeCard(anime) {
  const card = document.createElement("div");
  card.className = "recommendation-card";
  
  const genreEmoji = getGenreEmoji(anime.genre);
  const description = getAnimeDescription(anime);
  const episodeDisplay = formatEpisodeCount(anime.episodeCount);
  const stars = "⭐".repeat(anime.userRating);
  
  card.innerHTML = `
    <h3>${genreEmoji} ${anime.name}</h3>
    <p><strong>Genre:</strong> ${anime.genre}</p>
    <p><strong>Mood:</strong> ${anime.mood}</p>
    <p><strong>Audio:</strong> ${anime.audioLanguage}</p>
    <p><strong>Rating:</strong> ${anime.rating}</p>
    <p><strong>Status:</strong> ${anime.completionStatus}</p>
    <p><strong>Length:</strong> ${episodeDisplay} (${anime.episodeLengthMinutes} min each)</p>
    <p><strong>My Rating:</strong> ${stars} (${anime.userRating}/5)</p>
    <p class="description">${description}</p>
  `;
  
  return card;
}
```

---

## Personal Voice & Comments

Use Olivia's voice in code comments:

- First-person perspective: "I learned...", "This was confusing at first..."
- Enthusiastic about discoveries: "This was my breakthrough moment!"
- References to learning: "Prof. Teeters reminded me..."
- Honest about mistakes: "I made the mistake of..."
- Helpful explanations for future self

Example comments:

```javascript
// I learned the hard way that form values are ALWAYS strings!
// Even if the user picks "5" from a dropdown, it comes back as "5" (string) not 5 (number)
// Prof. Teeters reminded me: "A string '5' is not equal to the number 5"

// This was my breakthrough moment! Using && means ALL conditions must be true
// It's like a gatekeeper that says "you can only pass if you meet EVERY requirement"

// I made the mistake of forgetting to handle empty strings at first
// An empty string "" is falsy, but I needed to explicitly check for it!
```

---

## Button Text & UI Copy

- Submit button: **"Find My Anime!"**
- Reset button: **"Clear All Filters"**
- Placeholder text when no results: **"Choose your preferences and click 'Find My Anime!' to discover your next obsession! 🎌"**
- No matches message: **"No anime match your preferences. Try adjusting your filters! 📺"**
- Results count: **"Found {count} anime for you!"** (or "Found 1 anime for you!" if singular)

---

## Technical Requirements

1. **HTML Structure**
   - Semantic HTML5 elements
   - Form with 8 dropdown fields
   - Results section that dynamically updates
   - All form fields have proper `<label>` elements
   - Include emojis in labels and results for visual interest

2. **CSS Styling**
   - Use CSS custom properties (variables) for colors
   - Red-to-orange gradient theme
   - Responsive card layout
   - Hover effects on cards and buttons
   - Clean typography with good readability
   - Mobile-friendly (works on small screens)

3. **JavaScript Organization**
   - Three separate files: `data.js`, `matching.js`, `app.js`
   - All functions have JSDoc comments
   - Use `const` and `let` (never `var`)
   - Meaningful variable names
   - Handle empty/falsy form values properly

4. **Code Quality**
   - Add Olivia's personal comments throughout
   - Use strict equality (`===`)
   - Prevent form submission page reload with `preventDefault()`
   - Sort results by rating and name
   - Format numbers and text for display nicely

---

## Deployment

Deploy to Netlify with:
- Repository connected to GitHub
- Automatic deploys from main branch
- Clean URL (no `/index.html` in the address)

---

## Success Criteria

The site should:
- ✅ Load with a red-orange gradient theme
- ✅ Display 45 diverse anime in the dataset
- ✅ Have 8 working filter dropdowns
- ✅ Show matching anime when "Find My Anime!" is clicked
- ✅ Display results as styled cards with all anime info
- ✅ Handle "no matches" gracefully
- ✅ Sort results by rating (5 stars first)
- ✅ Work on mobile devices
- ✅ Include Olivia's personal voice in code comments
- ✅ Use proper JSDoc for all functions

---

## Notes

This is Olivia's **second** "What Should I...?" project. The first was about game recommendations. This version demonstrates growth by:
- Choosing a new domain (anime instead of games)
- More complex filtering (8 criteria instead of 5)
- Larger dataset (45 anime vs. 30 games)
- Custom color scheme (red-orange gradient)
- Personal branding ("Olivia's Anime Finder")
- Thoughtful matching logic (audioLanguage "both" matches any preference)

The code should feel like **Olivia's work** - not generic, but reflecting her learning journey and personality.
