const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'sitemap.html');
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('<li><a href="nav.html" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;">网址导航</a></li>')) {
    content = content.replace(
        '<li><a href="airport-reviews.html" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;">机场测评页</a></li>',
        '<li><a href="airport-reviews.html" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;">机场测评页</a></li>\n                    <li><a href="nav.html" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;">网址导航</a></li>'
    );
    fs.writeFileSync(file, content, 'utf8');
    console.log('Added nav.html to sitemap body.');
} else {
    console.log('Already added.');
}
