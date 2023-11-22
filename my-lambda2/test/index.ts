import { config } from "dotenv";
config();
import { Context } from "aws-lambda";
import { handler } from "../src/lambda";
import { event } from "./event";

const context = {
  done: (none: any, resText: any) => {
    console.log("lambda done", resText);
  },
};

handler(event as any);
