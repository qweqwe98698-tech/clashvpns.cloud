const fs = require('fs');

const guidesCode = fs.readFileSync('update_guides.js', 'utf8');
const match = guidesCode.match(/const articles = (\[[\s\S]*?\]);/);
const articles = match ? eval(match[1]) : [];

let template = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>机场指南与最新翻墙教程 - 柳如烟推荐机场</title>
    <meta name="description" content="柳如烟精选最新翻墙教程与机场指南，解决节点被封、连接重置等问题。">
    <link rel="icon" href="logo.png" type="image/png">
    <link rel="stylesheet" href="style.css">
    <link rel="canonical" href="https://clashvpns.cloud/guides.html" />
</head>
<body style="background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);">
<header class="navbar">
        <div class="container nav-container">
            <div class="nav-logo">
                <a href="#">
                    <img src="logo.png" alt="柳如烟 Logo" class="logo-img">
                    柳如烟
                </a>
            </div>
            <nav class="nav-links">
                <a href="index.html#hero">首页</a>
                <a href="recommend.html">机场推荐</a>
                <a href="airport-reviews.html">机场测评</a>
                <a href="download.html">客户端下载</a>
                <a href="free-nodes.html">免费节点</a>
                <a href="nav.html">网址导航</a>
                <a href="apple-id-shared.html">免费ID获取</a>
                <a href="en/index.html" style="color: #9CA3AF; font-size: 0.85rem;">English(EN)</a>
                <a href="guides.html">机场指南</a>
            </nav>
            <button class="menu-toggle" aria-label="打开菜单">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
</header>

<main style="padding-top: 100px; min-height: 80vh;">
    <section id="guides" class="guides section" style="padding-top: 60px; padding-bottom: 60px;">
        <div class="container">
            <div class="section-header" style="text-align: center; margin-bottom: 60px;">
                <h1 class="section-title" style="font-size: 3rem; font-weight: 800; margin-bottom: 20px;">全网最硬核·机场指南</h1>
                <p class="section-desc" style="font-size: 1.2rem; color: var(--text-light); max-width: 800px; margin: 0 auto;">
                    2026 最新科学上网、梯子评测、翻墙教程与防封号指南汇总
                </p>
            </div>
            <!-- 柳如烟机场指南 -->
            <div class="guides-grid">
`;

articles.forEach(article => {
    template += `                <a href="${article.link}" class="guide-card">
                    <span class="guide-tag tag-gray">${article.tag}</span>
                    <h3 class="guide-title">${article.title}</h3>
                    <p class="guide-summary">${article.summary}</p>
                    <div class="guide-footer">
                        <span class="guide-readmore">阅读全文 <span class="arrow">&rarr;</span></span>
                    </div>
                </a>\n`;
});

template += `            </div>
        </div>
    </section>
</main>

<footer class="footer">
    <div class="container">
        <div class="footer-bottom" style="text-align: center; margin-top: 40px;">
            <p>&copy; 2026 柳如烟. All Rights Reserved. 本站仅供技术交流与学习，请自觉遵守当地法律法规。</p>
        </div>
    </div>
</footer>
<script src="script.js"></script>
</body>
</html>`;

fs.writeFileSync('guides.html', template, 'utf8');
console.log('✅ Created completely fresh and perfectly centered guides.html');
