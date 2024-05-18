const crypto = require('crypto')

class HashService{

    async hashOtp(data){
        return await crypto.createHmac('sha256',process.env.HASH_SECRET).update(data).digest('hex');
    }
}


module.exports = new HashService();