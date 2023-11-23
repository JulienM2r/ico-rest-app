// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');

// Import all functions from delete-item.js
const lambda = require('../../../src/handlers/delete-item.js');

// This includes all tests for deleteItemHandler
describe('Test deleteItemHandler', () => {
    let deleteSpy;

    // One-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
    beforeAll(() => {
        // Mock DynamoDB delete method
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        deleteSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'delete');
    });

    // Clean up mocks
    afterAll(() => {
        deleteSpy.mockRestore();
    });

    // This test invokes deleteItemHandler and compares the result
    it('should give id ', async () => {
        // Return the specified value whenever the spied delete function is called
        deleteSpy.mockReturnValue({
            promise: () => Promise.resolve('data'),
        });

        const event = {
            httpMethod: 'DELETE',
            body: '{"id":"id1","name":"name1"}',
        };

        // Invoke deleteItemHandler()
        const result = await lambda.deleteItemHandler(event);
        const expectedResult = {
            statusCode: 200,
            body: event.body,
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
