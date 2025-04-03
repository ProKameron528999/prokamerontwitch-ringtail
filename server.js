//process.exit();

const { detect } = require("langdetect");

var racialslur = [
  "nick/her",
  "nickher",
  "nick her",
  "nicka",
  "nicker",
  "niker",
  "nick gur",
  "Nісk gur",
  "nickgur",
  "Nigg",
  "n1gg",
  "n!gg",
  "njgg",
  "nígg",
  "niigg",
  "Porchmonkey",
  "Porch monkey",
  "Bamboula",
  "Bounty bar",
  "Burrhead",
  "Burr-head",
  "Burr head",
  "Choc-ice",
  "Groid",
  "Jim Crow",
  "Jungle bunny",
  "Mayate",
  "Nig-nog",
  "Nig nog",
  "Nignog",
  "Quashie",
  "Sambo",
  "Sooty",
  "Thicklips",
  "Uncle Tom",
  "Gammon",
  "Haole",
  "Honkey",
  "Honky",
  "Honkie",
  "Mayo Monkey",
  "Mayonnaise Monkey",
  "Ofay",
  "Palagi",
  "Paleface",
  "Peckerwood",
  "Redlegs",
  "Roundeye",
  "White ears",
  "White Interloper",
  "Whitey",
  "Bakra",
  "Buckra",
  "Gin jockey",
  "Gubba",
  "Gwer",
  "Fag",
  "Tranny",
  "⁥",
  "noobkameron",
  "noobkameron",
  "noob kameron",
].map(function (v) {
  return v.toLowerCase();
});

const ran = require("./lib/random");
const tmi = require("tmi.js");
const translate = require("translate-google");

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

let timeouts = {};

client.on("timeout", (channel, username, reason, duration, tags) => {
  client.say(channel, `[API] User ${username} has been timed out in ${channel} for ${duration} seconds for reason: ${reason || "No reason provided"}`);
  timeouts[username] = Date.now() + duration * 1000;

  setTimeout(() => {
    client.say(channel, `[Timeout tracker] ${username}'s timeout has expired.`);
    delete timeouts[username];
  }, duration * 1000);
});

client.on("ban", (channel, user, reason, bot) => {
  client.say(channel, `[API] User ${user} banned from ${channel} for ${reason}`);
});

client.on("raided", (channel, username, viewers) => {
  client.say(channel, `[API] Welcome in, all ${viewers} raiders from ${username}!`);
});

client.on("message", async (channel, tags, message, self) => {
  if (self) return; // Ignore messages from the bot itself

  // Auto-translate messages that aren't in English
try {
    const detectedLang = detect(message);

    if (detectedLang !== "en") { // Only translate if not English
        let translated = await translate(message, { to: "en" });

        // If the message changes after translation, it means it's not in English
        if (translated.toLowerCase() !== message.toLowerCase()) {
            if (racialslur.some((word) => translated.includes(word))) {
                translated = "[Message Censored. They said a SLUR!]";
            }
            client.say(channel, `[AUTO-TRANSLATE] From ${detectedLang.lang}, ${tags["display-name"]} said: "${translated}"`);
        }
    }
} catch (error) {
    console.error("Translation error:", error);
}

  // Custom bot responses
  if (
    message.includes("Epic moenys have been distributed. Time to gamble! LETSGO") ||
    message.includes("@ringtail216 received")
  ) {
    if (tags["display-name"] === "ringbot216") {
      client.say(channel, "!takepoints");
    } else {
      client.say(channel, `dude I'm not stupid ${tags["display-name"]}`);
    }
  }

  if (message.toLowerCase().includes("who am i") && tags["display-name"] !== "jumbojosh2ndbiggestfan") {
    let status = "Regular chatter";
    if (tags["mod"]) status = "Moderator";
    if (tags["vip"]) status = "VIP";
    if (tags["user-type"] === "broadcaster") status = "Broadcaster";

    client.say(channel, `You are ${tags["display-name"]}, a ${status} with the color ${tags["color"]}. Your user ID is ${tags["user-id"]}`);
  }

  if (message.toLowerCase().includes("flip a coin") && tags["display-name"] !== "jumbojosh2ndbiggestfan") {
    client.say(channel, `${tags["display-name"]}, it's ${ran.choose(["Heads", "Tails"])}!`);
  }

  if (
    message.toLowerCase().includes("!ban prokameron") ||
    message.toLowerCase().includes("!ban @prokameron")
  ) {
    let response = ran.chooseAngryResponse();
    client.say(channel, `[AUTO-RESPONSE] ${response} ${tags["display-name"]} (response #${response.index})`);
  }
});

// Connect to Twitch chat
client.connect().catch(console.error);

process.on("unhandledRejection", (reason, p) => {
  console.error(reason, p);
});

process.on("uncaughtException", (err, origin) => {
  console.error(err, origin);
});
