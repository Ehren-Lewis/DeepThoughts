// const { DynamoDB } = require("aws-sdk");
const AWS = require("aws-sdk");
const { json } = require("stream/consumers");
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "us-east-2"});
// cosnt DynamoDB

const dynamo = new AWS.DynamoDB({apiVersion: "2012-08-10"});

const params = {
    TableName: "Thoughts",
    KeySchema: [
        { AttributeName: "username", KeyType: 'HASH'},
        { AttributeName: "createdAt", KeyType: "RANGE"},
    ],
    AttributeDefinitions: [
        { AttributeName: 'username', AttributeType: "S"},
        { AttributeName: "createdAt", AttributeType: "N"},
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10,
    }
}

dynamo.createTable(params, (err, data) => {
    if (err) {
        console.log("err");
        console.log(JSON.stringify(err, null, 2))
    }
    else {
        console.log(JSON.stringify(data, null, 2))
    }
})

module.exports = params;