const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const authToken = authHeader && authHeader.split(' ')[1];

	console.log( 'authHeader : ', authHeader);
	if( !authToken ) {
		res.status(403).send();
	}

	let payload;

	try {
		payload = jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
		next();
	} catch (error) {
		console.log('Error ', error);
		res.status(401).send();
	}
}