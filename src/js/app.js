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
import { meetsAllCriteria } from './matching.js';
import { showResults, showNoResults, showDetail } from './views.js';

// Get the form and results container
const form = document.querySelector('#anime-form');
const resultsList = document.querySelector('#recommendation-list');

// Store the last search results so we can restore them when user clicks back
// I learned: Module-level variables persist across function calls!
let lastResults = [];

/**
 * Handles form submission - the main event!
 * This runs when the user clicks "Find My Anime!"
 *
 * What this does:
 * 1. Prevents the default form submission (which would reload the page)
 * 2. Gathers all form values from the 8 select dropdowns
 * 3. Converts string numbers to actual numbers (form values are always strings!)
 * 4. Filters the anime dataset to find matches
 * 5. Displays the results using view functions
 *
 * I learned: This is the heart of the app - it connects user input to filtered results!
 */
function handleFormSubmit(event) {
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
}

// Wire up the form submit event
// I learned: Named functions are better than anonymous functions for event handlers!
form.addEventListener('submit', handleFormSubmit);

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
  // Save the results so we can restore them when user clicks back from detail view
  lastResults = recommendations;

  // I learned: View functions handle the rendering, app.js just coordinates!
  if (recommendations.length === 0) {
    showNoResults(resultsList);
  } else {
    showResults(recommendations, resultsList);
  }
}

/**
 * Handles clicks on recommendation cards
 * Uses event delegation - one listener on the container handles all card clicks!
 *
 * I learned: Event delegation is more efficient than adding listeners to every card.
 * The click bubbles up from the card to the container, and we can catch it there.
 */
function handleCardClick(event) {
  // Find the closest .recommendation-card ancestor
  // This works even if the user clicks on text inside the card!
  const card = event.target.closest('.recommendation-card');

  // If the click wasn't on a card, ignore it
  if (!card) return;

  // Get the anime name from the data-name attribute
  // I learned: dataset automatically converts data-name to dataset.name (camelCase!)
  const animeName = card.dataset.name;

  // Find the full anime object by name
  // I learned: .find() is perfect for this - stops at the first match!
  const anime = data.options.find((item) => item.name === animeName);

  // If we found it, show the detail view
  if (anime) {
    showDetail(anime, resultsList);
  }
}

/**
 * Handles clicks on the back button in detail view
 * Restores the last search results
 *
 * I learned: We can check event.target.id to see what was clicked!
 */
function handleBackClick(event) {
  // Only respond to clicks on the back button
  if (event.target.id === 'back-to-results') {
    // Restore the last results
    // I learned: lastResults persists because it's a module-level variable!
    if (lastResults.length > 0) {
      showResults(lastResults, resultsList);
    }
  }
}

// Add event delegation listeners to the results container
// I learned: One listener handles both card clicks AND back button clicks!
resultsList.addEventListener('click', handleCardClick);
resultsList.addEventListener('click', handleBackClick);

// I made the mistake of forgetting to handle the reset button at first!
// When the user clicks "Clear All Filters", I want to also clear the results
/**
 * Handles the form reset button
 * Clears the results and shows the placeholder message
 */
function handleFormReset() {
  // A small delay lets the form reset first, then we clear results
  // I learned: setTimeout with 0ms pushes this to the end of the event queue!
  setTimeout(function () {
    // Safe: innerHTML with hardcoded string, zero variables, no data insertion
    resultsList.innerHTML =
      '<p class="placeholder">Choose your preferences and click "Find My Anime!" to discover your next obsession! 🎌</p>';
    // Clear the stored results too
    lastResults = [];
  }, 0);
}

// Wire up the reset event
form.addEventListener('reset', handleFormReset);
