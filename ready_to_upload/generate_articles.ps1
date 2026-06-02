$titles = @(
    "2026 机场推荐指南｜新手如何选择稳定高速的机场节点",
    "VPN 加速器和机场节点区别｜日常使用哪个更合适？",
    "2026 新手选机场必看：稳定高速节点这样选更省心",
    "VPN 机场是什么？为什么越来越多人选择机场节点",
    "Clash 机场使用教程：快速导入订阅，一键选择节点",
    "稳定机场 VPN 怎么选？便宜高速节点选择建议",
    "龙猫云机场值得买吗？套餐、速度和稳定性全面分析",
    "机场节点和 NordVPN、Proton VPN 哪个更值得选择？",
    "免费 VPN 值得用吗？长期使用前一定要了解这些问题",
    "VPN 插件还是机场客户端？新手更推荐哪一种",
    "梯子是什么？新手科学上网从这里开始",
    "VPN 加速器还是机场节点？日常使用更建议这样选"
)

$filenames = @(
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
)

$template = @"
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - 柳如烟推荐机场</title>
    <meta name="description" content="{title}，提供2026年最新科学上网、机场节点、VPN 加速器相关的详细指南与评测。">
    <meta name="geo.region" content="CN" />
    <meta name="geo.placename" content="China" />
    <link rel="icon" href="logo.png" type="image/png">
    <link rel="stylesheet" href="style.css">
    <style>
        .article-container { max-width: 800px; margin: 120px auto 60px; padding: 50px; background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 10px 30px -5px rgba(0,0,0,0.02); }
        .article-title { font-size: 2.2rem; margin-bottom: 15px; color: var(--primary-color); font-weight: 800; }
        .article-meta { color: var(--text-light); margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid var(--border-color); font-size: 0.95rem; display: flex; gap: 20px; }
        .article-content h2 { margin-top: 40px; margin-bottom: 20px; color: var(--text-main); font-size: 1.5rem; position: relative; padding-left: 14px; }
        .article-content h2::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 20px; background-color: var(--accent-blue); border-radius: 2px; }
        .article-content p { margin-bottom: 16px; color: var(--text-light); line-height: 1.8; font-size: 1.05rem; }
        .internal-links { margin-top: 50px; padding: 20px; background: var(--bg-gray); border-radius: var(--radius-md); }
        .internal-links h3 { margin-bottom: 15px; font-size: 1.2rem; color: var(--text-main); }
        .internal-links ul { list-style: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .internal-links li { margin-bottom: 5px; }
        .internal-links a { color: var(--accent-blue); text-decoration: none; font-size: 0.95rem; }
        .internal-links a:hover { text-decoration: underline; }
        @media (max-width: 768px) { .article-container { margin-top: 100px; padding: 30px 20px; } .article-title { font-size: 1.8rem; } .internal-links ul { grid-template-columns: 1fr; } }
    </style>
</head>
<body style="background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);">
    <header class="navbar">
        <div class="container nav-container">
            <div class="nav-logo">
                <a href="index.html"><img src="logo.png" alt="柳如烟推荐机场 Logo" class="logo-img">柳如烟推荐机场</a>
            </div>
            <nav class="nav-links">
                <a href="index.html#hero">首页</a>
                <a href="recommend.html">机场推荐</a>
                <a href="airport-reviews.html">机场测评</a>
                <a href="index.html#guides">指南文章</a>
                <a href="index.html#faq">常见问题</a>
            </nav>
            <button class="menu-toggle" aria-label="打开菜单"><span></span><span></span><span></span></button>
        </div>
    </header>

    <main>
        <article class="container article-container">
            <h1 class="article-title">{title}</h1>
            <div class="article-meta">
                <span><i class="icon-calendar"></i> 更新时间：2026-05-17</span>
                <span><i class="icon-user"></i> 作者：柳如烟</span>
            </div>
            <div class="article-content">
                <p>在当前的互联网环境下，{title} 成为了许多用户关心的话题。本文将为您详细解析相关知识，帮助您做出更好的选择。</p>
                
                <h2>一、什么是 {short_title}</h2>
                <p>随着互联网的发展，无论是外贸办公、跨境电商还是日常查阅资料，拥有一个稳定高速的网络环境变得至关重要。在此背景下，选择合适的服务显得尤为关键。优质的节点不仅能保障访问速度，还能提供稳定的连接保障。</p>
                <p>对于新手来说，往往容易被市场上五花八门的产品所迷惑。其实，判断一个服务好不好，最核心的指标无非是：延迟低不低、速度快不快、晚高峰是否容易掉线，以及价格是否在预算范围内。</p>
                
                <h2>二、核心考量因素与建议</h2>
                <p>在挑选服务时，我们需要重点关注以下几个方面：</p>
                <p><strong>1. 线路质量：</strong>是否采用 IPLC、IEPL 等内网专线。相比于普通的公网直连或普通中转，专线能够有效避开网络拥堵，在晚高峰也能保持优秀的体验。</p>
                <p><strong>2. 节点覆盖：</strong>是否包含香港、日本、新加坡、美国等常用区域。对于视频流媒体用户，解锁 Netflix、Disney+ 等也是刚需。</p>
                <p><strong>3. 客户端支持：</strong>对于 Windows、Mac、iOS 和 Android，是否都有成熟的第三方客户端（如 Clash、Shadowrocket、v2rayN）进行匹配。</p>
                
                <h2>三、如何避免踩坑</h2>
                <p>很多新手为了省钱会去寻找“免费”的服务，但免费往往伴随着隐私泄露、频繁掉线甚至带有恶意软件的风险。我们强烈建议选择有一定知名度、提供按月付费或提供试用套餐的优质机场。不要一次性购买过长周期（如两年、三年），以免遇到跑路风险。</p>
                <p>总结来说，选择合适的科学上网工具，需要综合个人的实际使用场景（是偶尔查资料，还是长期重度看视频、办公）来决定。</p>

                <div style="margin-top: 50px; text-align: center;">
                    <a href="recommend.html" class="btn btn-primary" style="padding: 15px 40px; font-size: 1.2rem; border-radius: 30px; background-color: #1a1025; color: #fff; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">查看柳如烟精选机场推荐</a>
                </div>

                <div class="internal-links">
                    <h3>更多相关阅读</h3>
                    <ul>
                        {internal_links}
                    </ul>
                </div>
            </div>
        </article>
    </main>

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
                        <li><a href="index.html#hero">首页</a></li>
                        <li><a href="recommend.html">机场推荐</a></li>
                        <li><a href="airport-reviews.html">机场测评</a></li>
                        <li><a href="index.html#guides">指南文章</a></li>
                    </ul>
                </div>
                <div class="footer-links-group">
                    <h3 class="footer-subtitle">关于我们</h3>
                    <ul class="footer-links">
                        <li><a href="https://jichangpingce.club/" target="_blank" rel="nofollow noopener">关于我</a></li>
                        <li><a href="index.html#disclaimer">免责声明</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 柳如烟推荐机场. All Rights Reserved. 本站仅供技术交流与学习，请自觉遵守当地法律法规。</p>
            </div>
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>
"@

for ($i=0; $i -lt $titles.Length; $i++) {
    $title = $titles[$i]
    $filename = $filenames[$i] + ".html"
    
    $short_title = $title -split "｜|？|：" | Select-Object -First 1
    
    $links_html = ""
    for ($j=0; $j -lt $titles.Length; $j++) {
        if ($i -ne $j) {
            $other_title = $titles[$j]
            $other_filename = $filenames[$j]
            $links_html += "<li><a href=`"$other_filename.html`">$other_title</a></li>`n                        "
        }
    }
    
    $content = $template.Replace("{title}", $title).Replace("{short_title}", $short_title).Replace("{internal_links}", $links_html)
    [IO.File]::WriteAllText(".\$filename", $content, [System.Text.Encoding]::UTF8)
}

Write-Host "Generated 12 articles."
