import cors from "cors";
import express from "express";
import expressWinston from "express-winston";
import winston from "winston";
import {config} from "./config";
import {DefaultController} from "./controllers";

/**
 * Create express application
 * @type {Function}
 */
const app = express();
app.use(cors());

/**
 * Setup express logger
 * TODO {json: true,colorize: true} for config
 */
// TODO should setup a logger for prod and dev
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console(),
    ],
}));

app.use("/public", express.static("build/public"));

/**
 * This defines a catch all route for serving all react pages
 */
const defaultController = new DefaultController();

/**
 * Register endpoints
 */
app.get("/health", defaultController.health);
app.get("*", defaultController.render);

/**
 * Start express server on specific host and port
 */
app.listen(config.CLIENT.PORT, config.CLIENT.HOST, () => {
    console.log(`Running on http://${config.CLIENT.HOST}:${config.CLIENT.PORT}`);
});
