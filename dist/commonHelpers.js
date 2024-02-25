import { S as b, a as w, i as p } from '../assets/vendor-5401a4b0.js';
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) s(e);
  new MutationObserver(e => {
    for (const r of e)
      if (r.type === 'childList')
        for (const d of r.addedNodes)
          d.tagName === 'LINK' && d.rel === 'modulepreload' && s(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(e) {
    const r = {};
    return (
      e.integrity && (r.integrity = e.integrity),
      e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (r.credentials = 'include')
        : e.crossOrigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    );
  }
  function s(e) {
    if (e.ep) return;
    e.ep = !0;
    const r = o(e);
    fetch(e.href, r);
  }
})();
const L = new b('.list-link'),
  f = (i, t) => {
    const o = i
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
    t.insertAdjacentHTML('beforeend', o), L.refresh();
  },
  h = async (i, t, o) => {
    const s = new URLSearchParams({
      key: '42464755-f7d199d1a91f6070a7f813e04',
      image_type: 'photo',
      orientation: 'horizontal',
      q: `${i}`,
      safesearch: !0,
      page: t,
      per_page: o,
    });
    return (await w.get(`https://pixabay.com/api/?${s}`)).data;
  },
  y = document.querySelector('.form'),
  l = document.querySelector('.list'),
  n = document.querySelector('.loader-container'),
  c = document.querySelector('.load-more-btn');
c.style.display = 'none';
let a = 1,
  g = 1;
const m = 15;
let u;
y.addEventListener('submit', async i => {
  i.preventDefault(),
    (a = 1),
    (n.style.display = 'flex'),
    (c.style.display = 'block'),
    (u = i.target.elements.search.value),
    (l.innerHTML = ''),
    (y.search.value = ''),
    setTimeout(async () => {
      try {
        const t = await h(u, a, m);
        if (
          ((g = Math.ceil(t.totalHits / m)),
          (n.style.display = 'none'),
          t.hits.length === 0)
        )
          return (
            (c.style.display = 'none'),
            p.error({
              message:
                "We're sorry, but you've reached the end of search results.",
              position: 'topRight',
            })
          );
        f(t.hits, l);
        const o = l.firstElementChild.getBoundingClientRect().height;
      } catch (t) {
        p.error({
          message: `Error during fetching posts: ${t}`,
          position: 'topRight',
        }),
          (n.style.display = 'none');
      }
    }, 1e3);
});
c.addEventListener('click', () => {
  (a += 1),
    (n.style.display = 'flex'),
    setTimeout(async () => {
      try {
        const i = await h(u, a, m);
        f(i.hits, l),
          (n.style.display = 'none'),
          a >= g && (c.style.display = 'none');
        const t = l.firstElementChild.getBoundingClientRect().height;
        window.scrollBy({ top: 2 * t, behavior: 'smooth' });
      } catch (i) {
        p.error({
          message: `Error during loading more images: ${i}`,
          position: 'topRight',
        }),
          (n.style.display = 'none');
      }
    }, 1e3);
});
//# sourceMappingURL=commonHelpers.js.map
