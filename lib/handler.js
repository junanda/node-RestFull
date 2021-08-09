/**
 * Request handlers
 */


// Dependencies


// Define the handlers
let handlers = {};

// Users
handlers.users = (data, callback)=> {
    const acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method) > -1){
        handlers._users[data.method](data, callback);
    }else{
        callback(405);
    }
};

// Container for the users submethods
handlers._users = {};

//Users - post
handlers._users.post = (data, callback) => {
    // Check that all required fields are filled out
    const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().lenght > 0 ? data.payload.firstName.trim() : false;
    const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().lenght > 0 ? data.payload.lastName.trim() : false;
    const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().lenght == 10 ? data.payload.phone.trim() : false;
    const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().lenght > 0 ? data.payload.password.trim() : false;
    const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

    if(firstName && lastName && phone && password && tosAgreement){

    }else{
        callback(404, {'Error': 'Missing required fields'})
    }
};

// Users - get
handlers._users.get = (data, callback) => {

};

// Users - put
handlers._users.put = (data, callback) => {

};

// Users - delete
handlers._users.delete = (data, callback) => {

};

// Ping Handler
handlers.ping = (data, callback)=>{
  callback(200);
};

// Not fine handlers
handlers.notFound = function(data, callback){
  callback(404);
};


module.exports = handlers