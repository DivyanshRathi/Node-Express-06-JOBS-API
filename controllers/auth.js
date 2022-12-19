const User = require('../models/User.js');
const {StatusCodes} = require('http-status-codes');

const register = async(req, res)=>{
    console.log(req.body);
    try {
        const user = await User.create({...req.body});
        return res.status(StatusCodes.CREATED).json(user);
        
    } catch (error) {
        console.log(`error is -> ${error}`);
        return res.json({error})
    }
}

const login = async(req, res)=>{
    res.send('regster user');
}

module.exports = {register, login}