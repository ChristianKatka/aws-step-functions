# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

cdk bootstrap # Only needed if this is your first CDK app in your AWS account // creates CDKToolkit stack

cdk init app --language=typescript
cdk list # lists all stack created
cdk deploy <StackName>
cdk deploy --all # when you want to deploy all the stacks
cdk synth
cdk destroy --all
cdk destroy <StackName>
