import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {
      const {isStart, isFinish} = this.props;
      const extraClass = isFinish ? 'node-end' : isStart ? 'node-start' : '';
        return <div className={`node ${extraClass}`}></div>; // ${extraClass} means that the classname could be node and the other extra classes
    }
}

export const DEFAULT_NODE = {
  row: 0,
  col: 0,
};