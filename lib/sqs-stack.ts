import * as cdk from 'aws-cdk-lib';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';

export class SQSStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Get context values from cdk.json
    const queueName = this.node.tryGetContext('queueName');
    const retentionDays = this.node.tryGetContext('queueRetentionDays');

    const queue = new sqs.Queue(this, 'MyQueue3', {
      queueName: queueName,
      visibilityTimeout: cdk.Duration.seconds(500),
      retentionPeriod: cdk.Duration.days(retentionDays),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Output the queue's ARN
    new cdk.CfnOutput(this, 'MyQueueArnOutput', {
      value: queue.queueArn,
      description: 'The ARN of the SQS queue', // Optional description
      exportName: 'MySQSQueueARN',               // Optional name for cross-stack reference
    });
  }
}
