import React from 'react';
import dynamic from 'dva/dynamic';
import styles from './styles/index.less';
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
	const AuthLayout = routerData['/auth'].component;
	const BlankLayout = routerData['/'].component;
	const TouristLayout = routerData['/tourist'].component;
	const UserLayout = routerData['/user'].component;
	const UsersLayout = routerData['/users'].component;
	return (
		<LocaleProvider locale={zhCN}>
			<ConnectedRouter history={history}>
				<Switch>
					<Route component={BlankLayout} path="/" exact />
					<Route component={TouristLayout} path="/tourist" strict />
					<Route component={UserLayout} path="/user" strict />
					<Route
						path="/users"
						render={props => <UsersLayout {...props} />}
						strict
					/>
					<Route
						path="/auth"
						render={props => <AuthLayout {...props} />}
						strict
					/>
					<Route render={() => <NoFound />} />
				</Switch>
			</ConnectedRouter>
		</LocaleProvider>
	);
}

export default RouterConfig;
