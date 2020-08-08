import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



class Square extends React.Component {
  constructor(props){
    super(props);
    this.state={
      value: null,
      clicked: false
    };
  }
  
  onClick = () => {
    if (!this.state.clicked) {
      const value = this.props.count % 2 === 0 ? 'X' : 'O'
      this.props.addClick(this.props.index, value);
      this.setState({
        value: value,
        clicked: true
      
      });
    }
  }

  render() {
    return (
      <button
        className="square"
        onClick={this.onClick}
      >
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state={
      clicks: 0,
      value: 'O',
      board: Array(9).fill(null),
      win: false,
    };
  }

  checkBoard= () => {
    console.log('checking board');
    // Check rows
    for (let i = 0; i <= 6; i+=3) {
      let count = 0;
      for (let j = i+1; j < i+3; j++) {

        if (this.state.board[i] !== null && this.state.board[j] !== null) {
          if (this.state.board[i] === this.state.board[j]) {
           count += 1;
          }


        if (count === 2) {
          this.setState({
            win: true
          });
        }
      }

      }
    
    }
    //Check columns
    for (let i = 0; i<=2; i++){
      let count = 0;
      for (let j=i+3; j<=i+6; j+=3){

        if (this.state.board[i] != null && this.state.board[j] !== null){
          if (this.state.board[i] === this.state.board[j]) {
            count += 1
          }
        }
        if(count === 2) {
          this.setState({
            win: true
          });
        }
        
      }
    }

    //Check Diagonal one way
    const prevValue1 = this.state.board[0];
    let count = 0;

    for (let i=4; i<=8; i+=4){
      if (this.state.board[i] != null && prevValue1 !== null){
        if(prevValue1 === this.state.board[i]){
          count += 1;
        }
      }
      if(count === 2){
        this.setState({
          win: true
        });
      }
    }
  

    const prevValue2 = this.state.board[2];
    for (let i=4; i<=6; i+=2){
      if (this.state.board[i] != null && prevValue2 !== null){
        if(prevValue2 === this.state.board[i]){
          count += 1;
        }
      }
      if(count === 2){
        this.setState({
          win: true
        });
      }
    }
    
  }

  addClick = (index, value) => {
    let updatedBoard = this.state.board;
    updatedBoard[index] = value;

    this.setState(
      {
        clicks: this.state.clicks + 1,
        board: updatedBoard
     }
  
    );
    
    this.checkBoard();    
  }

  renderSquare = (index) => {
    return <Square index={index} addClick={this.addClick} count={this.state.clicks} board={this.state.board}/>
  };

  render() {
    return (
    <>
      <div>
      {this.renderSquare(0)}
      {this.renderSquare(1)}
      {this.renderSquare(2)}
      </div>
      <div>
      {this.renderSquare(3)}
      {this.renderSquare(4)}
      {this.renderSquare(5)}
      </div>
      <div>
      {this.renderSquare(6)}
      {this.renderSquare(7)}
      {this.renderSquare(8)}
      </div>
      {this.state.win ? (
        <h1>
          Win 
        </h1>)
       : null}
    </>



    );
  };
}


// class Game extends React.Component {
//   render() {
//     return (
     
//     );
//   }
// }

// ========================================

ReactDOM.render(
 // <Game />,
 <Board/>,
  document.getElementById('root')
);
