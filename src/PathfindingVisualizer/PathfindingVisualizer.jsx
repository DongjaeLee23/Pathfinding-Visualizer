import React, {Component} from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 45
export default class PathfindingVisualizer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        nodes: [],
      };
    }
    // This code initializes a 20x50 grid structure in the component’s state after it is mounted.
    componentDidMount() {
        const nodes = getInitialGrid()
        this.setState({nodes})
    }

    render() {
        const {nodes} = this.state;
        
        return (
            <>
            <button>Visualize Dijkstra's Algorithm</button>
            <div className="grid">
                {nodes.map((row, rowIndex) => {
                    return (<div key={rowIndex}>
                        {row.map((node, nodeIndex) => {
                            const {row, col, isStart, isFinish, isWall} = node;
                            return (
                                <Node
                                key={nodeIndex}
                                isStart={isStart}
                                isFinish={isFinish}
                                isWall = {isWall}
                                >
                                </Node>
                            );
                        })}
                    </div>
                    );
                })}
            </div>
            </>
        );
    }
}

const createNode = (row, column) => {
    return {
        column,
        row,
        isStart: row === START_NODE_ROW && column === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && column === FINISH_NODE_COL,
        distance: Infinity,
        isVisisted: false,
        isWall: false,
        previousNode: null
    };
};

const getInitialGrid = () => {
    const nodes =[];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let column = 0; column < 50; column++) {
            currentRow.push(createNode(row, column));
        }
        nodes.push(currentRow)
    }
    return nodes
}