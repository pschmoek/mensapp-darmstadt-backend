const Hapi = require('hapi');

const menus = require('./model/menus');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.route({
  method: 'GET',
  path: '/menus',
  handler: async function (request, reply) {
    const menusFromSite = await menus.readFromSite();
    reply(menusFromSite);
  }
})

server.start((err) => {

  if (err) {
    throw err;
  }
  
  console.log(`Server running at: ${server.info.uri}`);
});