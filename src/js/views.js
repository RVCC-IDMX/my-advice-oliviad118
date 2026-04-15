/**
 * views.js — View functions for rendering different screens
 *
 * This file contains all the view functions that build and display different "screens"
 * of the app. Each function takes data and a container, then creates the HTML structure.
 *
 * I learned: Separating view code from app logic makes it easier to manage what the user sees!
 * This is the SPA (Single Page App) pattern - multiple views, one HTML file, no page reloads.
 */

// Import helper functions for displaying anime data
import {
  getGenreEmoji,
  getAnimeDescription,
  formatEpisodeCount,
} from './matching.js';

/**
 * Shows a list of results as cards
 * @param {Array} items - Array of anime objects to display
 * @param {HTMLElement} container - The DOM element to render into
 */
function showResults(items, container) {
  // Clear any previous content
  container.textContent = '';

  // Show the count of results
  const countMessage = document.createElement('p');
  countMessage.className = 'match-count';
  // Handle singular vs plural! (1 anime vs 2 anime)
  if (items.length === 1) {
    countMessage.textContent = 'Found 1 anime for you!';
  } else {
    countMessage.textContent = `Found ${items.length} anime for you!`;
  }
  container.append(countMessage);

  // Create a card for each anime
  // I learned: for...of is perfect when I need to iterate through all items
  for (const anime of items) {
    const card = createAnimeCard(anime);
    container.append(card);
  }

  // Add numbered badges to help users reference specific recommendations
  addCardBadges();
}

/**
 * Shows a "no results" message
 * @param {HTMLElement} container - The DOM element to render into
 */
function showNoResults(container) {
  // Clear any previous content
  container.textContent = '';

  // Create and display the no results message
  const message = document.createElement('p');
  message.className = 'no-results';
  message.textContent =
    'No anime match your preferences. Try adjusting your filters! 📺';
  container.append(message);
}

/**
 * Shows a detailed view of a single anime with all its properties
 * @param {Object} item - The anime object to display in detail
 * @param {HTMLElement} container - The DOM element to render into
 */
function showDetail(item, container) {
  // Clear any previous content
  container.textContent = '';

  // Create the detail view container
  const detailView = document.createElement('div');
  detailView.className = 'detail-view';

  // Get display helpers
  const genreEmoji = getGenreEmoji(item.genre);
  const description = getAnimeDescription(item);
  const episodeDisplay = formatEpisodeCount(item.episodeCount);
  const stars = '⭐'.repeat(item.userRating);

  // Create the heading with emoji and name
  const heading = document.createElement('h2');
  heading.textContent = `${genreEmoji} ${item.name}`;
  detailView.append(heading);

  // Add poster image if available
  // I learned: Detail view gets a bigger poster image!
  if (item.posterImage) {
    const poster = document.createElement('img');
    poster.src = item.posterImage;
    poster.alt = `${item.name} poster`;
    poster.className = 'detail-poster';
    detailView.append(poster);
  }

  // Create the description paragraph
  const descriptionP = document.createElement('p');
  descriptionP.className = 'description';
  descriptionP.textContent = description;
  detailView.append(descriptionP);

  // Add synopsis from MyAnimeList if available
  // I learned: The API gives us rich synopsis data we can display!
  if (item.synopsis) {
    const synopsisHeading = document.createElement('h3');
    synopsisHeading.textContent = 'Synopsis';
    detailView.append(synopsisHeading);

    const synopsisP = document.createElement('p');
    synopsisP.className = 'synopsis';
    synopsisP.textContent = item.synopsis;
    detailView.append(synopsisP);
  }

  // Add MyAnimeList score if available
  // I learned: malScore is out of 10, scored by real MAL users!
  if (item.malScore) {
    const scoreP = document.createElement('p');
    scoreP.className = 'mal-score';
    scoreP.textContent = `MyAnimeList Score: ${item.malScore}/10 (rated by ${item.scoredBy?.toLocaleString() || 'many'} users)`;
    detailView.append(scoreP);
  }

  // Create the details container with ALL the properties
  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'anime-details-full';

  // Helper function to create a detail paragraph
  // I learned: A nested helper function keeps code DRY (Don't Repeat Yourself)
  function createDetailParagraph(label, value) {
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = `${label}: `;
    p.append(strong);
    p.append(document.createTextNode(value));
    return p;
  }

  // Add all the detail paragraphs
  detailsDiv.append(createDetailParagraph('Genre', item.genre));
  detailsDiv.append(createDetailParagraph('Mood', item.mood));
  detailsDiv.append(
    createDetailParagraph('Audio Language', item.audioLanguage)
  );
  detailsDiv.append(createDetailParagraph('Content Rating', item.rating));
  detailsDiv.append(createDetailParagraph('Status', item.completionStatus));
  detailsDiv.append(createDetailParagraph('Total Episodes', episodeDisplay));
  detailsDiv.append(
    createDetailParagraph(
      'Episode Length',
      `${item.episodeLengthMinutes} minutes`
    )
  );
  detailsDiv.append(
    createDetailParagraph('My Rating', `${stars} (${item.userRating}/5)`)
  );

  detailView.append(detailsDiv);

  // Create the back button
  // I learned: Setting an id makes it easier to find this button for event handling
  const backButton = document.createElement('button');
  backButton.textContent = '← Back to Results';
  backButton.className = 'btn-back';
  backButton.id = 'back-to-results';
  detailView.append(backButton);

  // Add the detail view to the container
  container.append(detailView);
}

/**
 * Creates a card element for a single anime (used in results view)
 * @param {Object} anime - The anime object to display
 * @returns {HTMLElement} - A div element containing the anime's information
 */
function createAnimeCard(anime) {
  const card = document.createElement('div');
  card.className = 'recommendation-card';

  // Store the anime name as a data attribute for event delegation
  // I learned: data-* attributes are perfect for storing information on elements!
  card.dataset.name = anime.name;

  // Get all the display helpers from matching.js
  const genreEmoji = getGenreEmoji(anime.genre);
  const description = getAnimeDescription(anime);
  const episodeDisplay = formatEpisodeCount(anime.episodeCount);
  const stars = '⭐'.repeat(anime.userRating);

  // Build the card content using safe DOM methods
  // I learned: createElement + textContent is safer than innerHTML when displaying data
  // This was my breakthrough moment! Even though my data comes from data.js (not user input),
  // using textContent is the defensive pattern - it never interprets HTML

  // Add poster image if available
  // I learned: MyAnimeList provides beautiful poster images for each anime!
  if (anime.posterImage) {
    const poster = document.createElement('img');
    poster.src = anime.posterImage;
    poster.alt = `${anime.name} poster`;
    poster.className = 'anime-poster';
    card.append(poster);
  }

  // Create the heading with emoji and name
  const heading = document.createElement('h3');
  heading.textContent = `${genreEmoji} ${anime.name}`;
  card.append(heading);

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
    p.append(strong);
    // This part creates a text node for the value
    p.append(document.createTextNode(value));
    return p;
  }

  // Add all the detail paragraphs
  detailsDiv.append(createDetailParagraph('Genre', anime.genre));
  detailsDiv.append(createDetailParagraph('Mood', anime.mood));
  detailsDiv.append(createDetailParagraph('Audio', anime.audioLanguage));
  detailsDiv.append(createDetailParagraph('Rating', anime.rating));
  detailsDiv.append(createDetailParagraph('Status', anime.completionStatus));
  detailsDiv.append(
    createDetailParagraph(
      'Length',
      `${episodeDisplay} (${anime.episodeLengthMinutes} min each)`
    )
  );
  detailsDiv.append(
    createDetailParagraph('My Rating', `${stars} (${anime.userRating}/5)`)
  );

  card.append(detailsDiv);

  // Create the description paragraph
  const descriptionP = document.createElement('p');
  descriptionP.className = 'description';
  descriptionP.textContent = description;
  card.append(descriptionP);

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
  for (const [index, card] of cards.entries()) {
    const badge = document.createElement('span');
    badge.textContent = `#${index + 1}`;
    badge.className = 'card-badge';

    // prepend adds it as the FIRST child (before the h3)
    // This was my breakthrough: prepend vs append changes position!
    card.prepend(badge);
  }
}

// Export the three main view functions
export { showResults, showNoResults, showDetail };
