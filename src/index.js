import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import picsTpl from './templates/pics-list.hbs';
import API from "./fetchPics.js";


// const DEBOUNCE_DELAY = 300;

const formRef = document.querySelector(".search-form");
const picsContainerRef = document.querySelector(".gallery");
// const countryListRef = document.querySelector(".country-list");


formRef.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  
  clearPicsList();
  API.searchOptions.q = e.currentTarget.searchQuery.value;
  console.log('searchQuery :>> ', API.searchOptions.q);
  API.fetchPics()
    .then((pics) => {
      const picsArray = pics.hits;
      console.log('picsArray :>> ', picsArray);
      // const picsMarkup = pics.hits.reduce(
      //   (markup, pic) => createMarkup(pic) + markup,
      //   ""
      // );
      // console.log('picsMarkup :>> ', picsMarkup);
      renderPicsMarkup(picsArray);
    })
    .catch(onFetchError);
}
// function createMarkup({webformatURL}) {
//   return `
// <div class="photo-card">
//   <img src=${webformatURL} alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div    `;
// }




// function onInput(e) {
//   clearCountryList();
//   const countryName = e.target.value.trim();

//   if (countryName === '') {
//     return;
//   }
//   API.fetchCountries(countryName)
//     .then(countryCards => {
//     const numberOfCountries = countryCards.length;

//     if (numberOfCountries > 10) Notify.info("Too many matches found. Please enter a more specific name.");
//     else if (numberOfCountries >= 2 && numberOfCountries <= 10) {
//       renderCountryList(countryCards);
//     }
//     else if (numberOfCountries === 1) {
//       renderCountryInfo(countryCards);
//     }
//     }) 
//   .catch(onFetchError);
// }
function renderPicsMarkup(pics) {
  const markup = picsTpl(pics);
  console.log('markup :>> ', markup);
    picsContainerRef.insertAdjacentHTML('beforeend', markup);
}


function clearPicsList() {
  picsContainerRef.innerHTML = "";

}

function onFetchError(error) {
  console.log('error :>> ', error);
  Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}