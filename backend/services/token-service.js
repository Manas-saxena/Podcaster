const jwt = require('jsonwebtoken')
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET
const refreshModel = require("../models/refresh-model");

class TokenServie{

generateTokens(payload){
    const accessToken = jwt.sign(payload,accessTokenSecret,{
        expiresIn:'1m'
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

async verifyRefreshToken(refreshToken){
    return jwt.verify(refreshToken,refreshTokenSecret);
}

async findRefreshToken(userId, refreshToken){
    const token = await refreshModel.findOne({userId : userId,token:refreshToken})
    return token;
}

async updateRefreshToken(refreshToken,userId){
    return await refreshModel.updateOne({userId:userId},{token:refreshToken})
}
}

module.exports = new TokenServie();