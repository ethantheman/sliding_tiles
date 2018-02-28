import React, { Component } from 'react';
import logo from './logo.svg';
import Board from './components/Board.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      shuffling: true
    }
    this.click = this.click.bind(this);
    this.endShuffle = this.endShuffle.bind(this);
  }

  click() {
    let c = this.state.count + 1;
    this.setState({
      count: c
    });
  }

  endShuffle() {
    this.setState({shuffling: false});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sliding Tiles Puzzle</h1>
        </header>
        <Board count={this.state.count} increment={this.click} shuffling={this.state.shuffling} endShuffle={this.endShuffle} />
        {this.state.shuffling ? null :
        <div>
          <p>Number of moves: <strong>{this.state.count}</strong></p>
        </div>}
      </div>
    );
  }
}

export default App;
