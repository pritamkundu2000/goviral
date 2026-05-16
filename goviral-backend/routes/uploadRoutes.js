const express = require("express");
const router = express.Router();

const {
  getUploadUrl,
} = require("../controllers/uploadController");

router.get("/get-upload-url", getUploadUrl);

module.exports = router;