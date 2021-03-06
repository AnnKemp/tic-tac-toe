import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){ //for components that only contain a render method and don't have their own state it is easier to use a function component
        return( // returns what should be rendered
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        );
}
class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            squares: Array(9).fill(null), // to set the Board's initial state to contain an array of nine nulls corresponding to the 9 squares
            xIsNext: true,
        };
    }
    handleClick(i){
        const squares = this.state.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return; // if the game is won or a square is already filled return and ignore the click
        }
        squares[i]=this.state.xIsNext? 'X':'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    renderSquare(i){
        const winner= calculateWinner(this.state.squares);
        let status;
        if (winner){
            status = 'Winner: '+winner;
        }else{
            status = 'Next player: '+(this.state.xIsNext ? 'X' : 'O');
        }
        
        return (
            <Square
                value={this.state.squares[i]}
                onClick={()=> this.handleClick(i)}
            />
        );
    }

render(){
    const status= 'Next player: '+(this.state.xIsNext? 'X':'O');

    return(
        <div>
            <div className="status">{status}</div>
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
class Game extends React.Component{
    render(){
        return(
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <div>{/* TODO */}</div>
            </div>
            </div>
        );
    }
}
function calculateWinner(squares){
    const lines =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for(let i = 0; i<lines.length; i++){
        const [a,b,c]=lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}
//--------------------------------------------------------
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);