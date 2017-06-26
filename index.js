const readSite = require('./read-site');
const url = 'http://studierendenwerkdarmstadt.de/hochschulgastronomie/speisekarten/stadtmitte/';

readSite(url).then(html => {
  const result = html.match(/<section class="fmc-day.*">([\s\S]*?)<\/section>/g)
    .map(dayHtml => {
      const headParsed = dayHtml
        .match(/class="fmc-head">([\s\S^]*?)<span class="light">([\s\S]*?)<\/span>/);
      const itemsParsed = dayHtml
        .match(/ul class="fmc-items">([\s\S]*?)<\/ul>/)[1]
        .match(/<li class="fmc-item".*?>([\s\S]*?)<\/li>/g)
        .map(itemParsed => {
          return {
            title: (itemParsed.match(/span class="fmc-item-title">([\s\S]*?)<\/span>/)[1]+'').trim().replace(/\s+/g, ' '),
            location: (itemParsed.match(/span class="fmc-item-location">([\s\S]*?)<\/span>/)[1]+'').trim().replace(/\s+/g, ' '),
            price: (itemParsed.match(/span class="fmc-item-price">([\s\S]*?)<\/span>/)[1]+'').trim().replace(/\s+/g, ' ')
          }
        });

      return {
        day: (headParsed[1]+'').trim().replace(/\s+/g, ' '),
        date: (headParsed[2]+'').trim().replace(/\s+/g, ' '),
        items: itemsParsed
      };
    });

  console.log(result);
});
