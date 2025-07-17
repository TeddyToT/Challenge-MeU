const jwt = require('jsonwebtoken')

class AuthService {
    static createAccessToken = (payload) => {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        return accessToken
    }


}

module.exports = AuthService;