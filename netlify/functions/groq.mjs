/**
 * Groq AI serverless function for Olivia's Anime Finder
 *
 * This function handles TWO patterns:
 * - Pattern A: Translate natural language input into filter criteria
 * - Pattern B: Narrate anime results with personalized introductions
 *
 * I learned: Groq is FAST because it runs on custom LPU hardware!
 * Also learned: Always implement a moderation floor to keep AI safe and reliable.
 */

// Maximum input length (moderation floor requirement #3)
const MAX_INPUT_LENGTH = 500;

/**
 * Pattern A: Translate user's natural language into anime filter criteria
 *
 * Example: "something chill to watch before bed"
 *   → { genre: "slice-of-life", mood: "relaxing", maxEpisodeLength: 25 }
 */
async function translateInput(userInput) {
  // Input length cap (moderation floor #3)
  if (userInput.length > MAX_INPUT_LENGTH) {
    throw new Error(
      `Input too long. Maximum ${MAX_INPUT_LENGTH} characters allowed.`
    );
  }

  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            // System prompt (moderation floor #1)
            // I learned: The system prompt sets the AI's personality and rules!
            role: 'system',
            content: `You are an anime preference analyzer. Your job is to translate natural language descriptions into structured filter criteria.

Return ONLY valid JSON with these fields (all optional):
- genre: one of [action, romance, comedy, horror, slice-of-life, fantasy, sci-fi, thriller, sports, mecha, isekai, supernatural]
- mood: one of [lighthearted, dark, emotional, exciting, relaxing, intense, uplifting]
- audioLanguage: one of [sub, dub, both]
- rating: one of [kids, teen, mature]
- completionStatus: one of [ongoing, completed, upcoming]
- maxEpisodeLength: number (in minutes)
- minUserRating: number (1-5)

If the user's input is inappropriate, offensive, or not about anime preferences, return:
{ "error": "Please describe the type of anime you're looking for." }

Never include explanations outside the JSON structure.`,
          },
          {
            role: 'user',
            // Delimited user input (moderation floor #4)
            // I learned: Delimiters make it clear where user input starts/ends!
            content: `<user_input>\n${userInput}\n</user_input>`,
          },
        ],
        temperature: 0.3, // Lower = more consistent
        max_completion_tokens: 256,
        // JSON mode (moderation floor #2)
        // I learned: This forces the AI to ONLY return valid JSON!
        response_format: { type: 'json_object' },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Groq API error');
  }

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);

  return result;
}

/**
 * Pattern B: Generate personalized narration for anime results
 *
 * Takes the user's preferences and matched anime, returns a friendly intro
 */
async function narrateResults(preferences, animeMatches) {
  // Build a concise description of the matches (stay under token limit)
  const animeList = animeMatches
    .slice(0, 3)
    .map((anime) => `- ${anime.name} (${anime.genre}, ${anime.mood})`)
    .join('\n');

  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            // System prompt (moderation floor #1)
            role: 'system',
            content: `You are an enthusiastic anime recommendation assistant. Write a short, friendly introduction (2-3 sentences max) explaining why these anime match the user's preferences.

Be warm and encouraging. Reference specific details from their preferences. Keep it conversational and under 100 words.

Never be inappropriate, never recommend outside the provided list, never use asterisks or markdown formatting.`,
          },
          {
            role: 'user',
            // Delimited input (moderation floor #4)
            content: `<preferences>
${JSON.stringify(preferences, null, 2)}
</preferences>

<matched_anime>
${animeList}
</matched_anime>

Write a friendly 2-3 sentence introduction explaining why these anime are perfect for them.`,
          },
        ],
        temperature: 0.7, // Higher = more creative
        max_completion_tokens: 200,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Groq API error');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Main serverless function handler
 *
 * Expects JSON body with:
 * - mode: "translate" (Pattern A) or "narrate" (Pattern B)
 * - For translate: { userInput: "natural language string" }
 * - For narrate: { preferences: {...}, animeMatches: [...] }
 */
export default async (request) => {
  // Only accept POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const body = await request.json();
    const { mode, userInput, preferences, animeMatches } = body;

    // Pattern A: Translate natural language input
    if (mode === 'translate') {
      if (!userInput) {
        return new Response(
          JSON.stringify({ error: 'Missing userInput field' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const filters = await translateInput(userInput);

      return new Response(JSON.stringify({ filters }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Pattern B: Narrate results
    if (mode === 'narrate') {
      if (!preferences || !animeMatches) {
        return new Response(
          JSON.stringify({ error: 'Missing preferences or animeMatches' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const narration = await narrateResults(preferences, animeMatches);

      return new Response(JSON.stringify({ narration }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Invalid mode
    return new Response(
      JSON.stringify({ error: 'Invalid mode. Use "translate" or "narrate"' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    // I learned: Always return proper error responses, not just console.log!
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'The Groq function encountered an error',
      }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
