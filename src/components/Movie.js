import React from 'react';
var PropTypes = require('prop-types');

function Movie(props) {
    return (
      <li id={props.title}>
        <div className='card'>
          <MoviePoster
             imageSrc={props.posterUrl}
          />
          <CardBlock
            movieTitle={props.title}
            actors={props.actors}
            genre={props.genre}
            year={props.year}
            rating={props.rating}
          />
          <hr className="my-2"/>
          <i className="fa fa-pencil" onClick={props.onUpdate} aria-hidden="true"></i>
          <button type="button" className="delete-btn btn btn-danger my-2" onClick={props.onClickDelete}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
          </button>
        </div>
      </li>
    );
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
      <h1 className="movie-title mt-3">{props.movieTitle}</h1>
      <div className="movie-details mt-3">
        <p className="movie-rating"> <i className="fa fa-star" aria-hidden="true"></i> {props.rating}/5</p>
        <p>{props.genre} <span className="vertical-divider"> | </span> {props.year}</p>
        <p className="mt-2"> <span className="actors">Cast</span>: {props.actors.join(', ')}</p>
      </div>
    </div>
  )
}


export default Movie;
