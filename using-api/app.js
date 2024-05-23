const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#new-quote");
const tweetBtn = document.querySelector("#twitter");
const loader = document.querySelector("#loader");
let xterlength;
let data = [];

// Loading

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Loading complete

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Get quote from API

async function getQuote() {
  showLoadingSpinner();
  const apiUrl = "https://api.breakingbadquotes.xyz/v1/quotes";
  try {
    const response = await fetch(apiUrl);
    data = await response.json();
    quotes();
  } catch (error) {
    console.log(error);
  }
}

function quotes() {
  showLoadingSpinner();
  const newQuote = data[Math.floor(Math.random() * data.length)];
  //  Check for quote length and add/remove .long-quote
  xterlength = newQuote.quote.length;

  if (xterlength > 55) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set quote, Hide loader

  quoteText.textContent = newQuote.quote;
  quoteAuthor.textContent = newQuote.author || "Unknown";
  removeLoadingSpinner();
}

function tweetQuote() {
  if (xterlength < 120) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, "_top");
  } else {
    quoteText.textContent = "Too long to tweet";
    quoteAuthor.textContent = "Quote Generator";
  }
}

newQuoteBtn.addEventListener("click", getQuote);
tweetBtn.addEventListener("click", tweetQuote);

// On load
getQuote();
