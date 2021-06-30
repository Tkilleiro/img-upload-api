# img-upload-api

## Description
This project creates an API to enable system users to securely upload images to an S3 bucket and extract its EXIF metadata.

## How does it work:
The project architecture is currently working as an Rest API that uses authentication through AWS Cognito configured with AWS API Gateway. 
With the token provided by AWS Cognito it's possible to request a presigned url of a AWS S3 Bucket. The presigned url method is running in a AWS Lambda triggered by the API Gateway "/getUrl" path.
The presigned url is used to send an image file to the AWS S3 Bucket that triggers a AWS Lambda responsible to retrieve the file from the bucket, write to an AWS EFS (Elastic File System) 
in order to be analysed to ImageMagick node library (https://www.npmjs.com/package/gm). The ImageMagick method will receive a path from EFS in order to extract the image metadata and then write a Json file 
to a different path on the S3 Bucket.

## Requirements
In order to execute and deploy this project, there is a need to have previously installed:
- [AWS CLI V2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) 
- [Node 12](https://nodejs.org/en/download/package-manager/)

## Deployment
In order to build and deploy the serverless application execute the following steps:
- npm install
- npm run deploy

## Unity Tests
In order to execute the unity tests, run the following
- npm run test
- nom run test-coverage

## Development References
In order to create this project, I've did some research during development and based some parts of my project on the following references:
- https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates/aws-nodejs-typescript
- https://levelup.gitconnected.com/use-presigned-url-to-upload-files-into-aws-s3-db6b7a8c2cc9
- https://serverlessrepo.aws.amazon.com/#!/applications/arn:aws:serverlessrepo:us-east-1:145266761615:applications~image-magick-lambda-layer
- https://awskarthik82.medium.com/part-1-securing-aws-api-gateway-using-aws-cognito-oauth2-scopes-410e7fb4a4c0
- https://lumigo.io/blog/unlocking-more-serverless-use-cases-with-efs-and-lambda/


