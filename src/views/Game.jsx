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
      film: null,
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

  getActorsMovies = (id) => {
    return axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${cf.api_key}&language=en-US`)
  }

  getCastNames = (array) => {
    let names = [];
    for (var x = 0; x < array.length; x++) {
      names.push(array[x].name)
    }
    return names
  }

  populateChoices = () => {

    if (this.props.type === 'actor') {
      let choices = JSON.parse(JSON.stringify(this.state.choices))
      let id = null;
      // answer
      axios.get(`https://api.themoviedb.org/3/movie/${this.state.choices[0].movie.id}/credits?api_key=${cf.api_key}&language=en-US`)
      .then(res => {
        // console.log('original cast:', res.data)
        let answerObj = this.state.choices[0]
        answerObj.cast = this.getCastNames(res.data.cast);
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
            const sleep = ms => new Promise(r => setTimeout(r, ms));
            Promise.resolve(sleep(500))
            // console.log(res.data.cast);
            movieObj.cast = res.data.cast
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
            const sleep = ms => new Promise(r => setTimeout(r, ms));
            Promise.resolve(sleep(500))
            // console.log(res.data.cast)
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
            const sleep = ms => new Promise(r => setTimeout(r, ms));
            Promise.resolve(sleep(500))
            let names = res.data.cast;
            // console.log(names);
            movieObj.cast = names
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
    } else if (this.props.type === 'movie') {
      let rng = Math.floor(Math.random() * 5)
      console.log(this.props.validChoices[rng]);

    }
  }

 static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.validChoices && prevState.choices.length < 1 && nextProps.type === 'actor') {
    let rng = Math.floor(Math.random() * nextProps.validChoices.length - 1);
    let choices = [];
    let choice = nextProps.validChoices[rng];
    let movieObj = {};
    movieObj.movie = choice;

    choices.push(movieObj)
    console.log('choices', choices)
    return {choices: choices, film: choice.title}
  } else {
    return null
  }
 }

  render() {
    if (this.props.validChoices) {
      // console.log(this.props.validChoices)
      if (this.state.loaded) {
        if (this.props.type === 'actor') {
          return (
            <div>
              <p>Game</p>
              {this.state.choices.map(choice => {
                return <Card
                // choice.movie and choice.cast
                  key={'x'+choice.movie.title}
                  movie={choice.movie}
                  cast={choice.cast}
                  film={this.state.film}
                  match={this.props.choice}
                  check = {this.props.check}
                  end={this.props.end}
                />
              })}
            </div>
          )
        }
      }
      else if (this.state.choices.length < 4) {
        this.populateChoices();
      }
    }
  }
}

export default Game;