/**
 * Serverless API proxy for Jikan (MyAnimeList) API
 *
 * This function fetches anime data from Jikan and transforms it into
 * the shape my views expect. Run `netlify dev` and visit:
 *   http://localhost:8888/.netlify/functions/api
 *
 * I learned: The serverless function is where data transformation happens.
 * Jikan returns one structure, my views expect another. This function
 * translates between them so my views don't need to know about Jikan.
 */

/**
 * Maps Jikan genres to mood categories
 * I learned: Not all Jikan anime have my "mood" field, so I created a mapping
 * from their genre names to my mood categories.
 */
function mapGenreToMood(genres) {
  if (!genres || genres.length === 0) return 'exciting'; // default

  const genreName = genres[0].name.toLowerCase();

  // Map common genres to moods
  const moodMap = {
    action: 'exciting',
    adventure: 'exciting',
    thriller: 'intense',
    horror: 'dark',
    drama: 'emotional',
    romance: 'emotional',
    comedy: 'lighthearted',
    'slice of life': 'relaxing',
    sports: 'exciting',
    supernatural: 'intense',
    mystery: 'intense',
    fantasy: 'uplifting',
    'sci-fi': 'exciting',
  };

  return moodMap[genreName] || 'exciting';
}

/**
 * Maps Jikan status to my completionStatus format
 */
function mapStatus(status) {
  const statusMap = {
    'Finished Airing': 'completed',
    'Currently Airing': 'ongoing',
    'Not yet aired': 'upcoming',
  };

  return statusMap[status] || 'ongoing';
}

/**
 * Maps Jikan rating to my content rating format
 */
function mapRating(rating) {
  if (!rating) return 'teen';

  if (rating.includes('All Ages') || rating.includes('Children')) return 'kids';
  if (rating.includes('13')) return 'teen';
  if (rating.includes('17+') || rating.includes('Mild Nudity')) return 'mature';

  return 'teen'; // default
}

/**
 * Extracts episode duration in minutes from Jikan's duration string
 * Example: "23 min per ep" → 23
 */
function extractDuration(durationString) {
  if (!durationString) return 24; // default anime episode length

  const match = durationString.match(/(\d+)\s*min/);
  return match ? Number.parseInt(match[1], 10) : 24;
}

/**
 * Converts Jikan score (0-10) to my rating scale (1-5)
 */
function convertScore(score) {
  if (!score) return 3; // default to middle rating

  // Convert 0-10 scale to 1-5 scale
  // 8-10 → 5 stars, 6-7.99 → 4 stars, 4-5.99 → 3 stars, etc.
  if (score >= 8) return 5;
  if (score >= 6) return 4;
  if (score >= 4) return 3;
  if (score >= 2) return 2;
  return 1;
}

export default async () => {
  try {
    // Fetch top anime from Jikan API
    // I learned: Using /top/anime gives us popular, quality anime with good data
    const response = await fetch('https://api.jikan.moe/v4/top/anime?limit=25');

    // I learned: fetch() doesn't throw on 404 or 500 - I have to check response.ok myself!
    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: 'Failed to fetch from Jikan API',
          status: response.status,
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const json = await response.json();

    // Transform Jikan's data into my app's format
    // This was my breakthrough: the serverless function does the translation!
    const transformedData = {
      options: json.data.map((anime) => ({
        // Map Jikan fields to my data.js structure
        name: anime.title_english || anime.title,
        genre:
          anime.genres && anime.genres.length > 0
            ? anime.genres[0].name.toLowerCase()
            : 'action',
        mood: mapGenreToMood(anime.genres),
        audioLanguage: 'both', // Most anime have both sub and dub
        rating: mapRating(anime.rating),
        completionStatus: mapStatus(anime.status),
        episodeCount: anime.episodes || 12, // default to 1 season if unknown
        episodeLengthMinutes: extractDuration(anime.duration),
        userRating: convertScore(anime.score),

        // NEW fields from Jikan that data.js didn't have!
        posterImage: anime.images?.jpg?.image_url || null,
        synopsis: anime.synopsis || 'No description available.',
        malScore: anime.score,
        scoredBy: anime.scored_by,
        malId: anime.mal_id,
      })),
    };

    return new Response(JSON.stringify(transformedData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // I learned: Always return a proper error response, not just console.log
    return new Response(
      JSON.stringify({
        error: error.message,
        details:
          'The serverless function caught an error while fetching or transforming anime data',
      }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
