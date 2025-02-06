const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/url", handleGenerateNewShortURL);
router.get("/:shortId", handleGetShortURL);
router.get("/url/analytics/:shortId", handleGetAnalytics);

module.exports = router;
