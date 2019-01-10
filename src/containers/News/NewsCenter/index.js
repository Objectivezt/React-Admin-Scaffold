import React, { Component, Fragment } from 'react';
import {
	Carousel,
	Col,
	Row,
} from 'antd';
import { GlobalCard, GlobalDivider } from 'globalUI';
import styles from './index.less';

class NewsCenter extends Component {
	render() {
		return (
			<Fragment>
				<div className={styles.HeadlineBox}>
					<h2 className={styles.Headline}>————头条信息————</h2>
					<span className={styles.HeadlineDesc}>科技是集团的全资子公司，致力于运用人工智能、智能认知、云计算、区块链等前沿科技，为人们打造全新云生活。对内，科技是集团的高科技内核和科技企业孵化器，负责开发并运营集团的关键平台和服务。对外，科技以智慧科技为手段、以智造未来为蓝图，聚焦于医疗、金融、智慧城市三大领域，将国际权威认证的技术能力应用到实际业务场景中，打造生态闭环，积极践行科技改变生活的企业理念。超过10000名专业IT技术人员和管理专家组成的高级研发团队，为平台的运营稳定和可靠，提供了专家级的技术保障。目前所建立的云生态圈已经承载过5亿的互联网用户，并拓展至海外市场，包括美国、新加坡、香港等国家和地区。</span>
				</div>
				<div className={styles.content}>
					<Row gutter={8}>
						<Col span={12}>
							<Carousel autoplay>
								<div><h3>1</h3></div>
								<div><h3>2</h3></div>
								<div><h3>3</h3></div>
								<div><h3>4</h3></div>
							</Carousel>
						</Col>
						<Col span={12}>
							<GlobalCard title="123">
								123
							</GlobalCard>
						</Col>
						<Col span={12}>
							<GlobalCard title="123">
								123
							</GlobalCard>
						</Col>
						<Col span={12}>
							<GlobalCard title="123">
								123
							</GlobalCard>
						</Col>
					</Row>
					<GlobalDivider>123</GlobalDivider>
				</div>

			</Fragment>
		);
	}
}

export default NewsCenter;
