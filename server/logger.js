// ./server/logger.js to config access log

const config = require("../config");

const morgan = require("morgan");
const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

// provide morgan function to handle the ':id' token from http requests
morgan.token('id', function getId(req){
    return req.id
});

// setup the rotating access.log file stream location and rotation interval
const accessLog = rfs.createStream(
                    config.ACCESS_LOG_NAME, {
                        interval: config.ACCESS_LOG_ROTATION,
                        path: path.join(__dirname, 
                                        config.ACCESS_LOG_DIR, 
                                        config.ACCESS_LOG_NAME)
});

// configure the access.log logger output file stream and format
const logger = morgan(config.ACCESS_LOG_FORMAT, {
    stream: accessLog,
    immediate: config.ACCESS_LOG_ON_REQUEST
});

module.exports = logger;