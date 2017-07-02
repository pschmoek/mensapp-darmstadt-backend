const mensaDb = require('./mensa');
const mealDb = require('./meal');
const importDb = require('./import');
const menuItemDb = require('./menu-item');

function addOrGet(map, key, value) {
  const val = map.get(key);
  if (val) {
    return val;
  }

  map.set(key, value);

  return value;
}

module.exports = {
  async save(menus, startMoment) {
    const distinctMensas = new Map();
    const distinctMeals = new Map();
    const menuItems = [];

    for (const menu of menus) {
      for (const day of menu.days) {
        for (const item  of day.items) {
          let mensa = addOrGet(distinctMensas, menu.name+item.location, {
            location: menu.name,
            subLocation: item.location
          });

          let meal = addOrGet(distinctMeals, item.title, {
            title: item.title,
          });

          menuItems.push({
            date: day.date,
            price: item.price.split(' ')[0].replace(',', '.'),
            meal: meal,
            mensa: mensa
          });
        }
      }
    }

    await mealDb.sync(Array.from(distinctMeals.values()));
    await mensaDb.sync(Array.from(distinctMensas.values()));
    const endMoment = new Date().toISOString();
    const importEntity = await importDb.createImport(startMoment, endMoment);
    await menuItemDb.addAll(menuItems, importEntity);

    return {
      import: importEntity,
      mensas: distinctMensas.size,
      meals: distinctMeals.size,
      menuItems: menuItems.length
    }
  }
}
