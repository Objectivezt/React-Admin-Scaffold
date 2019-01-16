import React, { Component, Fragment } from "react";
import { Modal } from "antd";

export default class GlobalModal extends Component {
	render() {
		const {
			children,
			visible,
			confirmLoading,
			cancelButtonDisabled,
			okButtonDisabled,
			onOK,
			onCancel,
			title
		} = this.props;
		return (
			<Fragment>
				<Modal
					title={title}
					confirmLoading={confirmLoading}
					visible={visible}
					okType={"primary"}
					okButtonDisabled={okButtonDisabled}
					cancelButtonDisabled={cancelButtonDisabled}
					onOK={onOK}
					onCancel={onCancel}
				>
					{children}
				</Modal>
			</Fragment>
		);
	}
}
