import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import './styles/index.css';
const models = require('./models/basic/globalModel').default;
const layout = require('./layout').default;
let app; // redbox-react
app = dva({
	history: createHistory()
});
app.use(createLoading());
app.model(models);
app.router(layout);
app.start('#root');
export default app._store;
