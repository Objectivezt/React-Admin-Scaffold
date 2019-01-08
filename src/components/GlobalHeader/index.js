import React, { PureComponent } from 'react';
import {
	Layout,
	Menu,
	Icon,
	Tag,
} from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';

const { Header } = Layout;
export default class GlobalHeader extends PureComponent {
	componentWillUnmount() {
		this.triggerResizeEvent.cancel();
	}
	getNoticeData() {
		const { notices = [] } = this.props;
		if (notices.length === 0) {
			return {};
		}
		const newNotices = notices.map(notice => {
			const newNotice = { ...notice };
			if (newNotice.datetime) {
				newNotice.datetime = moment(notice.datetime).fromNow();
			}
			// transform id to item key
			if (newNotice.id) {
				newNotice.key = newNotice.id;
			}
			if (newNotice.extra && newNotice.status) {
				const color = {
					todo: '',
					processing: 'blue',
					urgent: 'red',
					doing: 'gold',
				}[newNotice.status];
				newNotice.extra = (
					<Tag color={color} style={{ marginRight: 0 }}>
						{newNotice.extra}
					</Tag>
				);
			}
			return newNotice;
		});
		return groupBy(newNotices, 'type');
	}
	toggle = () => {
		const { collapsed, onCollapse } = this.props;
		onCollapse(!collapsed);
		this.triggerResizeEvent();
	};
	/* eslint-disable*/
	@Debounce(600)
	triggerResizeEvent() {
		const event = document.createEvent('HTMLEvents');
		event.initEvent('resize', true, false);
		window.dispatchEvent(event);
	}
	render() {
		const {
			currentUser = {},
			collapsed,
			onMenuClick,
		} = this.props;
		const menu = (
			<Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
				<Menu.Item disabled>
					<Icon type="user" />个人中心
        		</Menu.Item>
				<Menu.Item disabled>
					<Icon type="setting" />设置
				</Menu.Item>
				<Menu.Item key="triggerError">
					<Icon type="close-circle" />触发报错
        		</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="logout">
					<Icon type="logout" />退出登录
        		</Menu.Item>
			</Menu>
		);
		return (
			<Header className={styles.header}>
			</Header>
		);
	}
}
