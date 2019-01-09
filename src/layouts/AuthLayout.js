import React from 'react';
import {
	Button,
	Drawer,
	Layout,
	Spin,
} from 'antd';
import Authorized from '../utils/Authorized';
import DocumentTitle from 'react-document-title';
import GlobalHeader from 'components/GlobalHeader';
import NotFound from '../containers/Exception/404';
import PropTypes from 'prop-types';
import SliderMenu from '../components/SliderMenu';
import TabLayout from 'layouts/TabLayout';
import classNames from 'classnames';
import logo from '../assets/favicon.ico';
import { ContainerQuery } from 'react-container-query';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
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

	constructor(props) {
		super(props);
		this.state = {
			visibleDrawer: false,
		}
	}

	componentDidMount() {
		this.props.dispatch({
			type: 'userModel/getMenuData',
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
		console.log(123);
		this.props.dispatch({
			type: 'globalModel/changeLayoutCollapsed',
			payloadCollapsed: collapsed,
		});
	};

	handleMultiPage = isMultiPage => {
		this.props.dispatch({
			type: 'globalModel/changeMultiPage',
			payloadMultiPage: isMultiPage,
		})
	}

	handleDrawer = handle => {
		if (handle) {
			this.setState({ visibleDrawer: true })
		} else {
			this.setState({ visibleDrawer: false })
		}
	}

	handleMenuClick = ({ key }) => {
		if (key === 'setting') {
			this.handleDrawer(true);
		} else if (key === 'log') {

		}
	}

	render() {
		const {
			collapsed,
			dispatch,
			globalModel,
			location,
			match,
			routerData,
			userModel,
		} = this.props;
		const tasParams = {
			...routerData[location.pathname],
			keys: location.pathname,
			location,
			dispatch: dispatch,
			match,
		}
		const { menuData = [], loadingLayoutMenu = true } = userModel;
		const { isMultiPage = true } = globalModel;
		const bashRedirect = this.getBashRedirect();
		const layout = (
			<Layout>
				<Drawer
					title="基础设置"
					placement="right"
					closable={false}
					onClose={() => this.handleDrawer(false)}
					visible={this.state.visibleDrawer}
				>
				</Drawer>
				<SliderMenu
					collapsed={collapsed}
					location={location}
					logo={logo}
					menuData={formatterMenu(menuData)}
					onCollapse={this.handleMenuCollapse}
				/>
				<Layout style={collapsed ? { marginLeft: 80 } : { marginLeft: 256 }}>
					<GlobalHeader
						collapsed={collapsed}
						currentUser={{ name: '111' }}
						onCollapse={this.handleMenuCollapse}
						onMenuClick={this.handleMenuClick}
					/>
					<Content style={{ margin: '0', height: '100%', borderLeft: '1px solid #e8e8e8' }}>
						{
							isMultiPage ?
								(<TabLayout {...tasParams} />)
								: (<Switch>
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
								</Switch>)
						}
					</Content>
					<Footer />
					<Button
						icon="setting"
						onClick={() => this.handleDrawer(true)}
						style={{ width: 30, height: 30, position: "absolute", right: 0, top: '70%' }}

					/>
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

export default connect(({ globalModel, userModel }) => ({
	globalModel,
	userModel,
	collapsed: globalModel.collapsed,
}))(AuthLayout)
