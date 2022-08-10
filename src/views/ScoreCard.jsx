import React from 'react';

class ScoreCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="scoreCard">
        <h3>{this.props.entry.name}</h3>
        <h4>{this.props.entry.score}</h4>
      </div>
    )
  }
}

export default ScoreCard;