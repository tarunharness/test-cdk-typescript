#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3Stack } from '../lib/s3-stack';
import { SQSStack } from '../lib/sqs-stack';
// import { EC2Stack } from '../lib/ec2-stack';

const app = new cdk.App();

const testvar = app.node.tryGetContext('TEST_VAR') ?? 'FAIL';
console.log('[CDK Context] env=' + env);

new S3Stack(app, 'S3Stack');
new SQSStack(app, 'SQSStack');
// new EC2Stack(app, 'EC2Stack');
