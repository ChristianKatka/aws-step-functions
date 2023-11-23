import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDBClient } from "../instances/aws";

export const createItem = async (message: any) => {
  const putCommand = new PutCommand({
    TableName: "table",
    Item: message,
  });

  return await dynamoDBClient.send(putCommand);
};
