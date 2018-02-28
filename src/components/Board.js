import React, { Component } from "react";
import "../App.css";
import loading from "../images/loading.gif";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hole: 9, // keep track of which position has the empty tile
      board: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
    this.moveTile = this.moveTile.bind(this);
    this.legalMove = this.legalMove.bind(this);
    this.numToStr = this.numToStr.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  componentDidMount() {
    setTimeout(this.shuffle, 2000);
  }

  legalMove(x) {
    // only tiles that can be moved are those bordering hole (not diagonal)
    let b = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    let hole = this.state.hole;
    // return whether str is adjacent (not incl. diagonal) to hole
    let str_idx = [-1, -1];
    let hole_idx = [-1, -1];
    for (var i = 0; i < b.length; i++) {
      if (b[i].includes(x)) {
        str_idx = [i, b[i].indexOf(x)];
      }
      if (b[i].includes(hole)) {
        hole_idx = [i, b[i].indexOf(hole)];
      }
    }
    return (
      (Math.abs(str_idx[0] - hole_idx[0]) === 1 &&
        str_idx[1] - hole_idx[1] === 0) ||
      (Math.abs(str_idx[1] - hole_idx[1]) === 1 &&
        str_idx[0] - hole_idx[0] === 0)
    );
  }

  moveTile(x) {
    if (this.legalMove(x)) {
      let b = this.state.board;
      let temp = b[x - 1];
      let dest = b[this.state.hole - 1];
      b[x - 1] = dest;
      b[this.state.hole - 1] = temp;
      this.setState({
        hole: x,
        board: b
      }, () => {
        if ( !this.props.shuffling ) {
          this.props.increment(); // update count of moves
          this.props.checkWon(this.state.board);
        }
      });
    }
  }

  numToStr(n) {
    let obj = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine"
    };
    return obj[n];
  }

  shuffle() {
    // make 100 random moves from starting position
    let count = 0;
    while ( count < 100) {
      let t = Math.floor(Math.random() * 9) + 1; // the tile to move
      if ( this.legalMove(t) ) {
        this.moveTile(t);
        count++;
      }
    }
    this.props.endShuffle(); // mark shuffling as over
  }

  render() {
    return (
      <div className="Board">
        {this.state.board.map((n, i) => {
          i+=1; // tiles are 1-indexed
          let row = i < 4 ? 1 : i > 3 && i < 7 ? 2 : 3;
          let col = (i % 3);
          return (
            <div
              className={this.numToStr(n)}
              key={i}
              style={{ gridColumn: `${col}`, gridRow: `${row}` }}
              onClick={() => this.moveTile(i)}
            />
          );
        })}
      </div>
    );
  }
}

export default Board;
