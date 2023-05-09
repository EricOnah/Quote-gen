const quoteContainer = document.querySelector("#quote-container");
let quoteText = document.querySelector("#quote");
let quoteAuthor = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#new-quote");
const tweetBtn = document.querySelector("#twitter");
const loader = document.querySelector("#loader");

// Loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Loading complete

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Get quote from API

async function getQuote() {
  loading();
  const apiUrl = "https://api.breakingbadquotes.xyz/v1/quotes";

  try {
    response = await fetch(apiUrl);
    data = await response.json();
    quotes();
  } catch (error) {
    console.log(error);
    // getQuote();
  }
}

quotes = () => {
  loading();
  newQuote = data[Math.floor(Math.random() * data.length)];
  //  Check for quote length and add/remove .long-quote
  xterlength = newQuote.quote.length;

  if (xterlength > 55) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set quote, Hide loader

  quoteText.textContent = newQuote.quote;
  quoteAuthor.textContent = newQuote.author;
  complete();
};

tweet = () => {
  if (xterlength < 120) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, "_top");
  } else {
    quoteText.textContent = "Too long to tweet";
    quoteAuthor.textContent = "Quote Generator";
  }
};

tweetBtn.addEventListener("click", tweet);
newQuoteBtn.addEventListener("click", getQuote);

// On load
getQuote();
