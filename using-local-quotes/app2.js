const container = document.querySelector("#quote-container");
let quoteText = document.querySelector("#quote");
let quoteAuthor = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#new-quote");
const tweetBtn = document.getElementById("twitter");

const compose =
  (f, g) =>
  (...args) =>
    f(g(...args));

function displayQuote(...fns) {
  return fns.reduce(compose);
}
function getQuotes() {
  return setTimeout(() => {
    if (quote.author) {
      quoteAuthor.innerHTML = quote.author;
    } else {
      quoteAuthor.innerHTML = "Anonymous";
    }
    quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    quoteText.innerHTML = quote.text;
    loadingComplete();
  }, 1000);
}

function loading() {
  loader = document.getElementById("loader");
  loader.classList.add("loader");
  loader.hidden = false;
  container.hidden = true;
}

function loadingComplete() {
  loader = document.getElementById("loader");
  loader.hidden = true;
  container.hidden = false;
}

const tweet = () => {
  let quoteLength = quoteText.innerText.length;

  if (quoteLength < 120) {
    const twitter = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
    window.open(twitter);
  } else {
    quoteText.innerHTML = "Too long to tweet";
    quoteAuthor.innerHTML = "Quote Generator";
  }
};

tweetBtn.addEventListener("click", () => tweet());
newQuoteBtn.addEventListener("click", displayQuote(getQuotes, loading));
window.onload = displayQuote(getQuotes, loading);
