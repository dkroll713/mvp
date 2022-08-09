import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cast: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // if (nextProps.cast && prevState.cast === []) {
    //   console.log(nextProps, prevState)
    //   let cast = [];
    //   for (var x = 0; x < nextProps.cast.length; x++) {
    //     cast.push(nextProps.cast[x].name)
    //     console.log(nextProps.cast[x].name)
    //   }
    //   return {cast: cast}
    // }
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