import React from 'react';
import Game from './Game.jsx'

const cf = require ('../../config.js')

const axios = require('axios');

class Solo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pregame: true,
      score: 0,
      choice: null,
      choiceName: null,
      id: null,
      options: null,
      gameOver: false,
      submitted: false,
    }
  }

  startGame = e => {
    // console.log(e.target.innerHTML);
    // console.log(e.target.id);
    this.setState({
      pregame: false,
      choice: e.target.className,
      choiceName: e.target.innerHTML,
      id: e.target.id
    }, () => {
      axios.get(`https://api.themoviedb.org/3/person/${this.state.id}/movie_credits?api_key=${cf.api_key}&language=en-US`)
      .then((res) => {
        // console.log(res.data.cast);
        this.removeDuplicates(res.data.cast)
        let sorted = this.sortArray(res.data.cast);
        sorted = sorted.slice(sorted.length-10);
        // console.log(sorted);
        this.setState({
          options: sorted,
        })
      })
    })
  }

  removeDuplicates = array => {
    let obj = {};
    for (var x = 0; x < array.length; x++) {
      let title = array[x].original_title;
      if (obj[title] === undefined) {
        obj[title] = 1;
      } else {
        let splice = array.splice(x, 1);
        console.log(splice);
      }
    }
    // console.log(array)
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

  check = (newChoice, id) => {
    if (this.state.choice === 'actor') {
      this.setState({
        score: this.state.score += 1,
        choice: 'movie',
        choiceName: newChoice,
        id: id,
        options: null,
      }, () => {
        // axios.get()
      })
    } else if (this.state.choice === 'movie') {
      this.setState({
        score: this.state.score += 1,
        choice: 'actor',
        choiceName: newChoice,
        id: id,
        options: null,
      },() => {
        axios.get(`https://api.themoviedb.org/3/person/${this.state.id}/movie_credits?api_key=${cf.api_key}&language=en-US`)
        .then((res) => {
          // console.log(res.data.cast);
          this.removeDuplicates(res.data.cast)
          let sorted = this.sortArray(res.data.cast);
          sorted = sorted.slice(sorted.length-10);
          // console.log(sorted);
          this.setState({
            options: sorted,
          })
        })
      })
    }
  }

  endGame = (movie, answer) => {
    console.log('game over; final score:', this.state.score);
    console.log(movie, answer)
    this.setState({
      gameOver: true,
      finalAnswer: answer,
      finalChoice: movie
    })
  }

  handleChange = e => {
    this.setState({
      entry: e.target.value,
    })
  }

  submit = e => {
    let obj = {
      "name": this.state.entry,
      "score": this.state.score
    }
    if (this.state.submitted === false) {
      axios.post(`http://${cf.server}/score`, obj)
      this.setState({
        submitted: true,
      })
    }
  }

  getCast = (id) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${cf.api_key}&language=en-US`)
  }

  componentDidUpdate(prevProps, prevState) {
    // debugger;
    if (this.state.choiceName !== prevState.choiceName) {
      console.log('this:', this.state, 'previous:',  prevState);
      console.log('refreshing game')
      this.getCast(this.state.id)
      .then(res => {
        let names = this.sortArray(res.data.cast).slice(res.data.cast.length - 5);
        console.log('potential answers:', names);
        this.setState({
          options: names
        })
      })
    }
  }

  render() {
    if (this.state.pregame) {
      return (
        <div>
          <h2
            style={{textAlign: 'center'}}
            className="subheader"
          >
            Choose an actor or a movie to get started
          </h2>
          <div
            style={{display: 'flex', justifyContent: 'space-around'}}
          >
            <div
              className="container actors"
            >
              <h3 className="subheader">
                Actors
              </h3>
              <ul>
                <li onClick={this.startGame} id='19274' className='actor'>Seth Rogen</li>
                <li onClick={this.startGame} id='6384' className='actor'>Keanu Reeves</li>
                <li onClick={this.startGame} id='3223' className='actor'>Robert Downey Jr.</li>
                <li onClick={this.startGame} id='1229' className='actor'>Jeff Bridges</li>
              </ul>
            </div>
            <div
              className="container movies"
            >
              <h3
                className="subheader"
              >
                Movies
              </h3>
              <ul>
                <li onClick={this.startGame} id='115' className='movie'>The Big Lebowski</li>
                <li onClick={this.startGame} id='603' className='movie'>The Matrix</li>
                <li onClick={this.startGame} id='228967' className='movie'>The Interview</li>
                <li onClick={this.startGame} id='3509' className='movie'>A Scanner Darkly</li>
              </ul>
            </div>
          </div>
        </div>
      )
    } else if (this.state.gameOver) {
      return (
        <div className="loserContainer">
          <div className="loser">
            <h2 className="loserItem">You chose <em>{this.state.finalChoice}</em> but the correct answer was <em>{this.state.finalAnswer}</em></h2>
            <h4 className="loserItem">You scored {this.state.score} points.</h4>
            <div style={{display: 'flex', justifyContent: 'center'}}><input className="loserItem" onChange={this.handleChange} placeholder="Enter your name" /></div>
            <button className="loserItem" onClick={this.submit} className="topButton">Submit your score to the high scores</button>
          </div>
        </div>
      )
    } else if (this.state.choice === 'actor') {
      return (
        <div>
          <h4 className="score">Score: {this.state.score}</h4>
          <div className='game'>
            <h4 className="gameHeader">Pick the movie starring <em>{this.state.choiceName}</em></h4>
          </div>
          <Game
            validChoices={this.state.options}
            choice={this.state.choiceName}
            check={this.check}
            end={this.endGame}
            type={this.state.choice}
          />
        </div>
      )
    } else if (this.state.choice === 'movie') {
      return (
        <div style={{display: 'grid'}}>
          <h4 className="score">Score: {this.state.score}</h4>
          <div className='game'>
            <h4 className="gameHeader">Pick the actor who starred in <em>{this.state.choiceName}</em></h4>
            <Game
              validChoices={this.state.options}
              choice={this.state.choiceName}
              check={this.check}
              end={this.endGame}
              type={this.state.choice}
            />
          </div>
        </div>
      )
    }
  }
}

export default Solo;