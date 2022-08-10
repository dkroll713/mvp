import React from 'react';

import Main from './Main.jsx';
import Solo from './views/Solo.jsx';
import HiScores from './views/HiScores.jsx';

import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));

const axios = require('axios');

// Huzzah for jsx!
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: '0',
    }
  }

  selectOption = e => {
    this.setState({
      option: e.target.id,
    })
  }

  render() {
    if (this.state.option === '0') {
      return (<Main selectOption={this.selectOption}/>)
    } else if (this.state.option === '1') {
      return (
        <div>
          <Main selectOption={this.selectOption}/>
          <Solo />
        </div>
      )
    } else if (this.state.option === '3') {
      return (
        <div>
          <Main selectOption={this.selectOption}/>
          <HiScores />
        </div>
      )
    } else if (this.state.option === '4') {
      return (
        <div>
          <Main selectOption={this.selectOption}/>
          <h3>Random Movie</h3>
        </div>
      )
    }
  }
}

root.render(<App />);