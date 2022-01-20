# questions-answers-sb

## About
A microservice API for routing requests from MarbleWear (https://github.com/marble-systems/marblewear). Can be reconfigured for both vertical and horizontal deployments.

## Installation
* While in root directory (questions-answers-sb):
```
npm install
```
* In db/queries.js:
```
'mongodb://127.0.0.1:27017/questions-answers-sb' =>
'${instanceUrl}'
```