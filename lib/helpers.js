/**
 * hrlpers for various task
 */

// Dependencies
const crypto = require('crypto');
const config = require('../config')

// Container helpers
let helpers = {}

// Create a SHA256 hash function
helpers.hash = (str) => {
    if(typeof(str) == 'string' && str.length > 0){
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    }else{
        return false;
    }
};

// parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObjact = (str) => {
    try {
        const obj = JSON.parse(str);
        return obj;
    } catch (error) {
        return {};
    }
};

module.exports = helpers