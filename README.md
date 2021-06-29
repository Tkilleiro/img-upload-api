# img-upload-api
This project creates an API to enable system users to securely upload images to an S3 bucket.

* Requirements
In order to execute and deploy this project, there is a need to have previously installed:
- [AWS CLI V2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) 
- [Node 12](https://nodejs.org/en/download/package-manager/)

* Deployment
In order to build and deploy the serverless application execute the following steps:
- npm install
- npm run deploy

* Unity Tests
In order to execute the unity tests, run the following
- npm run test
- nom run test-coverage

* Development References
In order to create this project, I've did some research during development and based some parts of my project on the following references:
- https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates/aws-nodejs-typescript
- https://levelup.gitconnected.com/use-presigned-url-to-upload-files-into-aws-s3-db6b7a8c2cc9
- https://awskarthik82.medium.com/part-1-securing-aws-api-gateway-using-aws-cognito-oauth2-scopes-410e7fb4a4c0
- https://lumigo.io/blog/unlocking-more-serverless-use-cases-with-efs-and-lambda/


