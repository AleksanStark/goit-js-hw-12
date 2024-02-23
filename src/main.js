// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { renderMarkup } from './js/render-functions.js';
import { fetchPosts } from './js/pixaday-api.js';
const form = document.querySelector('.form');
const listImages = document.querySelector('.list');
const loader = document.querySelector('.loader-container');
const loadMoreBtn = document.querySelector('.load-more-btn');

loadMoreBtn.style.display = 'none';
let page = 1;
const limit = 15;
let searchValue;
form.addEventListener('submit', async event => {
  event.preventDefault();
  page = 1;
  loader.style.display = 'flex';
  loadMoreBtn.style.display = 'block';
  searchValue = event.target.elements.search.value;
  await fetchPosts(searchValue, page, limit).then(async images => {
    const totalPages = Math.ceil(images.totalHits / limit);
    if (images.hits.length === 0) {
      loader.style.display = 'none';
      loadMoreBtn.style.display = 'none';
      return iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else if (page > totalPages) {
      loader.style.display = 'none';
      loadMoreBtn.display = 'none';
      return iziToast.error({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
    form.search.value = '';
    listImages.innerHTML = '';
    renderMarkup(images.hits, listImages);
    loader.style.display = 'none';
  });
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  const response = await fetchPosts(searchValue, page, limit).then(images =>
    renderMarkup(images.hits, listImages)
  );
});
