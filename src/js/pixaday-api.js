// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
const form = document.querySelector('.form');
const listImages = document.querySelector('.list');
form.addEventListener('submit', event => {
  event.preventDefault();
  const loader = document.querySelector('.loader-container');
  loader.style.display = 'flex';
  setTimeout(() => (loader.style.display = 'none'), 3000);
  setTimeout(() => {
    return fetch(
      `https://pixabay.com/api/?key=42464755-f7d199d1a91f6070a7f813e04&image_type=photo&orientation=horizontal&q=${event.target.elements.search.value}&safesearch=true`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(images => {
        listImages.innerHTML = '';
        form.search.value = '';
        if (images.hits.length === 0) {
          return iziToast.error({
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
          });
        }
        const markup = images.hits
          .map(image => {
            return `<li class="list-item">
          <a class="list-link" href="${image.largeImageURL}"><img class="list-img" src="${image.webformatURL}" data-original="${image.largeImageURL}" download></a>
          <ul class="list-statistic">
            <li>
              <span class="list-item-title">likes</span>
              <span class="list-item-number">${image.likes}</span>
            </li>

            <li>
              <span class="list-item-title">views</span>
              <span class="list-item-number">${image.views}</span>
            </li>
            <li>
              <span class="list-item-title">comments</span>
              <span class="list-item-number">${image.comments}</span>
            </li>
            <li>
              <span class="list-item-title">downloads</span>
              <span class="list-item-number">${image.downloads}</span>
            </li>
          </ul>
        </li>`;
          })
          .join('');
        listImages.insertAdjacentHTML('beforeend', markup);
        const originalImageSrc = event.target.getAttribute('data-original');

        const gallery = new SimpleLightbox('.list-link');
        gallery
          .refresh()
          .create(`<img src="${originalImageSrc}" width="100%" height="100%"/>`)
          .show();
      });
  }, 2000);
});
