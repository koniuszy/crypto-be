// plugins:
// serverless-plugin-optimize
// serverless-plugin-warmup

import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'crypto-be',
  package: {
    individually: true,
    exclude: ['node_modules/typescript/**', 'node_modules/@types/**'],
  },
  plugins: ['serverless-offline', 'serverless-plugin-typescript'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-central-1',
    lambdaHashingVersion: '20201221',
    apiGateway: {
      shouldStartNameWithService: true,
    },
  },
  functions: {
    main: {
      handler: 'src/serverless.handler',
      events: [
        {
          http: {
            path: '{proxy+}',
            method: 'any',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
