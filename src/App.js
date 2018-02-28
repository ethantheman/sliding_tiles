import React, { Component } from 'react';
import logo from './logo.svg';
import Board from './components/Board.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sliding Tiles Puzzle</h1>
        </header>
        <Board/>
      </div>
    );
  }
}

export default App;
