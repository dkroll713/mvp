import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1
          style={{textAlign: 'center'}}
          id={'0'}
          className="header"
          onClick={this.props.selectOption}
        >Welcome to the movie game</h1>
        {/* <p
          style={{textAlign: 'center'}}
        >Select an option:</p> */}
        <div
          // style={{display: 'flex', justifyContent: 'space-around'}}
          className="buttonContainer"
        >
          <button
            id={'1'}
            className="topButton"
            onClick={this.props.selectOption}
          >
            Solo
          </button>
          <button
            id={'3'}
            className="topButton"
            onClick={this.props.selectOption}
          >
            High Scores
          </button>
          <button
            id={'4'}
            className="topButton"
            onClick={this.props.selectOption}
          >
            Show me a movie
          </button>
        </div>
      </div>

    )
  }
}

export default Main;