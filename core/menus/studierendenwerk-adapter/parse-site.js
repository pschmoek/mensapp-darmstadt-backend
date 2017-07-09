const readSite = require('../../../infra/read-site');
const parseText = require('./parse-text');

module.exports = async function (menuConfig) {
  const html = await readSite(menuConfig.url);
  try {
    const daySections = html.match(/<section class="fmc-day.*">([\s\S]*?)<\/section>/g);
    const days = daySections.map(dayHtml => {
      const headParsed = dayHtml
        .match(/class="fmc-head">([\s\S^]*?)<span class="light">([\s\S]*?)<\/span>/);
      const itemsParsed = dayHtml
        .match(/ul class="fmc-items">([\s\S]*?)<\/ul>/)[1]
        .match(/<li class="fmc-item".*?>([\s\S]*?)<\/li>/g)
        .map(itemParsed => {
          return {
            title: parseText(itemParsed.match(/span class="fmc-item-title">([\s\S]*?)<\/span>/)[1]),
            location: parseText(itemParsed.match(/span class="fmc-item-location">([\s\S]*?)<\/span>/)[1]),
            price: parseText(itemParsed.match(/span class="fmc-item-price">([\s\S]*?)<\/span>/)[1])
          }
        });

      return {
        dayOfWeek: parseText(headParsed[1]),
        date: parseText(headParsed[2]),
        items: itemsParsed
      };
    });

    return {
      name: menuConfig.name,
      days: days
    }
  }
  catch(e) {
    console.error('Error reading menus for ' + menuConfig.name, e);
    return {
      name: menuConfig.name,
      days: []
    }
  }
}
