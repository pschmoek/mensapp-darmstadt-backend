const parseSite = require('./parse-site');

module.exports = {
  readFromSite() {
    const urlMenuPairs = [
      {
        url: 'http://studierendenwerkdarmstadt.de/hochschulgastronomie/speisekarten/stadtmitte/',
        name: 'Stadtmitte'
      },
      {
        url: 'http://studierendenwerkdarmstadt.de/hochschulgastronomie/speisekarten/lichtwiese/',
        name: 'Lichtwiese'
      },
      {
        url: 'http://studierendenwerkdarmstadt.de/hochschulgastronomie/speisekarten/schoefferstrasse/',
        name: 'Schöfferstraße'
      },
      {
        url: 'http://studierendenwerkdarmstadt.de/hochschulgastronomie/speisekarten/dieburg/',
        name: 'Dieburg'
      },
      {
        url: 'http://studierendenwerkdarmstadt.de/hochschulgastronomie/speisekarten/haardtring/',
        name: 'Haardtring'
      }
    ];

    return Promise.all(urlMenuPairs.map(p => parseSite(p)));
  }
}
