import React, { Component } from 'react';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import dva from 'dva';
import { sub } from '@utils/test.ts';
import './styles/index.css';
import '@babel/polyfill';
import 'moment/locale/zh-cn';
import 'url-polyfill';

const models = require('./models/globalModel').default;
const layout = require('./layout').default;
/**
 * @description 兼容single spa 插入
 */
export default class Root extends Component {
  runDva = () => {
    // eslint-disable-next-line no-console
    console.log(sub(1, 2));
    let app = {}; // redbox-react  自动注册
    app = dva({
      history: createHistory()
    });

    app.use(createLoading());
    app.model(models);
    app.router(layout);
    app.start('#app2');
  };

  componentDidMount() {
    console.log('run dva instance');
    this.runDva();
  }

  render() {
    return <div>dva instance error</div>;
  }
}
