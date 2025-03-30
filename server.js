//process.exit();
const ran = require("./lib/random");
const tmi = require("tmi.js");

// Twitch credentials
const username = "prokameron";
const oauthToken = process.env.ACCESS_TOKEN; // Get from https://twitchapps.com/tmi/

// Twitch channel to connect to
const channelName = "ringtail216";

// Configure the Twitch client
const client = new tmi.Client({
  options: { debug: true },
  identity: {
    username: username,
    password: oauthToken,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channelName],
});
let thething = ran.chooseAngryResponse() 
console.log('[AUTO-RESPONSE] ' + thething + "user" + " (response #" + thething.index + ")");
// Event listener for incoming chat messages
client.on('timeout', (channel, username, reason, tags) => {
  client.say(channel, `[API] User ${username} has been timed out in ${channel} for reason: ${reason || 'No reason provided'}`);
});
client.on('ban', (channel, user, reason, bot) => {
    client.say(channel, `[API] User ${user} banned from ${channel} for ${reason}`);
    // Add your logic here to log, alert, or process the ban event
});
client.on("raided", (channel, username, viewers) => {
  client.say(channel, `[API] Welcome in, all ${viewers} raiders from ${username}!`);
});
client.on("message", (channel, tags, message, self) => {
  if (self) return; // Ignore messages from the bot itself
 // console.log(`[${tags["display-name"]}]: ${message}`);
  // console.log(tags['display-name'])
  // Respond if the message contains "hello"
  if (
    message.includes(
      "Epic moenys have been distributed. Time to gamble! LETSGO"
    ) ||
    message.includes("@ringtail216 received")
  ) {
    if (tags["display-name"] == "ringbot216") {
      client.say(channel, "!takepoints");
    } else {
      client.say(channel, `dude I'm not stupid ${tags["display-name"]}`);
    }
  }
  if (message.toLowerCase().includes("who am i")) {
    client.say(channel, `your name is ${tags["display-name"]}`);
  }
    if (message.toLowerCase().includes("flip a coin")) {
    client.say(channel, `${tags["display-name"]}, it's ${ran.choose(["Heads","Tails"])}!`);
  } 
  if (
    message.toLowerCase().includes("!ban prokameron") ||
    message.toLowerCase().includes("!ban @prokameron")
  ) {
    let response = ran.chooseAngryResponse()
   client.say(channel, '[AUTO-RESPONSE] ' + response + tags["display-name"] + " (response #" + response.index + ")");
    //client.say(channel, "!roulette 100")
  }
});

// Connect to Twitch chat
client.connect().catch(console.error);
