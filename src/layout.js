import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
    return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
    const routerData = getRouterData(app);
    const BlankLayout = routerData['/normal'].component;
    const TouristLayout = routerData['/tourist'].component;

    return (
        <LocaleProvider locale={zhCN}>
            <ConnectedRouter history={history}>
                <Switch>
                    {/* <Route path="/" exact component={IndexPage} /> */}
                    <Route path="/normal" component={BlankLayout} />
                    <Route path="/tourist" component={TouristLayout} />
                </Switch>
            </ConnectedRouter>
        </LocaleProvider>
    );
}

export default RouterConfig;