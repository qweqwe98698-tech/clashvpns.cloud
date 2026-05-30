const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update navigation
html = html.replace(
    /<nav class="nav-links">\s*<a href="#hero">首页<\/a>\s*<a href="recommend\.html">机场推荐<\/a>\s*<a href="#tutorials">使用教程<\/a>\s*<a href="#faq">常见问题<\/a>\s*<\/nav>/,
    `<nav class="nav-links">
                <a href="#hero">首页</a>
                <a href="recommend.html">机场推荐</a>
                <a href="airport-reviews.html">机场测评</a>
                <a href="#tutorials">使用教程</a>
                <a href="#guides">机场指南</a>
                <a href="#reviews">用户评价</a>
                <a href="#faq">常见问题</a>
            </nav>`
);

// 2. Add Guides and Reviews sections before FAQ
const guidesHTML = `
        <!-- 柳如烟机场指南 -->
        <section id="guides" class="guides section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">柳如烟机场指南</h2>
                    <p class="section-desc">2026 最新科学上网、机场节点、VPN 加速器相关知识与选购建议</p>
                </div>
                <div class="guides-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
                    <a href="guide-2026-airport-recommendation.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">2026 机场推荐指南｜新手如何选择稳定高速的机场节点</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                    <a href="vpn-vs-airport-nodes.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">VPN 加速器和机场节点区别｜日常使用哪个更合适？</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                    <a href="2026-beginner-guide-stable-nodes.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">2026 新手选机场必看：稳定高速节点这样选更省心</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                    <a href="what-is-airport-vpn.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">VPN 机场是什么？为什么越来越多人选择机场节点</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                    <a href="clash-airport-tutorial.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">Clash 机场使用教程：快速导入订阅，一键选择节点</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                    <a href="how-to-choose-stable-airport.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">稳定机场 VPN 怎么选？便宜高速节点选择建议</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                    <a href="longmaoyun-airport-review.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">龙猫云机场值得买吗？套餐、速度和稳定性全面分析</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                    <a href="airport-vs-nordvpn.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">机场节点和 NordVPN、Proton VPN 哪个更值得选择？</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                    <a href="is-free-vpn-worth-it.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">免费 VPN 值得用吗？长期使用前一定要了解这些问题</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                    <a href="vpn-plugin-vs-client.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">VPN 插件还是机场客户端？新手更推荐哪一种</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                    <a href="what-is-ladder-proxy.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">梯子是什么？新手科学上网从这里开始</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                    <a href="vpn-accelerator-vs-airport.html" class="guide-card" style="display: block; padding: 20px; background: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); transition: var(--transition); text-decoration: none; color: var(--text-main);">
                        <h3 style="font-size: 1.1rem; margin-bottom: 10px; line-height: 1.5;">VPN 加速器还是机场节点？日常使用更建议这样选</h3>
                        <p style="font-size: 0.9rem; color: var(--text-light);">阅读全文 &rarr;</p>
                    </a>
                </div>
            </div>
        </section>

        <!-- 用户评价 -->
        <section id="reviews" class="reviews section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">用户评价</h2>
                    <p class="section-desc">真实用户的反馈与推荐</p>
                </div>
                <div class="reviews-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                    <div class="review-card" style="background: var(--bg-gray); padding: 30px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                        <div class="stars" style="color: var(--accent-orange); font-size: 1.2rem; margin-bottom: 15px;">★★★★★</div>
                        <p style="color: var(--text-main); line-height: 1.6; font-style: italic;">"通过这篇指南选了专线节点，晚上看 Netflix 4K 再也不卡了，教程写得非常详细，对新手极其友好！"</p>
                        <div style="margin-top: 20px; display: flex; align-items: center; gap: 10px;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--accent-blue); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">J</div>
                            <span style="color: var(--text-light); font-size: 0.9rem;">- Jason, 外贸从业者</span>
                        </div>
                    </div>
                    <div class="review-card" style="background: var(--bg-gray); padding: 30px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                        <div class="stars" style="color: var(--accent-orange); font-size: 1.2rem; margin-bottom: 15px;">★★★★★</div>
                        <p style="color: var(--text-main); line-height: 1.6; font-style: italic;">"终于明白 VPN 和机场的区别了，按月付买的备用机场很香，再也不用担心大把钱充进去跑路了。"</p>
                        <div style="margin-top: 20px; display: flex; align-items: center; gap: 10px;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--accent-green); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">L</div>
                            <span style="color: var(--text-light); font-size: 0.9rem;">- Li Hua, 自由开发者</span>
                        </div>
                    </div>
                    <div class="review-card" style="background: var(--bg-gray); padding: 30px; border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
                        <div class="stars" style="color: var(--accent-orange); font-size: 1.2rem; margin-bottom: 15px;">★★★★★</div>
                        <p style="color: var(--text-main); line-height: 1.6; font-style: italic;">"以前一直到处找免费节点，天天掉线。按推荐选了个平价套餐，一个月几十块，省下的时间太值了。"</p>
                        <div style="margin-top: 20px; display: flex; align-items: center; gap: 10px;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--accent-orange); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">M</div>
                            <span style="color: var(--text-light); font-size: 0.9rem;">- Mike, 学生</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 常见问题区 -->`;

html = html.replace('<!-- 常见问题区 -->', guidesHTML);

// 3. Update footer
html = html.replace(
    /<!-- Footer 底部区域 -->[\s\S]*<\/footer>/,
    `<!-- Footer 底部区域 -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h2 class="footer-title">柳如烟推荐机场</h2>
                    <p class="footer-desc">专注整理稳定高速、低延迟、多平台支持的机场服务，并提供常见客户端使用教程，帮助用户更快完成订阅导入与节点选择。</p>
                </div>
                <div class="footer-links-group">
                    <h3 class="footer-subtitle">快速导航</h3>
                    <ul class="footer-links">
                        <li><a href="#hero">首页</a></li>
                        <li><a href="recommend.html">机场推荐</a></li>
                        <li><a href="airport-reviews.html">机场测评</a></li>
                        <li><a href="#guides">机场指南</a></li>
                        <li><a href="#faq">常见问题</a></li>
                    </ul>
                </div>
                <div class="footer-links-group">
                    <h3 class="footer-subtitle">关于我们</h3>
                    <ul class="footer-links">
                        <li><a href="sitemap.xml" target="_blank">站点地图</a></li>
                        <li><a href="https://jichangpingce.club/" target="_blank" rel="nofollow noopener">关于我</a></li>
                        <li><a href="#disclaimer">免责声明</a></li>
                    </ul>
                </div>
            </div>
            <div id="disclaimer" class="footer-disclaimer">
                <p><strong>免责声明：</strong>本站内容仅用于信息整理与使用教程分享，不提供任何违法用途支持。用户应遵守所在地区相关法律法规，合理使用网络服务。机场服务具有不确定性，购买前建议优先选择短周期套餐。</p>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 柳如烟推荐机场. All Rights Reserved. 本站仅供技术交流与学习，请自觉遵守当地法律法规。</p>
            </div>
        </div>
    </footer>`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated index.html");
