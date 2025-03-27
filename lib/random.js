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
    return arr[exports.irandom(arr.length - 1)];
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
    // "!ban ",
    "whyyyyyyyy 😭 ",
    "insert tearful message here ",
    "insert message questioning why you did this here ",
    "😭😭😭 ",
   // "🤬🤬🤬 ",
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
    "I hope that you die a HORRIBLE, PAINFUL and EXTREME death, ",
   // "STOOOOOOOOP ",
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
    "you do realize, even if you use !ban on me, I'll still be back in 10 minutes, ",
    "I don't recall a time I've ever done this to you, so why do this to me, ",
    
  ])
}
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
