const jimp = require('jimp');
const path = require('path');
const userService = require('../services/user-service')

class ActivateController{
    async activate(req,res){
        const {name,avatar} = req.body;
        if(!name && !avatar){
            return res.status(400).json({message:'all fields are required'});
        }
        const imagePath = `${Date.now()}-${
            Math.round(Math.random()*1e9
        )}.png`
        const buffer = Buffer.from(avatar.replace(/^data:image\/(png|jpg|jpeg);base64/,''),'base64');
        try {
            const jimpres = await jimp.read(buffer);
            jimpres.resize(150,jimp.AUTO).write(path.resolve(__dirname,`../storage/${imagePath}`));
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'could not process request'});
        }
        try {
        const userId = req.user._id;
        const user = await userService.findUser({_id:userId});
        if(!user) return res.status(404).json({message:"user not found"});
        user.activated =true ;
        user.name = name;
        user.avatar = `/storage/${imagePath}`;
        user.save();
        return res.status(200).json({user:{
            id :user._id,
            activated: user.activated,
            name:user.name,
            avatar:`${process.env.BASE_URL}${user.avatar}`
        },auth:true})
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'something went wrong '});
        }
        
    }
}

module.exports = new ActivateController()