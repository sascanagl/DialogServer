# Dialog Server

The Dialog Server is intended to take the original standalone Node/React Dialog Engine into separate Node midtier and React projects.  This is being done for multiple reasons:

- optimize resource utilization across paid services like:
    - AWS Polly -- dynamic speech generation
    - AWS S3 -- paid/persisting storage, if needed
- protect credentials required to use external paid services


## Configurable

The Node server is intended to be totally configurable from a single ***`config.js`*** file.


## Setup


### [Install Node.js](https://nodejs.org/en/download/)
install nodes.js

Fork or otherwise copy download the project:

[DialogServer on GitHub](https://github.com/sascanagl/DialogServer)

cd to the DialogServer root project directory


### Might have to:

> * npm install  (again to update package-lock.json -- if needed)

Otherwise, make sure the npm dependencies of the server are installed for the project.


### Enable HTTPS certificate

The server requires a valid site certificate.  It can be a self-signed certificate, but that is only recommended for local development.

Provide the paths to your specific ***`key.pem`*** and ***`cert.pem`*** in the `config.js` file as shown in the snippet below:

```
config.HTTPS_OPTIONS = process.env.DIALOG_HTTPS_OPTIONS || {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
```
As shown above and set by default, this specifies the files are located in the root directory of the project and are named `key.pem' and 'cert.pem'.

Of course, the files can be located and named as needed as long as they are reachable at runtime.


### Run the Server

> * npm start  (confirm basic app runs)
or
> * node server/server.js

###  Connect with clients

The default configuration runs a HTTPS server on PORT 3000

In the dev environment on localhost, you can validate success from a client as shown below:

> ```https://localhost:3000/engine/about```

You should receive back a status code of 200 and a text/plain response like:

> ```Welcome to Test Dialog Engine version 0.0.1```

### Review the Node code

The server code is stored in the ```/server/``` directory:

- ```server.js``` - configures the Node Express server using ```config.js```and these below:
- ```logger.js``` - configures the Morgan access log for the file system.
- ```engine.js``` - configures the API Express Router endpoints for the server.

### Server Access Logs

The default configuration stores rotating access logs in the ```./server/logs/``` directory.