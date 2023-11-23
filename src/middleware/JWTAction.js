require('dotenv').config()
const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
    let secretKey = process.env.JWT_SECRET;
    let expiresIn = process.env.JWT_EXPIRES_IN;
    let token = null;

    try {
        token = jwt.sign(payload, secretKey, { expiresIn });
    } catch (error) {
        console.log(error);
    }

    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error);
    }

    return decoded;
}

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    let refresh_token = req.cookies['refresh_token'];

    console.log(refresh_token)

    if (cookies && cookies.refresh_token) {
        let token = cookies.refresh_token;
        let decoded = verifyToken(token);

        if (decoded) {
            req.user = decoded
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                data: null
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            data: null
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT,
}