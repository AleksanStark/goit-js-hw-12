import { S as g, a as b, i as w } from '../assets/vendor-5401a4b0.js';
(function () {
  const e = document.createElement('link').relList;
  if (e && e.supports && e.supports('modulepreload')) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) s(t);
  new MutationObserver(t => {
    for (const i of t)
      if (i.type === 'childList')
        for (const d of i.addedNodes)
          d.tagName === 'LINK' && d.rel === 'modulepreload' && s(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(t) {
    const i = {};
    return (
      t.integrity && (i.integrity = t.integrity),
      t.referrerPolicy && (i.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : t.crossOrigin === 'anonymous'
        ? (i.credentials = 'omit')
        : (i.credentials = 'same-origin'),
      i
    );
  }
  function s(t) {
    if (t.ep) return;
    t.ep = !0;
    const i = o(t);
    fetch(t.href, i);
  }
})();
const L = new g('.list-link'),
  y = (r, e) => {
    const o = r
      .map(
        s => `<li class="list-item">
            <a class="list-link" href="${s.largeImageURL}"><img class="list-img" src="${s.webformatURL}" data-original="${s.largeImageURL}" download></a>
            <ul class="list-statistic">
              <li>
                <span class="list-item-title">likes</span>
                <span class="list-item-number">${s.likes}</span>
              </li>
  
              <li>
                <span class="list-item-title">views</span>
                <span class="list-item-number">${s.views}</span>
              </li>
              <li>
                <span class="list-item-title">comments</span>
                <span class="list-item-number">${s.comments}</span>
              </li>
              <li>
                <span class="list-item-title">downloads</span>
                <span class="list-item-number">${s.downloads}</span>
              </li>
            </ul>
          </li>`
      )
      .join('');
    e.insertAdjacentHTML('beforeend', o), L.refresh();
  },
  f = async (r, e, o) => {
    const s = new URLSearchParams({
      key: '42464755-f7d199d1a91f6070a7f813e04',
      image_type: 'photo',
      orientation: 'horizontal',
      q: `${r}`,
      safesearch: !0,
      page: e,
      per_page: o,
    });
    return (await b.get(`https://pixabay.com/api/?${s}`)).data;
  },
  u = document.querySelector('.form'),
  l = document.querySelector('.list'),
  n = document.querySelector('.loader-container'),
  c = document.querySelector('.load-more-btn');
c.style.display = 'none';
let a = 1,
  h = 1;
const p = 15;
let m;
u.addEventListener('submit', async r => {
  r.preventDefault(),
    (a = 1),
    (n.style.display = 'flex'),
    (c.style.display = 'block'),
    (m = r.target.elements.search.value),
    (l.innerHTML = ''),
    (u.search.value = ''),
    setTimeout(async () => {
      try {
        const e = await f(m, a, p);
        if (
          ((h = Math.ceil(e.totalHits / p)),
          (n.style.display = 'none'),
          (e.hits.length = 100),
          e.hits.length === 0)
        )
          return (
            (c.style.display = 'none'),
            w.error({
              message:
                'Sorry, there are no images matching your search query. Please try again!',
              position: 'topRight',
            })
          );
        y(e.hits, l);
        const o = l.firstElementChild.getBoundingClientRect().height;
        window.scrollBy({ top: 2 * o, behavior: 'smooth' });
      } catch (e) {
        console.error('Error during fetching posts:', e),
          (n.style.display = 'none');
      }
    }, 1e3);
});
c.addEventListener('click', () => {
  (a += 1),
    (n.style.display = 'flex'),
    setTimeout(async () => {
      try {
        const r = await f(m, a, p);
        y(r.hits, l),
          (n.style.display = 'none'),
          a >= h && (c.style.display = 'none');
        const e = l.firstElementChild.getBoundingClientRect().height;
        window.scrollBy({ top: 2 * e, behavior: 'smooth' });
      } catch (r) {
        console.error('Error during loading more images:', r),
          (n.style.display = 'none');
      }
    }, 1e3);
});
//# sourceMappingURL=commonHelpers.js.map
