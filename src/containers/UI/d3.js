import React, { Component } from 'react';

const path = require('path');

export default class D3 extends Component {
  constructor() {
    super();
    this.state = {
      iFrameHeight: '0px'
    };
  }

  render() {
    return (
      <div>
        <iframe
          id={'d3id'}
          style={{ width: '100%', height: '500px', overflow: 'visible' }}
          src={path.resolve(__dirname, '/iframe/index.html?key=123')}
          ref="iframe"
          width="100%"
          scrolling="no"
          frameBorder="0"
        ></iframe>
      </div>
    );
  }
}
