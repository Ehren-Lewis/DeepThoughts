const AWS = require('aws-sdk')
const { v4: uuidv4 } = require("uuid");

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "us-east-2"});

const s3 = new AWS.S3({apiVersion: "2006-03-01"});

var bucketParams = {
    Bucket: "user-images-" + uuidv4(),
}
s3.createBucket(bucketParams, (err, data) => {
    err ? console.log(err) : console.log("success")
})