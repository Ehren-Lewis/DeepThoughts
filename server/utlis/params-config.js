const { v4: uuidv4 } = require("uuid");

const params = (fileName) => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const imageParams = {
        Bucket: "user-images-c7070d76-14c7-42e3-a6cb-b8794c477ed2",
        Key: `${uuidv4()}.${fileType}`,
        Body: fileName.buffer,
        ACL: 'public-read'
    };

    return imageParams
}

module.exports = params 