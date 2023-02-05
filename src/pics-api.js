const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "33341846-2d80dabb5272f7d922b758ae2";
// const searchOptions = {
//   key: "33341846-2d80dabb5272f7d922b758ae2",
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   page: 1,
//   per_page: 4,
// };

export default class PicsApi {
  constructor() {
    this.searchQuery = '';
    this.queryPage = 1;
    this.queryPerPage = 10;
    this.image_type = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = true;
  }

  fetchPics() {

    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.queryPage}
    &per_page=${this.queryPerPage}&image_type=${this.image_type}
    &orientation=${this.orientation}&safesearch=${this.safesearch}`;
  
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(({hits}) => {
      this.incrementPage();
      return hits;
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query (newQuery){
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.queryPage = 1;
  }

  incrementPage() {
    this.queryPage += 1;
  }

}







// export default { fetchPics, searchOptions };