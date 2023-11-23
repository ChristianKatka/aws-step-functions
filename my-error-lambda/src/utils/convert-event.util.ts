import { SqsMessage } from "../models/sqs-message.model";

export const convertEvent = (event: any): SqsMessage[] => {
  const sqsMessages: SqsMessage[] = event.Records.map((record: any) => ({
    message: JSON.parse(record.body),
    id: record.messageId,
  }));

  return sqsMessages;
};
