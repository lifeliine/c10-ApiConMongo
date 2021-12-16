const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const config = require('../../config');
const logger = require('../logger');
class ExpressServer {

    constructor() {
        this.app = express();
        this.port = config.port;
        this.basePathWeather = `${config.api.prefix}/weather`;
        this.basePathCities = `${config.api.prefix}/cities`;
        this._middelware();
        this._swaggerConfig();
        this._routes();
        this._notFound();
        this._errorHandler();
        
    }


    _middelware(){
        this.app.use(express.json());//middelware del json, para configuracion, estoy me permite recibir cosas desde el body
        this.app.use(morgan('tiny'));
    }

    _routes(){
        this.app.head("/status", (req,res) => {
            res.status(200).end();
        });

        this.app.use(this.basePathWeather, require('../../routes/weatherRoutes'));
        this.app.use(this.basePathCities, require('../../routes/CitiesRoutes'));
    }

    _notFound(){
        this.app.use((req,res,next) => {
            const err =new Error("Not Found");
            err.code = 404;
            next(err);
        });
    }

    _errorHandler() {
        this.app.use((err,req,res,next) => {
            const code = err.code || 500;
            
            //para poder ver los errores en la consola en detalle
            logger.error(`${code} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            logger.error(err.stack);

            res.status(code);
            const body = {
                error:{
                    code,
                    message: err.message
                }
            }
            res.json(body);
        });
    }

    _swaggerConfig() {
        this.app.use(
            config.swagger.path,
            swaggerUi.serve,
            swaggerUi.setup(require('../swagger/swaggerDoc.json'))
        );
    }

    async start() {
        this.app.listen(this.port, (error) => {
            if (error){
                logger.error(err);
                process.exit(1);
                return;
            }
        })
    }

}

module.exports = ExpressServer;
