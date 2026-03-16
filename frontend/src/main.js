import { getTrendingGifs, getGifsBySearch } from './fetch-helpers.js';
import { renderGifs, renderError } from './dom-helpers.js';

const searchForm = document.querySelector('#gif-search-form');
const searchInput = document.querySelector('#searchInput');

const loadTrendingGifs = async () => {
  const { data, error } = await getTrendingGifs();
  if (error) {
    return renderError("Sorry, we couldn't fetch the gifs at this time.");
  }
  renderGifs(data);
};

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  const { data, error } = await getGifsBySearch(searchTerm);
  if (error) {
    return renderError("Sorry, we couldn't fetch the gifs at this time.");
  }
  renderGifs(data);
});

loadTrendingGifs();
