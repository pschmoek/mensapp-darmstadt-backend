const Hapi = require('hapi');

const menus = require('./model/menus');

const server = new Hapi.Server(+process.env.PORT || 3000, '0.0.0.0');

server.route({
  method: 'GET',
  path: '/menus',
  handler: function (request, reply) {
    reply(menus.readFromSite());
  }
});

server.start((err) => {

  if (err) {
    throw err;
  }
  
  console.log(`Server running at: ${server.info.uri}`);
});