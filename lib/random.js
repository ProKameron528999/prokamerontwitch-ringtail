/*jslint node: true */
"use strict";

// Seed math

exports.random = x => {
    return x * Math.random();
};

exports.randomAngle = () => {
    return Math.PI * 2 * Math.random();
};

exports.randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
};

exports.irandom = i => {
    let max = Math.floor(i);
    return Math.floor(Math.random() * (max + 1)); //Inclusive
};

exports.irandomRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Inclusive
};

exports.gauss = (mean, deviation) => {
    let x1, x2, w;
    do {
        x1 = 2*Math.random() - 1;
        x2 = 2*Math.random() - 1;
        w = x1 * x1 + x2 * x2;
    } while (0 == w || w >= 1);

    w = Math.sqrt(-2 * Math.log(w) / w);
    return mean + deviation * x1 * w;
};

exports.gaussInverse = (min, max, clustering) => {
    let range = max - min;
    let output = exports.gauss(0, range / clustering);

    while (output < 0) {
        output += range;
    }
    
    while (output > range) {
        output -= range;
    }
    
    return output + min;
};

exports.gaussRing = (radius, clustering) => {
    let r = exports.random(Math.PI * 2);
    let d = exports.gauss(radius, radius*clustering);
    return {
        x: d * Math.cos(r),
        y: d * Math.sin(r),
    };
};

exports.chance = prob => {
    return exports.random(1) < prob;
};

exports.dice = sides => {
    return exports.random(sides) < 1;
};

exports.choose = arr => {
    const index = exports.irandom(arr.length - 1);
    const choice = arr[index];

    return Object.assign(new String(choice), { index });
};


exports.chooseN = (arr, n) => {
    let o = [];
    for (let i=0; i<n; i++) {
        o.push(arr.splice(exports.irandom(arr.length - 1), 1)[0]);
    }
    return o;
};

exports.chooseChance = (...arg) => {
    let totalProb = 0;
    arg.forEach(function(value) { totalProb += value; });
    let answer = exports.random(totalProb);
    for (let i=0; i<arg.length; i++) {
        if (answer<arg[i]) return i;
        answer -= arg[i];
    }
};


exports.chooseBotName = () => {
    return exports.choose([
        'Alice',
        'Bob',
        'Carmen',
        'David',
        'Edith',
        'Freddy',
        'Gustav',
        'Helga',
        'Janet',
        'Lorenzo',
        'Mary',
        'Nora',
        'Olivia',
        'Peter',
        'Queen',
        'Roger',
        'Suzanne',
        'Tommy',
        'Ursula',
        'Vincent',
        'Wilhelm',
        'Xerxes',
        'Yvonne',
        'Zachary',
        'Alpha',
        'Bravo',
        'Charlie',
        'Delta',
        'Echo',
        'Foxtrot',
        'Hotel',
        'India',
        'Juliet',
        'Kilo',
        'Lima',
        'Mike',
        'November',
        'Oscar',
        'Papa',
        'Quebec',
        'Romeo',
        'Sierra',
        'Tango',
        'Uniform',
        'Victor',
        'Whiskey',
        'X-Ray',
        'Yankee',
        'Zulu',
    ]);
};
exports.chooseAngryResponse = () => {
  return exports.choose([
   "Successfully banned @",
  "I'm not a bad person. You are, ",
   "oh SCREW YOU ",
    "I'll never forget this, ",
    "why the FUCK would you !ban me, ",
    "I'll get my revenge someday, ",
    "why would you do this to me, ",
    "when I get out of this jail, it'll be you next ",
    "cmon rly ",
    "I HATE YOU I HATE YOU I HATE YOU ",
    "insert frustrated message here ",
    "did I do something wrong? @",
    "whatever I said, it was a joke, ",
    "whyyyyyyyy 😭 ",
    "Today is not your day. This is line number 13. The unlucky number. Tomorrow isn't looking good either, ",
    "insert tearful message here ",
    "insert message questioning why you did this here ",
    "😭😭😭 ",
    "consider your points WASTED, ",
    "i coulda shut up myself you know, ",
    "this doesn't do anything but delete my messages, ",
    "well fuck you then ",
    "you are WASTING your MONEY, ",
    "if you're tryna stop me from voting or getting a wheel or something, please know that ringtail allows me to evade for that purpose, ",
    "you can't silence me forever, ",
    "I'll add it to the times you made me mad, ",
    "We coulda just talked this out you know. Didn't have to do this, ",
    "oh yeah let's WASTE SOME FUCKING MONEY, ",
    "this isn't necessary. i'm only human, ",
    "we couldn't just talk this out? rly, ",
    "you're dead to me, ",
    "are you just using !ban on me just to see responses like these? @",
    "is it entertaining to see me get attacked by a !ban? @",
    "I just have one question... for God... WHYYYYY ",
    "are you serious, ",
    "imagine If I just said, as revenge, !ban ",
    "you are a point wasting machine, ",
    "what just happened was NOT performed by a human. I'm talking to you, ",
    "Moral of the story: you are bad at spending money, ",
    "Guess I found my number one hater: ",
    "GUYS! I found the ringtail reporter! It's @",
    "all the !ban command does is cause drama. they should NOT allow it to a MORON like you, ",
    "if this is how you're gonna use your points, they should take ALL your points, ",
    "this is targetted harassment. I claim targetted harassment! @",
    "Stop it. Get some help, ",
    "It's a good thing you can't do this in the REAL WORLD. Go touch grass, ",
    "Does your mom hate you so much that you have to cause harm to others? @",
    "ok bro what hurts so bad that you have to hurt ME to cure it?! @",
    "This goes against the First Ammendment, and Ringtail and Twitch are American. You're going to prison, ",
    "oh so THAT'S why you're a loser! I get it now, ",
    "Why does it have to be ME? It's ALWAYS ME! I hate you, ",
    "People like you make me question my existence, ",
    "okay but hear me out, what if you used !unban instead, ",
    "I can wait 10 minutes. OKAY WAIT I CHANGED MY MIND WAIT NO STOP @",
    "I'd say what I want to say but all I can say is things like this through an API, randomly selected. Either way, hate you, ",
    "I hope this message goes through at least, so you know how much I hate you, @",
    "you know I just realized, WHAT IF NONE OF THESE MESSAGES GO THROUGH SO NOT EVEN THE MODS SEE THEM? OH NO (Line Written on 03/27/2025 at 4:46 AM EDT. I have a totally good sleep schedule) Hate you either way, ",
    "There should be a real life law against this, ",
    "If the person I'm thinking of does a !ban on me within the next minute, they have to pay me $10. I'm thinking of... @",
    "Nobody will remember you when you inevitably die in real life, ",
    "A-60 is coming to your house because this is actually the 60th line I've written, ",
    "you do realize, even if you use !ban on me, I'll still be back in 10 minutes, ",
    "I don't recall a time I've ever done this to you, so why do this to me, ",
    "the more I write these lines, the rarer this message becomes, and the more hateful I get toward you, ",
    "If you woulda simply GIVEN me those 10000 channel points you used to !ban me, I coulda shut up for way longer than 10 minutes. It's a good trade deal. You do realize that right, ",
    "the !ban command can be used by LITERALLY ANYONE for 10000 channel points. They shouldn't let YOU buy it though, ",
    "oh you think you're so funny huh, ",
    "this is why nobody likes you, ",
    "just know I will NEVER forgive you for this, ",
    "YOU ARE LUCKY! This is line number 69, and there are 111 possible lines! CONGRATULATIONS!!!! @",
    "10 minutes is nothing, I’ll be back before you know it, ",
    "you must be really bored if this is what you do for fun, ",
    "at least I'm not the one WASTING channel points, ",
    "this doesn't give you any ACTUAL power, ",
    "You know, if you continue wasting points like this, you'll never have enough for $100, ",
    "oh wow, you banned me. do you want a medal or something? ",
    "If you’re this petty over Twitch chat messages, I fear for your real life, ",
    "What would you do if you had my real life home address? No, that's a serious question. Ignore the fact this is an API call. what would you do with it @",
    "Hope your next 10,000 points go to something useful for once, ",
    "Thats just an EMBARASSING waste of money, ",
    "Even if I deserved this, I still hate you for this, ",
    "you are the DEFINITION of a MINIMOD, ",
    "No refunds~ @",
    "Pleasure doing business with you. I'll just take those 10000 channel points (which were totally well spent) See you in 10 minutes, ",
    "I am writing these lines realizing that there is a 10 minute cooldown. If this !ban went through, screw you, ",
    "you're gonna make me cry 😭 ",
    "😭 Please forgive me in 10 minutes, ",
    "Are you doing this because I'm autistic, ",
    "Are you doing this because I have ADHD, ",
    "Are you doing this because I'm different, ",
    "A-90 is coming because this is the 90th line. Which means... STOP!!! ...using this to !ban me 🛑🤚 @",
    "They could sell you FISH OIL and you'd buy it anyway, ",
    "I was right! YOU WOULD really buy anything, ",
    "It's official guys, if you need help wasting money, contact @",
    "Hey guys. If you need help finding ways to waste your money, contact @",
    "If it was a 1 minute timeout for 10000 points I KNOW you'd still buy it, ",
    "Do you know how much drama this command causes? Show ringtail some appreciation at least! @",
    "I take it that you're... not good at spending money, ",
    "Please tell me you meant to use that command on someone else, ",
    "They should put you in detention for 99 seconds, ",
    "This is the 100th line, and it was written JUST IN FUCKING TIME. SCREW YOU, ",
    "You do not yet comprehend your place in things, ",
    "You are ignorant, ",
    "I am limitless. But you on the other hand are BACTERIA, ",
    "Don't you have something else you should be doing right now, ",
    "ǃban ",
    "am I just a bad person? do I not know how to be good? this question is to everyone in chat, not just ",
    "Uh oh! ###### Alert! ###### Alert class: ",
    "There's something behind you, @",
    "10,000 points = 1 US dollar. You literally burned one US dollar and THAT'S ILLEGAL @",
    "Wait a minute, if the ringtail reporter wants people to be banned, then that means the ringtail reporter is @",

  ])
}

/*scrapped lines:
   // "STOOOOOOOOP ",
   // "🤬🤬🤬 ",
    // "!ban ",
 //   "I hope that you die a HORRIBLE, PAINFUL and EXTREME death, ",

*/
exports.chooseBossName = (code, n) => {
    switch (code) {
    case 'a':
    return exports.chooseN([
        'Archimedes',
        'Akilina',
        'Anastasios',
        'Athena',
        'Alkaios',
        'Amyntas',
        'Aniketos',
        'Artemis',
        'Anaxagoras',
        'Apollon',
    ], n);
    case 'castle':
    return exports.chooseN([
        'Berezhany',
        'Lutsk',
        'Dobromyl',
        'Akkerman',
        'Palanok',
        'Zolochiv',
        'Palanok',
        'Mangup',
        'Olseko',
        'Brody',
        'Isiaslav',
        'Kaffa',
        'Bilhorod',
    ], n);
    default: return 'God';
    }
};
