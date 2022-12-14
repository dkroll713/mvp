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
      answer: null,
    }
  }

  getMovie = () => {
    // let rng = Math.floor(Math.random() * 5000)
    let rng = null;
    return axios.get(`http://${cf.server}/randomMovie`)
    .then(res => {
      rng = res.data.id
      // console.log(res.data)
      // console.log(rng);
    return axios.get(`https://api.themoviedb.org/3/movie/${rng}?api_key=${cf.api_key}&language=en-US`)
    })

  }

  getCast = (id) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${cf.api_key}&language=en-US`)
  }

  getActor = id => {
    let rng = null;
    return axios.get(`http://${cf.server}/randomActor`)
    .then(res => {
      rng = res.data.id;
      // console.log('actor data:', res.data)
      return axios.get(`https://api.themoviedb.org/3/person/${rng}?api_key=${cf.api_key}&language=en-US`)
    })
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

  sortArray = array => {
    // console.log(array);
    const greaterThan = function(num1, num2) {
      if (num1 > num2) {
        return true;
      } else {
        return false;
      }
    }
    let n, nPlusOne;
    let passes = true;
    for (var x = 0; x < array.length; x++) {
      n = array[x].popularity;
      if (array[x+1]) {
        nPlusOne = array[x+1].popularity
      } else {
        nPlusOne = 9000
      }

      if (greaterThan(n, nPlusOne)) {
        let tmp = array[x];
        array[x] = array[x+1]
        array[x+1] = tmp
        passes = false;
      }
    }

    if (!passes) {
      this.sortArray(array);
    }
    return array;
  }

  shuffle = (array) => {
    let tmp = [];
    while (array.length > 0) {
      let rng = Math.floor(Math.random() * array.length-1);
      tmp.push(array.splice(rng, 1)[0])
    }
    return tmp
  }

  populateChoices = () => {
    // debugger;

    // populate movie choices
    if (this.props.type === 'actor') {
      let choices = JSON.parse(JSON.stringify(this.state.choices))
      let id = null;
      // answer - first try
      axios.get(`https://api.themoviedb.org/3/movie/${this.state.choices[0].movie.id}/credits?api_key=${cf.api_key}&language=en-US`)
      .catch(err => {
        console.log('failed getting next movie')
        // answer - second try
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.choices[1].movie.id}/credits?api_key=${cf.api_key}&language=en-US`)
          .catch(
            console.log('failed again - three more tries')
            // answer - third try
            // axios.get(`https://api.themoviedb.org/3/movie/${this.state.choices[2].movie.id}/credits?api_key=${cf.api_key}&language=en-US`)
              .catch(
                console.log('failed again - two more tries')
              )
              .then(res => {
              // console.log('original cast:', res.data)
              let answerObj = this.state.choices[0]
              let names = this.getCastNames(res.data.cast);
              answerObj.cast = names;
              choices[0] = answerObj;
              this.setState({
                choices: choices,
                cast: names
              })
            })
          )
          .then(res => {
            console.log('trying again')
            // console.log('original cast:', res.data)
            let answerObj = this.state.choices[0]
            let names = this.getCastNames(res.data.cast);
            answerObj.cast = names;
            choices[0] = answerObj;
            this.setState({
              choices: choices,
              cast: names
            })
          })
      })
      .then(res => {
        // console.log('original cast:', res.data)
        let answerObj = this.state.choices[0]
        let names = this.getCastNames(res.data.cast);
        answerObj.cast = names;
        choices[0] = answerObj;
        this.setState({
          choices: choices,
          cast: names
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
          // console.log('final choices:', choices)
          choices = this.shuffle(choices)
          // console.log('final choices:', choices)
          this.setState({
            choices: choices
          })
        }
        const sleep = ms => new Promise(r => setTimeout(r, ms));
        Promise.resolve(sleep(500))
      })
      .catch(err => {
        console.log('error with first movie:', err)
      })
      .then(() => {
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
            // console.log('final choices:', choices)
            choices = this.shuffle(choices)
            // console.log('final choices:', choices)
            this.setState({
              choices: choices
            })
          }
          const sleep = ms => new Promise(r => setTimeout(r, ms));
          Promise.resolve(sleep(500))
        })
        .catch(err => {
          console.log('error with second movie:', err)
        })
        .then(() => {
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
              // console.log('final choices:', choices)
              choices = this.shuffle(choices)
              // console.log('final choices:', choices)
              this.setState({
                choices: choices,
              })
            }
         })
       })
      // third
      })
      // second
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      Promise.resolve(sleep(500))
      this.setState({
        loaded: true,
      })
    } else if (this.props.type === 'movie') {
      // first actor
      let rng = Math.floor(Math.random() * 5)
      console.log(rng, this.props.validChoices)
      console.log('new actor:', this.props.validChoices[rng].name);
      let actor = this.props.validChoices[rng];
      let choices = [];
      choices.push(actor);
      this.setState({
        choices: choices,
        answer: actor
      })
      this.getActorsMovies(actor.id)
      .then(res => {
        let movies = this.sortArray(res.data.cast);
        movies = movies.slice(movies.length-10);
        console.log('possible movies for new actor:', movies)
      })
      // second actor
      .then(() => {
        let rng = Math.floor(Math.random() * 1000)
        this.getActor(rng)
        .then(res => {
          let choices = JSON.parse(JSON.stringify(this.state.choices))
          choices.push(res.data)
          // console.log('final choices:', choices)
          choices = this.shuffle(choices)
          // console.log('final choices:', choices)
          console.log(res.data.name);
          this.setState({
            choices: choices
          })
        })
        .then(() => {
          let rng = Math.floor(Math.random() * 1000)
          this.getActor(rng)
          .then(res => {
            let choices = JSON.parse(JSON.stringify(this.state.choices))
            choices.push(res.data);
            // console.log('final choices:', choices)
            choices = this.shuffle(choices)
            // console.log('final choices:', choices)
            console.log(res.data.name);
            this.setState({
              choices: choices
            })
          })
        })
        .then(() => {
          let rng = Math.floor(Math.random() * 1000)
          this.getActor(rng)
          .then(res => {
            let choices = JSON.parse(JSON.stringify(this.state.choices))
            choices.push(res.data);
            // console.log('final choices:', choices)
            choices = this.shuffle(choices)
            // console.log('final choices:', choices)
            console.log(res.data.name)
            this.setState({
              choices: choices
            })
            console.log('filled choices array:', choices);
          })
        })
      })
      this.setState({
        loaded: true,
      })
    }
  }

 static getDerivedStateFromProps(nextProps, prevState) {
  if (Array.isArray(nextProps.validChoices) && prevState.choices.length < 1 && nextProps.type === 'actor') {
    console.log('getting derived state:', nextProps.validChoices.length - 1);
    let rng = Math.floor(Math.random() * nextProps.validChoices.length - 1);
    let choices = [];
    let choice = nextProps.validChoices[rng];
    let movieObj = {};
    movieObj.movie = choice;
    console.log('choice:', choice);

    choices.push(movieObj)
    // console.log('choices', choices)
    return {choices: choices, answer: choice.title}
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
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap'
            }}>
              {this.state.choices.map(choice => {
                // debugger;
                return <Card
                // choice.movie and choice.cast
                  key={'x'+choice.movie.title}
                  movie={choice.movie}
                  cast={choice.cast}
                  answer={this.state.answer}
                  match={this.props.choice}
                  check = {this.props.check}
                  end={this.props.end}
                  type={this.props.type}
                />
              })}
            </div>
          )
        } else if (this.props.type === 'movie') {
          return (
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap'
            }}>
              {this.state.choices.map(choice => {
                // debugger;
                return <Card
                  key={'x'+choice.name}
                  name={choice.name}
                  answer={this.state.answer.name}
                  actor={choice}
                  match={this.props.choice}
                  check = {this.props.check}
                  end={this.props.end}
                  type={this.props.type}
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