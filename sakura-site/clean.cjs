const fs = require('fs');
let data = JSON.parse(fs.readFileSync('src/data/airports.json', 'utf8'));
data = data.map(a => {
  if (/^\d+\./.test(a.name)) {
    a.name = a.name.replace(/^\d+\./, '').trim();
  }
  return a;
});
fs.writeFileSync('src/data/airports.json', JSON.stringify(data, null, 2));
console.log('Cleaned airports.json');
