import type { AWS } from '@serverless/typescript';
import getUrl from 'src/functions/getUrl';
import imageMetadata from 'src/functions/imageMetadata';
import { constants } from 'src/constants';

const serverlessConfiguration: AWS = {
  service: "img-upload-api",
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: "20201221",
  },
  resources: {
    Resources: {
      UploadBucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: constants.bucketS3Name,
          AccessControl: "Private",
          PublicAccessBlockConfiguration: {
            BlockPublicAcls: true,
            BlockPublicPolicy: false,
            IgnorePublicAcls: true,
            RestrictPublicBuckets: true,
          },
          CorsConfiguration: {
            CorsRules: [ {
              AllowedMethods: [
                "GET",
                "PUT",
                "POST",
                "HEAD",
              ],
              AllowedOrigins: ["*"],
              AllowedHeaders: ["*"]
            }]
          }
        }
      },
      UploadBucketPolicy: {
        Type: "AWS::S3::BucketPolicy",
        Properties: {
          PolicyDocument: {
            Statement: {
                Sid: "PublicReadForGetBucketObjects",
                Effect: "Allow",
                Principal: '*',
                Action: [
                 's3:GetObject',
                 's3:PutObject'
                ],
                Resource: `${constants.bucketS3Arn}/*`
             }
            },
          Bucket:{
            Ref: "UploadBucket"
          }
        }
      }
    }
  },

  // import the function via paths
  functions: { getUrl, imageMetadata},
};

module.exports = serverlessConfiguration;
