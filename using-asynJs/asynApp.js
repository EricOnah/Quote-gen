const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#new-quote");
const tweetBtn = document.querySelector("#twitter");
const loader = document.querySelector("#loader");
let apiQuotes = [];

// Shows or hides the loading indicator
function toggleLoading(show) {
  loader.hidden = !show;
  quoteContainer.hidden = show;
}

// Shows a new quote
function showQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check for author name or assign Anonymous if unknown
  quoteAuthor.textContent = quote.author || "Anonymous";

  // Check for quote length and add/remove .long-quote
  quoteText.textContent = quote.text;
  quoteText.classList.toggle("long-quote", quote.text.length > 55);

  toggleLoading(false);
}

// Fetches quotes from the API
async function fetchQuotes() {
  toggleLoading(true);

  try {
    const response = await fetch("https://type.fit/api/quotes");
    apiQuotes = await response.json();
    showQuote();
  } catch (error) {
    console.error(error);
  }
}

// Shares the current quote on Twitter
function shareQuote() {
  const text = `${quoteText.textContent} - ${quoteAuthor.textContent}`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}`;
  window.open(url, "_blank");
}

newQuoteBtn.addEventListener("click", showQuote);
tweetBtn.addEventListener("click", shareQuote);

// On load
fetchQuotes();
