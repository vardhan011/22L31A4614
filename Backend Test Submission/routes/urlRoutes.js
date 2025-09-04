const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  redirectShortUrl,
  getStats,
} = require("../controllers/urlController");


router.post("/shorturls", createShortUrl);

router.get("/:code", redirectShortUrl);


router.get("/stats/:code", getStats);

module.exports = router;
