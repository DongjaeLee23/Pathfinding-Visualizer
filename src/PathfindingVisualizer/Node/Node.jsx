import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {
      const {column, row, isStart, isFinish, isWall, onMouseDown,} = this.props;
      const extraClass = isFinish ? 'node-end' : isStart ? 'node-start' : isWall ? 'node-wall' : '';
        return (
        <div
          id = {`node-${row}-${column}`}
          className={`node ${extraClass}`}
          onMouseDown={() => onMouseDown(row, column)}>
          </div>); // ${extraClass} means that the classname could be node and the other extra classes
    }
}

export const DEFAULT_NODE = {
  row: 0,
  col: 0,
};