const jwt = require('jsonwebtoken');
const secret = 'Yashaswi123456$#';

function setUser(user) {
    return jwt.sign({
        _id : user._id,
        email : user.email,
        role : user.role
    }, secret); // Optional: add an expiration time
}

function getUser(token) {
    if (!token) return null;

    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error('Token verification error:', err.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser
};
