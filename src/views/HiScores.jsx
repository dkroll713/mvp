import React from 'react';
import ScoreCard from './ScoreCard.jsx'

const axios = require('axios');
const cf = require('../../config.js')

class HiScores extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      scores: null,
    }
  }

  componentDidMount() {
    axios.get(`http://${cf.server}/scores`)
    .then(res => {
      this.setState({
        scores: res.data
      })
    })
  }

  render() {
    if (this.state.scores) {
      return (
        <div>
          <h2 className="title">High Scores</h2>
          {this.state.scores.map((score, x) => {
            return <ScoreCard key={score.name+x+score.score} entry={score}/>
          })}
        </div>
      )
    }
  }
}

export default HiScores;