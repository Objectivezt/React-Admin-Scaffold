import React, { Component } from 'react';

const path = require('path');
export default class D3 extends Component {
  render() {
    return (
      <div>
        <iframe src={path.resolve(__dirname, '/iframe/index.html')}></iframe>
      </div>
    );
  }
}
