require('dotenv').config()
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
const region = process.env.AWS_REGION;
const bucket = process.env.AWS_BUCKET;
const accessIdKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;


const s3 = new S3({
    region,
    accessIdKey,
    secretAccessKey
})


function uploadFile(file){
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucket,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise()
}

exports.uploadFile = uploadFile