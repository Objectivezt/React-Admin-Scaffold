import React, { Component, Fragment } from 'react';
import { Form, Col, Row, Input, DatePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import { globalFormItemLayout, globalFormItemBox } from '@common/config';

const FormItem = Form.Item;

@Form.create()
@connect(({ userModel }) => ({
  userModel
}))
export default class AddModal extends Component {
  render() {
    const { id, createBy, updateBy, name, createTime, updateTime } = this.props.details;
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Fragment>
        <Form>
          <Row>
            <Col>
              <FormItem {...globalFormItemLayout} label="创建人">
                {getFieldDecorator('createBy', {
                  initialValue: createBy,
                  rules: [
                    {
                      required: true,
                      message: '请输入'
                    }
                  ]
                })(<Input {...globalFormItemBox} />)}
              </FormItem>
            </Col>
            <Col>
              <FormItem {...globalFormItemLayout} label="更新人">
                {getFieldDecorator('updateBy', {
                  initialValue: updateBy,
                  rules: [
                    {
                      required: true,
                      message: '请输入'
                    }
                  ]
                })(<Input {...globalFormItemBox} />)}
              </FormItem>
            </Col>
            <Col>
              <FormItem {...globalFormItemLayout} label="名称">
                {getFieldDecorator('name', {
                  initialValue: name,
                  rules: [
                    {
                      required: true,
                      message: '请输入'
                    }
                  ]
                })(<Input {...globalFormItemBox} />)}
              </FormItem>
            </Col>
            <Col>
              <FormItem {...globalFormItemLayout} label="创建时间">
                {getFieldDecorator('createTime', {
                  initialValue: createTime ? moment(createTime, 'YYYY-MM-DD') : null,
                  rules: [
                    {
                      required: true,
                      message: '请输入'
                    }
                  ]
                })(<DatePicker {...globalFormItemBox} />)}
              </FormItem>
            </Col>
            <Col>
              <FormItem {...globalFormItemLayout} label="更新时间">
                {getFieldDecorator('updateTime', {
                  initialValue: updateTime ? moment(createTime, 'YYYY-MM-DD') : null,
                  rules: [
                    {
                      required: true,
                      message: '请输入'
                    }
                  ]
                })(<DatePicker {...globalFormItemBox} />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Fragment>
    );
  }
}
