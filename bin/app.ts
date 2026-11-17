#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3Stack } from '../lib/s3-stack';
import { SQSStack } from '../lib/sqs-stack';
// import { EC2Stack } from '../lib/ec2-stack';

const app = new cdk.App();

const testvar = app.node.tryGetContext('TEST_VAR') ?? 'FAIL';
console.log('[CDK Context] testvar=' + testvar);

// Reproduces IAC-10600: the construct id (first arg) differs from the CloudFormation
// stackName. cdk.out/<construct id>.template.json is named after the construct id, while
// manifest.json carries the real stack name (e.g. S3Stack-int).
const stage = process.env.CDK_STAGE ?? app.node.tryGetContext('stage') ?? 'int';
console.log('[CDK Stage] stage=' + stage);

new S3Stack(app, 'S3Stack', { stackName: `S3Stack-${stage}` });
new SQSStack(app, 'SQSStack', { stackName: `SQSStack-${stage}` });
// new EC2Stack(app, 'EC2Stack');
