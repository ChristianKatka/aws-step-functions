import { IRole, ManagedPolicy, PolicyStatement } from "aws-cdk-lib/aws-iam";

export const iamLambdaPermissions = (
  stack: any,
  lambdaRole: IRole,
  policyName: string
): void => {
  lambdaRole.addManagedPolicy(
    ManagedPolicy.fromAwsManagedPolicyName(
      "service-role/AWSLambdaBasicExecutionRole"
    )
  );

  lambdaRole.addManagedPolicy(
    ManagedPolicy.fromAwsManagedPolicyName("AmazonDynamoDBFullAccess")
  );

  const allowLambdaWriteToCloudWatch = new ManagedPolicy(stack, policyName, {
    statements: [
      new PolicyStatement({
        actions: [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents",
        ],
        resources: ["arn:aws:logs::*"],
      }),
    ],
  });

  lambdaRole.addManagedPolicy(allowLambdaWriteToCloudWatch);
};
