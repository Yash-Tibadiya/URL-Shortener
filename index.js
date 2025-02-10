const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./connection.js");
const { checkAuthentication, restrictTo } = require("./middlewares/auth.js");
const User = require("./models/user");

const staticRoute = require("./routes/staticRouter.js");
const userRoute = require("./routes/user.js");
const urlRoute = require("./routes/url.js");

require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
const port = 8000;
const TOKEN = process.env.TOKEN;

//! Create Bot User
async function createBotUser() {
  const existingBot = await User.findOne({ email: "bot@gmail.com" });
  if (!existingBot) {
    const botUser = new User({
      name: "Bot",
      email: "bot@gmail.com",
      password: "12121212", // Use a hashed password in production!
      role: "ADMIN",
    });
    await botUser.save();
  }
}
// Call the function to create the bot user when the app starts
createBotUser().catch(console.error);

//! Connect to MongoDB
connectMongoDb("mongodb://localhost:27017/short-test");

//! View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//! Middleware - Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthentication);

//! Discord Bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    if (interaction.commandName === "short") {
      const url = interaction.options.getString("url");

      // Check if the URL is valid
      if (!url || !/^https?:\/\/.*/.test(url)) {
        return await interaction.reply(
          "Please provide a valid URL starting with 'http://' or 'https://'"
        );
      }

      try {
        // Call the backend API to generate the short URL
        const response = await fetch("http://localhost:8000/url", {
          // Adjust the URL based on your backend
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-bot-request": "true", // Add this header for bot requests
          },
          body: JSON.stringify({ url }),
        });

        const data = await response.json(); // This should now return JSON with the shortId

        if (response.ok && data.shortId) {
          // Respond with the shortened URL
          await interaction.reply(
            `Shortened URL: http://localhost:8000/url/${data.shortId}`
          );
        } else {
          await interaction.reply("There was an error shortening the URL.");
        }
      } catch (error) {
        console.error("Error in URL shortening:", error);
        await interaction.reply("An error occurred while shortening the URL.");
      }
    }
  }
});

client.login(TOKEN);

//! Router
app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
