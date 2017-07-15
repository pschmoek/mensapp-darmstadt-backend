const Hapi = require('hapi');

const menus = require('./core/menus');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.route({
  method: 'GET',
  path: '/mensas',
  handler: function (request, reply) {
    reply(menus.getMensas());
  }
});

server.route({
  method: 'GET',
  path: '/mensas/{mensaId}/menus/{date}',
  handler: function (request, reply) {
    reply(menus.getMenu(request.params.mensaId, request.params.date))
  }
});

server.route({
  method: 'GET',
  path: '/mensas/{mensaId}/menus',
  handler: function (request, reply) {
    reply(menus.getMenu(request.params.mensaId));
  }
});

server.route({
  method: 'GET',
  path: '/meals',
  handler: function (request, reply) {
    reply(menus.getMeals());
  }
});

server.route({
  method: 'GET',
  path: '/meals/{date}',
  handler: function(request, reply) {
    reply(menus.getMeals(request.params.date));
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