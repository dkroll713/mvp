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
    return axios.get(`https://api.themoviedb.org/3/movie/${rng}?api_key=${cf.api_key}&language=en-US`)
  }

  getCast = (id) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${cf.api_key}&language=en-US`)
  }

  populateChoices = () => {
    // let rng = Math.floor(Math.random() * this.props.validChoices.length - 1)
    let choices = JSON.parse(JSON.stringify(this.state.choices))
    let id = null;
    // first
    this.getMovie()
    .then((res, err) => {
      if (res) {
        let movieObj = {

        }
        // console.log(res.data);
        // movieObj[movie] = res.data;
        choices.push(res.data);
        // console.log(id)
        // this.getCast(id)
        // .then(res => {
        //   // movieObj[cast] = res.data;
        //   console.log(res.data);
        // })
        id = res.data.id
        this.setState({
          choices: choices
        })
        console.log(movieObj)
      }
    })
    // second
    this.getMovie()
    .then((res, err) => {
      if (res) {
        // console.log(res.data);
        choices.push(res.data);
        this.setState({
          choices: choices
        })
      }
    })
    // third
    this.getMovie()
    .then((res, err) => {
      if (res) {
        // console.log(res.data);
        choices.push(res.data);
        this.setState({
          choices: choices
        })
      }
    })
    this.setState({
      loaded: true,
    })
  }

  checkForMatch = () => {
    console.log(this.props.choice);
  }

 static getDerivedStateFromProps(nextProps, prevState) {
  if (nextProps.validChoices && prevState.choices.length < 4) {
    let rng = Math.floor(Math.random() * nextProps.validChoices.length - 1);
    let choices = [];

    choices.push(nextProps.validChoices[rng])
    return {choices: choices}
  } else {
    return null;
  }
 }

  // componentDidMount() {
  //   if(this.state.validChoices) {
  //     console.log('selecting actor movie')
  //     if (this.state.choices.length < 4) {
  //       let rng = Math.floor(Math.random() * this.props.validChoices.length - 1);
  //       let choices = [];

  //       choices.push(this.props.validChoices[rng])
  //       console.log(choices);
  //     }
  //   }
  // }

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
                key={'x'+choice.title}
                movie={choice}
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