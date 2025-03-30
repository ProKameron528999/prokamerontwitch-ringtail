//process.exit();
const ran = require("./lib/random");
const tmi = require("tmi.js");

// Twitch credentials
const username = "prokameron";
const oauthToken = process.env.ACCESS_TOKEN; // Get from https://twitchapps.com/tmi/

// Twitch channel to connect to
const channelName = "joeysrandom";

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
// Event listener for incoming chat messages
let timeouts = {}
client.on('timeout', (channel, username, reason, duration, tags) => {
  client.say(channel, `[API] User ${username} has been timed out in ${channel} for ${duration} seconds for reason: ${reason || 'No reason provided'}`);
      timeouts[username] = Date.now() + duration * 1000;

    // Schedule a function to trigger when timeout expires
    setTimeout(() => {
        client.say(channel, `[Timeout tracker] ${username}'s timeout has expired.`);
        delete timeouts[username]; // Remove from tracking
    }, duration * 1000);
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
  if (message.toLowerCase().includes("who am i")) {
    let status = "Regular chatter"
    if(tags["mod"]){status = "Moderator"} 
    if(tags["vip"]){status = "VIP"}
    if(tags["user-type"] == "broadcaster") {status = "Broadcaster"}
    client.say(channel, `You are ${tags["display-name"]}, you are a ${status} with the color ${tags["color"]}. Your user ID is ${tags["user-id"]}`);
  }
    if (message.toLowerCase().includes("flip a coin")) {
    client.say(channel, `${tags["display-name"]}, it's ${ran.choose(["Heads","Tails"])}!`);
  } 
});

client.on('mod', (channel, username) => {client.say(channel, `[API] ${username} is now a moderator.`) });
client.on('unmod', (channel, username) => {client.say(channel, `[API] ${username} is no longer a moderator.`) });


// Connect to Twitch chat
client.connect().catch(console.error);


process.on("unhandledRejection", (reason, p) => {
  console.error(reason, p);
});
process.on("uncaughtException", (err, origin) => {
  console.error(err, origin);
});