// plugins:
// serverless-offline
// serverless-plugin-optimize
// serverless-plugin-warmup

import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'crypto-be',
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'eu-central-1',
    lambdaHashingVersion: '20201221',
    apiGateway: {
      shouldStartNameWithService: true,
    },
  },
  package: { individually: true },
  functions: {
    main: {
      handler: 'src/serverless.handler',
      events: [
        {
          http: {
            method: 'any',
            path: 'graphql',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
