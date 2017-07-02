const Hapi = require('hapi');

const menus = require('./core/menus');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.route({
  method: 'GET',
  path: '/mensas',
  handler: function (request, reply) {
    reply(menus.getAllMensas());
  }
});

server.route({
  method: 'GET',
  path: '/mensas/{mensaId}/menuItems/{date}',
  handler: function (request, reply) {
    reply(menus.getMensasMenuItemsOn(request.params.mensaId, request.params.date))
  }
});

server.route({
  method: 'POST',
  path: '/imports',
  handler: function (request, reply) {
    reply(menus.importMenus());
  }
})

server.on('request-error', (request, err) => {
  console.log(err);
});

server.start(() => {
  console.log(`Server running at: ${server.info.uri}`);
});