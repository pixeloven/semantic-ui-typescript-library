import Env, {Environment} from "../app/configs/env";

/**
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", err => {
    throw err;
});

/**
 * Initialize env vars
 */
Env.load();

/**
 * Set test environment
 */
const environment: Environment = "production";
Env.define("BABEL_ENV", environment);
Env.define("NODE_ENV", environment);
