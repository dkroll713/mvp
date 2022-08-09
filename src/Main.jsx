import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2 style={{textAlign: 'center'}} id={'0'} onClick={this.props.selectOption}>Welcome to the movie game</h2>
        <p style={{textAlign: 'center'}}>Select an option:</p>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <button id={'1'} onClick={this.props.selectOption}>
            Solo
          </button>
          <button id={'2'} onClick={this.props.selectOption}>
            With Friends
          </button>
          <button id={'3'} onClick={this.props.selectOption}>
            Hi Scores
          </button>
          <button id={'4'} onClick={this.props.selectOption}>
            Show me a movie
          </button>
        </div>
      </div>

    )
  }
}

export default Main;