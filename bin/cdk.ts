#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
import { StepFunctionsStack } from "../lib/step-functions-stack/step-functions-stack";

const app = new cdk.App();

new StepFunctionsStack(app, "Krisu-Step-Function-Stack", {});
