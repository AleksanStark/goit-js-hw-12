// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = new SimpleLightbox('.list-link');
// renderMarkup accept list of elements and tag which insert elements fron list
export const renderMarkup = (list, tag) => {
  const markup = list
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
  tag.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
};
