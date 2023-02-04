const BASE_URL= "https://pixabay.com/api/";
// const key = "33341846-2d80dabb5272f7d922b758ae2";
const searchOptions = {
  key: "33341846-2d80dabb5272f7d922b758ae2",
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 4,
};

export default class PicsApi {
  constructor() {
    this.queryPage = 1;
    this.queryPerPage = 10;
    this.searchQuery = '';
  }

  getPics() {
  const url = `${BASE_URL}?key=${searchOptions.key}&q=${searchOptions.q}&page=${this.queryPage}&per_page=${this.queryPerPage}&image_type=${searchOptions.image_type}&orientation=${searchOptions.orientation}&safesearch=${searchOptions.safesearch}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
}

}







// export default { fetchPics, searchOptions };