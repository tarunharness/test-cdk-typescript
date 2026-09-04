import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class S3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'sunny-cdk-test-bucket-04', {
      bucketName: 'sunny-cdk-test-bucket-04',
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Output the bucket's ARN
    new cdk.CfnOutput(this, 'MyBucketArnOutput', {
      value: bucket.bucketArn,
      description: 'The ARN of the S3 bucket', // Optional description
      exportName: 'MyS3BucketARN',               // Optional name for cross-stack reference
    });
  }
}
