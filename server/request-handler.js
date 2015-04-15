var url = require("url");

exports.requestHandler = function(request, response) {
  var urlParsed = url.parse(request.url);
  if (urlParsed.pathname !== '/classes/messages'  && urlParsed.pathname !== '/classes/room1'){
    var statusCode = 404;

    var headers = defaultCorsHeaders;

    headers['Content-Type'] = 'application/JSON';

    response.writeHead(statusCode, headers);

    response.end();
  }
  else {
    var action = actions[request.method];
    action(request, response);
  }
};


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 
};

var actions = {
  nextId: 1,
  messages: [],
  'GET': function(request, response) {
    console.log("Serving request type " + request.method + " for url " + request.url);
    
    var statusCode = 200;

    var headers = defaultCorsHeaders;

    headers['Content-Type'] = 'application/JSON';

    response.writeHead(statusCode, headers);

    response.end(JSON.stringify({results: actions.messages}));
    },
  
  'OPTIONS': function(request, response) {
    console.log("Serving request type " + request.method + " for url " + request.url);

    var statusCode = 200;

    var headers = defaultCorsHeaders;

    headers['Content-Type'] = 'application/JSON';

    response.writeHead(statusCode, headers);

    response.end(JSON.stringify({results: actions.messages}));
    },

  'POST': function(request, response) {
    console.log("Serving request type " + request.method + " for url " + request.url);

    var statusCode = 201;

    var headers = defaultCorsHeaders;

    headers['Content-Type'] = 'application/JSON';

    response.writeHead(statusCode, headers);

    var data = "";

    request.on("data", function(chunk) {
        data += chunk;
    });


    request.on('end', function(){
      data = JSON.parse(data);
      data.objectId = actions.nextId;
      actions.nextId ++;
      actions.messages.push(data);
      response.end(JSON.stringify({results: actions.messages}));
    });
    
    }
  }; 

