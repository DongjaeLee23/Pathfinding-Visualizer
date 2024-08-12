import React, {Component} from 'react';
import Node from './Node/Node';
import './PathfindingVisualizer.css';
import {dijkstra, getNodesInShortestPathOrder} from '../Algorithms/dijkstra'

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35
export default class PathfindingVisualizer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        nodes: [],
        mouseIsPressed: false,
      };
    }
    // This code initializes a 20x50 grid structure in the component’s state after it is mounted.
    componentDidMount() {
        const nodes = getInitialGrid()
        this.setState({nodes})
    }

    visualizeDijkstra() {
        const {nodes} = this.state;
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(nodes, startNode, finishNode);
        const nodesInShortesPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortesPathOrder)
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortesPathOrder) {
        for (let i = 0; i < visitedNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = visitedNodesInOrder[i]
                if (!node.isStart && !node.isFinish) { // Skip coloring for start and finish nodes
                    document.getElementById(`node-${node.row}-${node.column}`).className =
                        'node node-visited';
                }
            }, 10 * i);
        }
    }
    handleMouseDown(row, column) {
        const newGrid = getNewGridWithWallToggled(this.state.nodes, row, column);
        this.setState({grid: newGrid})
    }

    render() {
        const {nodes, mouseIsPressed} = this.state;
        
        return (
            <>
            <button onClick={() => this.visualizeDijkstra()}>Visualize Dijkstra's Algorithm</button>
            <div className="grid">
                {nodes.map((row, rowIndex) => {
                    return (<div key={rowIndex}>
                        {row.map((node, nodeIndex) => {
                            const {row, column, isStart, isFinish, isWall} = node;
                            return (
                                <Node
                                key={nodeIndex}
                                row = {row}
                                column = {column}
                                isStart={isStart}
                                isFinish={isFinish}
                                isWall = {isWall}
                                mouseIsPressed = {mouseIsPressed}
                                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
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

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node, // Spread all properties of 'node' into 'newNode'
      isWall: !node.isWall, // Override or add the 'isWall' property in 'newNode'
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };
