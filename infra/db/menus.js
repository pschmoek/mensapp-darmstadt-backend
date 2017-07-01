const mensa = require('./mensa');

module.exports = {
  save(menus) {
    const distinctMensas = new Map();
    for (const menu of menus) {
      for (const day of menu.days) {
        for (const item  of day.items) {
          distinctMensas.set(menu.name+item.location, {
            location: menu.name,
            subLocation: item.location
          });
        }
      }
    }

    const mensas = Array.from(distinctMensas.values());

    return mensa.saveAll(mensas);
  }
}
