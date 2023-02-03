import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import countryInfoTpl from './templates/country-info.hbs';
import countryListTpl from './templates/country-list.hbs';
import API from "./fetchCountries.js";


const DEBOUNCE_DELAY = 300;

const inputRef = document.getElementById("search-box");
const countryInfoRef = document.querySelector(".country-info");
const countryListRef = document.querySelector(".country-list");


inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  clearCountryList();
  const countryName = e.target.value.trim();

  if (countryName === '') {
    return;
  }
  API.fetchCountries(countryName)
    .then(countryCards => {
    const numberOfCountries = countryCards.length;

    if (numberOfCountries > 10) Notify.info("Too many matches found. Please enter a more specific name.");
    else if (numberOfCountries >= 2 && numberOfCountries <= 10) {
      renderCountryList(countryCards);
    }
    else if (numberOfCountries === 1) {
      renderCountryInfo(countryCards);
    }
    }) 
  .catch(onFetchError);
}
function renderCountryInfo(card) {
  const markup = countryInfoTpl(card);
    countryInfoRef.innerHTML = markup;
}
function renderCountryList(card) {
  const markup = countryListTpl(card);
    countryListRef.innerHTML = markup;
}
function clearCountryList() {
  countryListRef.innerHTML = "";
  countryInfoRef.innerHTML = "";
}
function onFetchError(error) {
  console.log('error :>> ', error);
  Notify.failure("Oops, there is no country with that name")
}