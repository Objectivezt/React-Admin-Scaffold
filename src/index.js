import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import './styles/index.css';
import { sub } from '@utils/test.ts';
const models = require('./models/basic/globalModel').default;
const layout = require('./layout').default;

console.log(sub(1, 2));

let app; // redbox-react
app = dva({
	history: createHistory()
});
app.use(createLoading());
app.model(models);
app.router(layout);
app.start('#root');
export default app._store;
