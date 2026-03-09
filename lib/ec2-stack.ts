import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class EC2Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC
    const vpc = new ec2.Vpc(this, 'VPC', {
      maxAzs: 2,
      natGateways: 0, // No NAT gateway to save costs
    });

    // Create security group
    const securityGroup = new ec2.SecurityGroup(this, 'InstanceSecurityGroup', {
      vpc: vpc,
      description: 'Security group for EC2 instance',
      allowAllOutbound: true,
    });

    // Allow SSH access (adjust source as needed)
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH access'
    );

    // Create EC2 instance
    const instance = new ec2.Instance(this, 'Instance', {
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2(),
      vpc: vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroup: securityGroup,
    });
  }
}
