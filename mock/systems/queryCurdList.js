export default (req, res) => {
	let arr = [];
	for (let i = 0; i < 200; i++) {
		arr.push({
			id: 10000 + i,
			name: 'username',
			createBy: 'objectivezt',
			createTime: '2018-01-01',
			updateBy: 'objectivezt',
			updateTime: '2018-01-01'
		});
	}
	res.send({
		code: '0000',
		msg: 'ok',
		data: {
			list: arr,
			total: arr.length
		}
	});
};
