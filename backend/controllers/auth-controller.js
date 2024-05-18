const otpService = require('../services/otp-service')
const hashService = require('../services/hash-service')
const userService = require('../services/user-service')
const tokenService= require('../services/token-service');

class AuthController{
    async sendOtp(req,res){
        const { phone }  = req.body;
        
        if(!phone)
        {
            return res.status(400).json({message:'Phone is required'});

        }

        const otp = await otpService.generateOtp()
        const ttl = 1000*60*2;
        const expires = Date.now() + ttl;
        const data =  `${phone}.${otp}.${expires}`;
        const hash = await hashService.hashOtp(data)

        try{
            // await otpService.sendBySms(phone,otp);

            res.status(200).json({
                hash:`${hash}.${expires}`,
                phone,
                otp
            })
        }
        catch(err){
            console.log(err);
            return res.status(500).json({message:`otp sending failed`,
                error:err
            });
        }
    }
    async verifyOtp(req, res){
        const {phone , otp , hash} = req.body;
        if(!phone || !otp || !hash){
           return  res.status(400).json({message:"All fields are required"})
        }

        const [hashOtp,expires] = hash.split('.');

        if(Date.now() > expires){
            return res.status(400).json({message:"Otp expired"});
        }

        const data =  `${phone}.${otp}.${expires}`;

        const isValid = await otpService.verifyOtp(hashOtp , data);

        if(!isValid)
           return  res.status(400).json({message:"invalid otp"})
        
        let user ; 
        try {
            user = await userService.findUser({phone});

            if(!user){
                user = await userService.createUser({phone});
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"DB error"})
        }

        const {accessToken , refreshToken} = tokenService.generateTokens({_id:user._id,activated:false});

        await tokenService.storeRefreshToken(refreshToken,user._id)

        res.cookie('refreshToken',refreshToken,{
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly : true,
        })
        res.cookie('accessToken',accessToken,{
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly : true,
        })



        return res.json({auth:true,user})
    }
}

module.exports = new AuthController()