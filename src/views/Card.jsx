import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  success = e => {
    if (this.props.type === 'actor') {
      if (this.props.cast) {
        if (this.props.cast.includes(this.props.match)) {
          console.log('success');
          this.props.check(this.props.answer, this.props.movie.id);
        } else {
          this.props.end();
        }
      } else {
        this.props.end();
      }
    } else if (this.props.type === 'movie') {
      if (this.props.answer === this.props.name) {
        this.props.check(this.props.name, this.props.actor.id)
      }
    }
  }


  render() {
    if (this.props.type === 'actor') {
      return (
        <div onClick={this.success} id={this.props.match}>
          <h4>{this.props.movie.original_title}</h4>
          <img
            src={`http://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`}
            style={{height: '250px', width: '200px'}}
          />
        </div>
      )
    } else if (this.props.type === 'movie') {
      return (
        <div onClick={this.success} id={this.props.actor.id}>
          <h4>{this.props.name}</h4>
          <img
            src={`http://image.tmdb.org/t/p/w500${this.props.actor.profile_path}`}
            style={{height: '250px', width: '200px'}}
          />
        </div>
      )
    }
  }
}

export default Card;