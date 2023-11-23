const { handleLogin, processNewToken, handleLogout, handleRegister } = require('../services/AuthService');

const login = async (req, res) => {
    let data = await handleLogin(req.body, res);

    return res.status(202).json({
        ...data
    })
}

const resgiter = async (req, res) => {
    let result = await handleRegister(req.body);

    return res.status(200).json(
        {
            EC: 0,
            data: result
        }
    )
}

const handleRefreshToken = async (req, res) => {
    let refresh_token = req.cookies['refresh_token'];
    let data = await processNewToken(refresh_token, res);

    return res.status(202).json({
        EC: 0,
        data: data
    })
}

const logout = async (req, res) => {

    let result = await handleLogout(res);

    return res.status(202).json({
        EC: 0,
        data: result
    })
}

module.exports = {
    login, handleRefreshToken, logout, resgiter
}