import React from 'react';
import ReactDOM from 'react-dom';
import App from './root';
import './public-path';

function domElementGetter() {
  // Make sure there is a div for us to render into
  let el = document.getElementById('app2');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app2';
    document.body.appendChild(el);
  }

  return el;
}

function render() {
  domElementGetter();
  console.log('render');
  ReactDOM.render(<App />, document.getElementById('app2'));
}

// eslint-disable-next-line no-underscore-dangle
console.log(123, window.__POWERED_BY_QIANKUN__);

// eslint-disable-next-line no-underscore-dangle
// if (!window.__POWERED_BY_QIANKUN__) {
render();
// }

export async function bootstrap() {
  console.log('react app bootstraped');
  domElementGetter();
}

export async function mount(props) {
  console.log('react app props', props);
  render();
}

export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('app2'));
}
