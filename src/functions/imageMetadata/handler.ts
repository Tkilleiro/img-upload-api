import { S3 } from 'aws-sdk';
import * as imageMagick from 'gm';
import * as fs from 'fs';
import { constants } from '../../constants';

const gm = imageMagick.subClass({ imageMagick: true })

export const readMetadataPromise = (path: string) => {
  return new Promise((resolve, reject) => {
    gm(path).identify((err, result) => {
      if (err) reject(err);
      resolve(result)
    })
  })
}

export const imageMetadata = async (event) => {
  /**
   * This method will be triggered by the put object action from a defined S3 Bucket 
   * and download the image, extract the image metadata and save on the bucket 
   * it in a json file.  
   * 
   * @param event
   */

  const s3 = new S3({
    region: 'us-east-1'
  });

  const bucket = event.Records[0].s3.bucket.name;
  const key = event.Records[0].s3.object.key;
  let metadata = {};
  const filePath = `${constants.filePath}/${key}`;

  try {

    const params: S3.GetObjectRequest = {
      Bucket: bucket,
      Key: key,
    };

    //Getting the file from the S3 Bucket
    const data = await s3.getObject(params).promise();
    fs.writeFileSync(filePath, data.Body as any, {encoding: 'utf8'});
    
    //Reading metadata with ImageMagick
    metadata = Buffer.from(JSON.stringify(await readMetadataPromise(filePath)));

    // Uploading files to the bucket
    const fileMetadata = "metadata/file_metadata.json";
    const saveFile: S3.PutObjectRequest = {
      Bucket: bucket,
      Key: fileMetadata,
      Body: metadata,
      ContentType: "application/json"
    }
    await s3.upload(saveFile).promise();

  } catch (err) {
    console.log(err);
    throw new Error(err);
  }

  return metadata;
}

export const main = imageMetadata;
