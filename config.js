// ./config.js
const fs = require('fs');

const config = {};

config.VERSION = process.env.npm_package_version || $npm_package_version || "n.n.n";

config.ENGINE_NAME =  process.env.DIALOG_ENGINE_NAME || "Test Dialog Engine";

config.ENGINE_ROOT = "/engine";
config.HTTPS_PORT = process.env.DIALOG_HTTPS_PORT       || 3001;
config.HTTPS_OPTIONS = process.env.DIALOG_HTTPS_OPTIONS || {
     key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Configure the morgan access log for recording requests to file system access log
config.ACCESS_LOG_NAME       = process.env.DIALOG_ACCESS_LOG_NAME     || "access.log";
config.ACCESS_LOG_DIR        = process.env.DIALOG_ACCESS_LOG_DIR      || "logs";
config.ACCESS_LOG_FORMAT     = process.env.DIALOG_ACCESS_LOG_FORMAT   || ":date[iso] :id :method :url :referrer :remote-user :remote-addr :user-agent";
config.ACCESS_LOG_ROTATION   = process.env.DIALOG_ACCESS_LOG_ROTATION || "1d";

// access log at time of request instead of response
config.ACCESS_LOG_ON_REQUEST = true;

// optional AWS configuration should be provided in the secure project root .env file
// and may reference other secure credentials and configuration stored elsewhere
config.AWS_POLLY_ENABLED    = process.env.DIALOG_AWS_POLLY_ENABLED    || false;
config.AWS_CREDENTIALS_PATH = process.env.DIALOG_AWS_CREDENTIALS_PATH || '';
config.AWS_CREDENTIALS_FILE = process.env.DIALOG_AWS_CREDENTIALS_FILE || '';
config.AWS_IDENTITY_POOL    = process.env.DIALOG_AWS_IDENTITY_POOL    || '';
config.AWS_REGION           = process.env.DIALOG_AWS_REGION           || '';
config.AWS_POLLY_TIMEOUT    = process.env.DIALOG_AWS_POLLY_TIMEOUT    ||  4;

module.exports = config;