const s3 = require("../services/s3Service");
const { v4: uuidv4 } = require("uuid");

const getUploadUrl = async (req, res) => {
  try {
    const { fileType, fileName } = req.query;

    const allowedTypes = [
      "video/mp4",
      "image/png",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(fileType)) {
      return res.status(400).json({
        message: "Invalid file type",
      });
    }

    const uniqueFileName = `${uuidv4()}-${fileName}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uniqueFileName,
      Expires: 600,
      ContentType: fileType,
    };

    const uploadURL = s3.getSignedUrl("putObject", params);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

    res.status(200).json({
      uploadURL,
      fileUrl,
    });
  } catch (error) {
    console.log("FULL ERROR:");
    console.log(error);

    res.status(500).json({
      error: error.message,
      full: error,
    });
  }
};

module.exports = {
  getUploadUrl,
};