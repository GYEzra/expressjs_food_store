require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const { createJWT, verifyToken } = require('../middleware/JWTAction.js');


const handleLogin = async (data, res) => {
    try {
        let status = 'Hoạt động';
        let user = await User.findOne({ username: data.username, status });

        if (user) {
            let isPassword = checkPassword(data.password, user.password);
            if (isPassword) {
                let payload = {
                    _id: user._id,
                    username: user.username,
                    role: user.role,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    gender: user.gender,
                    status: user.status,
                    expiresIn: process.env.JWT_EXPIRES_IN
                };

                let refresh_token = createJWT(payload);
                await User.updateOne({ _id: user._id }, { refresh_token });
                res.cookie("refresh_token", refresh_token, { httpOnly: true, maxAge: 60 * 1000000 });

                return {
                    EC: 0,
                    data: {
                        refresh_token,
                        user: {
                            _id: user._id,
                            name: user.name,
                            role: user.role,
                            email: user.email,
                            phone: user.phone,
                            address: user.address,
                            gender: user.gender,
                            status: user.status,
                        }
                    }
                }
            }
        }

        return {
            EC: -1,
            errorMessage: 'Tài khoản hoặc mật khẩu không chính xác'
        }
    } catch (error) {
        console.log(error)
    }

    return null;
}

const handleRegister = async (data) => {
    const { username, password } = data;

    try {
        const isUsername = await checkUsernameExist(username);
        if (!isUsername) {
            const hashPassword = getHashPassword(password);

            const user = await User.create({
                ...data,
                password: hashPassword,
                status: 'Hoạt động'
            });

            return user;
        }
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const handleLogout = async (res) => {
    res.clearCookie('refresh_token');
    return true;
}

const checkUsernameExist = async (username) => {
    const user = await User.findOne({ username });

    return user ? true : false;
}

const checkPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

const getHashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const processNewToken = async (refreshToken, res) => {
    console.log('Check refresh token: ', refreshToken);
    try {
        let user = verifyToken(refreshToken);

        if (user) {
            let payload = {
                username: user.username,
                role: user.role,
                name: user.name,
                expiresIn: process.env.JWT_EXPIRES_IN
            };

            let refresh_token = createJWT(payload);
            await User.updateOne({ _id: user._id }, { refresh_token });
            res.cookie("refresh_token", refresh_token, { httpOnly: true, maxAge: 60 * 10000 });

            return {
                refresh_token,
                role: user.role
            }
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    handleLogin, handleRegister, getHashPassword, checkUsernameExist, processNewToken, handleLogout
}