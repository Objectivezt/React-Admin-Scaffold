import React from 'react';
import dynamic from 'dva/dynamic';
import styles from './index.less';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider, Spin } from 'antd';
import { getRouterData } from './common/router';
import { routerRedux, Route, Switch } from 'dva/router';
import NoFound from './containers/Exception/404';

const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
	return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
	const routerData = getRouterData(app);
	const BlankLayout = routerData['/'].component;
	const TouristLayout = routerData['/tourist'].component;
	const AuthLayout = routerData['/auth'].component;
	return (
		<LocaleProvider locale={zhCN}>
			<ConnectedRouter history={history}>
				<Switch>
					<Route path="/" component={BlankLayout} exact />
					<Route path="/tourist" component={TouristLayout} strict />
					<Route
						path="/auth"
						strict
						render={props => <AuthLayout {...props} />}
					/>
				</Switch>
			</ConnectedRouter>
		</LocaleProvider>
	);
}

export default RouterConfig;
