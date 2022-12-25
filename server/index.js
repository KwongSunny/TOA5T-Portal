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
    toastGuilds.push(guild[1].id);
  }

  //return guilds that Toa5t is apart of, and that the user is an admin of
  app.get("/toastGuilds", (req, res) => {
    let userGuilds = [];
    if(req.query.userGuilds){
      userGuilds = [...req.query.userGuilds];

      for(let i = toastGuilds.length-1; i > -1; i--){
        if(!userGuilds.find(element => element === toastGuilds[i])) toastGuilds.splice(i,1);
      }
      
    }
    res.json({guilds: toastGuilds});
  })
  
  app.get("/toastGuilds/:guildId", (req, res) => {
    res.json(client.guilds.cache.get(req.params.guildId))
  })

});

app.get("/api", (req, res) => {
  res.json({ message: "TEST" });
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
