import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import picsTpl from './templates/pics-list.hbs';
import PicsApiService from "./pics-api.js";
import LoadMoreBtn from "./components/load-more-btn.js";

// let page = 1;

// const DEBOUNCE_DELAY = 300;

const formRef = document.querySelector(".search-form");
const picsContainerRef = document.querySelector(".gallery");

const picsApiService = new PicsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: ".load-more",
  isHidden: true,
});



formRef.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', getPics);


function onSearch(e) {
  e.preventDefault();

  clearPicsList();
  picsApiService.query = e.currentTarget.searchQuery.value.trim();
console.log('picsApiService.query :>> ', picsApiService.query);
  if (picsApiService.query === '') {
      return Notify.info("Please enter a request.")
  };
  
  picsApiService.resetPage();
  loadMoreBtn.showBtn();
  loadMoreBtn.disableBtn();
  getPics().finally(()=>formRef.reset());

}

function getPics() {
  loadMoreBtn.disableBtn();
  return picsApiService.fetchPics()
    .then((pics) => {
      console.log('pics :>> ', pics);
      if (pics.length === 0) throw new Error("No data");
      renderPicsMarkup(pics);
      loadMoreBtn.enableBtn();
    })
    .catch(onFetchError);
}

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



