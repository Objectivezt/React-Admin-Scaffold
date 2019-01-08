import React from 'react';
import Authorized from '../utils/Authorized';
import DocumentTitle from 'react-document-title';
import NotFound from '../containers/Exception/404';
import PropTypes, { func } from 'prop-types';
import SliderMenu from '../components/SliderMenu';
import classNames from 'classnames';
import logo from '../assets/favicon.ico';
import { ContainerQuery } from 'react-container-query';
import { Layout, Spin } from 'antd';
import { Route, Redirect, Switch } from 'dva/router';
import { connect } from 'dva';
import { getRoutes, formatterMenu } from '../utils/utils';
import { queryLayout } from 'common/config';

const { Content, Header, Footer } = Layout;
const { check } = Authorized;

const redirectData = [];
class AuthLayout extends React.PureComponent {
	static childContextTypes = {
		location: PropTypes.object,
	};

	componentDidMount() {
		this.props.dispatch({
			type: 'userModel/getMenuData',
		}).then(() => {

		})
	};

	getChildContext() {
		const { location } = this.props;
		return { location };
	};

	getBashRedirect = () => {
		const urlParams = new URL(window.location.href);
		const redirect = urlParams.searchParams.get('redirect');
		if (redirect) {
			urlParams.searchParams.delete('redirect');
			window.history.replaceState(null, 'redirect', urlParams.href);
		} else {
			const { routerData } = this.props;
			const authorizedPath = Object.keys(routerData).find(
				item => check(routerData[item].authority, item) && item !== '/'
			);
			return authorizedPath;
		}
		return redirect;
	};

	getRedirect = item => {
		if (item && item.children) {
			if (item.children[0] && item.children[0].path) {
				redirectData.push({
					from: `${item.path}`,
					to: `${item.children[0].path}`,
				});
				item.children.forEach(children => {
					getRedirect(children);
				});
			}
		}
	};

	handleMenuCollapse = collapsed => {
		this.props.dispatch({
			type: 'globalModel/changeLayoutCollapsed',
			payload: collapsed,
		});
	};

	render() {
		const {
			collapsed,
			globalModel,
			userModel,
			location,
			match,
			routerData,
		} = this.props;
		const { menuData = [], loadingLayoutMenu = true } = userModel;
		const bashRedirect = this.getBashRedirect();
		const layout = (
			<Layout>
				<SliderMenu
					logo={logo}
					menuData={formatterMenu(menuData)}
					collapsed={collapsed}
					location={location}
					onCollapse={this.handleMenuCollapse}
				/>
				<Layout>
					<Header style={{ padding: 0 }}>
					</Header>
					<Content style={{ margin: '0', height: '100%', borderLeft: '1px solid #e8e8e8' }}>
						<Switch>
							{redirectData.map(item => (
								<Redirect key={item.from} exact from={item.from} to={item.to} />
							))}
							{getRoutes(match.path, routerData).map(item => (
								<Route
									key={item.key}
									path={item.path}
									component={item.component}
									exact={item.exact}
									redirectPath="/exception/403"
								/>
							))}
							<Redirect exact from="/" to={bashRedirect} />
							<Route render={NotFound} />
						</Switch>
					</Content>
					<Footer />
				</Layout>
			</Layout>
		);

		return (
			<DocumentTitle title={'AuthLayout'}>
				<ContainerQuery query={queryLayout}>
					{params => <div className={classNames(params)}>{
						loadingLayoutMenu
							? (<div style={{
								width: '100%',
								height: '100%',
								margin: 'auto',
								paddingTop: 50,
								textAlign: 'center',
							}}
							>
								<Spin size="large" />
							</div>)
							: (layout)
					}</div>}
				</ContainerQuery>
			</DocumentTitle>
		);
	}
}

export default connect(({
	globalModel, userModel
}) => ({
	globalModel, userModel
}))(AuthLayout)
