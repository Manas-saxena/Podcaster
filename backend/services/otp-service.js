const crypto  = require('crypto');
const hashService = require('./hash-service');
const smsSid = process.env.SMS_SID
const smsAuth = process.env.SMS_AUTH
const twilio = require('twilio')(smsSid,smsAuth,{
    lazyLoading:true
});

class OtpService{

async generateOtp(){
    const otp = await crypto.randomInt(1000,9999);
    return otp;
}

async sendBySms(phone,otp){
    return await twilio.messages.create({
        to:phone,
        from:process.env.SMS_FROM_NUMBER,
        body:`Yours Podcaster otp : ${otp}`
    })
}

async verifyOtp(hashedOtp , data){
    let computedHash = await hashService.hashOtp(data);
    return hashedOtp === computedHash;
}


}

module.exports = new OtpService()