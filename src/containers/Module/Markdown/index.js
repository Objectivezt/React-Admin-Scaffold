import React, { Component } from 'react';
import Markdown from 'react-markdown';

const initialSource = `
# Live demo
Changes are automatically rendered as you type.

## Table of Contents
* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!
  
`;

export default class componentName extends Component {
  state = {
    source: initialSource
  };

  render() {
    return (
      <Markdown
        source={this.state.source}
        skipHtml={this.state.htmlMode === 'skip'}
        escapeHtml={this.state.htmlMode === 'escape'}
      />
    );
  }
}
