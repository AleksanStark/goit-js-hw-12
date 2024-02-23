import{S as g,a as b,i as m}from"./assets/vendor-5401a4b0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const L=new g(".list-link"),f=(a,s)=>{const n=a.map(t=>`<li class="list-item">
            <a class="list-link" href="${t.largeImageURL}"><img class="list-img" src="${t.webformatURL}" data-original="${t.largeImageURL}" download></a>
            <ul class="list-statistic">
              <li>
                <span class="list-item-title">likes</span>
                <span class="list-item-number">${t.likes}</span>
              </li>
  
              <li>
                <span class="list-item-title">views</span>
                <span class="list-item-number">${t.views}</span>
              </li>
              <li>
                <span class="list-item-title">comments</span>
                <span class="list-item-number">${t.comments}</span>
              </li>
              <li>
                <span class="list-item-title">downloads</span>
                <span class="list-item-number">${t.downloads}</span>
              </li>
            </ul>
          </li>`).join("");s.insertAdjacentHTML("beforeend",n),L.refresh()},h=async(a,s,n)=>{const t=new URLSearchParams({key:"42464755-f7d199d1a91f6070a7f813e04",image_type:"photo",orientation:"horizontal",q:`${a}`,safesearch:!0,page:s,per_page:n});return(await b.get(`https://pixabay.com/api/?${t}`)).data},y=document.querySelector(".form"),p=document.querySelector(".list"),l=document.querySelector(".loader-container"),i=document.querySelector(".load-more-btn");i.style.display="none";let o=1;const d=15;let u;y.addEventListener("submit",async a=>{a.preventDefault(),o=1,l.style.display="flex",i.style.display="block",u=a.target.elements.search.value,await h(u,o,d).then(async s=>{const n=Math.ceil(s.totalHits/d);if(s.hits.length===0)return l.style.display="none",i.style.display="none",m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});if(o>n)return l.style.display="none",i.display="none",m.error({position:"topRight",message:"We're sorry, but you've reached the end of search results."});y.search.value="",p.innerHTML="",f(s.hits,p),l.style.display="none"})});i.addEventListener("click",async()=>{o+=1,await h(u,o,d).then(a=>f(a.hits,p))});
//# sourceMappingURL=commonHelpers.js.map
