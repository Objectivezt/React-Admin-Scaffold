import React, { Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import GlobalFooter from '@components/GlobalFooter';
import GlobalHeader from '@components/GlobalHeader';
import NotFound from '@containers/Exception/404';
import PropTypes from 'prop-types';
import SliderMenu from '@components/SliderMenu';
import TabLayout from '@layouts/TabLayout';
import classNames from 'classnames';
import logo from '@assets/favicon.ico';
import { ContainerQuery } from 'react-container-query';
import { Icon, Drawer, Layout, Spin, Breadcrumb } from 'antd';
import { Route, Redirect, Switch, Link } from 'dva/router';
import { connect } from 'dva';
import { queryCurrentUser } from '@services/systems/userServices';
import { queryLayout, baseRouterUrl, projectName } from '@common/config';
import { staticModal } from '@utils/utils.stateless';
import DrawerSetting from '@setting/DrawerSetting';
import {
  AuthRouterPass,
  formatterMenu,
  getBashRedirect,
  getRoutes,
  isInArray,
  isUrl
} from '@utils/utils';
import styles from './index.less';

const { Content } = Layout;
const redirectData = [];
const tempMenuArr = baseRouterUrl;
@connect(({ globalModel, userModel }) => ({
  collapsed: globalModel.collapsed,
  globalModel,
  userModel
}))
export default class AuthLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    storeSubscription: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      visibleDrawer: false,
      firstRender: false
    };
  }

  componentDidMount() {
    queryCurrentUser()
      .then(({ code }) => {
        if (code === '0000') {
          this.getUserMenu();
        } else {
          staticModal('未能检测到用户登录状态', '您可能需要重新登录');
        }
      })
      .catch(error => {
        // eslint-disable-next-line
        console.warn(error);
        staticModal('未能检测到用户登录状态', '您可能需要重新登录');
      });
  }

  componentWillReceiveProps() {
    if (this.state.firstRender) {
      AuthRouterPass(this);
    }
  }

  getRedirect = item => {
    if (item && item.children) {
      if (item.children[0] && item.children[0].path) {
        redirectData.push({
          from: `${item.path}`,
          to: `${item.children[0].path}`
        });
        item.children.forEach(children => {
          this.getRedirect(children);
        });
      }
    }
  };

  getUserMenu = () => {
    const { dispatch, location, history } = this.props;
    dispatch({ type: 'userModel/getMenuData' }).then(() => {
      const menuData = this.props.userModel.menuData;
      if (!this.state.firstRender) {
        this.getRouterWhiteList(menuData);
      }
      dispatch({
        type: 'globalModel/pushRouterUrl',
        payloadRouterUrl: tempMenuArr
      });

      if (isInArray(tempMenuArr, location.pathname)) {
        this.setState({ firstRender: true });
      } else {
        // history.push('/auth/exception/403');
      }
      dispatch({ type: 'userModel/getCurrentUser' });
    });
  };

  getRouterWhiteList = (data, parentPath = '') =>
    data.map(item => {
      let { path } = item;
      if (!isUrl(path)) {
        path = parentPath + item.path;
      }
      if (item.children) {
        this.getRouterWhiteList(item.children, `${parentPath}${item.path}/`);
      }
      tempMenuArr.push(`/${path}`);
    });

  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: 'globalModel/changeLayoutCollapsed',
      payloadCollapsed: collapsed
    });
  };

  handleMultiPage = isMultiPage => {
    this.props.dispatch({
      type: 'globalModel/changeMultiPage',
      payloadMultiPage: isMultiPage
    });
  };

  handleDrawer = handle => {
    if (handle) {
      this.setState({ visibleDrawer: true });
    } else {
      this.setState({ visibleDrawer: false });
    }
  };

  handleMenuClick = ({ key }) => {
    if (key === 'setting') {
      this.handleDrawer(true);
    } else if (key === 'news') {
      this.props.history.push({ pathname: '/tourist/' });
    }
  };

  itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? (
      <span>{route.name}</span>
    ) : (
      <Link to={paths.join('/')}>{route.name}</Link>
    );
  };

  render() {
    const {
      collapsed,
      dispatch,
      globalModel,
      location,
      match,
      routerData,
      userModel,
      history
    } = this.props;
    const tasParams = {
      ...routerData[location.pathname],
      keys: location.pathname,
      location,
      dispatch,
      match,
      history,
      noPermission: routerData['/auth/exception/403'],
      whiteRouter: tempMenuArr
    };
    const { menuData = [], loadingLayoutMenu = true } = userModel;
    const { isMultiPage = true } = globalModel;
    const bashRedirect = getBashRedirect();
    const Copyright = (
      <div>
        Copyright&nbsp;
        <Icon type="copyright" />
        &nbsp;2019 objectivezt
      </div>
    );
    const layout = (
      <Layout>
        <Drawer
          title="基础设置"
          placement="right"
          closable={false}
          onClose={() => this.handleDrawer(false)}
          visible={this.state.visibleDrawer}
        >
          <DrawerSetting changeMultiPage={this.handleMultiPage} />
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
            currentUser={{ name: '6' }}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
          />
          <Content className={!isMultiPage ? styles.context : styles.context_multi_page}>
            {isMultiPage ? (
              <TabLayout {...tasParams} />
            ) : (
              <Fragment>
                <Switch>
                  <Breadcrumb itemRender={this.itemRender} routes={menuData} />
                  {redirectData.map(item => (
                    <Redirect key={item.from} exact from={item.from} to={item.to} />
                  ))}
                  {getRoutes(match.path, routerData).map(item => (
                    <Route
                      key={item.key}
                      path={item.path}
                      component={item.component}
                      exact={item.exact}
                      redirectPath="/auth/exception/403"
                    />
                  ))}
                  {bashRedirect ? <Redirect exact from="/" to={bashRedirect} /> : null}
                  <Route render={NotFound} />
                </Switch>
              </Fragment>
            )}
          </Content>
          <GlobalFooter links={[]} copyright={Copyright} />
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={projectName}>
        <ContainerQuery query={queryLayout}>
          {params => (
            <div className={classNames(params)}>
              {loadingLayoutMenu ? (
                <div className={styles.loadingSpin}>
                  <Spin size="large" />
                </div>
              ) : (
                layout
              )}
            </div>
          )}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}
