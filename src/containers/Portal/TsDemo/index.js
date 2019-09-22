import React, { Component } from 'react';
import Hi from './Hi';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'scaffold'
    };
  }

  render() {
    return (
      <div>
        <Hi name={this.state.name} />
      </div>
    );
  }
}
