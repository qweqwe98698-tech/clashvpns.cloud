const fs = require('fs');

const domain = "https://yourdomain.com"; // Replace with actual domain when known, or generic

const titles = [
    "guide-2026-airport-recommendation",
    "vpn-vs-airport-nodes",
    "2026-beginner-guide-stable-nodes",
    "what-is-airport-vpn",
    "clash-airport-tutorial",
    "how-to-choose-stable-airport",
    "longmaoyun-airport-review",
    "airport-vs-nordvpn",
    "is-free-vpn-worth-it",
    "vpn-plugin-vs-client",
    "what-is-ladder-proxy",
    "vpn-accelerator-vs-airport"
];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${domain}/index.html</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${domain}/recommend.html</loc>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${domain}/qingyunti.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${domain}/naiyun.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${domain}/gatern.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>${domain}/shunyun.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
`;

for (const t of titles) {
    sitemap += `    <url>
        <loc>${domain}/${t}.html</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>\n`;
}

sitemap += `</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap, 'utf8');

const robots = `User-agent: *
Allow: /

Sitemap: ${domain}/sitemap.xml
`;

fs.writeFileSync('robots.txt', robots, 'utf8');

console.log("Generated sitemap.xml and robots.txt");
