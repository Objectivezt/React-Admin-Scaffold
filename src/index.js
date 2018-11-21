import '@babel/polyfill';
import 'url-polyfill';
import dva from 'dva';
import createHistory from 'history/createHashHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import './styles/index.css';
const models = require('./models/globalModel').default;
const layout = require('./layout').default;
let app,
    overStore;

// 1. Initialize
app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(models);

// 4. Router
app.router(layout);

// 5. Start
app.start('#root');

overStore = app._store;

export default overStore;