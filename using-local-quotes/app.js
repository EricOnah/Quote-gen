const container = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#new-quote");
const tweetBtn = document.querySelector("#twitter");
const loader = document.querySelector(".loader");

let quote, quoteLength;

// Show loading
function loading() {
  loader.hidden = false;
  container.hidden = true;
}

// Loading complete
function complete() {
  container.hidden = false;
  loader.hidden = true;
}

// Get quote
function getQuote() {
  quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
}

// Get new quote
function getNewQuote() {
  loading();
  getQuote();
  quoteLength = quote.text.length;

  // Check if quote length is greater than 55
  if (quoteLength > 55) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Check for empty author and assign "ANONYMOUS"
  if (!quote.author) {
    quote.author = "ANONYMOUS";
    quoteAuthor.innerHTML = quote.author;
  } else {
    quoteAuthor.innerHTML = quote.author;
  }

  // Set quote and complete loading
  quoteText.innerHTML = quote.text;
  complete();
}

// Tweet a quote
function tweet() {
  if (quoteLength < 120) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
    window.open(twitterUrl);
  } else {
    quoteText.innerHTML = "Too long to tweet";
    quoteAuthor.innerHTML = "Quote Generator";
  }
}

// Activate buttons
newQuoteBtn.addEventListener("click", getNewQuote);
tweetBtn.addEventListener("click", tweet);

// Initial setup
getNewQuote();
