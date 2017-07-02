const Hapi = require('hapi');

const menus = require('./core/menus');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.route({
  method: 'GET',
  path: '/menus',
  handler: function (request, reply) {
    reply(menus.readFromSite());
  }
});

server.on('request-error', (request, err) => {
  console.log(err);
});

server.start(() => {
  console.log(`Server running at: ${server.info.uri}`);
});