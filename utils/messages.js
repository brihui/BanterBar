// Require module to get time.
const moment = require('moment');

function fmtMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

// Export functions to use in other files.
module.exports = fmtMessage;