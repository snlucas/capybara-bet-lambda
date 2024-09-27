const { DynamoDBClient, GetItemCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');

const TABLE_NAME = 'sorted-number';
const dynamoDb = new DynamoDBClient({ region: 'us-east-1' });

exports.hello = async (event) => {
  const today = new Date().toISOString().split('T')[0];
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
      const storedDate = result.Item.date ? result.Item.date.S : null;

      if (storedDate === today) {
        responseMessage = `Date is already set to today (${today}). No update made.`;
      } else {
        responseMessage = `Stored date (${storedDate}) is different from today (${today}). Updating value.`;
        const randomNumber = Math.floor(Math.random() * 10001).toString();

        const putParams = {
          TableName: TABLE_NAME,
          Item: {
            id: { S: uniqueKey },
            value: { S: randomNumber },
            date: { S: today },
          },
        };

        await dynamoDb.send(new PutItemCommand(putParams));
      }
    } else {
      responseMessage = 'No previous data found. Adding new value for today.';
      const randomNumber = Math.floor(Math.random() * 10001).toString();

      const putParams = {
        TableName: TABLE_NAME,
        Item: {
          id: { S: uniqueKey },
          value: { S: randomNumber },
          date: { S: today },
        },
      };

      await dynamoDb.send(new PutItemCommand(putParams));
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        message: responseMessage,
        luckNumber: result.Item ? result.Item.value.S : randomNumber,
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
