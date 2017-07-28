import React from 'react';
import { Grid, Row, Modal} from 'react-bootstrap';
import Movie from './Movie.js';
import MovieModal from './MovieModal.js';
import * as api from '../utils/api';
import * as firebase from "firebase";

class Movies extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      movies: [],
      search:''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;

    this.setState(function () {
      var newState = {};
      newState['search'] = value;
      return newState;
    });
  }

  handleSubmit(title, genre, year, rating, actors) {
    let newTitle = title;
    let newYear = year;
    let newGenre = genre;
    let newRating = rating;
    let newActors = actors;

    api.getPosterUrl(newTitle, newYear)
    .then(function(posterUrl){

      const database = firebase.database();
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
        posterUrl: posterUrl,
        actors: newActors
      }).then(() => {
        alert('Your movie was saved!');
      });
    });
    this.handleModalClose();

  }
  handleDelete (id) {
    var database = firebase.database();
    const movieRef = database.ref().child('movies');
    const deleteMovieRef = movieRef.child(id);

    deleteMovieRef.remove();
  }

  handleUpdate(id, title, genre, year, rating, actors) {

    api.getPosterUrl(title, year)
    .then(function(posterUrl){

        const database = firebase.database();
        const movieRef = database.ref().child('movies');
        const updateMovieRef = movieRef.child(id);

        let update = {
          id: id,
          title: title,
          genre: genre,
          rating: rating,
          year: year,
          posterUrl: posterUrl,
          actors: actors
        };
        updateMovieRef.update(update);
      }).then(() => {
        alert('Your movie was updated!');
        this.handleModalClose();
      })

  }

  handleModalOpen(type, header, ...update) {
    let updateMovie = update;
    this.setState({
      showModal: true,
      header: header,
      type: type,
      update: updateMovie
    });
  }
  handleModalClose() {
    this.setState({ showModal: false });
  }
  renderModal() {
    console.log('render modal');
    console.log(this.state.showModal)
    if (!this.state.showModal) {
      return null;
    }

    if(this.state.type === "ADD") {
      return (
        <MovieModal
          onModalClose={this.handleModalClose}
          onSubmit={this.handleSubmit}
          header={this.state.header}
          movieToUpdate={this.state.update}
          type={this.state.type}
        />
      );
    } else {
      return (
        <MovieModal
          onModalClose={this.handleModalClose}
          onSubmit={this.handleUpdate}
          header={this.state.header}
          movieToUpdate={this.state.update}
          type={this.state.type}
        />
      )
    }

  }

  componentDidMount(){
    //login
    firebase.auth().signInAnonymously();

    const database = firebase.database();
    const moviesRef = database.ref().child('movies');

    moviesRef.on('child_added', snap => {
      const newMovie = {
          id: snap.key,
          title: snap.val().title,
          genre: snap.val().genre,
          rating: snap.val().rating,
          year: snap.val().year,
          posterUrl: snap.val().posterUrl,
          actors: snap.val().actors
      };
       this.setState(previousState => {
          movies: previousState.movies.push(newMovie);
        });
      });

    moviesRef.on('child_changed', snap => {
      let currentMovies = this.state.movies;
      let updatedMovie = currentMovies.find((movie => {
          return movie.id === snap.val().id;
      }));
      let movieIndex = currentMovies.indexOf(updatedMovie);

      currentMovies.splice(movieIndex, 1, snap.val());
       this.setState({
          movies: currentMovies
        });
      });

    moviesRef.on('child_removed', snap => {

      let currentMovies = this.state.movies;
      let updatedMoviesList = currentMovies.filter((movie => {
        return movie.id !== snap.key;
      }));

      this.setState({
         movies: updatedMoviesList
      });
    });
  }

  render() {

    let filteredMovies = this.state.movies.filter(
      (movie) => {
        return movie.title.toLowerCase()
        .indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );

    return(
      <Grid>
        <Modal show={this.state.showModal}>
          {this.renderModal()}
        </Modal>
        <input
          className="my-3"
          type="text"
          placeholder="Search Movie"
          id="title"
          value={this.state.search}
          onChange={this.handleChange.bind(this)}
        >
        </input>
        <ul>
          <Row className="no-gutters">
            {filteredMovies.map((movie, index) => {
              return (
                <div className='col-12 col-md-6 col-lg-4' key={movie.id}>
                    <Movie
                      id={movie.id}
                      index={index}
                      title={movie.title}
                      actors={movie.actors}
                      genre={movie.genre}
                      year={movie.year}
                      rating={movie.rating}
                      posterUrl= {movie.posterUrl}
                      onClickDelete={() => this.handleDelete(movie.id)}
                      onUpdate={() => this.handleModalOpen('UPDATE', 'UPDATE MOVIE', movie.id,
                        movie.title, movie.genre, movie.year, movie.rating, movie.actors)}
                    />
                </div>
              )
            })}
          </Row>
        </ul>
        <i id="fab" className="fa fa-plus"
          onClick={() => this.handleModalOpen('ADD', 'ADD MOVIE')}
          aria-hidden="true" ></i>
      </Grid>
    );
  }
}

export default Movies;
