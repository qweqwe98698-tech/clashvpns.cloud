const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let fixedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if there's any duplication
    const duplicateRegex = /(<a href="nav\.html">\s*网址导航\s*<\/a>\s*){2,}/g;
    const footerDuplicateRegex = /(<li>\s*<a href="nav\.html">\s*网址导航\s*<\/a>\s*<\/li>\s*){2,}/g;
    const mixedDuplicateRegex = /(<a href="nav\.html">\s*网址导航\s*<\/a>\s*|<li>\s*<a href="nav\.html">\s*网址导航\s*<\/a>\s*<\/li>\s*){2,}/g;

    let modified = false;

    // A brute force cleanup: First remove all nav.html links next to airport-reviews.html
    // And then add exactly ONE back.

    // 1. Clean up header:
    // Remove any number of <a href="nav.html">网址导航</a> that appear right after 机场测评
    content = content.replace(/<a href="airport-reviews\.html">机场测评<\/a>(\s*<a href="nav\.html">网址导航<\/a>)+/g, '<a href="airport-reviews.html">机场测评</a>');
    
    // Add one back in the header
    content = content.replace(/<a href="airport-reviews\.html">机场测评<\/a>/g, '<a href="airport-reviews.html">机场测评</a>\n                <a href="nav.html">网址导航</a>');

    // Wait, the footer structure is:
    // <li><a href="airport-reviews.html">机场测评</a></li>
    // <li><a href="nav.html">网址导航</a></li>
    // The previous replace for header might have added <a href="nav.html">网址导航</a> inside the <li> or outside it.
    
    // Let's remove ALL nav.html references completely to be safe and start fresh.
    let cleanContent = fs.readFileSync(filePath, 'utf8');
    // Remove header nav.html
    cleanContent = cleanContent.replace(/\s*<a href="nav\.html">网址导航<\/a>/g, '');
    // Remove footer nav.html inside li
    cleanContent = cleanContent.replace(/\s*<li><a href="nav\.html">网址导航<\/a><\/li>/g, '');
    // Remove footer nav.html with extra styles (from sitemap)
    cleanContent = cleanContent.replace(/\s*<li><a href="nav\.html" style="color: var\(--text-main\); text-decoration: none; display: flex; align-items: center; gap: 8px;">网址导航<\/a><\/li>/g, '');

    // Now cleanly insert them
    
    // Header insert (we can identify header because it doesn't have <li> around it)
    cleanContent = cleanContent.replace(
        /<a href="airport-reviews\.html">机场测评<\/a>/g,
        '<a href="airport-reviews.html">机场测评</a>\n                <a href="nav.html">网址导航</a>'
    );
    
    // But wait! If the original had <li><a href="airport-reviews.html">机场测评</a></li>, the above replace would make it:
    // <li><a href="airport-reviews.html">机场测评</a>
    //                 <a href="nav.html">网址导航</a></li>
    
    // Which is wrong for the footer. So we should fix the footer back to proper <li> format.
    cleanContent = cleanContent.replace(
        /<li><a href="airport-reviews\.html">机场测评<\/a>\s*<a href="nav\.html">网址导航<\/a><\/li>/g,
        '<li><a href="airport-reviews.html">机场测评</a></li>\n                        <li><a href="nav.html">网址导航</a></li>'
    );

    // Specifically for sitemap.html which has a special style for the body links
    if (file === 'sitemap.html') {
        // Find the specific styled airport-reviews link
        cleanContent = cleanContent.replace(
            /<li><a href="airport-reviews\.html" style="color: var\(--text-main\); text-decoration: none; display: flex; align-items: center; gap: 8px;">机场测评页<\/a><\/li>/g,
            '<li><a href="airport-reviews.html" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;">机场测评页</a></li>\n                    <li><a href="nav.html" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;">网址导航</a></li>'
        );
    }

    fs.writeFileSync(filePath, cleanContent, 'utf8');
    fixedCount++;
}

console.log(`\n🎉 Duplicates cleaned up in ${fixedCount} files.`);
