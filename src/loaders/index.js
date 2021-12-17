const ExpressServer = require('./server/expressServer');
const config = require('../config');
const logger = require('./logger');
const moongoseInit = require('./mongoose/mongooseInit');

module.exports = async () => {

    await moongoseInit();
    logger.info('DB connected.')

    const server = new ExpressServer();
    logger.info('express loaded');

    server.start();
    logger.info(`Server listening on port : ${config.port}`);
}