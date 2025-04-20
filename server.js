//process.exit();
const https = require("https");

let logMessages = true

let farmersenabled = false

let botStartTime;

const { detect } = require("langdetect");
const langs = require("langs");
function sendWebhook(message) {
  const data = JSON.stringify({ content: message });

  const url = new URL(process.env.WEBHOOK);
  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };
  const req = https.request(options, (res) => {
    if (res.statusCode === 204) {
      //     console.log('Message sent successfully.');
    } else {
      console.error(`Failed to send message. Status code: ${res.statusCode}`);
    }
  });

  req.on("error", (error) => {
    console.error("Error sending message:", error);
  });

  req.write(data);
  req.end();
}
function sendWebhookMessageAswell(message) {
  const data = JSON.stringify({ content: message });

  const url = new URL(process.env.WEBHOOK3);
  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };
  const req = https.request(options, (res) => {
    if (res.statusCode === 204) {
      //  console.log('Message sent successfully.');
    } else {
      console.error(`Failed to send message. Status code: ${res.statusCode}`);
    }
  });

  req.on("error", (error) => {
    console.error("Error sending message:", error);
  });

  req.write(data);
  req.end();
}

function sendWebhookMessage(message) {
if(!logMessages) return;
  const data = JSON.stringify({ content: message });

  const url = new URL(process.env.WEBHOOK2);
  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };
  const req = https.request(options, (res) => {
    if (res.statusCode === 204) {
      //  console.log('Message sent successfully.');
    } else {
      console.error(`Failed to send message. Status code: ${res.statusCode}`);
    }
  });

  req.on("error", (error) => {
    console.error("Error sending message:", error);
  });

  req.write(data);
  req.end();
  sendWebhookMessageAswell(message)
}


function normalizeText(str) {
  // Define a mapping for numbers to letters
  const numberToLetterMap = {
    0: "o", // You can add more mappings as needed
    1: "i",
    2: "z",
    3: "e",
    4: "a",
    5: "s",
    6: "g",
    7: "t",
    8: "b",
    9: "q",
  };

  return str
    .normalize("NFD") // Break down diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-zA-Z0-9]/g, "") // Remove non-alphanumeric characters
    .replace(/[^\x00-\x7F]/g, "") // Strip non-ASCII (optional)
    .replace(/[0-9]/g, (match) => numberToLetterMap[match] || match) // Replace numbers with letters
    .replace(/[jlj]/g, "i") // Replace 'j' and 'l' with 'i'
    .toLowerCase(); // Convert to lowercase
}

function lessnormalizeText(str) {
  // Define a mapping for numbers to letters
  const numberToLetterMap = {
    0: "o", // You can add more mappings as needed
    1: "i",
    2: "z",
    3: "e",
    4: "a",
    5: "s",
    6: "g",
    7: "t",
    8: "b",
    9: "g",
  };

  return (
    str
      .normalize("NFD") // Break down diacritics
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      //  .replace(/[^a-zA-Z0-9]/g, "")          // Remove non-alphanumeric characters
      .replace(/[^\x00-\x7F]/g, "") // Strip non-ASCII (optional)
      .replace(/[0-9]/g, (match) => numberToLetterMap[match] || match) // Replace numbers with letters
      .replace(/[jlj]/g, "i") // Replace 'j' and 'l' with 'i'
      .toLowerCase()
  ); // Convert to lowercase
}

var racialslur = [
  "retard",
  "nick/her",
  "nickher",
  "nick her",
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

var lessStrictSlurs = ["fag", "nicka"].map(function (v) {
  return v.toLowerCase();
});

const ran = require("./lib/random");
const tmi = require("tmi.js");
const http = require("http");

const { Server } = require("socket.io");

const express = require("express");

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

const farmer1 = new tmi.Client({
  options: { debug: false },
  identity: {
    username: username,
    password: process.env.MULTIMONSTER,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channelName],
});

const farmer2 = new tmi.Client({
  options: { debug: false },
  identity: {
    username: username,
    password: process.env.HAPPYSCRIBBLE,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channelName],
});

const farmer3 = new tmi.Client({
  options: { debug: false },
  identity: {
    username: username,
    password: process.env.A60PRIME,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channelName],
});

const farmer4 = new tmi.Client({
  options: { debug: false },
  identity: {
    username: username,
    password: process.env.A90,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channelName],
});

const farmer5 = new tmi.Client({
  options: { debug: false },
  identity: {
    username: username,
    password: process.env.AR0XMBUSH,
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

client.on("connecting", () =>
  log("Connecting to irc-ws.chat.twitch.tv on port 443..")
);
client.on("connected", (address, port) => {
  log("Connected to server.");
  log("Joining #ringtail216");
});

client.on("logon", (address, port) => {
  log("Sending authentication to server..");
});

client.on("reconnect", () => {
  log("Reconnecting...");
});

client.on("serverchange", (channel) => {
  log("The server has changed.");
});

client.on("disconnected", (address, port) => {
  log("Disconnected from server.");
});
client.on("part", (channel, username_, self) => {
  if (self) log(`Left ${channel}`);
});
client.on("join", (channel, username_, self) => {
  if (self) log(`Joined ${channel}`);
});
client.on("join", (channel, username, self) => {
  if (username.toLowerCase() !== "prokameronbot") return;
    client.say(channel, "ProKameron Bot (Twitch variant) has been activated in " + channel)
});

/*client.on("join", (channel, username, self) => {
  // Ignore the bot itself
  if (self) return;

  // If botStartTime is not set, do nothing
  if (!botStartTime) return;

  const now = Date.now();
  const uptimeMs = now - botStartTime;

  // Only respond if bot has been active for more than 60 seconds
  if (uptimeMs > 60000) {
    client.say(channel, `Welcome in, ${username}!`);
  }
});

client.on("part", (channel, username, self) => {
  // Ignore the bot itself
  if (self) return;

  // If botStartTime is not set, do nothing
  if (!botStartTime) return;

  const now = Date.now();
  const uptimeMs = now - botStartTime;

  // Only respond if bot has been active for more than 60 seconds
  if (uptimeMs > 60000) {
    client.say(channel, `${username} has left...`);
  }
});*/
client.on("message", (channel, tags, message, self) => {
  //  if (!self) {
  log(`[${channel}] <${tags["display-name"] || tags.username}>: ${message}`);
  const containsSlur =
    racialslur.some((word) => normalizeText(message).includes(word)) ||
    lessStrictSlurs.some((word) => lessnormalizeText(message).includes(word));
  if (containsSlur) {
    sendWebhookMessage(
      `**<${tags["display-name"] || tags.username}>**: [SLUR CENSORED]`
    );
  } else {
    sendWebhookMessage(
      `**<${tags["display-name"] || tags.username}>**: ${message}`
    );
    //    }
  }
});

client.on("clearchat", (channel) => {
  client.say(channel, "The chat was cleared. Hi everyone!");
});

let timeouts = {};

client.on("timeout", (channel, username, reason, duration, tags) => {
  sendWebhook(
    `User ${username} has been timed out in ${channel} for ${duration} seconds for reason: ${
      reason || "No reason provided"
    }`
  );
  timeouts[username] = Date.now() + duration * 1000;

  setTimeout(() => {
    sendWebhook(`[Timeout tracker] ${username}'s timeout has expired.`);
    client.say(channel, `[Timeout tracker] ${username}'s timeout has expired.`);
    delete timeouts[username];
  }, duration * 1000);
});

client.on("ban", (channel, user, reason, bot) => {
  sendWebhook(`User ${user} banned from ${channel} for ${reason}`);
});

client.on("raided", (channel, username, viewers) => {
  client.say(channel, `Welcome in, all ${viewers} raiders from ${username}!`);
  sendWebhook(`Welcome in, all ${viewers} raiders from ${username}!`);
});

client.on("message", async (channel, tags, message, self) => {
  if (self) return; // Ignore messages from the bot itself
  console.log(client.uptime);
  //  sendWebhook(message)
  //  console.log(channel)

  // Auto-translate messages that aren't in English
  try {
    const detected = detect(message);
    const detectedLangCode = detected[0]?.lang || "unknown"; // Extract language code safely
    console.log(detectedLangCode);
    if (message.startsWith("pk!translate ")) {
      try {
        const msgToTranslate = message.replace("pk!translate ", "").trim();

        const detected = detect(msgToTranslate);
        const detectedLangCode = detected[0]?.lang || "unknown";
        const langData = langs.where("1", detectedLangCode);
        let detectedLangName = langData ? langData.name : "Unknown";

        if (detectedLangName === "Unknown") {
          switch (detectedLangCode) {
            case "zh-cn":
              detectedLangName = "Chinese (Simplified)";
              break;
            case "zh-tw":
              detectedLangName = "Chinese (Traditional)";
              break;
          }
        }

        let translated = await translate(msgToTranslate, { to: "en" });

        const containsSlur =
          racialslur.some((word) => normalizeText(translated).includes(word)) ||
          lessStrictSlurs.some((word) =>
            lessnormalizeText(translated).includes(word)
          );

        if (containsSlur) {
          client.say(
            channel,
            `${tags["display-name"]} tried to translate a SLUR! @ringtail216`
          );
        } else {
          client.say(
            channel,
            `${tags["display-name"]}, From ${detectedLangName}, the text you provided says "${translated}"`
          );
        }
      } catch (error) {
        console.error("pk!translate error:", error);
        client.say(channel, "Something went wrong while translating.");
      }
    }

    // Convert the language code to a full language name
    const langData = langs.where("1", detectedLangCode);
    let detectedLangName = langData ? langData.name : "Unknown";

    if (detectedLangName === "Unknown") {
      switch (detectedLangCode) {
        case "zh-cn":
          detectedLangName = "Chinese (Simplified)";
          break;
        case "zh-tw":
          detectedLangName = "Chinese (Traditional)";
          break;
      }
    }

    const noTranslateWords = [
      "!modroulette",
      "!sr",
      "!daily",
      "!setuptierlist",
    ]; // Add words you don't want translated

    const containsNoTranslateWord = noTranslateWords.some((word) =>
      message.toLowerCase().includes(word.toLowerCase())
    );

    if (detectedLangCode !== "en" && !containsNoTranslateWord) {
      let translated = await translate(message, { to: "en" });

      // If the message changes after translation, it means it's not in English
      if (translated.toLowerCase() !== message.toLowerCase()) {
        if (
          racialslur.some((word) => normalizeText(message).includes(word)) ||
          lessStrictSlurs.some((word) =>
            lessnormalizeText(message).includes(word)
          )
        ) {
          client.say(
            channel,
            `${tags["display-name"]} said a slur in a different language. Please take action, @ringtail216`
          );
        }
      }
    }
  } catch (error) {
    console.error("Translation error:", error);
  }

  if (message.toLowerCase().includes("pk!uptime")) {
    if (!botStartTime) {
      client.say(channel, "Bot uptime not available yet.");
      return;
    }

    const now = Date.now();
    const uptimeMs = now - botStartTime;

    const seconds = Math.floor(uptimeMs / 1000) % 60;
    const minutes = Math.floor(uptimeMs / (1000 * 60)) % 60;
    const hours = Math.floor(uptimeMs / (1000 * 60 * 60));

    const uptime = `${hours}h ${minutes}m ${seconds}s`;
    client.say(channel, `Bot has been running for ${uptime}`);
  }

  if (message.startsWith("pk!translate ")) {
    try {
      const msgToTranslate = message.replace("pk!translate ", "").trim();

      const detected = detect(msgToTranslate);
      const detectedLangCode = detected[0]?.lang || "unknown";
      const langData = langs.where("1", detectedLangCode);
      let detectedLangName = langData ? langData.name : "Unknown";

      if (detectedLangName === "Unknown") {
        switch (detectedLangCode) {
          case "zh-cn":
            detectedLangName = "Chinese (Simplified)";
            break;
          case "zh-tw":
            detectedLangName = "Chinese (Traditional)";
            break;
        }
      }

      let translated = await translate(msgToTranslate, { to: "en" });

      const containsSlur =
        racialslur.some((word) => normalizeText(translated).includes(word)) ||
        lessStrictSlurs.some((word) =>
          lessnormalizeText(translated).includes(word)
        );

      if (containsSlur) {
        client.say(
          channel,
          `${tags["display-name"]} tried to translate a SLUR! @ringtail216`
        );
      } else {
        client.say(
          channel,
          `${tags["display-name"]}, From ${detectedLangName}, the text you provided says "${translated}"`
        );
      }
    } catch (error) {
      console.error("pk!translate error:", error);
      client.say(channel, "Something went wrong while translating.");
    }
  }

  if (message.startsWith("pk!randomnumber ")) {
    try {
      const number = message.replace("pk!randomnumber ", "").trim();
      client.say(channel, "The random number is " + Math.floor(ran.random(number)))
    } catch (error) {
      console.error("pk!translate error:", error);
      client.say(channel, "Something went wrong while generating a random number.");
    }
  }
  // Custom bot responses
  if (
    tags["display-name"] === "ringbot216" ||
    tags["display-name"] === "ProKameron"
  ) {
    if(message.includes("pk!cult")) {
farmer1.say(channel, "#JoinTheProKameronCult")
farmer2.say(channel, "#JoinTheProKameronCult")
farmer3.say(channel, "#JoinTheProKameronCult")
farmer4.say(channel, "#JoinTheProKameronCult")
farmer5.say(channel, "#JoinTheProKameronCult")
client.say(channel, "#JoinTheProKameronCult")
userclient.say(channel, "#JoinTheProKameronCult")
    }
   /*  if(message.includes("@prokameronbot has")) {
      const match = message.match(/has (\d+) widgets/);

const money = match ? parseInt(match[1], 10) : null;
      client.say(channel, "!givepoints @prokameron " + money)
    }*/
  /*  if (message.includes("@prokameronbot has")) {
    const match = message.match(/has (\d+) widgets/);

    const money = match ? parseInt(match[1], 10) : null;
    client.say(channel, "!givepoints @prokameron " + money)
}*/
    if(farmersenabled) {
if (message.includes("the_multi_monster has")) {
    const match = message.match(/has (\d+) widgets/);

    const money = match ? parseInt(match[1], 10) : null;
    farmer1.say(channel, "!givepoints @prokameron " + money)
}
if (message.includes("the_happy_scribble has")) {
    const match = message.match(/has (\d+) widgets/);

    const money = match ? parseInt(match[1], 10) : null;
    farmer2.say(channel, "!givepoints @prokameron " + money)
}
if (message.includes("a_60_prime has")) {
    const match = message.match(/has (\d+) widgets/);

    const money = match ? parseInt(match[1], 10) : null;
    farmer3.say(channel, "!givepoints @prokameron " + money)
}
if (message.includes("a_90_paralysis has")) {
    const match = message.match(/has (\d+) widgets/);

    const money = match ? parseInt(match[1], 10) : null;
    farmer4.say(channel, "!givepoints @prokameron " + money)
}
if (message.includes("ar0xmbush has")) {
    const match = message.match(/has (\d+) widgets/);

    const money = match ? parseInt(match[1], 10) : null;
    farmer5.say(channel, "!givepoints @prokameron " + money)
}
    }
/*if (message.includes("pk!givememoney")) {
    client.say(channel, "!points")
}*/
    if(farmersenabled) {
if (message.includes("pk!dodaily")) {
    setTimeout(function() {
        farmer1.say(channel, "!daily")
    }, 0);
    setTimeout(function() {
        farmer2.say(channel, "!daily")
    }, 2000);
    setTimeout(function() {

        farmer3.say(channel, "!daily")

    }, 4000);
    setTimeout(function() {
        farmer4.say(channel, "!daily")
    }, 6000);
    setTimeout(function() {
        farmer5.say(channel, "!daily")
    }, 8000);
}
    }
    if (message.includes("widgets to @prokameron")) {
      client.say(channel, "!points @prokameron");
    }
  }
  if (
    message.includes(
      "Epic moenys have been distributed. Time to gamble! LETSGO"
    ) ||
    message.includes("@ringtail216 received") ||
    message.includes("Epice moenys to @ringtail216")
  ) {
    if (tags["display-name"] === "ringbot216") {
      function getRandomNumber(min = 750, max = 3000) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      setTimeout(() => {
     //   userclient.say(channel, "!takepoint");
      }, getRandomNumber());
    } else {
      //    userclient.say(channel, `dude I'm not stupid ${tags["display-name"]}`);
    }
  }
  if (racialslur.some((word) => normalizeText(message).includes(word))) {
    client.say(channel, `${tags["display-name"]}, Slurs are not allowed!`);
  }

  if (
    message.toLowerCase().includes("pk!whoami") &&
    tags["display-name"] !== "jumbojosh2ndbiggestfan"
  ) {
    let status = "Regular chatter";
    if (tags["mod"]) status = "Moderator";
    if (tags["vip"]) status = "VIP";
    if (tags["user-type"] === "broadcaster") status = "Broadcaster";

    client.say(
      channel,
      `You are ${tags["display-name"]}, a ${status} with the color ${tags["color"]}. Your user ID is ${tags["user-id"]}`
    );
  }

  if (
    message.toLowerCase().includes("pk!coinflip") &&
    tags["display-name"] !== "jumbojosh2ndbiggestfan"
  ) {
    client.say(
      channel,
      `${tags["display-name"]}, it's ${ran.choose(["Heads", "Tails"])}!`
    );
  }

  if (
    message.toLowerCase().includes("!ban prokameron") ||
    message.toLowerCase().includes("!ban @prokameron")
  ) {
    let response = ran.chooseAngryResponse();
    userclient.say(
      channel,
      `[AUTO-RESPONSE] ${response} ${tags["display-name"]} (response #${response.index})`
    );
  }
});

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let currentPoll = null;
const blacklist = ["ringbot216"];

app.use(express.json());
app.use(express.static("public"));

app.post("/verify-key", (req, res) => {
  const { key } = req.body;

  if (key === process.env.SECRET) {
    res.json({ success: true });
    client.say(
      "#ringtail216",
      "@ringtail216, a user just accessed the poll control panel. If this is not you, please let @prokameron know IMMEDIATELY so that he changes the password."
    );
  } else {
    res.json({ success: false });
  }
});

client.on("message", (channel, tags, message, self) => {
  if (self) return;

  const username = tags.username;
  const displayName = tags["display-name"];
  if (blacklist.includes(username)) return;

  const lowerMsg = message.trim().toLowerCase();

  // --- Handle Voting ---
  let input = null;

  if (lowerMsg.startsWith("!vote ")) {
    input = lowerMsg.split(" ")[1];
  } else if (/^\d+$/.test(lowerMsg)) {
    input = lowerMsg;
  } else if (currentPoll?.options.includes(lowerMsg)) {
    input = lowerMsg;
  }

  if (input && currentPoll) {
    let vote = null;
    const voteIndex = parseInt(input, 10);

    if (
      !isNaN(voteIndex) &&
      voteIndex >= 1 &&
      voteIndex <= currentPoll.options.length
    ) {
      vote = currentPoll.options[voteIndex - 1];
    } else if (currentPoll.options.includes(input)) {
      vote = input;
    }

    if (vote) {
      currentPoll.votes[username] = vote;
      io.emit("voteUpdate", currentPoll.votes);
    }
  }

  // --- Handle Vote Removal ---
  if (lowerMsg.startsWith("!removevote ")) {
    const targetUser = lowerMsg.split(" ")[1]?.toLowerCase();
    const isAuthorized =
      username === "ringtail216" || username === "prokameron";

    if (!currentPoll) return;
    if (!isAuthorized) return;

    if (!targetUser || !currentPoll.votes[targetUser]) return;

    delete currentPoll.votes[targetUser];
    client.say(channel, `${displayName} removed ${targetUser}'s vote.`);
    io.emit("voteUpdate", currentPoll.votes);
  }
});

io.on("connection", (socket) => {
  socket.on("startPoll", (poll) => {
    currentPoll = {
      question: poll.question,
      options: poll.options.map((opt) => opt),
      votes: {},
    };
    console.log(currentPoll.question);
    console.log(currentPoll.options.join(", "));
    if (
      racialslur.some((word) =>
        normalizeText(currentPoll.options.join(", ")).includes(word)
      )
    ) {
      client.say(
        "#ringtail216",
        `WARNING! SOMEONE ENTERED A POTENTIAL SLUR INTO THE POLL SYSTEM! THE PASSWORD MAY HAVE BEEN LEAKED! @ringtail216 @prokameron`
      );
    } else {
      client.say(
        "#ringtail216",
        "The poll has started! " +
          currentPoll.question +
          ' Vote in chat using "!vote <option number>" or just type the number. Options: ' +
          currentPoll.options.join(", ")
      );
    }
    io.emit("pollStarted", currentPoll);
  });

  socket.on("togglePollVisibility", () => {
    io.emit("togglePollVisibility");
  });

  socket.on("endPoll", () => {
    client.say("#ringtail216", "The poll has ended.");
    io.emit("pollEnded", currentPoll);
    currentPoll = null;
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

// Connect to Twitch chat
client
  .connect()
  .then(() => {
    botStartTime = Date.now(); // Store the time when the bot connects
  })
  .catch(console.error);
userclient.connect().catch(console.error);


farmer1.connect().catch(console.error);
farmer2.connect().catch(console.error);
farmer3.connect().catch(console.error);
farmer4.connect().catch(console.error);
farmer5.connect().catch(console.error);


process.on("unhandledRejection", (reason, p) => {
  console.error(reason, p);
});

process.on("uncaughtException", (err, origin) => {
  console.error(err, origin);
});
