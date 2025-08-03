const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, 'shhhhh');
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
}