import { getUrl } from './handler'

//Mocking the implementation of the AWS S3 method getSignedUrl()
jest.mock('aws-sdk', () => {
  return {
      S3: jest.fn(() => ({
        getSignedUrlPromise: jest.fn(() => "https://img-upload-imgmagick.s3.amazonaws.com/image.png")
      }))
  };
});

const mockEvent: any = {
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {"name": "image.png"}
}


test('Test Presigned URL', async () => {
  const payload = JSON.stringify(await getUrl(mockEvent, null, () => {}));
  console.log(payload);
  expect(payload).toContain("https://img-upload-imgmagick.s3.amazonaws.com/image.png")
});
