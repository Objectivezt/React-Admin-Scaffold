import React, { Component } from 'react';
import D3 from '@containers/UI/D3';

export default class D3Demo extends Component {
  state = {
    name: 'd3'
  };

  render() {
    return (
      <div>
        <D3 name={this.state.name} />
      </div>
    );
  }
}
