/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import Highlighter from 'react-highlight-words';

export default class HightLightWords extends Component {
  render() {
    return (
      <div>
        <Highlighter
          searchWords={['and', 'or', 'the']}
          autoEscape
          textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
        />
      </div>
    );
  }
}
