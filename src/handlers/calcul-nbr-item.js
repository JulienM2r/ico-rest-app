// Importer le module AWS SDK pour DynamoDB
const AWS = require('aws-sdk');

// Créer un client DynamoDB
const docClient = new AWS.DynamoDB.DocumentClient();

// Récupérer le nom de la table DynamoDB depuis les variables d'environnement
const tableName = process.env.SAMPLE_TABLE;

/**
 * Fonction pour calculer le nombre d'items dans une table DynamoDB
 */
exports.calculNbrItemsHandler = async () => {
    try {
        // Paramètres de la requête scan pour récupérer tous les items
        const params = {
            TableName: tableName,
        };

        // Scanner la table DynamoDB pour obtenir tous les items
        const data = await docClient.scan(params).promise();

        // Récupérer le nombre total d'items
        const totalItems = data.Count;

        // Retourner le nombre d'items dans la réponse
        return {
            statusCode: 200,
            body: JSON.stringify({ totalItems }),
        };
    } catch (error) {
        // En cas d'erreur, retourner une réponse d'erreur
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
