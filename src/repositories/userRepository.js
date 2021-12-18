//obtengo la data de la base de datos
const userModel = require('../models/userModel');

class UserRepository {
    constructor(){

    }

    async getAll(){
        return await userModel.find(); 
    }

    async getAllPagination(filter,options){
        return await userModel.paginate(filter,options)
        
    }

    async getById(id){
        return await userModel.findById(id);
    }

    async getByEmail(email){
        return await userModel.findOne({email: email});
    }

    async save(user) {
        return await userModel.create(user);
    }

    async update(id,user){
        return await userModel.findByIdAndUpdate(id,user,{new:true});
    }

    async delete(id){
        return await userModel.findByIdAndRemove(id);
    }
}

module.exports = UserRepository;