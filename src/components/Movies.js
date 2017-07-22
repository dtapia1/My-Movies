import React from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import Movie from './Movie.js';
import Modal from './Modal.js';
import * as firebase from "firebase";
var PropTypes = require('prop-types');

class Movies extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }


  handleSubmit(title, genre, year, rating, posterUrl, actors) {
    let newTitle = title;
    let newYear = year;
    let newGenre = genre;
    let newRating = rating;
    let newPosterUrl = posterUrl;
    let newActors = actors;

    let database = firebase.database();
    const movieRef = database.ref().child('movies');
    let newMovieRef = movieRef.push();
    let newMovieKey = newMovieRef.key;
    //save new movie to database
    newMovieRef.set({
      id: newMovieKey,
      title: newTitle,
      genre: newGenre,
      rating: newRating,
      year: newYear,
      posterUrl: newPosterUrl,
      actors: newActors
    }).then(() => {
      alert('Your movie was saved!');
    });
  }
  deleteMovie (id) {
    var database = firebase.database();
    const movieRef = database.ref().child('movies');
    const deleteMovieRef = movieRef.child(id);

    deleteMovieRef.remove();
  }

  componentDidMount(){
    var database = firebase.database();

    //login
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged(firebaseUser => {

    if(firebaseUser){
      const moviesRef = database.ref().child('movies');
      var currentMovies = this.state.movies;

      moviesRef.on('child_added', snap => {
        console.log('snap ' + snap.val().id)
         currentMovies.push(snap.val());
          this.setState({
            movies: currentMovies
          });
        });
        
      moviesRef.on('child_removed', snap => {
        const updatedMoviesList = currentMovies.filter((movie) => {
          if(movie.id !== snap.val().id)
            return movie;
          });
          this.setState({movies: updatedMoviesList});
        });
      }
    });
  }

  render(){
    return(
      <Grid>
        <ul>
          <Row>
            {this.state.movies.map((movie, index) => {
              return (
                <Col md={6} key={index}>
                    <Movie
                      id={movie.id}
                      index={index}
                      title={movie.title}
                      actors={movie.actors}
                      genre={movie.genre}
                      year={movie.year}
                      rating={movie.rating}
                      posterUrl= {movie.posterUrl}
                      onDelete={this.deleteMovie}
                    />

                </Col>
              )
            })}
          </Row>
        </ul>
        <Modal
          onSubmit={this.handleSubmit}
        />
          <i id="fab" className="fa fa-3x fa-plus-circle" data-toggle="modal" data-target="#movieModal" aria-hidden="true"></i>
      </Grid>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.array
}

export default Movies;
