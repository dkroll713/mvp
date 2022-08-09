import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div onClick={this.props.check}>
        <h4>{this.props.movie.original_title}</h4>
        <img
          src={`http://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`}
          style={{height: '250px', width: '200px'}}
        />
      </div>
    )
  }
}

export default Card;