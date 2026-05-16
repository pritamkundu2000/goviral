const express = require("express");
const router = express.Router();

const {
  analyzeContent,
} = require("../controllers/analyzeController");

router.post("/", analyzeContent);

module.exports = router;