# Developer Project Setup

This was initially done from scratch.  Later, I started using Visual Studio Code.


## [Create New React App](https://reactjs.org/docs/create-a-new-react-app.html)
to enable Node development on your pc you will need to work from critical info in that document, summarized below:


## [Install Node.js](https://nodejs.org/en/download/)
install nodes.js

Fork or otherwise copy download the project:

[DialogEngine on GitHub](https://github.com/sascanagl/DialogEngine)
[DialogServer on GitHub](https://github.com/sascanagl/DialogServer) (Required mid-tier)

cd to the DialogEngine root project directory

## Might have to:

> * npm install react-scripts --save
> * npm install  (again to update package-lock.json -- if needed)
> * npm install react-hot-loader --save-dev  (probably not needed)

## Requires a running [DialogServer](https://github.com/sascanagl/DialogServer)

To run the DialogEngine, you have to have a local DialogServer mid-tier.

You will note the package.json file has the required proxy setting for this to work.

I will try to configure a public DialogServer that can act as a remote proxy soon.

## Run it

You must have both the DialogServer and the DialogEngine running:

> * DialogServer> npm start 
> * DialogEngine> npm start

and then in your browser:

> **localhost:3000** (note using localhost:3000 directly)

exit the runtime(s)  (Win: Ctrl-C) unless you want to experiment with it while running.
