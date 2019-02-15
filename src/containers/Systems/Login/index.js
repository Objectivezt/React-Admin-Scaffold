import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon } from 'antd';
import Login from '@components/Login';
import styles from './index.less';
import { JSEncrypt } from 'jsencrypt';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

const publicKeyHead = '-----BEGIN PUBLIC KEY-----';
const publicKeyFooter = '-----END PUBLIC KEY-----';

@connect(({ loginModel, loading }) => ({
	loginModel,
	logining: loading.effects['loginModel/login']
}))
export default class LoginPage extends Component {
	state = {
		type: 'account'
	};

	onTabChange = type => {
		this.setState({ type });
	};

	handleSubmit = (err, values) => {
		const { type } = this.state;
		if (!err) {
			this.props.dispatch({
				type: 'login/login',
				payload: {
					...values,
					type
				}
			});
		}
	};

	componentDidMount() {
		this.getPublicKey();
	}

	getPublicKey = () => {
		this.props.dispatch({
			type: 'loginModel/getPublicKey'
		});
	};

	changeCaptcha = () => {
		const { loginModel } = this.props;
		const { requestId } = loginModel;
		this.props.dispatch({
			type: 'loginModel/changeCaptcha',
			payloadRequestId: {
				requestId: requestId
			}
		});
	};

	renderLoginFooter = () => {
		const forgetPwd = function(e) {};
		const changePwd = function() {};
		const getHelp = function() {};
		const forgetAccount = function() {};
		return (
			<Fragment>
				<Row>
					<Col span={12}>
						<span
							className={`${styles.black} ${styles.left} ${
								styles.point
							}`}
							onClick={e => forgetPwd(e)}
						>
							<Icon type="key" className={styles.iconRight} />
							{'忘记密码'}
						</span>
					</Col>
					<Col span={12}>
						<span
							className={`${styles.black} ${styles.left} ${
								styles.point
							}`}
							onClick={e => forgetPwd(e)}
						>
							<Icon type="tool" className={styles.iconRight} />
							{'修改密码'}
						</span>
					</Col>
					<Col span={12}>
						<span
							className={`${styles.black} ${styles.left} ${
								styles.point
							}`}
							onClick={e => forgetPwd(e)}
						>
							<Icon type="user" className={styles.iconRight} />
							{'忘记账号'}
						</span>
					</Col>
					<Col span={12}>
						<span
							className={`${styles.black} ${styles.left} ${
								styles.point
							}`}
							onClick={e => forgetPwd(e)}
						>
							<Icon type="hdd" className={styles.iconRight} />
							{'自助服务'}
						</span>
					</Col>
				</Row>
			</Fragment>
		);
	};

	onTabChange = type => {
		this.setState({ type });
	};

	handleSubmit = (err, values) => {
		const { loginModel, dispatch } = this.props;
		const { requestId, loginKey, validCode = '' } = loginModel;
		if (err) {
			return false;
		}
		if (this.state.type === 'account') {
			let encrypt = new JSEncrypt();
			encrypt.setPublicKey(publicKeyHead + loginKey + publicKeyFooter);
			let encryptPwd = encrypt.encrypt(values.password);
			let tempPayload = {
				userName: values.userName
					? values.userName.replace(/\s+/g, '')
					: null,
				password: encryptPwd
			};
			if (requestId) {
				tempPayload.requestId = requestId;
			}
			if (validCode) {
				tempPayload.validCode = values.captchaCode;
			}
			dispatch({
				type: 'loginModel/login',
				payloadLogin: tempPayload
			});
		}
	};

	render() {
		const { type } = this.state;
		const { logining, loginModel } = this.props;
		const { validCode = '' } = loginModel;
		return (
			<div className={styles.main}>
				<Login
					defaultActiveKey={type}
					onTabChange={this.onTabChange}
					onSubmit={this.handleSubmit}
				>
					<Tab key="account" tab={<span>登录</span>}>
						<UserName name="userName" placeholder="用户名" />
						<Password name="password" placeholder="密码" />
						{validCode ? (
							<Row>
								<Col span={16}>
									<CaptchaCode
										name="captchaCode"
										placeholder="验证码"
										rules={[
											{
												required: true,
												message: '请输入验证码'
											}
										]}
									/>
								</Col>
								<Col span={8}>
									<img
										style={{
											width: '105px',
											height: '40px'
										}}
										src={validCode}
										onClick={() => this.changeCaptcha()}
									/>
								</Col>
							</Row>
						) : null}
						{this.renderLoginFooter()}
					</Tab>
					<Fragment>
						<Submit loading={logining}>登录</Submit>
					</Fragment>
				</Login>
			</div>
		);
	}
}
