import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "33341846-2d80dabb5272f7d922b758ae2";

export default class PicsApi {
  constructor() {
    this.searchQuery = '';
    this.queryPage = 1;
    this.queryPerPage = 40;
    this.image_type = 'photo';
    this.orientation = 'horizontal';
    this.safesearch = true;
  }

  async fetchPics() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.queryPage}&per_page=${this.queryPerPage}&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}`;
    
    const response = await axios.get(url);
    this.incrementPage();
    return response.data;
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

