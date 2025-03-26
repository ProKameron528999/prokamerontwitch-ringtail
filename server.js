process.exit()

const tmi = require('tmi.js');

// Twitch credentials
const username = 'prokameron';
const oauthToken = process.env.ACCESS_TOKEN; // Get from https://twitchapps.com/tmi/

// Twitch channel to connect to
const channelName = 'ringtail216';

// Configure the Twitch client
const client = new tmi.Client({
    options: { debug: true },
    identity: {
        username: username,
        password: oauthToken
    },
    connection: {
        secure: true,
        reconnect: true
    },
    channels: [channelName]
});

// Event listener for incoming chat messages
client.on('message', (channel, tags, message, self) => {
    if (self) return; // Ignore messages from the bot itself
    console.log(`[${tags['display-name']}]: ${message}`);
    
    // Respond if the message contains "hello"
    if (message.includes('Epic moenys have been distributed. Time to gamble! LETSGO') || message.includes("@ringtail216 received")) {
        client.say(channel, '!takepoints');
    }
});

// Connect to Twitch chat
client.connect().catch(console.error);
