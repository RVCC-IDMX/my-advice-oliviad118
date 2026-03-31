/**
 * experiments.js — DOM practice playground
 *
 * This file is my sandbox for trying DOM methods! Each experiment uses the safe
 * DOM practices I learned this week: querySelector, createElement, textContent, classList.
 *
 * I learned: The DOM is just an API for manipulating HTML with JavaScript.
 * Every change here happens in real-time on the page!
 */

// ===================
// EXPERIMENT 1: Change text on the page (Comfortable tier)
// ===================
// This was my first experiment! I'm finding the h1 and changing its text.
// I learned: textContent replaces ALL the text inside an element, including emojis!

const heading = document.querySelector('h1');
const originalHeading = heading.textContent; // Save it so I can see what changed
heading.textContent = '✨ Welcome to My Anime Universe ✨';

// This was confusing at first: why didn't the emoji disappear separately?
// Breakthrough moment: textContent treats everything as one string - text AND emojis!
console.log(`Original heading: ${originalHeading}`);
console.log(`New heading: ${heading.textContent}`);

// ===================
// EXPERIMENT 2: Count elements (Comfortable tier)
// ===================
// I wanted to know how many form options I have total! querySelectorAll returns a NodeList.

const allOptions = document.querySelectorAll('option');
console.log(
  `🎯 This page has ${allOptions.length} total options across all dropdowns!`
);

// Let me also count how many dropdowns (select elements) I have
const allSelects = document.querySelectorAll('select');
console.log(`📋 This page has ${allSelects.length} dropdown menus`);

// This was my "aha moment": querySelectorAll finds EVERY match, not just the first one!

// ===================
// EXPERIMENT 3: Add something that wasn't in the HTML (Stretching tier)
// ===================
// I'm building a footer from scratch! This felt like real DOM construction.
// I learned: You build elements piece by piece, then attach them to the page.

const footer = document.createElement('footer');
footer.className = 'experiment-footer'; // I'll style this in CSS later

const footerText = document.createElement('p');
footerText.textContent =
  'Built by Olivia 🌸 | Powered by JavaScript & curiosity';

const footerCredit = document.createElement('p');
footerCredit.className = 'small-text';
footerCredit.textContent = 'Week 2 DOM Experiments — IDMX 244';

// Attach the paragraphs to the footer, then the footer to the body
footer.appendChild(footerText);
footer.appendChild(footerCredit);
document.body.appendChild(footer);

// This was confusing at first: why does order matter?
// I learned: You have to appendChild in the right sequence - build small, then assemble!

// ===================
// EXPERIMENT 4: Toggle a class (Comfortable tier)
// ===================
// I'm adding a visual highlight to the form section so it stands out.
// I learned: classList.add() changes appearance without touching CSS directly!

const formSection = document.querySelector('.form-section');
formSection.classList.add('highlight-experiment');

// NOTE: I need to add .highlight-experiment to my CSS file to see this work!
// I'm thinking: maybe a subtle glow or border?

console.log('✨ Added "highlight-experiment" class to the form section');

// ===================
// EXPERIMENT 5: Modify every card (Stretching tier)
// ===================
// This experiment only runs AFTER the user submits the form and cards appear.
// I'm adding a numbered badge to each recommendation card.
// This was my breakthrough moment: I can modify elements that don't exist yet
// by running this code when they DO exist!

// I'll wrap this in a function so I can call it after cards are rendered
function addCardBadges() {
  const cards = document.querySelectorAll('.recommendation-card');

  if (cards.length === 0) {
    console.log(
      '⚠️ No cards found yet. Submit the form to see this experiment!'
    );
    return;
  }

  cards.forEach((card, index) => {
    // Add a border to each card
    card.classList.add('experiment-border');

    // Create a badge with the card's number
    const badge = document.createElement('span');
    badge.textContent = `#${index + 1}`;
    badge.className = 'card-badge';

    // prepend adds it as the FIRST child (before the h3)
    card.prepend(badge);
  });

  console.log(`🎨 Added numbered badges to ${cards.length} cards!`);
}

// Try to run it immediately (in case cards are already on the page)
addCardBadges();

// This was confusing: Why check if cards.length === 0?
// I learned: querySelector returns null if nothing matches, and querySelectorAll returns
// an empty NodeList. I need to check before trying to modify!

// ===================
// EXPERIMENT 6: Read and display an attribute (Comfortable tier)
// ===================
// I'm reading attributes from my form fields and displaying them.
// This shows me what properties HTML elements have!

const firstSelect = document.querySelector('select');
const selectId = firstSelect.getAttribute('id');
const selectName = firstSelect.getAttribute('name');

const info = document.createElement('div');
info.className = 'element-info';
info.innerHTML = `
  <p><strong>🔍 First select element:</strong></p>
  <p>ID: ${selectId}</p>
  <p>Name: ${selectName}</p>
`;

// Add this info box right after the form
const formSection2 = document.querySelector('.form-section');
formSection2.appendChild(info);

// Wait, I used innerHTML here! Is that safe?
// I learned: This is okay because I'm using hardcoded template strings with data from
// MY OWN HTML attributes - not user input. But I should still be careful.
// Better practice: use textContent for the values!

console.log('📊 Element info displayed!');

// ===================
// EXPERIMENT 7: Hide and show (Stretching tier - BONUS!)
// ===================
// I'm experimenting with visibility! This will be useful for showing/hiding results.
// I learned: classList.toggle() is perfect for on/off states!

const subtitle = document.querySelector('.subtitle');

// Let's make the subtitle blink (toggle visibility every 2 seconds)
// This is just for fun/practice - I wouldn't actually do this in a real site!
let isVisible = true;
setInterval(() => {
  if (isVisible) {
    subtitle.style.opacity = '0';
  } else {
    subtitle.style.opacity = '1';
  }
  isVisible = !isVisible;
}, 2000);

// This was my "whoa" moment: JavaScript can create animations!
// I used .style.opacity instead of classList because I wanted smooth fading.
// I learned: You can manipulate CSS directly with .style, but classList is usually better
// for on/off states.

console.log('✨ All experiments loaded! Check the page and the console.');
