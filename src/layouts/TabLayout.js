import React from 'react';
import { Tabs, message } from 'antd';
import { routerRedux } from 'dva/router';
import { isInArray } from '@utils/utils';
import PropTypes from 'prop-types';

const { TabPane } = Tabs;
export default class TabLayout extends React.Component {
  static defaultProps = {
    history: {},
    name: '',
    keys: '',
    component: <div>loading</div>,
    location: {},
    whiteRouter: [],
    noPermission: {},
    dispatch: () => {},
    match: {}
  };

  static propTypes = {
    history: PropTypes.object,
    name: PropTypes.string,
    keys: PropTypes.string,
    component: PropTypes.any,
    location: PropTypes.object,
    whiteRouter: PropTypes.array,
    noPermission: PropTypes.object,
    dispatch: PropTypes.func,
    match: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: null,
      panes: []
    };
  }

  componentWillMount() {
    const { name, keys, component } = this.props;
    if (keys === '/' || !name) {
      return;
    }
    // eslint-disable-next-line react/no-access-state-in-setstate
    const panes = this.state.panes;
    const activeKey = keys;
    panes.push({ name, key: activeKey, component });
    this.setState({ panes, activeKey });
  }

  componentWillReceiveProps(nextProps) {
    const { location, whiteRouter, noPermission, name, keys, component } = nextProps;
    if (!isInArray(whiteRouter, location.pathname)) {
      // eslint-disable-next-line no-shadow
      const { keys = '/auth/exception/403', component } = noPermission;
      // eslint-disable-next-line react/no-access-state-in-setstate
      const panes = this.state.panes;
      panes[panes.length - 1].component = component;
      panes[panes.length - 1].name = name;
      panes[panes.length - 1].key = keys;
      this.setState({ panes, activeKey: keys });
      return;
    }
    if (keys === '/' || !name) {
      return;
    }
    const panes = this.state.panes;
    const activeKey = keys;
    let isExist = false;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < panes.length; i++) {
      if (panes[i].key === activeKey) {
        isExist = true;
        break;
      }
    }

    if (isExist) {
      this.setState({
        activeKey
      });
    } else {
      panes.push({ name, key: activeKey, component });
      this.setState({ panes, activeKey });
    }
  }

  onChange = activeKey => {
    this.props.dispatch(
      routerRedux.push({
        pathname: activeKey
      })
    );
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = targetKey => {
    if (this.state.panes.length === 1) {
      message.warning('窗口不能全部关闭');
      return;
    }
    // eslint-disable-next-line react/no-access-state-in-setstate
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    // eslint-disable-next-line react/no-access-state-in-setstate
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  };

  render() {
    const { location, match, history } = this.props;
    const { panes, activeKey } = this.state;
    return (
      <div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {panes.map(({ name, key, component: Pane }) => (
            <TabPane tab={name} key={key}>
              <Pane
                history={history}
                location={location}
                match={match}
                onCloseCurrentTab={(pathname, action) => this.onEdit(pathname, action)}
              />
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
