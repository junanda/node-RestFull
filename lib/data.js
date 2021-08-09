/**
 * Library for storing and editing data
 */

const fs = require('fs');
const path = require('path');

// Container  for the module (to be exported)
let lib = {}

// base directory for the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to the file
lib.create = (dir, file, data, callback) => {
    // Open the file to writing
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', (err, fileDescriptor)=>{
        if(!err && fileDescriptor){
            // Convert data to string
            const stringData = JSON.stringify(data);

            // Write to file and closed
            fs.writeFile(fileDescriptor, stringData, (err) => {
                if(!err){
                    fs.close(fileDescriptor, (err) => {
                        if(!err){
                            callback(false);
                        }else{
                            callback("Error closing new file");
                        }
                    });
                }else{
                    callback('Error writing to new file');
                }
            });
        } else {
            callback('Could not cerated new file, it may already exists');
        }
    });
};


// read data from a file
lib.update = function(dir, file, callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf8', function(err, data){
        callback(err, data);
    });
};

// UPdate data inside a file
lib.update = (dir, file, data, callback)=>{
    // Open the file
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', (err, fileDescriptor)=>{
        if(!err && fileDescriptor){
            const stringData = JSON.stringify(data);

            // truncate
            fs.ftruncate(fileDescriptor, (err)=>{
                if(!err){
                    fs.writeFile(fileDescriptor, stringData, (err)=>{
                        if(!err){
                            fs.close(fileDescriptor, (err)=>{
                                if(!err){
                                    callback(false);
                                }else{
                                    callback('Error closing existing file');
                                }
                            });
                        }else{
                            callback("Error writing to existing file");
                        }
                    });

                }else{
                    callback('Error truncating file');
                }
            });
        }else{
            callback('could not open file for updating, it may not exist yet');
        }
    });
};

// Delete the file
lib.delete = function(dir, file, callback){
    fs.unlink(lib.baseDir+dir+'/'+file+'.json', function(err){
        if(!err){
            callback(false);
        }else{
            callback('Error deleting file');
        }
    });
};

module.exports = lib