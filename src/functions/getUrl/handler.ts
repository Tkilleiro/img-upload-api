import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/apiGateway';
import { formatJSONResponse } from '../../libs/apiGateway';
import { constants } from '../../constants';
import { middyfy } from '../../libs/lambda';

import { S3 } from 'aws-sdk';
import schema from './schema';

const s3 = new S3({
  signatureVersion: 'v4'
});

/**
 * This method returns a JSON response with the AWS S3 Presigned URL that makes it possible to upload files to the bucket.
 * 
 * @param event - Lambda event variable containing the request information 
 */
export const getUrl: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {


  console.log('event:'+ JSON.stringify(event));
  const bucketName = constants.bucketS3Name;
  const key = `image/${event.body.name}`

  // The Expiration time in seconds of the signed URL 
  const signedUrlExpireSeconds = 60 * 5;
  
  // Response object with the results
  let res: {url: string, error: string;} = {url: "", error: ""}

  try {
    //Getting the presigned url of s3 Bucket
    const url = await s3.getSignedUrlPromise('putObject', {
      Bucket: bucketName,
      Key: key,
      Expires: signedUrlExpireSeconds,
    });
    console.log(url)
    res.url = url
    console.log('Presigned url: ', res.url);
  } catch(err) {
    res.error = err;
    console.log('Error: ', err);
  }

  return formatJSONResponse(res);
}

export const main = middyfy(getUrl);
