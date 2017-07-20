import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Grid, Row, Col, Clearfix} from 'react-bootstrap';
var PropTypes = require('prop-types');




class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      actors: null,
      genre: null,
      year: null,
      rating: null,
      posterUrl: null
    }
  }
  componentDidMount() {
      this.setState(function () {
        return {
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
      <div className='card'>
        <Row className='text-center'>
          <Col id='card-top'xs={12} md={6}>
            <CardPoster
               imageSrc='http://via.placeholder.com/350x550'
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
        </Row>
      </div>
    )
  }
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
          <h1>{props.movieTitle}</h1>
        </Col>
        <Col sm={12}>
          <p>{props.rating} | {props.genre} | {props.year}</p>
        </Col>
        <Col sm={12}>
          Starring: {props.actors}
        </Col>
      </Row>
    </div>
  )
}


export default Movie;
