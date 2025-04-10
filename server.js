//process.exit();

const { detect } = require("langdetect");
const langs = require("langs");


function normalizeText(str) {
  // Define a mapping for numbers to letters
  const numberToLetterMap = {
    '0': 'o',  // You can add more mappings as needed
    '1': 'i',
    '2': 'z',
    '3': 'e',
    '4': 'a',
    '5': 's',
    '6': 'g',
    '7': 't',
    '8': 'b',
    '9': 'q',
  };

  return str
    .normalize('NFD')                      // Break down diacritics
    .replace(/[\u0300-\u036f]/g, '')       // Remove diacritics
    .replace(/[^a-zA-Z0-9]/g, "")          // Remove non-alphanumeric characters
    .replace(/[^\x00-\x7F]/g, '')          // Strip non-ASCII (optional)
    .replace(/[0-9]/g, (match) => numberToLetterMap[match] || match)  // Replace numbers with letters
    .replace(/[jlj]/g, 'i')                // Replace 'j' and 'l' with 'i'
    .toLowerCase();                        // Convert to lowercase
}

function lessnormalizeText(str) {
  // Define a mapping for numbers to letters
  const numberToLetterMap = {
    '0': 'o',  // You can add more mappings as needed
    '1': 'i',
    '2': 'z',
    '3': 'e',
    '4': 'a',
    '5': 's',
    '6': 'g',
    '7': 't',
    '8': 'b',
    '9': 'g',
  };

  return str
    .normalize('NFD')                      // Break down diacritics
    .replace(/[\u0300-\u036f]/g, '')       // Remove diacritics
  //  .replace(/[^a-zA-Z0-9]/g, "")          // Remove non-alphanumeric characters
    .replace(/[^\x00-\x7F]/g, '')          // Strip non-ASCII (optional)
    .replace(/[0-9]/g, (match) => numberToLetterMap[match] || match)  // Replace numbers with letters
    .replace(/[jlj]/g, 'i')                // Replace 'j' and 'l' with 'i'
    .toLowerCase();                        // Convert to lowercase
}

var racialslur = [
  "retard",
  "nick/her",
  "nickher",
  "nick her",
  "nicka",
  "nicker",
  "niker",
  "nick gur",
  "Nісk gur",
  "nickgur",
    "niiigg",
  "niiiigg",
  "niiiiigg",
  "niiiiii",
  "niger",
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
  "Tranny",
  "⁥",
  "noobkameron",
  "noobkameron",
  "noob kameron",
].map(function (v) {
  return v.toLowerCase();
});

var lessStrictSlurs = [
  "fag"
].map(function (v) {
  return v.toLowerCase();
});

const ran = require("./lib/random");
const tmi = require("tmi.js");
const http = require('http');



const { Server } = require('socket.io');

const express = require('express');

const translate = require("translate-google");

// Twitch credentials
const username = "prokameronbot";
const oauthToken = process.env.ACCESS_TOKEN; // Get from https://twitchapps.com/tmi/

// Twitch channel to connect to
const channelName = "ringtail216";

// Configure the Twitch client
const silentLogger = {
  info: () => {},
  warn: () => {},
  error: () => {},
};

const userclient = new tmi.Client({
  options: {
    debug: false, // optional
    logger: silentLogger, // suppresses logs
  },
  identity: {
    username: "ProKameron",
    password: process.env.ACCESS_TOKEN_OLD,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channelName],
});

const client = new tmi.Client({
  options: { debug: false },
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


function log(message) {
  const now = new Date().toLocaleTimeString("en-US", { hour12: false });
  console.log(`[${now}] info: ${message}`);
}


client.on('connecting', () => log('Connecting to irc-ws.chat.twitch.tv on port 443..'));
client.on('connected', (address, port) => {
  log('Connected to server.');
  log("Joining #ringtail216")
});

client.on('logon', (address, port) => {
  log('Sending authentication to server..');
});

client.on("reconnect", () => {
    log("Reconnecting...")
});

client.on("serverchange", (channel) => {
    log("The server has changed.")
});

client.on('disconnected', (address, port) => {
  log('Disconnected from server.');
});
client.on('part', (channel, username_, self) => {
  if (self) log(`Left ${channel}`);
});
client.on('join', (channel, username_, self) => {
  if (self) log(`Joined ${channel}`);
});
client.on('message', (channel, tags, message, self) => {
  if (!self) {
    log(`[${channel}] <${tags['display-name'] || tags.username}>: ${message}`);
  }
});

client.on("clearchat", (channel) => {
    client.say("The chat was cleared. Hi everyone!")
});


let timeouts = {};

client.on("timeout", (channel, username, reason, duration, tags) => {
  client.say(channel, `User ${username} has been timed out in ${channel} for ${duration} seconds for reason: ${reason || "No reason provided"}`);
  timeouts[username] = Date.now() + duration * 1000;

  setTimeout(() => {
    client.say(channel, `[Timeout tracker] ${username}'s timeout has expired.`);
    delete timeouts[username];
  }, duration * 1000);
});

client.on("ban", (channel, user, reason, bot) => {
  client.say(channel, `User ${user} banned from ${channel} for ${reason}`);
});

client.on("raided", (channel, username, viewers) => {
  client.say(channel, `Welcome in, all ${viewers} raiders from ${username}!`);
});

client.on("message", async (channel, tags, message, self) => {
  if (self) return; // Ignore messages from the bot itself

  // Auto-translate messages that aren't in English
try {
    const detected = detect(message);
    const detectedLangCode = detected[0]?.lang || "unknown"; // Extract language code safely
    console.log(detectedLangCode);

    // Convert the language code to a full language name
    const langData = langs.where("1", detectedLangCode);
    let detectedLangName = langData ? langData.name : "Unknown";

    if (detectedLangName === "Unknown") {
        switch (detectedLangCode) {
            case "zh-cn": detectedLangName = "Chinese (Simplified)"; break;
            case "zh-tw": detectedLangName = "Chinese (Traditional)"; break;
        }
    }

    const noTranslateWords = ["!modroulette", "!sr", "!daily","!setuptierlist"]; // Add words you don't want translated

    const containsNoTranslateWord = noTranslateWords.some(word =>
        message.toLowerCase().includes(word.toLowerCase())
    );

    if (detectedLangCode !== "en" && !containsNoTranslateWord) {
        let translated = await translate(message, { to: "en" });

        // If the message changes after translation, it means it's not in English
        if (translated.toLowerCase() !== message.toLowerCase()) {
            if (racialslur.some((word) => normalizeText(message).includes(word)) || lessStrictSlurs.some((word) => lessnormalizeText(message).includes(word))) {
                client.say(channel, `${tags["display-name"]} said a slur in a different language. Please take action, @ringtail216`);
            }
        }
    }
} catch (error) {
    console.error("Translation error:", error);
}

  
  
if (message.startsWith("!translate ")) {
    try {
        const msgToTranslate = message.replace("!translate ", "").trim();

        const detected = detect(msgToTranslate);
        const detectedLangCode = detected[0]?.lang || "unknown";
        const langData = langs.where("1", detectedLangCode);
        let detectedLangName = langData ? langData.name : "Unknown";

        if (detectedLangName === "Unknown") {
            switch (detectedLangCode) {
                case "zh-cn": detectedLangName = "Chinese (Simplified)"; break;
                case "zh-tw": detectedLangName = "Chinese (Traditional)"; break;
            }
        }

        let translated = await translate(msgToTranslate, { to: "en" });

        const containsSlur = racialslur.some((word) => normalizeText(translated).includes(word)) ||
                              lessStrictSlurs.some((word) => lessnormalizeText(translated).includes(word));

        if (containsSlur) {
            client.say(channel, `${tags["display-name"]} tried to translate a SLUR! @ringtail216`);
        } else {
            client.say(channel, `${tags["display-name"]}, From ${detectedLangName}, the text you provided says "${translated}"`);
        }

    } catch (error) {
        console.error("!translate error:", error);
        client.say(channel, "Something went wrong while translating.");
    }
}

  // Custom bot responses
  if(tags["display-name"] === "ringbot216" || tags["display-name"] === "ProKameron") {
    if(message.includes("@prokameronbot has")) {
      const match = message.match(/has (\d+) widgets/);

const money = match ? parseInt(match[1], 10) : null;
      client.say(channel, "!givepoints @prokameron " + money)
    }
    if(message.includes("pk!givememoney")) {
      client.say(channel, "!points")
    }
    if(message.includes("pk!dodaily")) {
      client.say(channel, "!daily")
    }
    if(message.includes("widgets to @prokameron")) {
      client.say(channel, "!points @prokameron")
    }
  }
  if (
    message.includes("Epic moenys have been distributed. Time to gamble! LETSGO") ||
    message.includes("@ringtail216 received")|| 
    message.includes("Epice moenys to @ringtail216")
  ) {
    if (tags["display-name"] === "ringbot216") {
      function getRandomNumber(min = 750, max = 3000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


setTimeout(() => {
  //userclient.say(channel, "!takepoints");
}, getRandomNumber());    } else {
  //    userclient.say(channel, `dude I'm not stupid ${tags["display-name"]}`);
    }
  }
              if (racialslur.some((word) => normalizeText(message).includes(word))) {
                client.say(channel, `${tags["display-name"]}, Slurs are not allowed!`)
            }

  if (message.toLowerCase().includes("pk!whoami") && tags["display-name"] !== "jumbojosh2ndbiggestfan") {
    let status = "Regular chatter";
    if (tags["mod"]) status = "Moderator";
    if (tags["vip"]) status = "VIP";
    if (tags["user-type"] === "broadcaster") status = "Broadcaster";

    client.say(channel, `You are ${tags["display-name"]}, a ${status} with the color ${tags["color"]}. Your user ID is ${tags["user-id"]}`);
  }

  if (message.toLowerCase().includes("pk!coinflip") && tags["display-name"] !== "jumbojosh2ndbiggestfan") {
    client.say(channel, `${tags["display-name"]}, it's ${ran.choose(["Heads", "Tails"])}!`);
  }

  if (
    message.toLowerCase().includes("!ban prokameron") ||
    message.toLowerCase().includes("!ban @prokameron")
  ) {
    let response = ran.chooseAngryResponse();
    userclient.say(channel, `[AUTO-RESPONSE] ${response} ${tags["display-name"]} (response #${response.index})`);
  }
});









const app = express();
const server = http.createServer(app);
const io = new Server(server);

let currentPoll = null;

app.use(express.static('public'));
client.on('message', (channel, tags, message, self) => {
  if (!currentPoll) return;
  if (!message.startsWith('!vote ')) return;

  const vote = message.split(' ')[1]?.toLowerCase();
  if (!currentPoll.options.includes(vote)) return;

  const voter = tags.username;
  currentPoll.votes[voter] = vote;

  // Send update to frontend
  io.emit('voteUpdate', currentPoll.votes);
});

io.on('connection', (socket) => {
  socket.on('startPoll', (poll) => {
    currentPoll = {
      question: poll.question,
      options: poll.options.map(opt => opt.toLowerCase()),
      votes: {}
    };
    io.emit('pollStarted', currentPoll);
  });

  socket.on('endPoll', () => {
    io.emit('pollEnded', currentPoll);
    currentPoll = null;
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
// Connect to Twitch chat
client.connect().catch(console.error);
userclient.connect().catch(console.error);


process.on("unhandledRejection", (reason, p) => {
  console.error(reason, p);
});

process.on("uncaughtException", (err, origin) => {
  console.error(err, origin);
});
