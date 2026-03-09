# CDK TypeScript Project

This is a TypeScript CDK project converted from the Python CDK repository: https://github.com/sunnyagarwal008/cdk-python

## Project Structure

```
.
├── bin/
│   └── app.ts              # Main CDK application entry point
├── lib/
│   ├── s3-stack.ts         # S3 bucket stack
│   ├── sqs-stack.ts        # SQS queue stack
│   └── ec2-stack.ts        # EC2 instance stack (commented out)
├── cdk.json                # CDK configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Node.js dependencies
```

## Stacks

### S3Stack
Creates an S3 bucket with:
- Versioning enabled
- Auto-delete objects on stack deletion
- Removal policy set to DESTROY

### SQSStack
Creates an SQS queue with:
- Queue name from context (cdk.json)
- Visibility timeout of 500 seconds
- Retention period from context (4 days)
- Removal policy set to DESTROY

### EC2Stack (commented out)
Creates an EC2 instance with:
- VPC with 2 availability zones
- No NAT gateways (cost saving)
- Security group allowing SSH access
- T2.micro instance with Amazon Linux 2

## Setup

Install dependencies:
```bash
npm install
```

## Useful Commands

* `npm run build`   - Compile TypeScript to JavaScript
* `npm run watch`   - Watch for changes and compile
* `cdk deploy`      - Deploy this stack to your default AWS account/region
* `cdk diff`        - Compare deployed stack with current state
* `cdk synth`       - Emits the synthesized CloudFormation template
* `cdk destroy`     - Destroy the deployed stack

## Context Values

The following context values are defined in `cdk.json`:
- `queueName`: "MyQueue"
- `queueRetentionDays`: 4

## Notes

- The EC2Stack is commented out in the main app file. Uncomment it if you want to deploy the EC2 instance.
- Make sure you have AWS credentials configured before deploying.
- Some resources (like the S3 bucket name) are hardcoded and may need to be changed for uniqueness.
