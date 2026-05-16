const express = require("express");
const router = express.Router();

const Analysis = require("../models/Analysis");

router.get("/", async (req, res) => {
  try {
    const history = await Analysis.find()
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
});

module.exports = router;