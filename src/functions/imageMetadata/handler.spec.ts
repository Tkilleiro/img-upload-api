import * as imageMetadata from './handler';
import * as constants from '../../constants';


//Mock of Lambda received event
const mockEvent = {
  "Records": [
    {
      "s3": {
        "bucket": {
          "name": "myBucket"
        },
        "object": {
          "key": "test.png",
        }
      }
    }
  ]
}

const mockS3GetObject = jest.fn();
const mockS3upload = jest.fn();

jest.mock('aws-sdk', () => {
    return {
        S3: jest.fn(() => ({
            getObject: mockS3GetObject,
            upload: mockS3upload
        }))
    };
});

const mockReadMetadataPromise = () => {
  return new Promise((resolve) => {
    resolve({"test": "test"})
  })
}

test('Validating File Read Metadata', async () => {

  //Mocking file path for writing the image file
  constants.constants.filePath = '.';

  //Mocking the implementation of the AWS S3 method getObject()
  mockS3GetObject.mockImplementation(() => {
    return {
        promise() {
            return Promise.resolve({ Body: "test document" })
        }
    };
  });

  //Mocking the implementation of AWS S3 method upload
  mockS3upload.mockImplementation(() => {
    return {
        promise() {
            return Promise.resolve(true)
        }
    };
  });

  //Mocking the readMetadataPromise method responsible for reading the image metadata
  const addMock = jest.spyOn(imageMetadata, 'readMetadataPromise');
  addMock.mockImplementation(mockReadMetadataPromise);

  const payload = JSON.stringify(await imageMetadata.imageMetadata(mockEvent))
  expect(JSON.parse(payload)).toMatchObject({type: "Buffer"})
});

