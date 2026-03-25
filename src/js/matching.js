/**
 * matching.js — All the filtering logic for anime recommendations
 *
 * This file has ZERO DOM code! It's all pure logic functions.
 * I learned this separation makes testing way easier - I can test these functions
 * without needing an HTML page at all!
 *
 * These functions answer questions like:
 * - Does this anime match the user's genre preference?
 * - Is this anime's episode count within the user's limit?
 * - Does this anime meet ALL the user's criteria?
 */

// ===================
// SINGLE CRITERIA MATCHES
// ===================

/**
 * Checks if an anime matches the desired genre
 * @param {Object} anime - The anime object to check
 * @param {string} desiredGenre - The genre the user wants (or empty string for any)
 * @returns {boolean} - True if matches or no preference specified
 */
function matchesGenre(anime, desiredGenre) {
  // Empty string means "any genre is fine"
  if (!desiredGenre) return true;
  return anime.genre === desiredGenre;
}

/**
 * Checks if an anime matches the desired mood
 * @param {Object} anime - The anime object to check
 * @param {string} desiredMood - The mood the user wants (or empty string for any)
 * @returns {boolean} - True if matches or no preference specified
 */
function matchesMood(anime, desiredMood) {
  if (!desiredMood) return true;
  return anime.mood === desiredMood;
}

/**
 * Checks if an anime has the desired audio language option
 * This was confusing at first! If an anime has "both", it should match any preference.
 * @param {Object} anime - The anime object to check
 * @param {string} desiredLanguage - The audio preference (sub, dub, or empty for any)
 * @returns {boolean} - True if matches or no preference specified
 */
function matchesAudioLanguage(anime, desiredLanguage) {
  if (!desiredLanguage) return true;
  // This was my breakthrough! If the anime has "both", it matches ANY language preference
  // So someone who wants "sub" will still see anime marked as "both"
  if (anime.audioLanguage === 'both') return true;
  return anime.audioLanguage === desiredLanguage;
}

/**
 * Checks if an anime matches the desired age rating
 * @param {Object} anime - The anime object to check
 * @param {string} desiredRating - The rating preference (kids, teen, mature, or empty for any)
 * @returns {boolean} - True if matches or no preference specified
 */
function matchesRating(anime, desiredRating) {
  if (!desiredRating) return true;
  return anime.rating === desiredRating;
}

/**
 * Checks if an anime matches the desired completion status
 * @param {Object} anime - The anime object to check
 * @param {string} desiredStatus - The status preference (completed, ongoing, hiatus, cancelled, or empty for any)
 * @returns {boolean} - True if matches or no preference specified
 */
function matchesCompletionStatus(anime, desiredStatus) {
  if (!desiredStatus) return true;
  return anime.completionStatus === desiredStatus;
}

// ===================
// RANGE/NUMERIC MATCHES
// ===================

/**
 * Checks if an anime's episode count fits the user's preference
 * I learned the hard way: form values come as strings! So I need to convert to numbers.
 * @param {Object} anime - The anime object to check
 * @param {number} maxEpisodes - Maximum episode count user wants (or 0/null/undefined for any)
 * @returns {boolean} - True if within limit or no preference specified
 */
function fitsEpisodeCountPreference(anime, maxEpisodes) {
  // No preference means any episode count is fine
  if (!maxEpisodes) return true;
  // Less than or equal - so if user wants max 26 episodes, a 24-episode anime is fine!
  return anime.episodeCount <= maxEpisodes;
}

/**
 * Checks if an anime's episode length fits the user's preference
 * @param {Object} anime - The anime object to check
 * @param {number} maxLength - Maximum episode length in minutes (or 0/null/undefined for any)
 * @returns {boolean} - True if within limit or no preference specified
 */
function fitsEpisodeLengthPreference(anime, maxLength) {
  if (!maxLength) return true;
  return anime.episodeLengthMinutes <= maxLength;
}

/**
 * Checks if an anime meets the minimum rating requirement
 * @param {Object} anime - The anime object to check
 * @param {number} minRating - Minimum user rating (1-5, or 0/null/undefined for any)
 * @returns {boolean} - True if meets minimum or no preference specified
 */
function meetsMinimumRating(anime, minRating) {
  if (!minRating) return true;
  // Greater than or equal - so if user wants 4+ stars, a 5-star anime passes!
  return anime.userRating >= minRating;
}

// ===================
// COMBINED MATCH
// ===================

/**
 * Checks if an anime matches ALL user preferences
 * This is the gatekeeper! Using && means ALL conditions must be true.
 * Prof. Teeters reminded me: "A single false breaks the whole chain"
 * @param {Object} anime - The anime object to check
 * @param {Object} preferences - Object containing all user preferences
 * @returns {boolean} - True only if anime passes EVERY single test
 */
function meetsAllCriteria(anime, preferences) {
  // This was my breakthrough moment! Every anime has to pass every single check
  // If even ONE of these returns false, the whole thing is false
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

// ===================
// HELPER FUNCTIONS
// ===================

/**
 * Returns an emoji based on the anime genre
 * This makes the results look way more fun!
 * @param {string} genre - The genre of the anime
 * @returns {string} - An emoji representing that genre
 */
function getGenreEmoji(genre) {
  // I made this mistake at first: I forgot to handle genres with hyphens!
  const emojis = {
    action: '⚔️',
    romance: '💗',
    comedy: '😂',
    horror: '👻',
    'slice-of-life': '🏡',
    fantasy: '🐉',
    'sci-fi': '🚀',
    thriller: '🔪',
    sports: '⚽',
    mecha: '🤖',
    isekai: '🌀',
    supernatural: '✨',
  };
  // Default emoji if genre isn't found (shouldn't happen, but safety first!)
  return emojis[genre] || '📺';
}

/**
 * Returns a description message based on anime properties
 * I wanted users to know if something is a quick binge or long commitment!
 * @param {Object} anime - The anime object
 * @returns {string} - A friendly description of the series length
 */
function getAnimeDescription(anime) {
  // Special case for movies!
  if (anime.episodeCount === 1) {
    return 'Perfect movie-length experience!';
  } else if (anime.episodeCount <= 12) {
    return 'Quick binge - perfect for a weekend!';
  } else if (anime.episodeCount <= 26) {
    return 'Short series with a complete story!';
  } else if (anime.episodeCount <= 50) {
    return 'Medium-length series with depth!';
  } else {
    return 'Epic long-running series - lots to enjoy!';
  }
}

/**
 * Formats episode count for display
 * Makes "1 episode" say "Movie" instead - looks cleaner!
 * @param {number} count - Number of episodes
 * @returns {string} - Formatted string for display
 */
function formatEpisodeCount(count) {
  if (count === 1) return 'Movie';
  return `${count} episodes`;
}

// Export all functions so app.js can use them!
// I learned: you can export multiple things from one file
export {
  matchesGenre,
  matchesMood,
  matchesAudioLanguage,
  matchesRating,
  matchesCompletionStatus,
  fitsEpisodeCountPreference,
  fitsEpisodeLengthPreference,
  meetsMinimumRating,
  meetsAllCriteria,
  getGenreEmoji,
  getAnimeDescription,
  formatEpisodeCount,
};
