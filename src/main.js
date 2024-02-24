import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { renderMarkup } from './js/render-functions.js';
import { fetchPosts } from './js/pixaday-api.js';

const form = document.querySelector('.form');
const listImages = document.querySelector('.list');
const loader = document.querySelector('.loader-container');
const loadMoreBtn = document.querySelector('.load-more-btn');

loadMoreBtn.style.display = 'none';
let page = 1;
let totalPages = 1;
const limit = 15;
let searchValue;

form.addEventListener('submit', async event => {
  event.preventDefault();
  page = 1;
  loader.style.display = 'flex';
  loadMoreBtn.style.display = 'none';
  searchValue = event.target.elements.search.value;
  listImages.innerHTML = '';
  form.search.value = '';
  setTimeout(async () => {
    loadMoreBtn.style.display = 'block';

    try {
      const images = await fetchPosts(searchValue, page, limit);
      totalPages = Math.ceil(images.totalHits / limit);
      loadMoreBtn.style.display = 'block';
      loader.style.display = 'none';
      images.hits.length = 100;
      if (images.hits.length === 0) {
        loadMoreBtn.style.display = 'none';
        return iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }

      renderMarkup(images.hits, listImages);

      // Отримання висоти однієї карточки галереї
      const cardHeight =
        listImages.firstElementChild.getBoundingClientRect().height;

      // Плавне прокручування на дві висоти карточки галереї
      window.scrollBy({ top: 2 * cardHeight, behavior: 'smooth' });
    } catch (error) {
      console.error('Error during fetching posts:', error);
      loader.style.display = 'none';
    }
  }, 1000);
});

loadMoreBtn.addEventListener('click', () => {
  page += 1;
  loader.style.display = 'flex';
  setTimeout(async () => {
    try {
      const images = await fetchPosts(searchValue, page, limit);
      renderMarkup(images.hits, listImages);

      loader.style.display = 'none';

      // Оновлена логіка для відображення/сховання кнопки "Завантажити ще"
      if (page >= totalPages) {
        loadMoreBtn.style.display = 'none';
      }

      // Отримання висоти однієї карточки галереї
      const cardHeight =
        listImages.firstElementChild.getBoundingClientRect().height;

      // Плавне прокручування на дві висоти карточки галереї
      window.scrollBy({ top: 2 * cardHeight, behavior: 'smooth' });
    } catch (error) {
      console.error('Error during loading more images:', error);
      loader.style.display = 'none';
    }
  }, 1000);
});
