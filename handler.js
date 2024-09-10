const { DynamoDBClient, GetItemCommand, PutItemCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb');

const TABLE_NAME = 'sorted-number';
const dynamoDb = new DynamoDBClient({ region: 'us-east-1' });

exports.hello = async (event) => {
  const uniqueKey = 'daily-random-number';

  const getParams = {
    TableName: TABLE_NAME,
    Key: {
      id: { S: uniqueKey },
    },
  };

  try {
    const result = await dynamoDb.send(new GetItemCommand(getParams));
    let responseMessage;

    if (result.Item) {
      const existingValue = result.Item.value.S;

      const deleteParams = {
        TableName: TABLE_NAME,
        Key: {
          id: { S: uniqueKey },
        },
      };

      await dynamoDb.send(new DeleteItemCommand(deleteParams));
      responseMessage = existingValue;
    }

    const randomNumber = Math.floor(Math.random() * 10001).toString();

    const putParams = {
      TableName: TABLE_NAME,
      Item: {
        id: { S: uniqueKey },
        value: { S: randomNumber },
      },
    };

    await dynamoDb.send(new PutItemCommand(putParams));
    responseMessage = responseMessage || `New random number generated: ${randomNumber}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: responseMessage,
      }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error trying to store data!',
        details: error.message,
      }),
    };
  }
};
