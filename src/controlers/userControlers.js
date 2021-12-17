const express = require('express');
const logger = require('../loaders/logger');
const userModel = require('../models/userModel');
const {findAll, findById, saveUser, updateUser, deleteUser} = require('../services/userService');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getUsers = async (req,res,next) => {
    try {
        const users = await findAll();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
 const getUserById = async (req,res,next) => {
    try {
        const {id} = req.params;
        const users = await findById(id);
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
        let user = await saveUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
 const update = async (req,res,next) => {
    try {
        const {id} = req.params;
        let user = req.body;
        await updateUser(id,user)
        res.json(user);
    } catch (error) {
        next(error);
    }
 }

 /**
 * @param {express.Request} req
 * @param {express.Response} res
 */
  const removeUser = async (req,res,next) => {
    try {
        const{id} = req.params;
        await deleteUser(id);
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
    getUserById,
    createUser,
    update,
    removeUser
}
