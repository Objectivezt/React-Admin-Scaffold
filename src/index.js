import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import './styles/index.css';
import { sub } from '@utils/test.ts';

const models = require('./models/globalModel').default;
const layout = require('./layout').default;

// eslint-disable-next-line no-console
console.log(sub(1, 2));
let app = {}; // redbox-react  自动注册
app = dva({
  history: createHistory()
});

app.use(createLoading());
app.model(models);
app.router(layout);
app.start('#root');

// eslint-disable-next-line no-underscore-dangle
export default app._store;
