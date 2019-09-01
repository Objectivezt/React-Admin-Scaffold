import React, { Component } from 'react';
import { Button } from 'antd'

interface Props {
	name: string;
	firstName?: string;
	lastName?: string;
}
interface State {
	count: number
}

export default class Hi extends Component<Props, State> {
	state = {
		count: 0
	}
	static defaultProps = {
		firstName: '',
		lastName: ''
	}
	render() {
		return (
			<>
				<p>你点击了 {this.state.count} 次</p>
				<Button onClick={() => { this.setState({ count: this.state.count + 1 }) }}>
					Hi {this.props.name}
				</Button>
			</>
		)
	}
}
