const express = require('express');
const logger = require('../loaders/logger');
const {accesLogin} = require('../services/authService');
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const login = async (req,res,next) => {
    try {
        const {email, password} = req.body;
        res.json(await accesLogin(email,password));
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login
}
