const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    const navMatch = content.match(/<nav class="nav-links">([\s\S]*?)<\/nav>/);
    if (navMatch) {
        let navContent = navMatch[1];
        // Remove the long, unnecessary links that are causing text wrap
        const originalNav = navContent;
        navContent = navContent.replace(/<a href="[^"]*#(tutorials|guides|reviews|faq)"[^>]*>.*?<\/a>\s*/g, '');
        
        if (originalNav !== navContent) {
            content = content.replace(navMatch[0], `<nav class="nav-links">${navContent}</nav>`);
            fs.writeFileSync(filePath, content, 'utf8');
            updatedCount++;
        }
    }
}

console.log(`🎉 Removed redundant nav links from ${updatedCount} files.`);
