import React, { Component, Fragment } from 'react';
import {
	Avatar,
	Card,
	Col,
	Icon,
	Row,
	Tooltip,
} from 'antd';
import {
	ChartCard,
	Pie,
	MiniArea,
	Field,
	Gauge,
	WaterWave,
	MiniBar,
	TagCloud,
} from 'components/Charts';
import numeral from 'numeral';
import PageHeader from 'components/PageHeader';
import EditableLinkGroup from 'components/EditableLinkGroup';
import styles from './index.less';
import { Link } from 'dva/router';
import moment from 'moment';
import logo from 'assets/favicon.ico';

const salesPieData = [
	{
		x: 'XX相关',
		y: 3,
	},
	{
		x: 'YY相关',
		y: 4,
	},
	{
		x: 'ZZ相关',
		y: 5,
	},
	{
		x: 'QQ相关',
		y: 10,
	},
	{
		x: '其他',
		y: 1,
	},
];

const links = [
	{
		title: '操作一',
		href: '',
	},
	{
		title: '操作二',
		href: '',
	},
	{
		title: '操作三',
		href: '',
	},
	{
		title: '操作四',
		href: '',
	},
	{
		title: '操作五',
		href: '',
	},
	{
		title: '操作六',
		href: '',
	},
];

const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
	visitData.push({
		x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
		y: fakeY[i],
	});
}
const titleArr = [
	'JQuery',
	'Angular',
	'Bootstrap',
	'React',
	'Vue',
	'Webpack',
	'dva',
];
const avatarArr = [
	logo,
	logo,
	logo,
	logo,
	logo,
	logo,
	logo,
];

const notice = [
	{
		id: 'xxx1',
		title: titleArr[0],
		logo: avatarArr[0],
		description: '那是一种内在的东西，他们到达不了，也无法触及的',
		updatedAt: new Date(),
		member: '科学搬砖组',
		href: '',
		memberLink: '',
	},
	{
		id: 'xxx2',
		title: titleArr[1],
		logo: avatarArr[1],
		description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
		updatedAt: new Date('2017-07-24'),
		member: '全组都是吴彦祖',
		href: '',
		memberLink: '',
	},
	{
		id: 'xxx3',
		title: titleArr[2],
		logo: avatarArr[2],
		description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
		updatedAt: new Date(),
		member: '全组都是吴彦祖',
		href: '',
		memberLink: '',
	},
	{
		id: 'xxx4',
		title: titleArr[3],
		logo: avatarArr[3],
		description: '程序员日常',
		updatedAt: new Date('2017-07-23'),
		member: '程序员日常',
		href: '',
		memberLink: '',
	},
	{
		id: 'xxx5',
		title: titleArr[4],
		logo: avatarArr[4],
		description: '凛冬将至',
		updatedAt: new Date('2017-07-23'),
		member: '程序员日常',
		href: '',
		memberLink: '',
	},
	{
		id: 'xxx6',
		title: titleArr[5],
		logo: avatarArr[5],
		description: '生命就像一盒巧克力，结果往往出人意料',
		updatedAt: new Date('2017-07-23'),
		member: '骗你来学计算机',
		href: '',
		memberLink: '',
	},
];



const content = () => {
	return (
		<Fragment>
			<div className={styles.pageHeaderContent}>
				<div className={styles.avatar}>
					<Avatar
						size="large"
						src={logo}
					/>
				</div>
				<div className={styles.content}>
					<div className={styles.contentTitle}>早安，周滔，祝你开心每一天！</div>
					<div>Web前端开发小码农 | 平安科技－某某某系列－某某平台部－某某技术分组－Web</div>
				</div>
			</div>
		</Fragment>
	)
}

export default class oInput extends Component {
	render() {
		return (
			<Fragment>
				<PageHeader breadcrumbList={[{ key: '1' }]} content={content()} className={styles.pageHeader} />
				<div className={styles.appContent}>
					<Row gutter={12}>
						<Col span={12}>
							<ChartCard title={'主办任务'}>
								<Pie
									hasLegend
									title="	待完成量"
									subTitle="待完成量"
									total={23}
									data={salesPieData}
									height={400}
								/>
							</ChartCard>
						</Col>
						<Col span={6}>
							<Card
								title="任务完成率"
								style={{ marginBottom: 24 }}
								bodyStyle={{ textAlign: 'center' }}
								bordered={false}
							>
								<Gauge title="跳出率" height={180} percent={87} />
							</Card>
						</Col>
						<Col span={6}>
							<Card
								title="资源剩余"
								bodyStyle={{ textAlign: 'center', fontSize: 0 }}
								bordered={false}
							>
								<WaterWave height={180} title="可支配资源剩余" percent={34} />
							</Card>
						</Col>
						<Col span={12}>
							<Card
								style={{ marginBottom: 24 }}
								title="快速开始 / 便捷导航"
								bordered={false}
								bodyStyle={{ padding: 0 }}
							>
								<EditableLinkGroup onAdd={() => { }} links={links} linkElement={Link} />
							</Card>
						</Col>
						<Col span={12}>
							<Card
								className={styles.projectList}
								style={{ marginBottom: 24 }}
								title="进行中的项目"
								bordered={false}
								extra={<Link to="/">全部项目</Link>}
								loading={false}
								bodyStyle={{ padding: 0 }}
							>
								{notice.map(item => (
									<Card.Grid className={styles.projectGrid} key={item.id}>
										<Card bodyStyle={{ padding: 0 }} bordered={false}>
											<Card.Meta
												title={
													<div className={styles.cardTitle}>
														<Avatar size="small" src={item.logo} />
														<Link to={item.href}>{item.title}</Link>
													</div>
												}
												description={item.description}
											/>
											<div className={styles.projectItemContent}>
												<Link to={item.memberLink}>{item.member || ''}</Link>
												{item.updatedAt && (
													<span className={styles.datetime} title={item.updatedAt}>
														{moment(item.updatedAt).fromNow()}
													</span>
												)}
											</div>
										</Card>
									</Card.Grid>
								))}
							</Card>
						</Col>

						<Col span={12}>
							<ChartCard title={'协办任务'}>
								<Pie
									hasLegend
									title="	待完成量"
									subTitle="待完成量"
									total={23}
									data={salesPieData}
									height={303}
								/>
							</ChartCard>
						</Col>
						<Col span={6}>
							<ChartCard
								bordered={false}
								title="系统访问量"
								action={
									<Tooltip title="指标说明">
										<Icon type="info-circle-o" />
									</Tooltip>
								}
								total={numeral(8846).format('0,0')}
								footer={<Field label="总访问量" value={numeral(10).format('0,0')} />}
								contentHeight={46}
							>
								<MiniArea color="#975FE4" data={visitData} />
							</ChartCard>
						</Col>
						<Col span={6}>
							<ChartCard
								bordered={false}
								title="党员人数"
								action={
									<Tooltip title="指标说明">
										<Icon type="info-circle-o" />
									</Tooltip>
								}
								total={numeral(6560).format('0,0')}
								footer={<Field label="增长率" value="5%" />}
								contentHeight={46}
							>
								<MiniBar data={visitData} />
							</ChartCard>
						</Col>
					</Row>
				</div>

			</Fragment>
		);
	}
}
