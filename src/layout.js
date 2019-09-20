import React from 'react';
import dynamic from 'dva/dynamic';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider, Spin } from 'antd';
import { getRouterData } from '@common/router';
import { routerRedux, Route, Switch } from 'dva/router';
import NoFound from '@containers/Exception/404';
import styles from './styles/index.less';

const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => (
  <Spin size="large" className={styles.globalSpin} />
));

// eslint-disable-next-line react/prop-types
function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const AuthLayout = routerData['/auth'].component;
  const BlankLayout = routerData['/'].component;
  const TouristLayout = routerData['/tourist'].component;
  const UsersLayout = routerData['/user'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          {/* 默认跳转 */}
          <Route component={BlankLayout} path="/" exact />
          {/* 游客模版 */}
          <Route component={TouristLayout} path="/tourist" strict />
          {/* 登录注册模版 */}
          <Route
            path="/user"
            render={props => <UsersLayout {...props} />}
            strict
          />
          {/* 管理中心模版 */}
          <Route
            path="/auth"
            render={props => <AuthLayout {...props} />}
            strict
          />
          {/* 404模版 */}
          <Route render={() => <NoFound />} />
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
