/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import BraftEditor from 'braft-editor';
// import 'braft-editor/dist/index.css';

export default class EditorDemo extends React.Component {
  render() {
    return (
      <div>
        <BraftEditor />
      </div>
    );
  }
}
