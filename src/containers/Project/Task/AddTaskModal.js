import React, { Component, Fragment } from "react";
import { Form, Col, Row, Select } from "antd";
import { connect } from "dva";

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
// @connect(({}) => ({}))
export default class AddTaskModel extends Component {
	render() {
		return (
			<Fragment>
				<Form>
					<Row>
						<FormItem>
							<Col>123</Col>
						</FormItem>
					</Row>
				</Form>
			</Fragment>
		);
	}
}
