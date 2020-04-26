const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('./seasons/93-94.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
  });
