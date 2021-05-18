const jwt = require('jsonwebtoken')
const userController = require("../controllers/users/userController");
const db = require("../models");
const User = db.users;
const Customer = db.customers;
// for all student and admin
// middleware to validate token (rutas protegidas)
const verifyToken = async(req, res, next) => {
    //const token = req.header('auth-token');
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const bearer = token.split(' ');
        const bearerToken = bearer[1];
        const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);
        //const verified = jwt.verify(token, process.env.JWT_SECRET);
        //req.user = verified;

        var userData = userController.parseJwt(bearerToken);
        const user = await User.findOne({ where: { userID: userData.id } });
        req.user = user;
        const customer = await Customer.findOne({ where: { userID: userData.id } });
        req.customer = customer
        next() // continuamos;
    } catch (error) {
        res.status(400).json({ error: 'token not valid' });
    }
}
module.exports = verifyToken