const BASE_URL= "https://pixabay.com/api/";
// const key = "33341846-2d80dabb5272f7d922b758ae2";
const searchOptions = {
  key: "33341846-2d80dabb5272f7d922b758ae2",
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 10,
};

function fetchPics() {
  const url = `${BASE_URL}?key=${searchOptions.key}&q=${searchOptions.q}&page=${searchOptions.page}&per_page=${searchOptions.per_page}&image_type=${searchOptions.image_type}&orientation=${searchOptions.orientation}&safesearch=${searchOptions.safesearch}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
}

export default { fetchPics, searchOptions };