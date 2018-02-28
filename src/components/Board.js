import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hole: "nine"
    }
    this.moveTile = this.moveTile.bind(this);
    this.legalMove = this.legalMove.bind(this);
  }

  legalMove(str) {
    // only tiles that can be moved are those bordering hole (not diagonal)
    let b = [["one", "two", "three"], 
             ["four", "five", "six"], 
             ["seven", "eight", "nine"]];
    let hole = this.state.hole;
    // return whether str is adjacent (not incl. diagonal) to hole
    let str_idx = [-1, -1];
    let hole_idx = [-1, -1];
    for ( var i = 0; i < b.length; i++ ) {
      if ( b[i].includes(str) ) {
        str_idx = [i, b[i].indexOf(str)];
      }
      if ( b[i].includes(hole) ) {
        hole_idx = [i, b[i].indexOf(hole)];
      }
    }
    console.log('idx of ', str, ': ', str_idx, ' and idx of ', hole, ': ', hole_idx);
    return Math.abs(str_idx[0] - hole_idx[0]) === 1 && str_idx[1] - hole_idx[1] === 0 
          || Math.abs(str_idx[1] - hole_idx[1]) === 1 && str_idx[0] - hole_idx[0] === 0 
  }

  moveTile(e) {
    console.log(e.target.className);
    if ( this.legalMove(e.target.className) ) {
      this.setState({
        hole: e.target.className
      }, () => {
        console.log('moved hole to ', this.state.hole);
      });
    } else {
      console.log('cant move that tile.');
    }
  }

  render() {
    return (
      <div className="Board">
        <div className="one" onClick={this.moveTile}></div>
        <div className="two" onClick={this.moveTile}></div>
        <div className="three" onClick={this.moveTile}></div>
        <div className="four" onClick={this.moveTile}></div>
        <div className="five" onClick={this.moveTile}></div>
        <div className="six" onClick={this.moveTile}></div>
        <div className="seven" onClick={this.moveTile}></div>
        <div className="eight" onClick={this.moveTile}></div>
        <div className="nine" onClick={this.moveTile}></div>
      </div>
    );
  }
}

export default Board;
