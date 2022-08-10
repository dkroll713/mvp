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
          this.props.end(this.props.movie.title, this.props.answer);
        }
      } else {
        this.props.end(this.props.movie.title, this.props.answer);
      }
    } else if (this.props.type === 'movie') {
      console.log(this.props.answer === this.props.name);
      if (this.props.answer === this.props.name) {
        this.props.check(this.props.name, this.props.actor.id)
      } else {
        this.props.end(this.props.actor.name, this.props.answer);
      }
    }
  }


  render() {
    if (this.props.type === 'actor') {
      return (
        <div
          onClick={this.success}
          id={this.props.match}
          style={{
            display: 'grid',
            backgroundColor: 'antiquewhite',
            border: '1px solid black',
            padding: '25px'
          }}
        >
          <h4>{this.props.movie.original_title}</h4>
          <img
            src={`http://image.tmdb.org/t/p/w500${this.props.movie.poster_path}`}
            style={{height: '250px', width: '200px'}}
          />
        </div>
      )
    } else if (this.props.type === 'movie') {
      if (this.props.name !== 'Natalie Portman' ||
      this.props.name !== 'Chris Pratt' || this.props.name !== 'Chris Hemsworth' ||
      this.props.name !== 'Bradley Cooper') {
        return (
          <div
            onClick={this.success}
            id={this.props.actor.id}
            style={{
              display: 'grid',
              backgroundColor: 'antiquewhite',
              border: '1px solid black',
              padding: '25px'
            }}
          >
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
}

export default Card;