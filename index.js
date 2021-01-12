{
// const TeleBot = require("telebot");
// // import Deadline from '../deadlines.js';
// const Deadline = require("./deadline");
// let choice = 0


// //instantiate Telebot with our token got in the BtFather
// const bot = new TeleBot({
//   token: "1530562815:AAETkNS8QACrXM0ZU7cCGoVTCBP462JCoRw",
// });

// //our command
// bot.on(["/start", "/hello"], (msg) => {
//   //all the information about user will come with the msg
// //   console.log(msg);
//   bot.sendMessage(msg.from.id, `Приветствую тебя в первом квест Телеграм боте в Казахстане! Выполняй простые задания по всему городу чтобы узнать что то новое про наш город, и, возможно, даже выиграть ценные призы!
//   Отправь /help для того чтобы узнать по подробнее, и /go чтобы приступить к выполнению своего перовго квеста!`);
// });

// bot.on("/help", (msg) => {
//     bot.sendMessage(msg.chat.id, `SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT`)
// });

// bot.on("/go", (msg) => {
//     // bot.sendMessage(msg.chat.id, `SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT SAMPLE TEXT`)
//     let button = bot.inlineButton(`aaaaaaaaaaaaaaaaaa`, choice = 1)
//     bot.inlineKeyboard([button], [button], [button])
//     // bot.sendMessage(msg.chat.id, `choice: ${choice}`)

// });

// bot.on("/show", (msg) => {
//     for (let i = 0; i < deadlines.length; i++) 
//     {
//         if (deadlines[i].owner === msg.chat.username) 
//         {
//             bot.sendMessage(msg.chat.id, `${deadlines[i].name} in ${deadlines[i].timeLeft} minutes`)
//         }
//     }
// });

// bot.on("/edit", (msg) => {
//     for (let i = 0; i < deadlines.length; i++) 
//     {
//         if (deadlines[i].owner === msg.chat.username) 
//         {
//             deadlines[i].name = msg.text.slice(6)
//         }
//     }
// });

// bot.on("location", (msg) => {
//     console.log(msg)
//     bot.sendMessage(msg.from.id, `aaaaa`)
//     bot.sendLocation(msg.from.id, [msg.location.latitude, msg.location.longitude])
// });

// bot.on("text", (msg) => {
//     // console.log(msg)
//     // bot.sendMessage(msg.from.id, `${msg.text.length}`)
// });

// // bot.sendLocation(173588872, [0,0])

// // setInterval(() => {
// //     for (let i = 0; i < deadlines.length; i++) {
// //         deadlines[i].timeLeft--
// //     }
// // }, 60000);



// bot.start();
}

const TeleBot = require('telebot');
const bot = new TeleBot('1530562815:AAETkNS8QACrXM0ZU7cCGoVTCBP462JCoRw');

var lastMessage;

bot.on('/start', msg => {

    const markup = updateKeyboard('apples');

    return bot.sendMessage(
        msg.from.id, 'This is a editMessageReplyMarkup example. So, apples or oranges?', {markup}
    ).then(re => {
        // Start updating message
        // lastMessage = [msg.from.id, re.result.message_id];
    });

});

// On button callback
bot.on('callbackQuery', msg => {

    // Send confirm
    bot.answerCallbackQuery(msg.id);

    if (!lastMessage) return bot.sendMessage(msg.from.id, 'Type /start');

    const data = msg.data;
    const chatId = lastMessage.chat.id;
    const messageId = lastMessage.message_id;
    const replyMarkup = updateKeyboard(data);

    // Edit message markup
    return bot.editMessageReplyMarkup({chatId, messageId}, {replyMarkup});

});

bot.start();

// Returns keyboard markup
function updateKeyboard(fruit) {

    let apples = 'apples';
    let oranges = 'oranges';

    if (fruit == 'apples') {
        apples = `==> ${ apples } <==`;
    } else {
        oranges = `==> ${ oranges } <==`;
    }

    return bot.inlineKeyboard([
        [
            bot.inlineButton(apples, {callback: 'apples'}),
            bot.inlineButton(oranges, {callback: 'oranges'})
        ]
    ]);

}