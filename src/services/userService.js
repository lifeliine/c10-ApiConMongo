
const logger= require('../loaders/logger');
const UserRepository = require('../repositories/userRepository');
const userRepository = new UserRepository();
const bcrypt = require('bcrypt');

const findAll = async() => {
    return await userRepository.getAll();
}

const findById = async(id) => {
    return await userRepository.getById(id);
}

const saveUser = async(user) => {
    user.password = await bcrypt.hash(user.password, 10);
    return await userRepository.save(user);
}

const updateUser = async(id,user) => {
    return await userRepository.update(id,user);
}

const deleteUser = async(id) => {
    return await userRepository.delete(id);
}

module.exports = {
    findAll,
    findById,
    saveUser,
    updateUser,
    deleteUser
}

