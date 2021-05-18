const jwt = require('jsonwebtoken');
const userController = require("../controllers/users/userController");
const db = require("../models");
const User = db.users;
// middleware to validate token
const verifyToken = async (req, res, next) => {
 // const token = req.header('auth-token');
 const token = req.headers['authorization'];
 if (!token) return res.status(401).json({ error: 'Access denied' });
 try {
 const bearer = token.split(' ');
 const bearerToken = bearer[1];
 const verified = jwt.verify(bearerToken, process.env.JWT_SECRET);

 // const verified = jwt.verify(token, process.env.JWT_SECRET);
 //this part to get authorized user data
 var userData = userController.parseJwt(bearerToken);
 req.user = userData;
 if(userData.userType == 'Admin')
 next() // continuous;
 else
 res.status(300).json({error: 'You are not authorized as admin'});
 //
 } catch (error) {
 res.status(400).json({error: 'token not valid'});
 }
}
module.exports = verifyToken;