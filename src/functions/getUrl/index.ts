import schema from './schema';
import { handlerPath } from '@libs/handlerResolver';
import { constants } from 'src/constants'

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'get-url',
        authorizer: {
          arn: constants.cogArn,
          scopes: ["api-image-upload/send_file"]
        },
        request: {
          schema: {
            'application/json': schema
          }
        }
      }
    }
  ]
}
