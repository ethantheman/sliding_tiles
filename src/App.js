import React, { Component } from 'react';
import logo from './logo.svg';
import Board from './components/Board.js';
import './App.css';
import * as firebase from 'firebase';

var config = {
      apiKey: "AIzaSyCt4FO6zzKuat6LH3tTsZ9kNeu_vzbrX40",
      authDomain: "sliding-tiles-f3ad2.firebaseapp.com",
      databaseURL: "https://sliding-tiles-f3ad2.firebaseio.com",
      projectId: "sliding-tiles-f3ad2",
      storageBucket: "",
      messagingSenderId: "713479186846"
    };
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      shuffling: true,
      won: false,
      name: "",
      playAgain: false
    }
    this.click = this.click.bind(this);
    this.endShuffle = this.endShuffle.bind(this);
    this.checkWon = this.checkWon.bind(this);
    this.addName = this.addName.bind(this);
    this.save = this.save.bind(this);
    this.reset = this.reset.bind(this);
  }

  click() {
    let c = this.state.count + 1;
    this.setState({
      count: c
    });
  }

  checkWon(b) {
    if (JSON.stringify(b) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
      this.setState({won: true});
    } 
  }

  endShuffle() {
    this.setState({shuffling: false});
  }

  addName(e) {
    this.setState({name: e.target.value});
  }

  save() {
    console.log('save your score to the database.');
    firebase.database().ref('users/' + this.state.name).set({
      score: this.state.count
    });
    this.setState({name: "", playAgain: true, won:false});
  }

  reset() {
    alert('still working on this feature.');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Sliding Tiles Puzzle</h1>
        </header>
        {!this.state.won ? null : 
          <div>
            <p><strong>You won!</strong><br/>Enter your name below to save your score.</p>
            <input onChange={this.addName}></input>
            <button onClick={this.save}>Save</button>
          </div>
        }
        {!this.state.playAgain ? null : 
          <div>
            <button onClick={this.reset}>play again?</button>
          </div>
        }
        <Board reset={this.state.playAgain} count={this.state.count} increment={this.click} shuffling={this.state.shuffling} endShuffle={this.endShuffle} checkWon={this.checkWon}/>
        <div>
          <p>Number of moves: <strong>{this.state.count}</strong></p>
        </div>
      </div>
    );
  }
}

export default App;
