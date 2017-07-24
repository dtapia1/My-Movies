import React from 'react';
var PropTypes = require('prop-types');

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      actors: [],
      genre: '',
      year: '',
      rating: '',
      posterUrl: ''
    };
    this.onClickDelete = this.onClickDelete.bind(this);
  }
  onClickDelete() {
    let id = this.props.id;
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
    var title = this.props.title;
    var actors = this.props.actors;
    var genre =  this.props.genre;
    var year = this.props.year;
    var rating =  this.props.rating;
    var posterUrl = this.props.posterUrl;

    return (
      <li id={title}>
        <div className='card'>
          <MoviePoster
             imageSrc={posterUrl}
          />
          <CardBlock
            movieTitle={title}
            actors={actors}
            genre={genre}
            year={year}
            rating={rating}
          />
          <hr/>
          <button type="button" className="remove-btn btn btn-danger my-2" onClick={this.onClickDelete}>
            <i className="fa fa-minus-circle" aria-hidden="true"></i>
          </button>
        </div>

      </li>

    )
  }
}

Movie.PropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  actors: PropTypes.array.isRequired,
}

function MoviePoster (props) {
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
      <h1 className="movie-title">{props.movieTitle}</h1>
      <p className="movie-rating"> <i className="fa fa-star" aria-hidden="true"></i> {props.rating}/5</p>
      <p>{props.genre} <span className="vertical-divider"> | </span> {props.year}</p>
      <p className="mt-2"> <span className="actors">Cast</span>: {props.actors.join(', ')}</p>
    </div>
  )
}


export default Movie;
