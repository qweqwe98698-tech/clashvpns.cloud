const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

try {
  const filePath = 'C:/Users/user/.gemini/antigravity/brain/62d6374a-bf07-46d7-93cc-d007be66906e/.system_generated/steps/197/content.md';
  const html = fs.readFileSync(filePath, 'utf8');
  
  const $ = cheerio.load(html);
  const clients = [];

  // Find all rows in Ninja Tables
  $('table tbody tr').each((i, el) => {
    const tds = $(el).find('td');
    if (tds.length >= 8) {
      const name = $(tds[0]).text().trim();
      
      const osList = [];
      $(tds[4]).find('a').each((j, a) => {
        osList.push($(a).text().trim());
      });

      const protocolList = [];
      $(tds[5]).find('a').each((j, a) => {
        protocolList.push($(a).text().trim());
      });

      const directLink = $(tds[6]).text().trim();
      const githubLink = $(tds[7]).text().trim();

      // Fallback for download link
      let downloadLink = githubLink || directLink;
      
      // If we got a valid client, add it to our array
      if (name && osList.length > 0) {
        // Icon mapping based on OS
        let icon = '🖥️';
        if (osList.includes('Android') || osList.includes('iOS')) icon = '📱';
        if (osList.includes('Router')) icon = '🛜';
        if (name.toLowerCase().includes('clash')) icon = '🐱';
        if (name.toLowerCase().includes('v2ray')) icon = '🚀';
        
        clients.push({
          name,
          os: osList,
          protocols: protocolList,
          downloadLink,
          icon
        });
      }
    }
  });

  // Filter out duplicates if any
  const uniqueClients = [];
  const names = new Set();
  for (const c of clients) {
    if (!names.has(c.name)) {
      names.add(c.name);
      uniqueClients.push(c);
    }
  }

  console.log(`Found ${uniqueClients.length} clients.`);

  // Write to src/data/clients.json
  const outDir = path.join(__dirname, '../src/data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  
  fs.writeFileSync(
    path.join(outDir, 'clients.json'), 
    JSON.stringify(uniqueClients, null, 2), 
    'utf8'
  );
  
  console.log('Successfully saved to src/data/clients.json');
} catch (error) {
  console.error('Error scraping:', error);
}
