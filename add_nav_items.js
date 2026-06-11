const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Header nav links
    if (content.includes('<a href="airport-reviews.html">机场测评</a>') && !content.includes('<a href="download.html">客户端下载</a>')) {
        content = content.replace(
            /<a href="airport-reviews\.html">机场测评<\/a>\s*(?!<a href="download\.html">)/g,
            '<a href="airport-reviews.html">机场测评</a>\n                <a href="download.html">客户端下载</a>\n                <a href="free-nodes.html">免费节点</a>'
        );
        modified = true;
    }

    // Footer nav links
    if (content.includes('<li><a href="airport-reviews.html">机场测评</a></li>') && !content.includes('<li><a href="download.html">客户端下载</a></li>')) {
        content = content.replace(
            /<li><a href="airport-reviews\.html">机场测评<\/a><\/li>\s*(?!<li><a href="download\.html">)/g,
            '<li><a href="airport-reviews.html">机场测评</a></li>\n                        <li><a href="download.html">客户端下载</a></li>\n                        <li><a href="free-nodes.html">免费节点</a></li>'
        );
        modified = true;
    }

    // Sitemap specific link addition (if any)
    if (file === 'sitemap.html' && content.includes('<li><a href="airport-reviews.html"') && !content.includes('<li><a href="download.html"')) {
        content = content.replace(
            /<li><a href="airport-reviews\.html"([^>]*)>机场测评页<\/a><\/li>/g,
            '<li><a href="airport-reviews.html"$1>机场测评页</a></li>\n                    <li><a href="download.html"$1>客户端下载</a></li>\n                    <li><a href="free-nodes.html"$1>免费节点</a></li>'
        );
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
    }
}

console.log(`\n🎉 Navbar & Footer updated in ${updatedCount} files.`);
