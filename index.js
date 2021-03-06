/*
*
*Primary file for the API
*
*/

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const handlers = require('./lib/handler');
const helpers = require('./lib/helpers');


//Instantiate the HTTP server
const httpServer = http.createServer((req, res)=>{
  unifiedServer(req, res);
});

// Start the server
httpServer.listen(config.httpPort, ()=>{
  console.log(`The server is listening on port ${config.httpPort}`);
})

// Instantiate https server
const httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};

const httpsServer = https.createServer(httpsServerOptions, (req, res)=>{
  unifiedServer(req, res);
});

httpsServer.listen(config.httpsPort, ()=>{
  console.log(`The server is listening on port ${config.httpsPort}`);
});

// All the server logic for both  the http and https server
const unifiedServer = (req, res)=>{
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get HTTP method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', (data)=>{
    buffer += decoder.write(data);
  });
  
  req.on('end', ()=>{
    buffer += decoder.end();

    // Choose the handler this request should go to. If one is not found, use notFound handler.
    const choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handlers
    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': helpers.parseJsonToObject(buffer)
    };

    // Route the request to the handler specified in the router
    choosenHandler(data, (statusCode, payload)=>{
      // use the status code called back by the handler, or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      // Use payload called back by the handler, or default to empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to the string
      const payloadString = JSON.stringify(payload);
      // return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log('Returning this response: ', statusCode, payloadString);
    });

  });
};


// Define a request router
const router = {
  'ping': handlers.ping,
  'users': handlers.users
};
