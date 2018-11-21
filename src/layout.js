import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';
import IndexPage from './containers/IndexPage';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
    return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
    const routerData = getRouterData(app);
    console.log(routerData);
    // const UserLayout = routerData['/user'].component;
    const BlankLayout = routerData['/'].component;

    return (
        <LocaleProvider locale={zhCN}>
            <ConnectedRouter history={history}>
                <Switch>
                    {/* <Route path="/" exact component={IndexPage} /> */}
                    <Route path="/" component={BlankLayout} />
                </Switch>
            </ConnectedRouter>
        </LocaleProvider>
    );
}

export default RouterConfig;

// import React from 'react';
// import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './containers/IndexPage';

// function RouterConfig({ history }) {
//     return (
//         <Router history={history}>
//             <Switch>
//                 <Route path="/" exact component={IndexPage} />
//             </Switch>
//         </Router>
//     );
// }

// export default RouterConfig;
