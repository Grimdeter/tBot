var DeadlineModule = function() {};
module.exports = DeadlineModule;

class Deadline 
{
    constructor(msg)
    {
        console.log(msg)
        let fromTime
        let fromTimeMinutes
        let targetTime
        let targetTimeMinutes=0
        let name = `Deadline!`
        fromTime = new Date( msg.date * 1000 )
        fromTimeMinutes = fromTime.getMinutes() + fromTime.getHours() *60 + fromTime.getDate() * 60 * 24
        if (msg.chat.type === "group")
        {
            targetTime = new Date(msg.text.slice(26))
            targetTimeMinutes = targetTime.getMinutes() + targetTime.getHours() *60 + targetTime.getDate() * 60 * 24
            targetTimeMinutes = targetTimeMinutes - fromTimeMinutes
        } else
        {
            targetTime = new Date(msg.text.slice(5))
            targetTimeMinutes = targetTime.getMinutes() + targetTime.getHours() *60 + targetTime.getDate() * 60 * 24
            targetTimeMinutes = targetTimeMinutes - fromTimeMinutes
        }
        let ded =
        {
            owner: msg.chat.username,
            name: `Deadline!`,
            timeLeft: targetTimeMinutes
        }
        return ded
    }
}

module.exports = Deadline