// vim: sw=2 sts=2
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

  function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  function getWinner(s) {
    const lines = [ [0,1,2], [3,4,5], [6,7,8],
                    [0,3,6], [1,4,7], [2,5,8],
                    [0,4,8], [2,4,6] ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (s[a] && s[a] === s[b] && s[a] === s[c])
        return s[a];
    }
    return null;
  }

  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)} />
      );
    }

    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

  class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{squares: Array(9).fill(null)}],
        step: 0,
        xnext: true,
      };
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.step + 1);
      const current = history[history.length-1];
      const squares = current.squares.slice();
      if (squares[i] || getWinner(squares))
        return;
      squares[i] = this.state.xnext ? 'X' : 'O';
      this.setState({
        history: history.concat([{squares: squares}]),
        step: history.length,
        xnext: !this.state.xnext,
      });
    }

    jumpTo(step) {
      this.setState({
        step: step,
        xnext: (step % 2) === 0,
      });
    }

    render() {
      const history = this.state.history;
      const current = history[this.state.step];
      const winner = getWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ? ('Go to move #' + move) : ('Reset');
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner)
        status = 'Winner: ' + winner;
      else if (current.squares.every((s) => s != null))
        status = 'Winner: cat';
      else
        status = 'Next player: ' + (this.state.xnext ? 'X' : 'O');

      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ul>{moves}</ul>
          </div>
        </div>
      );
    }
  }

  // ========================================

  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
