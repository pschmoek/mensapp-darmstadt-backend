const mensa = require('./mensa');
const item = require('./item');

module.exports = {
  async save(menus) {
    const distinctMensas = new Map();
    const distinctItems = new Map();

    for (const menu of menus) {
      for (const day of menu.days) {
        for (const item  of day.items) {
          distinctMensas.set(menu.name+item.location, {
            location: menu.name,
            subLocation: item.location
          });
          distinctItems.set(item.title+item.price, {
            title: item.title,
            price: item.price.split(' ')[0].replace(',', '.')
          });
        }
      }
    }

    const items = Array.from(distinctItems.values());
    const mensas = Array.from(distinctMensas.values());

    return {
      mensas: await mensa.addOrGetAll(mensas),
      items: await item.addOrGetAll(items)
    };
  }
}
