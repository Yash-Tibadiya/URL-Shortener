const { nanoid } = require("nanoid");
const URL = require("../models/url");
const User = require("../models/user"); 

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  // Generate a short ID for the URL
  const shortID = nanoid(8);

  let createdBy;

  if (req.headers["x-bot-request"]) {
    // If it's a bot request, assign the bot user (admin)
    createdBy = await User.findOne({ email: "bot@gmail.com" });

    // Create the shortened URL without any initial visits (empty visitHistory)
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [], // Do not simulate any visits
      createdBy: createdBy,
    });
  } else {
    // If it's a normal user request, assign the logged-in user
    createdBy = req.user ? req.user._id : null;
    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: createdBy,
    });
  }

  // If the request is from the bot, respond with JSON
  if (req.headers["x-bot-request"]) {
    return res.json({ shortId: shortID });
  }

  // Otherwise, render the home page
  return res.render("home", { id: shortID });
}



async function handleGetShortURL(req, res) {
  const shortId = req.params.shortId;
  const urlEntry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true }
  );
  if (!urlEntry) {
    return res.status(404).json({ error: "shortId not found" });
  }
  res.redirect(urlEntry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ error: "Analytics not found" });
  }
  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetShortURL,
  handleGetAnalytics,
};
