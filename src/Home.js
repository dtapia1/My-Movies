import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Grid, Row, Col, FormGroup, FormControl, HelpBlock, ControlLabel, Button} from 'react-bootstrap';
var Link = require('react-router-dom').Link;

const Home = React.createClass({
  getInitialState() {
    return {
      title: ''
    };
  },

  getValidationState() {
    const length = this.state.title.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },

  handleChange(e) {
    this.setState({ title: e.target.value });

    // this.setState(function () {
    //   return {
    //     title: value
    //   }
    // });

  },

  render() {
    var match = this.props.match;
    var movieTitle = this.state.title;
    console.log(match);
    return (
      <Grid className='h-100'>
        <Row className='h-100 text-center justify-content-center align-items-center'>
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Search for a Movie</ControlLabel>
              <FormControl
                type="text"
                value={this.state.value}
                placeholder="Enter movie title"
                onChange={this.handleChange}

              />
              <FormControl.Feedback />
            </FormGroup>

            <Link className='button' to={{
                pathname: match.url = '/details',
                search: '?movieTitle=' + movieTitle
              }}
            >
              <Button
                type='submit'
                disabled={!this.state.title}>
                Search
              </Button>
            </Link>
          </form>
        </Row>
      </Grid>
    );
  }
});

export default Home;
