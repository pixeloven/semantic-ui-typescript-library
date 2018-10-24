import cors from "cors";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";
import webpackClientConfig from "./app/configs/webpack/client";
import webpackServerConfig from "./app/configs/webpack/server";

// https://github.com/gaearon/react-hot-loader
// https://github.com/webpack-contrib/webpack-hot-middleware
// https://github.com/60frames/webpack-hot-server-middleware
// https://github.com/webpack/webpack-dev-middleware/
// https://github.com/luangjokaj/react-ssr-boilerplate
// TODO rename templates views and use the above repo as an example... can just use .ejs and have just one
// TODO make it so you can build just the server and not client too

/**
 * Create express application
 * @type {Function}
 */
const app = express();
app.use(cors());

/**
 * Setup webpack hot module replacement for development
 */
const combinedCompiler = webpack([webpackClientConfig, webpackServerConfig]);
const clientCompiler = combinedCompiler.compilers.find(compiler => compiler.name === "client");
app.use(webpackDevMiddleware(combinedCompiler));
if (clientCompiler) {
    app.use(webpackHotMiddleware(clientCompiler));
}
app.use(webpackHotServerMiddleware(combinedCompiler));

/**
 * Start express server on specific host and port
 * TODO in dev should migrate ports if already in use
 */
app.listen(8080);
