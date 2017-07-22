import React from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
var PropTypes = require('prop-types');




class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      title: null,
      actors: [],
      genre: null,
      year: null,
      rating: null,
      posterUrl: null
    };
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  onClickDelete() {
    var id = this.props.id;
    this.props.onDelete(id);
  }
  componentDidMount() {
      this.setState(function () {
        return {
          id: this.props.id,
          title: this.props.title,
          actors: this.props.actors,
          genre: this.props.genre,
          year: this.props.year,
          rating: this.props.rating,
          posterUrl: this.props.posterUrl
        }
      });
    }

  render() {
    var movies = this.state.movies;
    var title = this.state.title;
    var actors = this.state.actors;
    var genre =  this.state.genre;
    var year = this.state.year;
    var rating =  this.state.rating;
    var posterUrl = this.state.posterUrl;

    return (
      <li>
      <div className='card'>
        <Row className='text-center'>
          <Col id='card-top'xs={12} md={6}>
            <CardPoster
               imageSrc='http://via.placeholder.com/350x425'
            />
          </Col>
          <Col id='card-block' xs={12} md={6} className='my-auto'>
            <CardBlock
              movieTitle={title}
              actors={actors}
              genre={genre}
              year={year}
              rating={rating}
            />
          </Col>
          <hr className='my-0'/>
          <Col sm={12}>
            <button type="button" className="btn btn-danger mt-2" onClick={this.onClickDelete}>
              <i className="fa fa-minus-circle" aria-hidden="true"> REMOVE</i>
            </button>
          </Col>
        </Row>
      </div>
      </li>
    )
  }
}

Movie.PropTypes = {
  actors: PropTypes.array.isRequired
}

function CardPoster (props) {
  return (
    <img className ='card-img-top img-fluid'
      src={props.imageSrc}
      alt={props.movieTitle}>
    </img>
  )
}

function CardBlock (props) {
  return (
    <div className="card-block">
      <Row>
        <Col sm={12}>
          <h1 className="movie-title">{props.movieTitle}</h1>
        </Col>
        <Col sm={12}>
          <p>{props.rating} | {props.genre} | {props.year}</p>
        </Col>
        <Col sm={12}>
          Starring: {props.actors.join(', ')}
        </Col>
      </Row>
    </div>
  )
}


export default Movie;
