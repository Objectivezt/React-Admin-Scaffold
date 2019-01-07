import React, { Fragment } from 'react';
import Authorized from '../utils/Authorized';
import DocumentTitle from 'react-document-title';
import GlobalFooter from '../components/GlobalFooter';
import GlobalHeader from '../components/GlobalHeader';
import NotFound from '../containers/Exception/404';
import PropTypes from 'prop-types';
import SliderMenu from '../components/SliderMenu';
import TabController from './TabLayout';
import classNames from 'classnames';
import logo from '../assets/favicon.ico';
import pathToRegexp from 'path-to-regexp';
import { ContainerQuery } from 'react-container-query';
import { Layout, Icon, Tabs } from 'antd';
import { Route, Redirect, Switch } from 'dva/router';
import { connect } from 'dva';
import { getMenuData } from '../common/menu';
import { getRoutes } from '../utils/utils';
import { isUrl } from '../utils/utils';

const { Content, Header, Footer } = Layout;
const { AuthorizedRoute, check } = Authorized;
const TabPane = Tabs.TabPane;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
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
getMenuData().forEach(getRedirect);



/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
	const result = {};
	const childResult = {};
	for (const i of menuData) {
		if (!routerData[i.path]) {
			result[i.path] = i;
		}
		if (i.children) {
			Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
		}
	}
	return Object.assign({}, routerData, result, childResult);
};

const query = {
	'screen-xs': {
		maxWidth: 575,
	},
	'screen-sm': {
		minWidth: 576,
		maxWidth: 767,
	},
	'screen-md': {
		minWidth: 768,
		maxWidth: 991,
	},
	'screen-lg': {
		minWidth: 992,
		maxWidth: 1199,
	},
	'screen-xl': {
		minWidth: 1200,
	},
};

@connect(({ global }) => ({
	global
}))
export default class AuthLayout extends React.PureComponent {
	static childContextTypes = {
		location: PropTypes.object,
	};

	componentDidMount() {
		this.props.dispatch({
			type: 'user/fetchCurrent',
		});
	};

	getChildContext() {
		const { location } = this.props;
		return { location };
	};

	getBashRedirect = () => {
		// According to the url parameter to redirect
		// 这里是重定向的,重定向到 url 的 redirect 参数所示地址
		const urlParams = new URL(window.location.href);

		const redirect = urlParams.searchParams.get('redirect');
		// Remove the parameters in the url
		if (redirect) {
			urlParams.searchParams.delete('redirect');
			window.history.replaceState(null, 'redirect', urlParams.href);
		} else {
			const { routerData } = this.props;
			// get the first authorized route path in routerData
			const authorizedPath = Object.keys(routerData).find(
				item => check(routerData[item].authority, item) && item !== '/'
			);
			return authorizedPath;
		}
		return redirect;
	};

	handleMenuCollapse = collapsed => {
		this.props.dispatch({
			type: 'global/changeLayoutCollapsed',
			payload: collapsed,
		});
	};

	getPageTitle() {
		const { routerData, location } = this.props;
		const { pathname } = location;
		let title = 'multipage';
		let currRouterData = null;
		// match params path
		Object.keys(routerData).forEach(key => {
			if (pathToRegexp(key).test(pathname)) {
				currRouterData = routerData[key];
			}
		});
		if (currRouterData && currRouterData.name) {
			title = `${currRouterData.name} - multipage`;
		}
		return title;
	}

	formatter = (data, parentPath = '/', parentAuthority) => {
		return data.map(item => {
			let { path } = item;
			if (!isUrl(path)) {
				path = parentPath + item.path;
			}
			const result = {
				...item,
				path,
				authority: item.authority || parentAuthority,
			};
			if (item.children) {
				result.children = this.formatter(item.children, `${parentPath}${item.path}/`, item.authority);
			}
			return result;
		});
	}

	render() {
		const {
			routerData,
			match,
			location,
		} = this.props;

		const tasParams = {
			...this.props.routerData[location.pathname],
			keys: location.pathname,
			location,
			dispatch: this.props.dispatch,
			match,
		}

		const bashRedirect = this.getBashRedirect();
		const layout = (
			<Layout>
				<SliderMenu
					logo={logo}
					Authorized={Authorized}
					menuData={getMenuData()}
					collapsed={true}
					location={location}
					onCollapse={this.handleMenuCollapse}
				/>
				<Layout>
					<Header style={{ padding: 0 }}>
						<GlobalHeader
							logo={logo}
							currentUser={{ name: '213' }}
							collapsed={true}
							onCollapse={this.handleMenuCollapse}
							onMenuClick={this.handleMenuClick}
						/>
					</Header>
					<Content style={{ margin: '0', height: '100%', borderLeft: '1px solid #e8e8e8' }}>
						{/* <TabController {...tasParams} /> */}
						<Switch>
							{redirectData.map(item => (
								<Redirect key={item.from} exact from={item.from} to={item.to} />
							))}
							{getRoutes(match.path, routerData).map(item => (

								<AuthorizedRoute
									key={item.key}
									path={item.path}
									component={item.component}
									exact={item.exact}
									authority={item.authority}
									redirectPath="/exception/403"
								/>
							))}
							<Redirect exact from="/" to={bashRedirect} />
							<Route render={NotFound} />
						</Switch>
					</Content>
					<Footer style={{ padding: 0 }}>
						<GlobalFooter
							links={[
								{
									key: 'Objectivezt',
									title: 'Objectivezt',
									href: 'http://objectivezt',
									blankTarget: true,
								},
								{
									key: 'github',
									title: <Icon type="github" />,
									href: 'https://github.com/Jack-Rose',
									blankTarget: true,
								},
							]}
							copyright={
								<Fragment>
									Copyright <Icon type="copyright" /> Objectivezt
                                </Fragment>
							}
						/>
					</Footer>
				</Layout>
			</Layout>
		);

		return (
			<DocumentTitle title={this.getPageTitle()}>
				<ContainerQuery query={query}>
					{params => <div className={classNames(params)}>{layout}</div>}
				</ContainerQuery>
			</DocumentTitle>
		);
	}
}