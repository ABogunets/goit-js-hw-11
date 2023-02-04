import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import picsTpl from './templates/pics-list.hbs';
import PicsApiService from "./pics-service.js";

// let page = 1;

// const DEBOUNCE_DELAY = 300;

const formRef = document.querySelector(".search-form");
const picsContainerRef = document.querySelector(".gallery");
const loadBtnRef = document.querySelector(".load-more");

const picsApiService = new PicsApiService();



formRef.addEventListener('submit', onSearch);
// loadBtnRef.addEventListener('click', onLoadBtnClick);


function onSearch(e) {
  e.preventDefault();
  clearPicsList();

  picsApiService.searchQuery = e.currentTarget.searchQuery.value.trim();

  picsApiService.getPics()
    .then((pics) => {
      const picsArray = pics.hits;
      renderPicsMarkup(picsArray);
    })
    .catch(onFetchError);
}

// function onLoadBtnClick(e) {
//   API.searchOptions.page += 1;

//   API.fetchPics()
//     .then((pics) => {
//       const picsArray = pics.hits;
//       renderPicsMarkup(picsArray);
//     })
//     .catch(onFetchError);
// }


function renderPicsMarkup(pics) {
  const markup = picsTpl(pics);
    picsContainerRef.insertAdjacentHTML('beforeend', markup);
}

function clearPicsList() {
  picsContainerRef.innerHTML = "";

}

function onFetchError(error) {
  console.log('error :>> ', error);
  Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}

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



