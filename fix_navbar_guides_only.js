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
        
        // Remove the 4 anchor links regardless of whether they have a prefix
        navContent = navContent.replace(/<a href="[^"]*#(tutorials|guides|reviews|faq)"[^>]*>.*?<\/a>\s*/g, '');
        
        // Remove the existing guides.html link if it was already added
        navContent = navContent.replace(/<a href="[^"]*guides\.html">机场指南<\/a>\s*/g, '');

        // Now inject only guides.html right after English(EN)
        const prefix = file === 'index.html' ? '' : ''; // Actually, we can just use relative paths 'guides.html'
        
        const guidesLink = `\n                <a href="guides.html">机场指南</a>`;
        
        // Let's find English(EN) and insert after it
        const englishMatch = navContent.match(/<a href="en\/index\.html"[^>]*>English\(EN\)<\/a>/);
        if (englishMatch) {
            navContent = navContent.replace(englishMatch[0], englishMatch[0] + guidesLink);
        } else {
            navContent = navContent + guidesLink;
        }

        content = content.replace(navMatch[0], `<nav class="nav-links">${navContent}\n            </nav>`);
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
    }
}

console.log(`✅ Refactored navbar in ${updatedCount} HTML files.`);
