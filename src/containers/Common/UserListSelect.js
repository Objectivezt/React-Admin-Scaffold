import React, { Component } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';
import { globalSelectProps } from 'common/config';

const { Option } = Select;

@connect(({ userModel }) => ({
	userModel
}))
export default class UserListSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: undefined
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!nextProps.value) {
			this.setState({ value: undefined });
		} else {
			this.setState({ value: nextProps.value });
		}
	}

	componentDidMount() {
		this.props.dispatch({
			type: 'userModel/getUserList'
		});
	}

	onChange = value => {
		this.triggerChange(value);
		this.setState({ value: value });
	};

	triggerChange = changeValue => {
		const onChange = this.props.onChange;
		if (onChange) {
			onChange(changeValue);
		}
	};

	render() {
		const { userList = [] } = this.props.userModel;
		const { value } = this.state;
		return (
			<Select
				{...globalSelectProps}
				onChange={this.onChange}
				value={value}
			>
				{userList.map(({ userName, userId }) => (
					<Option key={userId} title={userName} value={userId}>
						{userName + `-<${userId}>`}
					</Option>
				))}
			</Select>
		);
	}
}
