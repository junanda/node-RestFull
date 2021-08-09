/**
 * hrlpers for various task
 */

// Dependencies
const crypto = require('crypto');
const consfig = require('..config')

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

module.exports = helpers