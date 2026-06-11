const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix the footer links if it got wrapped incorrectly
    const badFooterLink = /<li><a href="airport-reviews\.html">机场测评<\/a>\s*<a href="nav\.html">网址导航<\/a><\/li>/g;
    
    if (badFooterLink.test(content)) {
        content = content.replace(
            badFooterLink,
            `<li><a href="airport-reviews.html">机场测评</a></li>\n                        <li><a href="nav.html">网址导航</a></li>`
        );
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`Fixed footer in: ${file}`);
    }
}

console.log(`\n🎉 Footer fixed in ${updatedCount} files.`);
