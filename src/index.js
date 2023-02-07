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

  getPics().finally(() => formRef.reset());
  
}

function getPics() {
  loadMoreBtn.disableBtn();
  return picsApiService.fetchPics()
    .then(({hits, totalHits}) => {
      console.log('pics :>> ', hits, totalHits);
            console.log('Psge:>> ', picsApiService.queryPage);
      if (hits.length === 0 && picsApiService.queryPage <=2) throw new Error("No data");
      if (hits.length === 0 && picsApiService.queryPage > 2) {
        Notify.warning("We're sorry, but you've reached the end of search results.");
        loadMoreBtn.hideBtn();
      };
      if (!(hits.length === 0) && picsApiService.queryPage === 2) {
        Notify.info(`Hooray! We found ${totalHits} images.`);
      };
      
      renderPicsMarkup(hits);
      loadMoreBtn.enableBtn();

      if (picsApiService.queryPage > 2) scrollByOnLoadMore();


      gallery.refresh();
      gallery.on('show.simplelightbox');
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

function scrollByOnLoadMore() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}




