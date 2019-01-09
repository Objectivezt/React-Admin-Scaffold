export default (req, res) => {
	const { password, username } = req.body;
	if (password === '123' && username === 'admin') {
		res.send({
			code: '0000',
			msg: 'ok',
			data: {
				status: 'ok',
				currentAuthority: 'admin',
				username: username,
			}
		})
	}
}
