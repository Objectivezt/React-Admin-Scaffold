/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import ReactJson from 'react-json-view';

export default class componentName extends Component {
  state = {
    obj: {
      string: 'this is a test string',
      integer: 42,
      array: [1, 2, 3, 'test', NaN],
      float: 3.14159,
      MyUndefined: undefined,
      object: {
        'first-child': true,
        'second-child': false,
        'last-child': null
      },
      string_number: '1234',
      date: new Date()
    }
  };

  render() {
    return (
      <div>
        <ReactJson src={this.state.obj} />
      </div>
    );
  }
}
