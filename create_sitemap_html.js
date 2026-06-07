const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const headerEndIndex = indexHtml.indexOf('<main>');
const footerStartIndex = indexHtml.indexOf('<!-- Footer 底部区域 -->');
const header = indexHtml.substring(0, headerEndIndex) + '<main style="padding-top: 100px;">';
const footer = indexHtml.substring(footerStartIndex).replace('sitemap.xml', 'sitemap.html'); // ensure it points to html

// Read articles from update_guides.js
const guidesCode = fs.readFileSync('update_guides.js', 'utf8');
const match = guidesCode.match(/const articles = (\[[\s\S]*?\]);/);
let articles = [];
if (match) {
    articles = eval(match[1]);
}

let articlesHtml = '';
let sitemapXmlUrls = '';
let rssXmlItems = '';
const domain = 'https://clashvpns.cloud';
const today = new Date().toISOString().split('T')[0];

articles.forEach(article => {
    articlesHtml += `<li><a href="${article.link}" style="color: var(--text-main); text-decoration: none;">${article.title}</a></li>\n                    `;
    
    sitemapXmlUrls += `
    <url>
        <loc>${domain}/${article.link}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>`;
    
    rssXmlItems += `
    <item>
        <title><![CDATA[${article.title}]]></title>
        <link>${domain}/${article.link}</link>
        <description><![CDATA[${article.summary}]]></description>
        <pubDate>${new Date().toUTCString()}</pubDate>
        <guid>${domain}/${article.link}</guid>
    </item>`;

});

// Update sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${domain}/index.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${domain}/recommend.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${domain}/airport-reviews.html</loc>
        <lastmod>${today}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>${sitemapXmlUrls}
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapXml, 'utf8');

// Generate RSS Feed
const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>柳如烟 - 稳定机场推荐</title>
        <link>${domain}</link>
        <description>最新稳定高速机场推荐与测评，Clash/Shadowrocket教程</description>
        <atom:link href="${domain}/feed.xml" rel="self" type="application/rss+xml" />
        ${rssXmlItems}
    </channel>
</rss>`;
fs.writeFileSync('feed.xml', rssFeed, 'utf8');


const content = `
    <section class="section container">
        <div class="section-header">
            <h2 class="section-title">站点地图 (Sitemap)</h2>
            <p class="section-desc">快速查找柳如烟推荐机场的所有页面与内容资源。</p>
        </div>
        
        <div style="background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); padding: 40px; border-radius: var(--radius-xl); border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);">
            
            <div style="margin-bottom: 40px;">
                <h3 style="font-size: 1.2rem; color: var(--primary-color); margin-bottom: 15px; border-bottom: 2px solid var(--accent-blue); padding-bottom: 10px; display: inline-block;">基础导航</h3>
                <ul style="list-style: none; padding-left: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                    <li><a href="index.html" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;">首页</a></li>
                    <li><a href="recommend.html" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;">机场推荐页</a></li>
                    <li><a href="airport-reviews.html" style="color: var(--text-main); text-decoration: none; display: flex; align-items: center; gap: 8px;">机场测评页</a></li>
                </ul>
            </div>

            <div style="margin-bottom: 40px;">
                <h3 style="font-size: 1.2rem; color: var(--primary-color); margin-bottom: 15px; border-bottom: 2px solid var(--accent-blue); padding-bottom: 10px; display: inline-block;">柳如烟机场指南</h3>
                <ul style="list-style: none; padding-left: 0; display: grid; grid-template-columns: 1fr; gap: 15px;">
                    ${articlesHtml}
                </ul>
            </div>

            <div>
                <h3 style="font-size: 1.2rem; color: var(--primary-color); margin-bottom: 15px; border-bottom: 2px solid var(--accent-blue); padding-bottom: 10px; display: inline-block;">客户端使用教程</h3>
                <ul style="list-style: none; padding-left: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                    <li><a href="clash-verge-rev.html" style="color: var(--text-main); text-decoration: none;">Clash Verge Rev 教程</a></li>
                    <li><a href="shadowrocket.html" style="color: var(--text-main); text-decoration: none;">Shadowrocket 教程</a></li>
                    <li><a href="stash.html" style="color: var(--text-main); text-decoration: none;">Stash 教程</a></li>
                    <li><a href="v2rayn.html" style="color: var(--text-main); text-decoration: none;">v2rayN 教程</a></li>
                </ul>
            </div>
            
        </div>
    </section>
</main>
`;

const fullHtml = header.replace('<title>', '<title>站点地图 - ') + content + footer;
fs.writeFileSync('sitemap.html', fullHtml, 'utf8');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('sitemap.xml')) {
        content = content.replace(/href="sitemap\.xml"/g, 'href="sitemap.html"');
        content = content.replace(/href="\/sitemap\.xml"/g, 'href="sitemap.html"');
        fs.writeFileSync(file, content, 'utf8');
    }
}
console.log("Done generating sitemap.html and sitemap.xml");
