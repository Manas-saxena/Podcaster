const UserModel = require('../models/user-model')

class Userservice{

    async findUser(filter){
        const user = UserModel.findOne(filter);
        return user;
    }

    async createUser(data){
        const user = UserModel.create(data);
        return user;
    }
}

module.exports = new Userservice()