const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const headerEndIndex = indexHtml.indexOf('<main>');
const footerStartIndex = indexHtml.indexOf('<!-- Footer 底部区域 -->');

const header = indexHtml.substring(0, headerEndIndex) + '<main style="padding-top: 100px;">';
const footer = indexHtml.substring(footerStartIndex).replace('sitemap.xml', 'sitemap.html'); // ensure it points to html

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
                </ul>
            </div>

            <div style="margin-bottom: 40px;">
                <h3 style="font-size: 1.2rem; color: var(--primary-color); margin-bottom: 15px; border-bottom: 2px solid var(--accent-blue); padding-bottom: 10px; display: inline-block;">机场专属评测页</h3>
                <ul style="list-style: none; padding-left: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                    <li><a href="dageyun.html" style="color: var(--text-main); text-decoration: none;">大哥云</a></li>
                    <li><a href="guangsuyun.html" style="color: var(--text-main); text-decoration: none;">光速云</a></li>
                    <li><a href="longmaoyun.html" style="color: var(--text-main); text-decoration: none;">龙猫云</a></li>
                    <li><a href="qingyunti.html" style="color: var(--text-main); text-decoration: none;">青云梯</a></li>
                    <li><a href="feimaoyun.html" style="color: var(--text-main); text-decoration: none;">肥猫云</a></li>
                    <li><a href="yiyunti.html" style="color: var(--text-main); text-decoration: none;">一云梯</a></li>
                    <li><a href="naiyun.html" style="color: var(--text-main); text-decoration: none;">奈云机场</a></li>
                    <li><a href="gatern.html" style="color: var(--text-main); text-decoration: none;">Gatern 机场</a></li>
                    <li><a href="shunyun.html" style="color: var(--text-main); text-decoration: none;">瞬云机场</a></li>
                </ul>
            </div>

            <div style="margin-bottom: 40px;">
                <h3 style="font-size: 1.2rem; color: var(--primary-color); margin-bottom: 15px; border-bottom: 2px solid var(--accent-blue); padding-bottom: 10px; display: inline-block;">柳如烟机场指南</h3>
                <ul style="list-style: none; padding-left: 0; display: grid; grid-template-columns: 1fr; gap: 15px;">
                    <li><a href="guide-2026-airport-recommendation.html" style="color: var(--text-main); text-decoration: none;">2026 机场推荐指南｜新手如何选择稳定高速的机场节点</a></li>
                    <li><a href="vpn-vs-airport-nodes.html" style="color: var(--text-main); text-decoration: none;">VPN 加速器和机场节点区别｜日常使用哪个更合适？</a></li>
                    <li><a href="2026-beginner-guide-stable-nodes.html" style="color: var(--text-main); text-decoration: none;">2026 新手选机场必看：稳定高速节点这样选更省心</a></li>
                    <li><a href="what-is-airport-vpn.html" style="color: var(--text-main); text-decoration: none;">VPN 机场是什么？为什么越来越多人选择机场节点</a></li>
                    <li><a href="clash-airport-tutorial.html" style="color: var(--text-main); text-decoration: none;">Clash 机场使用教程：快速导入订阅，一键选择节点</a></li>
                    <li><a href="how-to-choose-stable-airport.html" style="color: var(--text-main); text-decoration: none;">稳定机场 VPN 怎么选？便宜高速节点选择建议</a></li>
                    <li><a href="longmaoyun-airport-review.html" style="color: var(--text-main); text-decoration: none;">龙猫云机场值得买吗？套餐、速度和稳定性全面分析</a></li>
                    <li><a href="airport-vs-nordvpn.html" style="color: var(--text-main); text-decoration: none;">机场节点和 NordVPN、Proton VPN 哪个更值得选择？</a></li>
                    <li><a href="is-free-vpn-worth-it.html" style="color: var(--text-main); text-decoration: none;">免费 VPN 值得用吗？长期使用前一定要了解这些问题</a></li>
                    <li><a href="vpn-plugin-vs-client.html" style="color: var(--text-main); text-decoration: none;">VPN 插件还是机场客户端？新手更推荐哪一种</a></li>
                    <li><a href="what-is-ladder-proxy.html" style="color: var(--text-main); text-decoration: none;">梯子是什么？新手科学上网从这里开始</a></li>
                    <li><a href="vpn-accelerator-vs-airport.html" style="color: var(--text-main); text-decoration: none;">VPN 加速器还是机场节点？日常使用更建议这样选</a></li>
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

// Now update all existing html files to replace "sitemap.xml" with "sitemap.html"
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('sitemap.xml')) {
        content = content.replace(/href="sitemap\.xml"/g, 'href="sitemap.html"');
        content = content.replace(/href="\/sitemap\.xml"/g, 'href="sitemap.html"');
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
}

console.log("Done generating sitemap.html");
