var axios = require('axios');

const key = "0e4c148a657a76f2e0e06812307b9107";
var baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + key;
var posterUrl = "https://image.tmdb.org/t/p/w300";


function getPoster (movieName, movieYear) {
  let params = `&query=${movieName}&year=${movieYear}`;

  return axios.get(baseUrl + params)
    .then(function (movie) {
      let posterPathUrl = 'http://via.placeholder.com/280x380';
      if(movie.data.results[0] !== null && movie.data.results[0] !== undefined) {
        const posterPath = movie.data.results[0].poster_path;
        posterPathUrl = posterUrl + posterPath;
      }
      return posterPathUrl;
    });
}

function handleError (error) {
  console.warn(error);
  return null;
}

module.exports = {
  getPosterUrl: function (movieTitle, movieYear) {
    return axios.all([
      getPoster(movieTitle, movieYear)
    ]).then(function (data) {
      return data;
    }).catch(handleError);
  }
};
