/**
 * app.js — DOM wiring for Olivia's Anime Finder
 *
 * This file handles ALL the DOM stuff - getting form values, creating HTML elements,
 * and updating the page. The logic for filtering anime lives in matching.js!
 *
 * I learned: separating DOM code from logic makes everything clearer.
 * Prof. Teeters said: "If it touches the DOM, it lives here. If it's logic, it lives in matching.js."
 */

// Import the functions I need (no more static data!)
import { meetsAllCriteria } from './matching.js';
import { showResults, showNoResults, showDetail } from './views.js';

// Get the form and results container
const form = document.querySelector('#anime-form');
const resultsList = document.querySelector('#recommendation-list');

// Store the last search results so we can restore them when user clicks back
// I learned: Module-level variables persist across function calls!
let lastResults = [];

// Store the full dataset from the API
// I need this for the detail view - when user clicks a card, I look up the full anime object
let animeDataset = [];

/**
 * Fetches anime data from the serverless function
 * This was my first real async function! It feels like magic.
 *
 * What this does:
 * 1. Calls fetch() to request data from the serverless function
 * 2. Waits for the response (that's what await does!)
 * 3. Checks if the response was successful (response.ok)
 * 4. Parses the JSON body (another await!)
 * 5. Returns the data object
 *
 * I learned: Both the fetch AND the .json() call need await because they're both async!
 * I learned: fetch doesn't throw errors for 404/500, so I have to check response.ok myself!
 *
 * @returns {Promise<Object>} The anime data object with an options array
 * @throws {Error} If the fetch fails or returns a bad status
 */
async function fetchAnimeData() {
  // This is the path to my serverless function
  // Netlify automatically routes /.netlify/functions/api to netlify/functions/api.mjs
  const response = await fetch('/.netlify/functions/api');

  // Check if the response was successful
  // I learned: fetch returns response.ok = false for 404, 500, etc.
  // It only throws an error for network failures (no internet, server unreachable)
  if (!response.ok) {
    throw new Error(`Failed to fetch anime data: ${response.status}`);
  }

  // Parse the JSON response body
  // I learned: .json() is also async because parsing can take time for large data!
  const data = await response.json();
  return data;
}

/**
 * Handles form submission - the main event!
 * This runs when the user clicks "Find My Anime!"
 *
 * What this does:
 * 1. Prevents the default form submission (which would reload the page)
 * 2. Shows a loading message while fetching data
 * 3. Fetches live anime data from the serverless function
 * 4. Gathers all form values from the 8 select dropdowns
 * 5. Converts string numbers to actual numbers (form values are always strings!)
 * 6. Filters the anime dataset to find matches
 * 7. Displays the results using view functions
 *
 * I learned: This is the heart of the app - it connects user input to filtered results!
 * I learned: async functions let me use await to pause until data arrives!
 */
async function handleFormSubmit(event) {
  // This was confusing at first! preventDefault stops the page from reloading
  // Without it, the form would submit and refresh the whole page
  event.preventDefault();

  // Show loading message while fetching
  // I learned: Users need feedback! Without this, they think the app is broken.
  resultsList.textContent = 'Loading top anime from MyAnimeList...';

  // Fetch the anime data from the serverless function
  // I learned: try/catch is REQUIRED for async operations - network can fail!
  try {
    const data = await fetchAnimeData();
    // Store it globally so handleResultsClick can find anime by name
    animeDataset = data.options;

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
    // I learned: Now I pass the data as a parameter instead of using a global!
    const recommendations = findRecommendations(preferences, data.options);
    displayRecommendations(recommendations);
  } catch (error) {
    // If fetch fails, show error in the DOM
    // I learned: console.error is good for debugging, but users can't see the console!
    console.error('Error fetching anime data:', error);
    resultsList.textContent =
      'Failed to load anime data. Please check your internet connection and try again.';
  }
}

// Wire up the form submit event
// I learned: Named functions are better than anonymous functions for event handlers!
form.addEventListener('submit', handleFormSubmit);

/**
 * Finds all anime that match the user's preferences
 * @param {Object} preferences - User's selected preferences from the form
 * @param {Array} dataset - The anime dataset to search (passed from the fetched data)
 * @returns {Array} - Array of anime objects that match ALL criteria
 *
 * I learned: Instead of using a global variable, I pass the data as a parameter.
 * This makes the function more flexible and testable!
 */
function findRecommendations(preferences, dataset) {
  const matches = [];

  // Check every anime in the dataset
  for (const anime of dataset) {
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
 * Handles clicks on recommendation cards AND the back button
 * Uses event delegation - one listener handles both types of clicks!
 *
 * I learned: Event delegation is more efficient than adding listeners to every card.
 * The click bubbles up from the card to the container, and we can catch it there.
 */
function handleResultsClick(event) {
  // Check if the click was on the back button first
  if (event.target.id === 'back-to-results') {
    // Restore the last results
    // I learned: lastResults persists because it's a module-level variable!
    if (lastResults.length > 0) {
      showResults(lastResults, resultsList);
    }
    return;
  }

  // Otherwise, check if it was on a recommendation card
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
  // I learned: Now I use animeDataset instead of data.options!
  const anime = animeDataset.find((item) => item.name === animeName);

  // If we found it, show the detail view
  if (anime) {
    showDetail(anime, resultsList);
  }
}

// Add ONE event delegation listener to the results container
// I learned: One listener handles both card clicks AND back button clicks!
resultsList.addEventListener('click', handleResultsClick);

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
    // Clear the container
    resultsList.textContent = '';

    // Create the placeholder message using safe DOM methods
    const placeholder = document.createElement('p');
    placeholder.className = 'placeholder';
    placeholder.textContent =
      'Choose your preferences and click "Find My Anime!" to discover your next obsession! 🎌';
    resultsList.append(placeholder);

    // Clear the stored results too
    lastResults = [];
  }, 0);
}

// Wire up the reset event
form.addEventListener('reset', handleFormReset);
