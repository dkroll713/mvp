import React from 'react';
import Card from './Card.jsx'

const axios = require('axios');
const cf = require('../../config.js')

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      choices: [],
      loaded: false,
    }
  }

  getMovie = () => {
    let rng = Math.floor(Math.random() * 1000)
    console.log(rng);
    return axios.get(`https://api.themoviedb.org/3/movie/${rng}?api_key=${cf.api_key}&language=en-US`)
  }

  getCast = (id) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${cf.api_key}&language=en-US`)
  }

  populateChoices = () => {
    // let rng = Math.floor(Math.random() * this.props.validChoices.length - 1)
    let choices = JSON.parse(JSON.stringify(this.state.choices))
    let id = null;
    // answer
    axios.get(`https://api.themoviedb.org/3/movie/${this.state.choices[0].movie.id}/credits?api_key=${cf.api_key}&language=en-US`)
    .then(res => {
      console.log('original cast:', res.data)
      let answerObj = this.state.choices[0]
      answerObj.cast = res.data.cast;
      choices[0] = answerObj;
      this.setState({
        choices: choices
      })
    })

    // first
    this.getMovie()
    .then((res, err) => {
      if (res) {
        let movieObj = {
        }
        // console.log(res.data);
        movieObj.movie = res.data;
        // choices.push(res.data);
        id = res.data.id
        this.getCast(id)
        .then(res => {
          movieObj.cast = res.data.cast;
        })
        choices.push(movieObj)
        this.setState({
          choices: choices
        })
      }
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      Promise.resolve(sleep(500))
    })
    // second
    this.getMovie()
    .then((res, err) => {
      if (res) {
        // console.log(res.data);
        let movieObj = {};
        movieObj.movie = res.data;
        // choices.push(res.data);
        id = res.data.id
        this.getCast(id)
        .then(res => {
          movieObj.cast = res.data.cast;
        })
        choices.push(movieObj)
        this.setState({
          choices: choices
        })
      }
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      Promise.resolve(sleep(500))
    })
    // third
    this.getMovie()
    .then((res, err) => {
      if (res) {
        // console.log(res.data);
        let movieObj = {};
        movieObj.movie = res.data;
        // choices.push(res.data);
        id = res.data.id
        this.getCast(id)
        .then(res => {
          movieObj.cast = res.data.cast;
        })
        choices.push(movieObj)
        this.setState({
          choices: choices
        })
      }
    })
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    Promise.resolve(sleep(500))
    this.setState({
      loaded: true,
    })
  }

  checkForMatch = () => {
    console.log(this.props.choice);
  }

 static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.validChoices && prevState.choices.length < 1) {
    let rng = Math.floor(Math.random() * nextProps.validChoices.length - 1);
    let choices = [];
    let choice = nextProps.validChoices[rng];
    let movieObj = {};
    movieObj.movie = choice;

    choices.push(movieObj)
    return {choices: choices}
  } else {
    return null
  }
 }

  render() {
    if (this.props.validChoices) {
      // console.log(this.props.validChoices)
      if (this.state.loaded) {
        // let id = choices[0].id;
        // this.getCast(id)
        //   .then(res => {
        //     console.log(res);
        //   })
        return (
          <div>
            <p>Game</p>
            {this.state.choices.map(choice => {
              return <Card
              // choice.movie and choice.cast
                key={'x'+choice.movie.title}
                movie={choice.movie}
                cast={choice.cast}
                match={this.props.choice}
                check = {this.checkForMatch}
              />
            })}
          </div>
        )
      }
      else if (this.state.choices.length < 4) {
        this.populateChoices();
      }
    }
  }
}

export default Game;