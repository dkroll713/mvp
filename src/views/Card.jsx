import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  success = e => {
    if (this.props.cast) {
      if (this.props.cast.includes(this.props.match)) {
        console.log('success');
        this.props.check(this.props.film, this.props.movie.id);
      } else {
        this.props.end();
      }
    } else {
      this.props.end();
    }
  }


  render() {
    return (
      <div onClick={this.success} id={this.props.match}>
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