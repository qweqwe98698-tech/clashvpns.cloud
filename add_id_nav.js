const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let modified = false;

    // Header updates
    if (content.includes('<a href="nav.html">网址导航</a>') && !content.includes('<a href="apple-id-shared.html">免费ID获取</a>')) {
        content = content.replace(
            /<a href="nav\.html">网址导航<\/a>\s*(?!<a href="apple-id-shared\.html">)/g,
            '<a href="nav.html">网址导航</a>\n                <a href="apple-id-shared.html">免费ID获取</a>'
        );
        
        // Footer update specifically
        content = content.replace(
            /<li><a href="nav\.html">网址导航<\/a><\/li>\s*(?!<li><a href="apple-id-shared\.html">)/g,
            '<li><a href="nav.html">网址导航</a></li>\n                        <li><a href="apple-id-shared.html">免费ID获取</a></li>'
        );

        // Sitemap body update specifically
        content = content.replace(
            /<li><a href="nav\.html" style="color: var\(--text-main\); text-decoration: none; display: flex; align-items: center; gap: 8px;">网址导航<\/a><\/li>/g,
            '<li><a href="nav.html" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;">网址导航</a></li>\n                    <li><a href="apple-id-shared.html" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;">免费ID获取</a></li>'
        );

        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`Updated: ${file}`);
    }
}

console.log(`\n🎉 Navbar updated in ${updatedCount} files.`);
