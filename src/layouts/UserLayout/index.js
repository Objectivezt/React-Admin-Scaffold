import React from 'react';
import { Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import styles from './index.less';
import logo from '@assets/favicon.ico';
import { getRoutes } from '@utils/utils';

class UserLayout extends React.PureComponent {
	getPageTitle() {
		const { routerData, location } = this.props;
		const { pathname } = location;
		let title = 'multiPage';
		if (routerData[pathname] && routerData[pathname].name) {
			title = `${routerData[pathname].name} - multiPage`;
		}
		return title;
	}
	render() {
		const { routerData, match } = this.props;
		return (
			<DocumentTitle title={this.getPageTitle()}>
				<div className={styles.container}>
					<div className={styles.content}>
						<div className={styles.top}>
							<div className={styles.header}>
								<img
									alt="logo"
									className={styles.logo}
									src={logo}
								/>
								<span className={styles.title}>multiPage</span>
							</div>
							<div className={styles.desc}>multiPage</div>
						</div>
						<Switch>
							{getRoutes(match.path, routerData).map(item => (
								<Route
									key={item.key}
									path={item.path}
									component={item.component}
									exact={item.exact}
								/>
							))}
							<Redirect exact from="/users" to="/users/login" />
						</Switch>
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

export default UserLayout;
