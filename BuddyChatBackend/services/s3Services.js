const AWS = require("aws-sdk");

const uploadToS3 = (fileName, file) => {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const IAM_USER_KEY = process.env.IAM_ACCESS_KEY;
  const IAM_SECRET_KEY = process.env.IAM_SECRET_KEY;

  return new Promise((resolve, reject) => {
    const s3Bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_SECRET_KEY,
      Bucket: BUCKET_NAME,
    });

    const params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ACL: "public-read",
    };

    s3Bucket.upload(params, (err, s3response) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(`File URL:${s3response.Location}`);
        const fileUrl = s3response.Location;
        resolve(fileUrl);
      }
    });
  });
};

module.exports = { uploadToS3 };
