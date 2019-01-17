import React, { Component, Fragment } from "react";
import { Modal } from "antd";
import { globalModalProps } from "common/config";

export default class GlobalModal extends Component {
	render() {
		const {
			children,
			visible = false,
			title = "",
			width = 1024,
			onCancel,
			onOk
		} = this.props;
		return (
			<Fragment>
				<Modal
					{...globalModalProps}
					width={width}
					title={title}
					visible={visible}
					onCancel={onCancel}
					onOk={onOk}
				>
					{children}
				</Modal>
			</Fragment>
		);
	}
}
