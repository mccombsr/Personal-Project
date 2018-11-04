require('dotenv').config();
const axios = require('axios');
const aws = require('aws-sdk');


const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SECRET,
    AUTH_PROTOCAL,
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
} = process.env;

module.exports = {
    handleS3Sign: (req, res) => {

        aws.config = {
            region: 'us-west-1',
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        }

        const s3 = new aws.S3();
        // console.log(s3);
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };

        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.log(err);
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
            };
            return res.send(returnData)
        });
    },
    updateBusinessLogo: async (req, res) =>{
        let {businessID, url} = req.body;
        console.log(businessID, url);

        const db = req.app.get(`db`);
        let updatedLogo = await db.update_business_logo([businessID, url])
        res.sendStatus(200);
        console.log(`logo updated successfully`)
    }
}

