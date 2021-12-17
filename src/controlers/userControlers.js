const express = require('express');
const logger = require('../loaders/logger');
const userModel = require('../models/userModel');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUsers = async (req,res,next) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = async (req,res,next) => {
    try {
        let user = await userModel.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
 const updateUser = async (req,res,next) => {
    try {
        const {id} = req.params;
        let user = req.body;
        user.id = id; //aca pone user._id
        await userModel.updateOne(user);
        res.json(user);
    } catch (error) {
        next(error);
    }
 }

 /**
 * @param {express.Request} req
 * @param {express.Response} res
 */
  const deleteUser = async (req,res,next) => {
    try {
        const{id} = req.params;
        const user = await userModel.findById(id);
        user.remove();
        const result = {
            message: `User with id: ${id} deleted.`
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
  }


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}
