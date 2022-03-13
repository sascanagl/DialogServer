# Dialog Server

This project is my experimentation in implementing a game engine logic tree as I remember seeing it in the Oblivion World Construction Kit.  I did not go back and look at the actual implementation.  Having seen it years ago, and grasping the concept, I have decided to implement something like that as my first exercise in developing something with React.

In addition, this is an experiment in ultra-dynamic dialog generation for games and NPC bots.  You can find more detailed information later in this README and in the other documents described there.

And, to spice it up even further, we are interfacing the dynamically generated dialog to be optionally available via different voices using AWS Polly text-to-speech synthesis.  One of our running sample servers should be able to demonstrate this for you soon.

The Dialog Server replaces the original standalone Node/React Dialog Engine into separate pieces:

* Node mid-tier server
* React UI client

This is necessary to secure mid-tier utilization across paid cloud services like:

* AWS Polly
* AWS S3
* Cloud Web Services

The React client is now part of this project in the `client` subdirectory.

## Configurable

The Node server is intended to be totally configurable:

***`config.js`***

Sensitive data like authentication keys and passwords will be pulled in via:

***`.env`***

## Setup

### [Install Node.js](https://nodejs.org/en/download/)
install nodes.js

Fork or otherwise copy download the project:

[DialogServer on GitHub](https://github.com/sascanagl/DialogServer)

### Install required Node Server node_modules:

cd to the `DialogServer` root project directory and run:

> * npm install

### Install required React client node_modules:

cd to the `client` subdirectory and run:

> * npm install

### Enable HTTPS certificate for the Server

The server requires a valid site certificate.  It can be a self-signed certificate, but that is only for local development.  The easiest self-signed certificate process I've experienced to acquire both the cert and the private key was installing and [using OpenSSL](https://www.ibm.com/docs/en/api-connect/2018.x?topic=overview-generating-self-signed-certificate-using-openssl).

Something like:
```
    openssl req -newkey rsa:4096 -x509 -nodes -keyout key.pem -out cert.pem -days 999
```
Then provide the paths to your specific `key.pem` and `cert.pem` in the `config.js` file as shown in the snippet below:
```
config.HTTPS_OPTIONS = process.env.DIALOG_HTTPS_OPTIONS || {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
```
As shown above and set by default, this specifies the files are located in the root directory of the project and are named `key.pem' and 'cert.pem'.

The files can be located and named as needed--as long as they are reachable at runtime.

### Enable AWS Polly dynamic speech synthesis

AWS Polly is NOT required to use the Dialog Engine, but Polly adds significant impact with the dynamically generated speech.

AWS Polly requires an appropriate AWS account and configuring your own AWS Cognito Identity Pool using your own ```aws_access_key``` and ```aws_secret_access_key```.
This is free to setup and use within the boundaries of the AWS free account restrictions.

If used, minimally required configuration in your System Environment or ```.env``` file:

>DIALOG_AWS_POLLY_ENABLED=true \
>DIALOG_AWS_IDENTITY_POOL=val \
>DIALOG_AWS_REGION=val \
>DIALOG_AWS_POLLY_TIMEOUT=n  (defaults to 4 seconds)

Other ```.env``` values if not using defaults:

>DIALOG_AWS_CREDENTIALS_PATH=directory \
>DIALOG_AWS_CREDENTIALS_FILE=file

### Run the HTTPS Server

cd to the DialogServer root project directory and run:

> * npm start

By default, this runs the `HTTPS` server at `https://localhost:3001`

Note: the `HTTPS` Server has a working production snapshot of the react application running at its `HTTPS` root.  This is separate from any development version you might be working on as discussed below.

### Run the HTTP development React client

cd to the project's `client` subdirectory and run:

> * npm start

By default, this runs the `HTTP` development server that builds/launches the client under development at `http://localhost:3000`

This client development server `REQUIRES` the HTTPS server on port 3001 up and running to provide mid-tier content and services.

Note: You can see and interact with both the HTTPS production snapshot and the HTTP development client simultaneously by using the correct URLS in two different browsers/tabs:

HTTPS Production Snapshot: 
> ```https://localhost:3001```

HTTP React client develop: 
> ```http://localhost:3000```

Note: the client server is NOT required to be running if all you want to do is run the production version of the application.  In that case, you only need the Node server running on port `3001` and it will serve up the application in production mode.

### Connect with Server API

The default configuration runs a HTTPS server on PORT 3001

When running, you can validate success from a browser as shown below:

> ```https://localhost:3001/engine/about```

You should receive back a status code of 200 and a text/plain response like:

> ```Welcome to Test Dialog Engine version n.n.n```

Then Swagger UI should be at:

> ```https://localhost:3001/engine/api```

As mentioned, a production build of React App [Business of Murder](https://github.com/sascanagl/DialogEngine) currently in-development is served up from the root:

> ```https://localhost:3001```

### The Server Code

The server code is stored in the ```./server/``` directory:

- ```http_serve.js``` - shared http response code/library.
- ```server.js``` - configures the Node Express server using ```config.js```and these below:
- ```logger.js``` - configures the Morgan access log for the file system.
- ```engine.js``` - configures the API Express Router endpoints for the server.
- ```synonyms.js``` - express router for Synonyms endpoints.
- ```messages.js``` - express router for Messages endpoints.
- ```randomMessages.js``` - express router for RandomMessages endpoints.
- ```chainedMessages.js``` - express router for ChainedMessages endpoints.

The server API Swagger UI JSON is stored in the ```./server/docs/``` directory and subdirectories.

The functional code for the engine API is stored in the ```./server/dialog/``` directory.
This includes the ```AWS_Polly.js``` interface to Amazon's AWS Polly system.

The production snapshot of the React App is stored in the ```./build/``` directory.

### Server Access Logs

The default configuration stores rotating access logs in the ```./server/logs/``` directory.

### The Dialog Engine Data and Documentation

The data used by this unique dynamic dialog engine is stored and described in the ```./server/dialog/```  and ```./server/dialog/data/``` directories.

## Reusable Dialog Engine
The overall DialogEngine logic is intended to be reusable--supporting different games, game logic, and conversations.  The content and documentation is currently being revamped as the some of the functionality and data is now up on the Server instead of in the client.

## The 'logic' behind dynamic dialog
[CoreLogicTable](server/dialog/data/__CoreLogTable.md)

# The Dynamics of Dynamic Dialog
Independent of the game logic tree, is an attempt to make a sophisticated dynamic dialog engine intended to deliver a richer dialog experience.

[SynonymsMap](server/dialog/data/SynonymsData.md): Starts by providing a large array of root words and a list of synonyms.

[MessageMap](server/dialog/data/MessageData.md): Templates of possible messages--which might be whole sentences or snippets of sentences--are defined with references to synonyms in them.

Just prior to display, the message template is processed and the synonym placeholders are replaced dynamically.  This makes that message different each time it is used.  The more synonyms available, the more unique each message can be each time it is used.

[RandomMessageMap](server/dialog/data/RandomMessageData.md): Messages can be grouped together and defined as an array of related messages that can be randomly chosen to satisfy a particular message.  Instead of always displaying the same message, the game can randomly choose from N number of related messages.  And all of these messages are dynamically generated from templates as described above.

[ChainedMessageMap](server/dialog/data/ChainedMessageData.md): Additionally, messages can be chained together.  This is helpful when a longer dialog is needed to convey more information.  The chained messages can also take advantage of using the random message map.  So an N message monologue can actually be made from N random but related messages stringed together making the whole monologue unique each time it is seen (or heard).

Key to this is that any given message can be made of any number of message snippets, random messages, chained messages, or well-placed synonyms.  The richness is only limited by the amount of dialog data the game designer wants to provide.

### LocationData.js
[LocationData](server/dialog/data/LocationData.js) is where the game world is described.  What all the rooms or zones or locations might be. How they all might be connected together.  What people might be where, at the start of the game.

More documentation on this will be coming soon, but you can probably figure it out by simply looking at the file.
