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
import { showResults, showNoResults } from './views.js';

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
  // I learned: View functions handle the rendering, app.js just coordinates!
  if (recommendations.length === 0) {
    showNoResults(resultsList);
  } else {
    showResults(recommendations, resultsList);
  }
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
