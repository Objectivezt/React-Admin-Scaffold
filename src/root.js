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
    let app = {}; // redbox-react  自动注册
    app = dva({
      history: createHistory()
    });

    app.use(createLoading());
    app.model(models);
    app.router(layout);
    app.start('#react-dva-scaffold');
  };

  componentDidMount() {
    console.log(`run dva ${sub(-1, 2)} instance`);
    this.runDva();
  }

  render() {
    return <div>dva instance error</div>;
  }
}
