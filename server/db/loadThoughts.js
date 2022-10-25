const AWS = require("aws-sdk");
const fs = require("fs");
const { json } = require("stream/consumers");
// const jsonsss = require("../seed/users.json")
AWS.config.update({
    region:"us-east-2"
});

const dynamo = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10",
});

const allUsers = JSON.parse(fs.readFileSync("./server/seed/users.json", 'utf-8'));


allUsers.forEach(user => {
    const params = {
        TableName: "Thoughts",
        Item: {
            "username": user.username,
            "createdAt": user.createdAt,
            "thought": user.thought
        }
    }

    dynamo.put(params, (err, data) => {
        err ? console.log("Error occured at " + user.username + JSON.stringify(err, null, 2)) :
        console.log("success", JSON.stringify(data, null, 2));
    })
})