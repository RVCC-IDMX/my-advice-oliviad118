/**
 * app.js — DOM wiring for Olivia's Anime Finder
 *
 * This file handles ALL the DOM stuff - getting form values, creating HTML elements,
 * and updating the page. The logic for filtering anime lives in matching.js!
 *
 * I learned: separating DOM code from logic makes everything clearer.
 * Prof. Teeters said: "If it touches the DOM, it lives here. If it's logic, it lives in matching.js."
 */

// Import the data and all the functions I need
import { data } from './data.js';
import {
  meetsAllCriteria,
  getGenreEmoji,
  getAnimeDescription,
  formatEpisodeCount,
} from './matching.js';

// Get the form and results container
const form = document.querySelector('#anime-form');
const resultsList = document.querySelector('#recommendation-list');

/**
 * Handles form submission - the main event!
 * This runs when the user clicks "Find My Anime!"
 */
form.addEventListener('submit', function (event) {
  // This was confusing at first! preventDefault stops the page from reloading
  // Without it, the form would submit and refresh the whole page
  event.preventDefault();

  // Get all the form values
  // I learned the hard way that form values are ALWAYS strings!
  // Even if the user picks "5" from a dropdown, it comes back as "5" (string) not 5 (number)
  const preferences = {
    genre: document.querySelector('#genre').value,
    mood: document.querySelector('#mood').value,
    audioLanguage: document.querySelector('#audio-language').value,
    rating: document.querySelector('#rating').value,
    completionStatus: document.querySelector('#completion-status').value,
    maxEpisodes: document.querySelector('#max-episodes').value,
    maxEpisodeLength: document.querySelector('#max-episode-length').value,
    minUserRating: document.querySelector('#min-rating').value,
  };

  // Convert string numbers to actual numbers
  // Prof. Teeters reminded me: "A string '5' is not equal to the number 5"
  if (preferences.maxEpisodes) {
    preferences.maxEpisodes = Number(preferences.maxEpisodes);
  }
  if (preferences.maxEpisodeLength) {
    preferences.maxEpisodeLength = Number(preferences.maxEpisodeLength);
  }
  if (preferences.minUserRating) {
    preferences.minUserRating = Number(preferences.minUserRating);
  }

  // Find matching anime and display them!
  const recommendations = findRecommendations(preferences);
  displayRecommendations(recommendations);
});

/**
 * Finds all anime that match the user's preferences
 * @param {Object} preferences - User's selected preferences from the form
 * @returns {Array} - Array of anime objects that match ALL criteria
 */
function findRecommendations(preferences) {
  const matches = [];

  // Check every anime in the dataset
  for (let i = 0; i < data.options.length; i++) {
    const anime = data.options[i];
    // This is where the magic happens! meetsAllCriteria checks ALL the filters
    if (meetsAllCriteria(anime, preferences)) {
      matches.push(anime);
    }
  }

  // Sort results: 5-star anime first, then alphabetically
  // This was my breakthrough! The sort function compares two items at a time
  matches.sort((a, b) => {
    // First, sort by rating (highest first)
    if (a.userRating !== b.userRating) {
      return b.userRating - a.userRating; // Higher ratings come first
    }
    // If ratings are the same, sort alphabetically by name
    return a.name.localeCompare(b.name);
  });

  return matches;
}

/**
 * Displays the recommendations on the page
 * @param {Array} recommendations - Array of anime objects to display
 */
function displayRecommendations(recommendations) {
  // Clear any previous results
  resultsList.innerHTML = '';

  // Handle the "no results" case
  if (recommendations.length === 0) {
    // Safe: innerHTML with hardcoded string, zero variables, no data insertion
    resultsList.innerHTML =
      '<p class="no-results">No anime match your preferences. Try adjusting your filters! 📺</p>';
    return;
  }

  // Show the count of results
  const countMessage = document.createElement('p');
  countMessage.className = 'match-count';
  // Handle singular vs plural! (1 anime vs 2 anime)
  if (recommendations.length === 1) {
    countMessage.textContent = 'Found 1 anime for you!';
  } else {
    countMessage.textContent = `Found ${recommendations.length} anime for you!`;
  }
  resultsList.appendChild(countMessage);

  // Create a card for each anime
  for (let i = 0; i < recommendations.length; i++) {
    const anime = recommendations[i];
    const card = createAnimeCard(anime);
    resultsList.appendChild(card);
  }

  // Add numbered badges to help users reference specific recommendations
  // I learned: This runs after cards exist in the DOM!
  addCardBadges();
}

/**
 * Creates a card element for a single anime
 * @param {Object} anime - The anime object to display
 * @returns {HTMLElement} - A div element containing the anime's information
 */
function createAnimeCard(anime) {
  const card = document.createElement('div');
  card.className = 'recommendation-card';

  // Get all the display helpers from matching.js
  const genreEmoji = getGenreEmoji(anime.genre);
  const description = getAnimeDescription(anime);
  const episodeDisplay = formatEpisodeCount(anime.episodeCount);
  const stars = '⭐'.repeat(anime.userRating);

  // Build the card content using safe DOM methods
  // I learned: createElement + textContent is safer than innerHTML when displaying data
  // This was my breakthrough moment! Even though my data comes from data.js (not user input),
  // using textContent is the defensive pattern - it never interprets HTML

  // Create the heading with emoji and name
  const heading = document.createElement('h3');
  heading.textContent = `${genreEmoji} ${anime.name}`;
  card.appendChild(heading);

  // Create the details container
  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'anime-details';

  // Helper function to create a detail paragraph
  // This was confusing at first - a function inside a function! But it makes sense:
  // I was repeating the same pattern 7 times, so I made a helper
  function createDetailParagraph(label, value) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = `${label}: `;
    p.appendChild(strong);
    // This part creates a text node for the value
    p.appendChild(document.createTextNode(value));
    return p;
  }

  // Add all the detail paragraphs
  detailsDiv.appendChild(createDetailParagraph('Genre', anime.genre));
  detailsDiv.appendChild(createDetailParagraph('Mood', anime.mood));
  detailsDiv.appendChild(createDetailParagraph('Audio', anime.audioLanguage));
  detailsDiv.appendChild(createDetailParagraph('Rating', anime.rating));
  detailsDiv.appendChild(
    createDetailParagraph('Status', anime.completionStatus)
  );
  detailsDiv.appendChild(
    createDetailParagraph(
      'Length',
      `${episodeDisplay} (${anime.episodeLengthMinutes} min each)`
    )
  );
  detailsDiv.appendChild(
    createDetailParagraph('My Rating', `${stars} (${anime.userRating}/5)`)
  );

  card.appendChild(detailsDiv);

  // Create the description paragraph
  const descriptionP = document.createElement('p');
  descriptionP.className = 'description';
  descriptionP.textContent = description;
  card.appendChild(descriptionP);

  return card;
}

/**
 * Adds numbered badges to all recommendation cards
 * This helps users reference specific recommendations ("I loved #3!")
 * I learned: This function queries the DOM after cards are already created
 */
function addCardBadges() {
  const cards = document.querySelectorAll('.recommendation-card');

  // Add a numbered badge to each card
  // I learned: forEach is perfect here since I need to process every card
  cards.forEach((card, index) => {
    const badge = document.createElement('span');
    badge.textContent = `#${index + 1}`;
    badge.className = 'card-badge';

    // prepend adds it as the FIRST child (before the h3)
    // This was my breakthrough: prepend vs append changes position!
    card.prepend(badge);
  });
}

// I made the mistake of forgetting to handle the reset button at first!
// When the user clicks "Clear All Filters", I want to also clear the results
form.addEventListener('reset', function () {
  // A small delay lets the form reset first, then we clear results
  setTimeout(function () {
    // Safe: innerHTML with hardcoded string, zero variables, no data insertion
    resultsList.innerHTML =
      '<p class="placeholder">Choose your preferences and click "Find My Anime!" to discover your next obsession! 🎌</p>';
  }, 0);
});
