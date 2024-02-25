import { S as h, a as b, i as p } from '../assets/vendor-5401a4b0.js';
(function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
  new MutationObserver(e => {
    for (const i of e)
      if (i.type === 'childList')
        for (const d of i.addedNodes)
          d.tagName === 'LINK' && d.rel === 'modulepreload' && r(d);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(e) {
    const i = {};
    return (
      e.integrity && (i.integrity = e.integrity),
      e.referrerPolicy && (i.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === 'use-credentials'
        ? (i.credentials = 'include')
        : e.crossOrigin === 'anonymous'
        ? (i.credentials = 'omit')
        : (i.credentials = 'same-origin'),
      i
    );
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const i = o(e);
    fetch(e.href, i);
  }
})();
const w = new h('.list-link'),
  y = (s, t) => {
    const o = s
      .map(
        r => `<li class="list-item">
            <a class="list-link" href="${r.largeImageURL}"><img class="list-img" src="${r.webformatURL}" data-original="${r.largeImageURL}" download></a>
            <ul class="list-statistic">
              <li>
                <span class="list-item-title">likes</span>
                <span class="list-item-number">${r.likes}</span>
              </li>
  
              <li>
                <span class="list-item-title">views</span>
                <span class="list-item-number">${r.views}</span>
              </li>
              <li>
                <span class="list-item-title">comments</span>
                <span class="list-item-number">${r.comments}</span>
              </li>
              <li>
                <span class="list-item-title">downloads</span>
                <span class="list-item-number">${r.downloads}</span>
              </li>
            </ul>
          </li>`
      )
      .join('');
    t.insertAdjacentHTML('beforeend', o), w.refresh();
  },
  f = async (s, t, o) => {
    const r = new URLSearchParams({
      key: '42464755-f7d199d1a91f6070a7f813e04',
      image_type: 'photo',
      orientation: 'horizontal',
      q: `${s}`,
      safesearch: !0,
      page: t,
      per_page: o,
    });
    return (await b.get(`https://pixabay.com/api/?${r}`)).data;
  },
  L = document.querySelector('.form'),
  l = document.querySelector('.list'),
  n = document.querySelector('.loader-container'),
  c = document.querySelector('.load-more-btn');
c.style.display = 'none';
let a = 1,
  g = 1;
const m = 15;
let u;
L.addEventListener('submit', async s => {
  s.preventDefault(),
    (a = 1),
    (n.style.display = 'flex'),
    (c.style.display = 'block'),
    (u = s.target.elements.search.value),
    (l.innerHTML = ''),
    setTimeout(async () => {
      try {
        const t = await f(u, a, m);
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
        y(t.hits, l);
        const o = l.firstElementChild.getBoundingClientRect().height;
      } catch (t) {
        p.error({
          message: `Error during fetching posts: ${t}`,
          position: 'topRight',
        }),
          (n.style.display = 'none');
      }
    }, 1e3),
    s.currentTarget.reset();
});
c.addEventListener('click', () => {
  (a += 1),
    (n.style.display = 'flex'),
    setTimeout(async () => {
      try {
        const s = await f(u, a, m);
        y(s.hits, l),
          (n.style.display = 'none'),
          a >= g && (c.style.display = 'none');
        const t = l.firstElementChild.getBoundingClientRect().height;
        window.scrollBy({ top: 2 * t, behavior: 'smooth' });
      } catch (s) {
        p.error({
          message: `Error during loading more images: ${s}`,
          position: 'topRight',
        }),
          (n.style.display = 'none');
      }
    }, 1e3);
});
//# sourceMappingURL=commonHelpers.js.map
