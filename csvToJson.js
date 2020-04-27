const csv = require('csv-parser')
const fs = require('fs')

const DATA = {};

function getSeason(year) {
  const teams = [];
  return new Promise(resolve => {
    fs.createReadStream(`./seasons/${year}.csv`)
      .pipe(csv())
      .on('data', (data) => {
        teams.push(data);
      })
      .on('end', () => {
        resolve({
          year,
          teams
        });
      });
  });
}

function formatResults(results) {
  return Object.keys(results).reduce((a,opponent) => {
    if (results[opponent]) {
      a[opponent] = results[opponent].split(/\D/).map(Number);
    }
    return a;
  }, {});
}

const first = 1993;
const last = 2018;
const seasonData = [];
for(let year = first; year < last; year++) {
  seasonData.push(getSeason(year));
};

Promise.all(seasonData)
  .then(seasons => {
    seasons.forEach(({ year, teams }) => {
      teams.forEach(results => {
        const name = results['home-away'];
        delete results['home-away'];
        const shortName = Object.keys(results).find(sn => !results[sn]);
        if (!DATA[shortName]) {
          DATA[shortName] = { name, seasons: [], results: {} };
        }
        DATA[shortName].seasons.push(year);
        DATA[shortName].results[year] = formatResults(results);
      });
    });
  })
  .finally(() => {
    const sorted = [];
    Object.keys(DATA).sort().forEach(shortName => sorted[shortName] = DATA[shortName]);
    console.table(sorted);
  });
