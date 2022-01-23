# questions-answers-sb

## About
A web-scaling microservice application for a product browsing website's (https://github.com/marble-systems/marblewear) Q&A section handling a 20m+ document MongoDB collection. Can be reconfigured for both vertical and horizontal deployments.

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

## Operation
Run command:
```
npm run start-server
```
Ensure that EC2 host DB is running with provider.