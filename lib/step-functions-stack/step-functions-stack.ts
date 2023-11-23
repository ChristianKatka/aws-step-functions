import { iamLambdaPermissions } from "./utils/iam-lambda-permissions.util";

import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import {
  DefinitionBody,
  StateMachine,
  Map,
  Fail,
  Condition,
  Choice,
} from "aws-cdk-lib/aws-stepfunctions";
import { LambdaInvoke } from "aws-cdk-lib/aws-stepfunctions-tasks";
import { Construct } from "constructs";
import { machine } from "os";
export class StepFunctionsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambda1 = new NodejsFunction(this, "Lambda1", {
      functionName: "my-step-function-lambda-1",
      bundling: {
        externalModules: [],
        minify: true,
      },
      entry: "./my-lambda1/src/lambda.ts",
      handler: "handler",
      memorySize: 512,
      runtime: Runtime.NODEJS_18_X,
    });

    const lambda2 = new NodejsFunction(this, "Lambda2", {
      functionName: "my-step-function-lambda-2",
      bundling: {
        externalModules: [],
        minify: true,
      },
      entry: "./my-lambda2/src/lambda.ts",
      handler: "handler",
      memorySize: 512,
      runtime: Runtime.NODEJS_18_X,
    });

    const lambda3 = new NodejsFunction(this, "Lambda3", {
      functionName: "my-step-function-lambda-3",
      bundling: {
        externalModules: [],
        minify: true,
      },
      entry: "./my-lambda3/src/lambda.ts",
      handler: "handler",
      memorySize: 512,
      runtime: Runtime.NODEJS_18_X,
    });

    const lambdaErrorHandling = new NodejsFunction(this, "LambdaError", {
      functionName: "my-step-function-error-handling-lambda",
      bundling: {
        externalModules: [],
        minify: true,
      },
      entry: "./my-error-lambda/src/lambda.ts",
      handler: "handler",
      memorySize: 512,
      runtime: Runtime.NODEJS_18_X,
    });

    const lambda1Role = lambda1.role;
    if (!lambda1Role) return;
    iamLambdaPermissions(this, lambda1Role, "lambda1policy");
    const lambda2Role = lambda2.role;
    if (!lambda2Role) return;
    iamLambdaPermissions(this, lambda2Role, "lambda2policy");
    const lambda3Role = lambda3.role;
    if (!lambda3Role) return;
    iamLambdaPermissions(this, lambda3Role, "lambda3policy");

    const Lambda1InvokeJob = new LambdaInvoke(this, "Lambda1InvokeJob", {
      lambdaFunction: lambda1,
      outputPath: "$",
    });

    const mapState = new Map(this, "Map State", {
      itemsPath: "$.Payload.locations",
      resultPath: "$",
    });

    const lambda2MapIteratorInvoke = mapState.iterator(
      new LambdaInvoke(this, "InvokeLambda2", { lambdaFunction: lambda2 })
    );
    const lambda3Invoke = new LambdaInvoke(this, "InvokeLambda3", {
      lambdaFunction: lambda3,
    });

    const errorHandlingState = new LambdaInvoke(this, "ErrorHandlerState", {
      lambdaFunction: lambdaErrorHandling,
      resultPath: "$", // specify a path for the error result
    });

    const definition = Lambda1InvokeJob.next(lambda2MapIteratorInvoke).next(
      lambda3Invoke
    );

    // Add error transitions for Lambda functions
    Lambda1InvokeJob.addCatch(errorHandlingState);
    lambda2MapIteratorInvoke.addCatch(errorHandlingState);
    lambda3Invoke.addCatch(errorHandlingState);

    new StateMachine(this, "StateMachine", {
      stateMachineName: "krisun-state-machine",
      definitionBody: DefinitionBody.fromChainable(definition),
      comment: "a super cool state machine",
    });
  }
}
