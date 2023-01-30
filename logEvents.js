const { format } = require('date-fns');
const { v4: uiid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'dd-MM-yyy\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uiid}\t${message}`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);
    } catch (e) {
        console.log(e);
    }
};

module.exports = logEvents;