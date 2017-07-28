import React from 'react';
import {FormGroup, Modal} from 'react-bootstrap';

class MovieModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      genre: '',
      year: '',
      rating: '',
      actors: [],
      validTitle: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getValidationStateTitle() {
    const length = this.state.title.length;
    if (length > 0) {
      return 'success';
    } else return 'error';
  }
  getValidationStateGenre() {
    const length = this.state.genre.length;
    if (length > 0) return 'success';
    else return 'error';
  }
  getValidationStateYear() {
    let val = this.state.year;
    let pattern = new RegExp("[0-9]");
    let res = pattern.test(val);
    const length = val.length;

    if (length === 4 && val > 0 && res) return 'success';
    else return 'error';
  }
  getValidationStateActors() {
    let val = this.state.actors;
    let pattern = new RegExp("[A-Za-z]");
    let res = pattern.test(val);

    if (res) return 'success';
    else return 'error';
  }
  getValidationStateRating() {
    let val = this.state.rating;
    let pattern = new RegExp("[1-5]");
    let res = pattern.test(val);
    const length = val.length;

    if (length === 1 && res) return 'success';
    else return 'error';
  }

  handleChange(event) {
    var id = event.target.id;
    var value = event.target.value;

    if(id === 'actors'){
      value = value.split(',');
    }
    this.setState(function () {
      var newState = {};
      newState[id] = value;
      return newState;
    });
  }

  allFieldsValid() {
    let validTitle = this.getValidationStateTitle();
    let validGenre = this.getValidationStateGenre();
    let validYear = this.getValidationStateYear();
    let validActors = this.getValidationStateActors();
    let validRating = this.getValidationStateRating();
    if(validTitle === 'success' && validGenre ==='success'
    && validYear === 'success' && validActors === 'success' && validRating === 'success'){
      return true;
    } else {
      return false;
    }
  }
  handleSubmit(event) {

    if(this.props.type === "ADD") {
      this.props.onSubmit(
        this.state.title,
        this.state.genre,
        this.state.year,
        this.state.rating,
        this.state.actors
      );
    } else {
      this.props.onSubmit(
        this.state.id,
        this.state.title,
        this.state.genre,
        this.state.year,
        this.state.rating,
        this.state.actors
      );
    }
    // clear form
    this.setState({
        title: '',
        genre: '',
        year: '',
        rating: '',
        actors: [],
        validTitle: false
    });
    event.preventDefault();
  }
  componentDidMount() {
    let movieToUpdate = this.props.movieToUpdate;

    if(movieToUpdate.length > 0) {
      this.setState ({
        id: movieToUpdate[0],
        title: movieToUpdate[1],
        genre: movieToUpdate[2],
        year: movieToUpdate[3],
        rating: movieToUpdate[4],
        actors: movieToUpdate[5],
      });
    }
  }
  render() {
    return(
      <div className="my-auto">
        <div className="modal-header">
          <h5 className="modal-title" id="movieModalLabel">{this.props.header}</h5>
        </div>
        <div className="modal-body">
          <form className="modal-form" onSubmit={this.handleSubmit}>
            <FormGroup validationState={this.getValidationStateTitle()}>
              <label htmlFor="title" className="form-control-label">Title:</label>
              <input placeholder="Spider Man: Homecoming" type="text" value={this.state.title} onChange={this.handleChange} className="form-control" id="title"></input>
            </FormGroup>
            <FormGroup validationState={this.getValidationStateGenre()}>
              <label htmlFor="genre" className="form-control-label">Genre:</label>
              <input placeholder="Action" type="text" value={this.state.genre} onChange={this.handleChange} className="form-control" id="genre"></input>
            </FormGroup>
            <FormGroup validationState={this.getValidationStateYear()}>
              <label htmlFor="year" className="form-control-label">Year:</label>
              <input placeholder="2017" type="text" value={this.state.year} onChange={this.handleChange} className="form-control" id="year"></input>
            </FormGroup>
            <FormGroup validationState={this.getValidationStateActors()}>
              <label htmlFor="actors" className="form-control-label">Cast:</label>
              <input placeholder="Tom Holland, Robert Downey" type="text" value={this.state.actors} onChange={this.handleChange}className="form-control" id="actors"></input>
              <small id="passwordHelpInline" className="form-inline text-muted">
                Separate each name with a comma.
              </small>
            </FormGroup>
            <FormGroup validationState={this.getValidationStateRating()}>
              <label htmlFor="rating" className="form-control-label">Rating:</label>
              <input placeholder="3" type="text" value={this.state.rating} onChange={this.handleChange} className="form-control" id="rating"></input>
              <small id="passwordHelpInline" className="form-inline text-muted">
                Must be a whole number 1-5.
              </small>
            </FormGroup>
            <div className="modal-footer">
              <button type="button" onClick={this.props.onModalClose} className="btn btn-secondary" >Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={!this.allFieldsValid()}>Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MovieModal;
