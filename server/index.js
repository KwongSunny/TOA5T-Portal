// server/index.js
const { port } = require("./config.json");
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: GatewayIntentBits.Guilds });
const app = express();

let deploy = 'LOCAL';

let tokens = require('../tokens.js');
if (deploy === 'PUBLIC') {
  client.login(tokens.BOT_TOKEN);       //LOCAL PUBLIC BUILD
}
if (deploy === 'LOCAL') {
  client.login(tokens.DEV_TOKEN);        //LOCAL DEV BUILD
}

client.guilds.fetch().then(guilds => {

  const toastGuilds = [];

  for(guild of guilds){
    toastGuilds.push(guild[1]);
  }

  app.get("/toastGuilds", (req, res) => {
    //needs to send guilds to front end

  })
});

app.get("/api", (req, res) => {
  res.json({ message: "TEST" });
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});