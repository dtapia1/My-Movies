import React from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import Movie from './Movie.js';
import * as firebase from "firebase";
var PropTypes = require('prop-types');

class Test extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: []
    };
  }

  componentDidMount(){
    var database = firebase.database();

    //login
    firebase.auth().signInAnonymously();
    firebase.auth().onAuthStateChanged(firebaseUser => {

      if(firebaseUser){
        const movieRef = database.ref().child('movies');
        var currentMovies = this.state.movies;

        // var newMovieRef = movieRef.push();
        // newMovieRef.set({
        //   title: 'Star Wars',
        //   genre: 'Action',
        //   rating: 'PG-13',
        //   year: 2017,
        //   posterUrl: '',
        //   actors: [
        //     'Jedi',
        //     'Sith'
        //   ]
        // });
        movieRef.on('child_added', snap => {
          //  var title = snap.child('title').val();
           currentMovies.push(snap.val());
            this.setState({
              movies: currentMovies
            });
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
                <Col sm={6} key={index}>
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
    );
  }
}

Test.propTypes = {
  movies: PropTypes.array
}

export default Test;
