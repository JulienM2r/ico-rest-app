
const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();


const tableName = process.env.SAMPLE_TABLE;


exports.deleteItemHandler = async (event) => {
    const { httpMethod, path, pathParameters } = event;

    if (httpMethod !== 'DELETE') {
        throw new Error(`deleteItemHandler only accept DELETE method, you tried: ${httpMethod}`);
    }

    console.log('received :', JSON.stringify(event));




    const { id } = pathParameters;

// Supprimez un élément de la table
    const params = {
        TableName: tableName,
        Key: { id },
    };

    await docClient.delete(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify({ message: 'Item supprimé avec succès' }),
    };

    console.log(`Réponse de : ${path} StatusCode : ${response.statusCode} Body : ${response.body}`);

    return response;
};
