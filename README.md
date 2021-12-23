# Dialog Server

The Dialog Server is intended to take the original standalone Node/React Dialog Engine into separate Node mid-tier and React UI projects.

This is being done for multiple reasons:

- optimize resource utilization across paid services like:
    - AWS Polly -- free/paid dynamic speech generation
    - AWS S3 -- paid/persisting storage, if needed  (not used here)
- protect credentials and other assets required to use external paid services


## Configurable

The Node server is intended to be totally configurable from a single ***`config.js`*** file.
Sensitive data like authentication keys and passwords will be pulled in via a ***`.env`*** file in the project root directory.


## Setup


### [Install Node.js](https://nodejs.org/en/download/)
install nodes.js

Fork or otherwise copy download the project:

[DialogServer on GitHub](https://github.com/sascanagl/DialogServer)

cd to the DialogServer root project directory


### Might have to:

> * npm install 

Otherwise, make sure the npm dependencies of the server are installed for the project.


### Enable HTTPS certificate

The server requires a valid site certificate.  It can be a self-signed certificate, but that is only for local development.

Provide the paths to your specific `key.pem` and `cert.pem` in the `config.js` file as shown in the snippet below:

```
config.HTTPS_OPTIONS = process.env.DIALOG_HTTPS_OPTIONS || {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
```
As shown above and set by default, this specifies the files are located in the root directory of the project and are named `key.pem' and 'cert.pem'.

The files can be located and named as needed--as long as they are reachable at runtime.


### Enable AWS Polly dynamic speech synthesis

AWS Polly is NOT required to use the Dialog Engine, but Polly adds significant impact with the dynamically generated dialog.

AWS Polly requires an appropriate AWS account and configuring your own AWS Cognito Identity Pool using your own ```aws_access_key``` and ```aws_secret_access_key```.
This is free to setup and use within the boundaries of the AWS free account restrictions.


### Run the Server

> * npm start
or
> * node server/server.js


### Connect with clients

The default configuration runs a HTTPS server on PORT 3000

In the dev environment on localhost, you can validate success from a client as shown below:

> ```https://localhost:3000/engine/about```

You should receive back a status code of 200 and a text/plain response like:

> ```Welcome to Test Dialog Engine version n.n.n```

Then Swagger UI should be at:

> ```https://localhost:3000/engine/api```


### The Code

The server code is stored in the ```./server/``` directory:

- ```server.js``` - configures the Node Express server using ```config.js```and these below:
- ```logger.js``` - configures the Morgan access log for the file system.
- ```engine.js``` - configures the API Express Router endpoints for the server.
- ```synonyms.js``` - express router for Synonyms endpoints.
- ```messages.js``` - express router for Messages endpoints.
- ```randomMessages.js``` - express router for RandomMessages endpoints.
- ```chainedMessages.js``` - express router for ChainedMessages endpoints.

The server Swagger JSON is stored in the ```./server/docs/``` directory and subdirectories.

The functional code for dialog messaging is stored in the ```./server/dialog/``` directory.

### Server Access Logs

The default configuration stores rotating access logs in the ```./server/logs/``` directory.