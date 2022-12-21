const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors/index');

const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) 
        throw new UnauthenticatedError('Authentication invalid');

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {userId, name} = decoded;
        req.user = {userId, name};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Unauthorized')
    }
}

module.exports = authMiddleware;