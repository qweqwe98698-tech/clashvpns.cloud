const fs = require('fs');
const path = require('path');

const dir = __dirname;
// Only modify HTML files in the root directory (Chinese site)
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const navMatch = content.match(/<nav class="nav-links">([\s\S]*?)<\/nav>/);
    if (navMatch) {
        let navContent = navMatch[1];
        
        // If it doesn't already have tutorials, insert them
        if (!navContent.includes('使用教程')) {
            const prefix = file === 'index.html' ? '' : 'index.html';
            const extraLinks = `
                <a href="${prefix}#tutorials">使用教程</a>
                <a href="${prefix}#guides">机场指南</a>
                <a href="${prefix}#reviews">用户评价</a>
                <a href="${prefix}#faq">常见问题</a>`;
            
            // Insert the extraLinks before the closing </nav> tag
            // but in navContent, we just append it
            content = content.replace(navMatch[0], `<nav class="nav-links">${navContent}${extraLinks}\n            </nav>`);
            fs.writeFileSync(filePath, content, 'utf8');
            updatedCount++;
        }
    }
}

console.log(`✅ Successfully restored missing nav links in ${updatedCount} HTML files.`);
