const jwt = require('jsonwebtoken')
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET
const refreshModel = require("../models/refresh-model");

class TokenServie{

generateTokens(payload){
    const accessToken = jwt.sign(payload,accessTokenSecret,{
        expiresIn:'1h'
    })
    const refreshToken = jwt.sign(payload,refreshTokenSecret,{
        expiresIn:'1y'
    })

    return {accessToken , refreshToken};
}

async storeRefreshToken(token,userId){
    try {
        await refreshModel.create({
            token,
            userId
        })
    } catch (error) {
        console.log(error.msg)
    }
}

async verifyAccessToken(accessToken){
    return jwt.verify(accessToken,accessTokenSecret);
}

}

module.exports = new TokenServie();