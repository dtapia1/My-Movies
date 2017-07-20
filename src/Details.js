import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Grid, Row, Col, Clearfix} from 'react-bootstrap';
import Movie from './Movie.js'
var queryString = require('query-string');
var PropTypes = require('prop-types');




class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      actors: null,
      genre: null,
      year: null,
      rating: null,
      posterUrl: null,
      found: false,
      movies:
      [
        {
          title: 'Star Wars',
          actors: ['Lord Vader', 'Jedi'],
          genre: 'Fantasy',
          year: 2016,
          rating: 'PG-13',
          posterUrl: ''
        },
        {
          title: 'Spider Man',
          actors: ['Peter Parker', 'Vulture'],
          genre: 'Fantasy',
          year: 2017,
          rating: 'PG-13',
          posterUrl: ''
        },
        {
          title: 'Planet of the ',
          actors: ['Woody', 'Ceasr'],
          genre: 'Fantasy',
          year: 2017,
          rating: 'PG-13',
          posterUrl: ''
        }

      ]
    }
  }
  componentDidMount() {

    var title = queryString.parse(this.props.location.search).movieTitle;
    console.log(title);
    var movies = this.state.movies; //call search to db
    var movie = null;
    if(movies != null){

      movie = movies.find(x => x.title === title);
console.log(movie);
    }

    if (movie !== undefined) {
      this.setState(function () {
        return {
          title: movie.title,
          actors: movie.actors,
          genre: movie.genre,
          year: movie.year,
          rating: movie.rating,
          posterUrl: movie.posterUrl,
          found: true
        }
      });
    }


    }

  render() {
    var movies = this.state.movies;
    var title = this.state.title;
    var actors = this.state.actors;
    var genre =  this.state.genre;
    var year = this.state.year;
    var rating =  this.state.rating;
    var posterUrl = this.state.posterUrl;
    var found = this.state.found;

    if (found === false) {
      return (<p>Error</p>)
    }

    return (
      <Movie
        movieTitle={title}
        actors={actors}
        genre={genre}
        year={year}
        rating={rating}
        posterUrl= {posterUrl}
      />
    )
  }
}

// Details.defaultProps = {
//   search: null
// };

// Cards.PropTypes = {
// imageSrc: PropTypes.string.isrequired,
// cardTitle: PropTypes.string.isrequired,
// cardText: PropTypes.string.isrequired,
// skills: PropTypes.array.isrequired,
// cardDemoLink: PropTypes.bool.isrequired
// }



export default Details;
