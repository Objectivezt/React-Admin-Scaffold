import React from 'react';
import ReactDOM from 'react-dom';
import App from './root';
import './public-path';

function domElementGetter() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('react-dva-scaffold');
  if (!el) {
    el = document.createElement('div');
    el.id = 'react-dva-scaffold';
    document.body.appendChild(el);
  }
  return el;
}

function render() {
  domElementGetter();
  console.log('render');
  ReactDOM.render(<App />, document.getElementById('react-dva-scaffold'));
}

export async function bootstrap() {
  console.log('react app bootstraped');
  domElementGetter();
}

export async function mount(props) {
  console.log('react app props', props);
  render();
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('react-dva-scaffold'));
}

render();
