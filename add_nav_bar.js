const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // For the header nav
    const headerNavRegex = /<a href="airport-reviews\.html">机场测评<\/a>\s*(?!<a href="nav\.html">)/;
    if (headerNavRegex.test(content)) {
        content = content.replace(
            /<a href="airport-reviews\.html">机场测评<\/a>/g,
            `<a href="airport-reviews.html">机场测评</a>\n                <a href="nav.html">网址导航</a>`
        );
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`Updated: ${file}`);
    }
}

console.log(`\n🎉 Navbar updated in ${updatedCount} files.`);
