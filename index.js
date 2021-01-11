const TeleBot = require("telebot");
// import Deadline from '../deadlines.js';
const Deadline = require("./deadline");
let deadlines = []


//instantiate Telebot with our token got in the BtFather
const bot = new TeleBot({
  token: "1143715263:AAFUMiHGQ8bu5XoOPumfM8YiobCp8HDKHdI",
});

//our command
bot.on(["/start", "/hello"], (msg) => {
  //all the information about user will come with the msg
  console.log(msg);
  bot.sendMessage(msg.from.id, `Hello ${msg.chat.username}`);
});

bot.on("/help", (msg) => {
    bot.sendMessage(msg.chat.id, `Write deadline in the following format: 2020-09-15T16:00:00Z`)
});

bot.on("/add", (msg) => {
    if (msg.text === '/add@DeadlineCountdownBOT' | msg.text === '/add')
    {
        bot.sendMessage(msg.chat.id, `please provide date`)
    } else
    {
        let deadline = new Deadline(msg)
        deadlines.push(deadline)
        bot.sendMessage(msg.chat.id, `Deadline saved`)
    }
});

bot.on("/show", (msg) => {
    for (let i = 0; i < deadlines.length; i++) 
    {
        if (deadlines[i].owner === msg.chat.username) 
        {
            bot.sendMessage(msg.chat.id, `${deadlines[i].name} in ${deadlines[i].timeLeft} minutes`)
        }
    }
});

bot.on("/edit", (msg) => {
    for (let i = 0; i < deadlines.length; i++) 
    {
        if (deadlines[i].owner === msg.chat.username) 
        {
            deadlines[i].name = msg.text.slice(6)
        }
    }
});

bot.on("location", (msg) => {
    console.log(msg)
    bot.sendMessage(msg.from.id, `aaaaa`)
    bot.sendLocation(msg.from.id, [msg.location.latitude, msg.location.longitude])
});

bot.on("text", (msg) => {
    console.log(msg)
    bot.sendMessage(msg.from.id, `${msg.text.length}`)
});

// bot.sendLocation(173588872, [0,0])

setInterval(() => {
    for (let i = 0; i < deadlines.length; i++) {
        deadlines[i].timeLeft--
    }
}, 60000);



bot.start();