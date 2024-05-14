const http = require('http');
const port = 5000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  const forwardedFor = req.headers['x-forwarded-for'];
  const userIp = forwardedFor
    ? forwardedFor.split(',')[0]
    : req.headers['x-real-ip'] ||
      req.headers['x-client-ip'] ||
      req.headers['x-remote-ip'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

  if (userIp) {
    req.userIp = userIp;
  }

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'Hello World',
      userIp: req.userIp,
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify({ 
        message: 'Route Not Found'
     }));
  }
});

server.listen(port, () => {
  console.log('> Server is up and running on port: ' + port);
});
