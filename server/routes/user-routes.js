const express = require("express");
const AWS = require("aws-sdk");
// const { DynamoDB } = require("aws-sdk");

const router = express.Router();

AWS.config.update({
    region:"us-east-2",
})

const dynamo = new AWS.DynamoDB.DocumentClient();
const table =  'Thoughts';

router.get("/users", (req, res) => {
    const params = {
        TableName: table,
    }

    dynamo.scan( params, (err, data) => {
        if (err) {
            res.sendStatus(500).json(err)
        }

        else {
            res.json(data.Items)
        }
    })
    
})



router.get("/users/:username", (req, res) => {
    const params = {
        TableName: table,
        // Attribute aliases have the # prefix. cannot searech directly by time, date, user, etc...
        KeyConditionExpression: "#un = :user", // Search condition, search by useraname, SQL where, mongo.find({username: input.username})
        // #un represents username
        ExpressionAttributeNames: {
            "#un": "username",
            "#ca": "createdAt",
            "#th": "thought",
            "#img": "image"
        },
        // Defining an alias for the search value itself: the inputted username
        // value aliases have the : prefix
        ExpressionAttributeValues: {
            ":user": req.params.username
        },
        ProjectionExpression: "#un, #th, #ca, #img", // Defines what will be returned
        ScanIndexForward: false,
    }

    dynamo.query(params, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(data.Items)
        }
    });
});

router.post("/users", (req, res) => {
    const params = {
        TableName: table,
        Item: {
            username: req.body.username,
            createdAt: Date.now(),
            thought: req.body.thought,
            image: req.body.image
        }
    }

    dynamo.put(params, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(JSON.stringify(data, null, 2));
        }
    })

})

module.exports = router;