import { handlerPath } from '@libs/handlerResolver';
import { constants } from 'src/constants'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [{
    s3:{
      bucket: constants.bucketS3Name,
      event: "s3:ObjectCreated:*",
      rules: [{
        prefix: "image/"
      }],
      existing: true
    }
  }],
  layers: ["arn:aws:lambda:us-east-1:656520910402:layer:image-magick:1"],
  vpc:{
      securityGroupIds:["sg-af8f84b7"],
      subnetIds:
      ["subnet-8dc78feb", "subnet-c94e18e8"],
  },
  fileSystemConfig:{
    arn: "arn:aws:elasticfilesystem:us-east-1:656520910402:access-point/fsap-042c72b36c2fdeaf4",
    localMountPath: '/mnt/images'
  },
}
