const jwt = require('jsonwebtoken');

const user = {
	shashank: { password: '12345' },
	somu: { password: '123456' }
};

exports.auth = (req, res) => {
	console.log('request Body: ', req.body);

	let { userName, password } = req.body;

	if( !userName && !password ) {
		return res.status(401).send();
	}

	let payload = { userName };

	let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		algorithm: 'HS256',
		expiresIn: process.env.ACCESS_TOKEN_LIFE * 1000
	})

	let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		algorithm: 'HS256',
		expiresIn: process.env.REFRESH_TOKEN_LIFE * 1000
	})

	user[userName].refreshToken = refreshToken;

	res.cookie('jwt', accessToken, {
		secure: true,
		httpOnly: true
	})

	res.status(200).send({ token: accessToken });
}