/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import SplitPane from 'react-split-pane';

export default class componentName extends Component {
  state = {
    minSize: 50
  };

  render() {
    return (
      <div style={{ height: 300 }}>
        <SplitPane
          split="vertical"
          step={this.state.minSize}
          minSize={200}
          maxSize={1000}
          onDragStarted={() => (document.body.style.cursor = 'col-resize')}
          onDragFinished={() => (document.body.style.cursor = 'auto')}
        >
          <div>min: 200px, max: 1000px, step size: 50px</div>
          <div />
        </SplitPane>
      </div>
    );
  }
}
