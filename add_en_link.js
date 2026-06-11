const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let updatedCount = 0;

for (const file of files) {
    if (file.startsWith('sitemap')) continue;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('<a href="nav.html">网址导航</a>') && !content.includes('English(EN)')) {
        content = content.replace(
            /<a href="apple-id-shared\.html">免费ID获取<\/a>/g,
            '<a href="apple-id-shared.html">免费ID获取</a>\n                <a href="en/index.html" style="color: #9CA3AF; font-size: 0.85rem;">English(EN)</a>'
        );
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
    }
}

console.log(`\n🎉 Added English language switch to ${updatedCount} HTML files.`);
