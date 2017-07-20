import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Movie from './Movie.js';
import { Grid, Row, Col} from 'react-bootstrap';
var PropTypes = require('prop-types'); //


function MovieGrid (props) {
  var movies = [
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

  ];

  return (
    <Grid>
    <ul>
      <Row>
      {movies.map((movie, index) => {
        return (
        <Col sm={6} key={movie.title}>
              <li >

                  <Movie
                    title={movie.title}
                    actors={movie.actors}
                    genre={movie.genre}
                    year={movie.year}
                    rating={movie.rating}
                    posterUrl= {movie.posterUrl}
                  />

              </li>
  </Col>

        )
      })}
      </Row>
    </ul>
    </Grid>
  )
}


// MovieGrid.propTypes = {
//   movies: PropTypes.array.isRequired
// }

class Movies extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      movies: null
    };

    //this.updateLanguage = this.updateLanguage.bind(this);
  }


  render () {
    var match = this.props.match;
    console.log(match);
    return (
        <div>
          <MovieGrid />
        </div>
      )
    }
}


export default Movies;
