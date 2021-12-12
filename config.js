// ./config_runtime.js

const fs = require('fs');

const config = {};

config.VERSION = "0.0.1";
config.API_NAME =  process.env.DIALOG_API_NAME || "Test Dialog Engine";

config.HTTPS_PORT = process.env.DIALOG_HTTPS_PORT       || 3000;
config.HTTPS_OPTIONS = process.env.DIALOG_HTTPS_OPTIONS || {
     key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Configure the morgan access log for recording requests to file system access log
config.ACCESS_LOG_NAME = process.env.DIALOG_ACCESS_LOG_NAME         || "access.log";
config.ACCESS_LOG_DIR = process.env.DIALOG_ACCESS_LOG_DIR           || "logs";
config.ACCESS_LOG_FORMAT = process.env.DIALOG_ACCESS_LOG_FORMAT     || ":date[iso] :id :method :url :referrer :remote-user :remote-addr :user-agent";
config.ACCESS_LOG_ROTATION = process.env.DIALOG_ACCESS_LOG_ROTATION || "1d";
config.ACCESS_LOG_ON_REQUEST = true;

config.AWS_CREDENTIALS_PATH = '';
config.AWS_CREDENTIALS_FILE = '';

module.exports = config;