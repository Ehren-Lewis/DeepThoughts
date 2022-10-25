const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const router = express.Router();
const paramsConfig = require("../utlis/params-config");


const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, '');
    },
  });

const upload = multer({ storage }).single('image');

const s3 = new AWS.S3({
    apiVersoin: "2006-03-01",
})

router.post("/image-upload", upload, (req, res) => {
    console.log(req.file)
    const params = paramsConfig(req.file);

    s3.upload( params, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json(data)
        }
    })
})


module.exports = router;
