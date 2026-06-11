const fs = require('fs');
const path = require('path');
const https = require('https');

// A reliable open source aggregator of free nodes
// This repo aggregates multiple free node sources every few hours.
const SOURCE_URL = 'https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt';

console.log("Fetching free nodes from aggregator...");

https.get(SOURCE_URL, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (data && data.length > 100) {
            const filePath = path.join(__dirname, 'free_sub.txt');
            fs.writeFileSync(filePath, data, 'utf8');
            console.log(`Successfully updated free_sub.txt (Length: ${data.length})`);
        } else {
            console.error("Failed to fetch valid node data.");
            process.exit(1);
        }
    });
}).on('error', (err) => {
    console.error("Error fetching nodes:", err.message);
    process.exit(1);
});
