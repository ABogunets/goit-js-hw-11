import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import picsTpl from './templates/pics-list.hbs';
import PicsApiService from "./pics-api.js";
import LoadMoreBtn from "./components/load-more-btn.js";


const formRef = document.querySelector(".search-form");
const picsContainerRef = document.querySelector(".gallery");

const picsApiService = new PicsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: ".load-more",
  isHidden: true,
});

  const gallery = new SimpleLightbox('.gallery a');

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

  getPics();
}

async function getPics() {
  loadMoreBtn.disableBtn();
  try {
    const { hits, totalHits } = await picsApiService.fetchPics();
    
    console.log('pics :>> ', hits, totalHits);
    console.log('Psge:>> ', picsApiService.queryPage);

    if (hits.length === 0 && picsApiService.queryPage <= 2) throw "No data";
    if (hits.length === 0 && picsApiService.queryPage > 2) {
      throw "End of data";
    };
    if (!(hits.length === 0) && picsApiService.queryPage === 2) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    };
      
    renderPicsMarkup(hits);
    loadMoreBtn.enableBtn();

    if (picsApiService.queryPage > 2) scrollByOnLoadMore();

    gallery.refresh();
    gallery.on('show.simplelightbox');
  }
  catch (err) {
    onFetchError(err);
  }
  finally {
    if (picsApiService.queryPage === 2) formRef.reset();
  }
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
  switch (error) { 
    case "No data":
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      loadMoreBtn.hideBtn();
      break;
    case "End of data":
      Notify.failure("We're sorry, but you've reached the end of search results.");
      loadMoreBtn.hideBtn();
      break;
  }
}

function scrollByOnLoadMore() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}




