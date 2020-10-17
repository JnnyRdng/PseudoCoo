import React, {Component} from "react";
import GridCell from "./GridCell";
import "./GameGrid.css";
import sudoku from '../helpers/sudoku'


import Parser from "../helpers/StringParser";
const sp = new Parser();


export default class GameGrid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gameState: []
        }
        this.handleNumberInput = this.handleNumberInput.bind(this);
    }


    componentDidMount() {
        let gameState;
        if (this.props.gameString.length === 81) {
            gameState = sp.getObjects(this.props.gameString);
        } else {
            gameState = sp.getObjectsFromSavedString(this.props.gameString);
        }
        this.setState({ gameState: gameState });
    }

    solve =() =>{
        
        const solution = sudoku.sudoku.solve(this.props.gameString);
        console.log(solution);
        let prevState = this.state.gameState;
        
        let gameState = sp.getObjects(solution);

        prevState = prevState.map((cell, index) => { 
            cell.value = gameState[index].value
            return cell;
        } )

        let result = sp.getObjectsFromSavedString(sp.convertObjectsToSaveString(prevState))

        console.log(" --- - - -"+ prevState[0].value);

        this.setState({gameState: result});
        

    }

    handleNumberInput(index, newCell) {
        let updated = this.state.gameState;
        updated[index] = newCell;
        this.setState({gameState: updated});
    }

    render() {
        const gridCells = this.state.gameState.map((cell, i) => {
            return (
                <GridCell key={i} index={i} cell={cell} onNumberImput={this.handleNumberInput} />
            )
        });
        return (
            <div id="game-grid">
                {gridCells}
            <button onClick={this.solve} > Solve</button>
            </div>
        )
    }
}
