import React from 'react';
import { Grid, Row, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
var Link = require('react-router-dom').Link;

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;

    this.setState(function () {
      return {
        title: value
      }
    });
  }


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
}

export default Home;
