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
        isPaused: false,
      };
    }
    // This code initializes a 20x50 grid structure in the component’s state after it is mounted.
    componentDidMount() {
        const nodes = getInitialGrid()
        this.setState({nodes})
    }
    clearIntervals() {
        if (this.intervalId) { clearInterval(this.intervalId); this.intervalId = null; }
        if (this.shortestPathInterval) { clearInterval(this.shortestPathInterval); this.shortestPathInterval = null; }
    }


    clearGrid() {
        
        this.clearIntervals();

        const nodes = getInitialGrid();
        this.setState({ 
            nodes, 
            isPaused: true // reset pause state
        });
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                const node = nodes[row][col];
                const element = document.getElementById(`node-${row}-${col}`);
                if (!element || node.isStart || node.isFinish) continue;
                element.className = 'node';
                
            }
        }
    }

    visualizeDijkstra() {
        this.clearIntervals();

        this.setState({ 
            isPaused: false
        });
        const {nodes} = this.state;
        const startNode = nodes[START_NODE_ROW][START_NODE_COL];
        const finishNode = nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(nodes, startNode, finishNode);
        const nodesInShortesPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortesPathOrder)
    }

    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        // for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        //     if (i === visitedNodesInOrder.length) {
        //         setTimeout(() => {
        //             this.animateShortestPath(nodesInShortesPathOrder)
        //         }, 10 * i);
        //         return;
        //     }
        //     setTimeout(() => {
        //         const node = visitedNodesInOrder[i]
        //         if (!node.isStart && !node.isFinish) { // Skip coloring for start and finish nodes
        //             document.getElementById(`node-${node.row}-${node.column}`).className =
        //                 'node node-visited';
        //         }
        //     }, 10 * i);
        // }

        //Incorperate Stepper Loop Functionality
        let i = 0;
        this.intervalId = setInterval(() => {
            if (this.state.isPaused) return;

            if (i === visitedNodesInOrder.length) {
                clearInterval(this.intervalId);
                this.animateShortestPath(nodesInShortestPathOrder);
                return;
            }

            const node = visitedNodesInOrder[i];
            if (!node.isStart && !node.isFinish) { // Skip coloring for start and finish nodes)
                document.getElementById(`node-${node.row}-${node.column}`).className = 'node node-visited';
            }
            i++;
        }, 10);
    }
    animateShortestPath(nodesInShortestPathOrder) {
        // for (let i = 0; i < nodesInShortesPathOrder.length; i++) {
        //     setTimeout(() => {
        //         const node = nodesInShortesPathOrder[i]
        //         if (!node.isStart && !node.isFinish) { // Skip coloring for start and finish nodes
        //             document.getElementById(`node-${node.row}-${node.column}`).className = 'node node-shortest-path';
        //         }
        //     }, 50 * i);
        // }
        let i = 0;
        this.shortestPathInterval = setInterval(() => {
            if (this.state.isPaused) return;

            if (i === nodesInShortestPathOrder.length) {
                clearInterval(this.shortestPathInterval);
                return;
            }

            const node = nodesInShortestPathOrder[i]
            if (!node.isStart && !node.isFinish) { // Skip coloring for start and finish nodes
                document.getElementById(`node-${node.row}-${node.column}`).className = 'node node-shortest-path';
            }
            i++;
        }, 40);
    }
    handleMouseDown(row, column) {
        const newGrid = getNewGridWithWallToggled(this.state.nodes, row, column);
        this.setState({grid: newGrid, mouseIsPressed: true})
    }
    handleMouseUp() {
        this.setState({mouseIsPressed: false})
    }
    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }
    renderGrid() {
        const { nodes, mouseIsPressed } = this.state;
        return (
            <div className="grid">
                {nodes.map((row, rowIndex) => (
                    <div key={rowIndex}>
                        {row.map((node, nodeIndex) => {
                            const { column, row, isStart, isFinish, isWall } = node;
                            return (
                                <Node
                                    key={nodeIndex}
                                    row={row}
                                    column={column}
                                    isStart={isStart}
                                    isFinish={isFinish}
                                    isWall={isWall}
                                    mouseIsPressed={mouseIsPressed}
                                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                    onMouseUp={() => this.handleMouseUp()}
                                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    }

    render() {
        const {nodes, mouseIsPressed} = this.state;
        
        return (
            <>
            <ul>
                <button class="button-23" onClick={() => this.visualizeDijkstra()}>Visualize Dijkstra's Algorithm</button>
                <button class="button-23" onClick={() => this.clearGrid()}>Clear</button>
                <button 
                    className="button-23"
                    onClick={() => this.setState({ isPaused: !this.state.isPaused })}
                >
                    {this.state.isPaused ? "Resume" : "Pause"}
                </button>
            </ul>
            {this.renderGrid()}
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
