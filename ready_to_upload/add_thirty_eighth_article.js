const fs = require('fs');
const path = require('path');

const title = "Netflix / YouTube 机场节点怎么选？流媒体解锁和 4K 播放指南";
const short_title = "Netflix / YouTube 机场节点怎么选？";
const filename = "netflix-youtube-airport-node-guide-2026.html";

const content = `
        <p>很多用户购买机场 VPN 的核心需求之一，就是看 Netflix、YouTube、Disney+、TikTok 等流媒体内容。尤其是 YouTube 4K、Netflix 不同地区片库等，对节点速度和 IP 质量都有要求。</p>

        <h2>第一点：能打开网页不代表能解锁</h2>
        <p>首先要明白一点：能打开网页，不代表能解锁流媒体。普通节点可能可以访问 YouTube 首页，但播放 4K 时会卡顿；也可能能打开 Netflix 官网，但播放内容时提示代理错误。流媒体平台会识别用户的 IP、地区、DNS 和代理特征。</p>

        <h2>第二点：Netflix 节点怎么选</h2>
        <p>选择 Netflix 节点时，优先选择机场明确标注的“流媒体节点”“Netflix 解锁节点”“美国 NF”“新加坡 NF”等。普通节点不一定能解锁，低价共享节点更容易被识别。</p>

        <h2>第三点：YouTube 节点怎么选</h2>
        <p>选择 YouTube 节点时，核心看速度和稳定性。YouTube 4K 对持续带宽要求高。可以通过播放 4K 视频观察缓冲情况。如果前几秒加载快，一会儿就卡，说明节点持续稳定性不足。</p>

        <h2>第四点：晚高峰是试金石</h2>
        <p>晚高峰（晚上 8 点到 12 点）是检验流媒体机场的重要时间段。白天测速快不代表晚上也快。低价机场容易出现拥堵。如果你主要看视频，建议专门在晚高峰测试 YouTube 4K 和 Netflix 播放。</p>

        <h2>常见问题排查：YouTube 卡顿怎么办？</h2>
        <p>先切换同地区其他节点；再尝试日本、新加坡、美国节点；检查本地 WiFi、路由器和宽带。如果所有节点都卡，可能是机场带宽不足或本地网络问题。</p>

        <h2>常见问题排查：Netflix 提示代理错误怎么办？</h2>
        <p>更换机场标注的 Netflix 解锁节点；检查 DNS 是否泄漏；关闭浏览器代理插件；重新登录 Netflix，或者换设备测试。</p>

        <h2>总结</h2>
        <p>流媒体用户不建议长期依赖免费机场。免费节点通常带宽有限、IP 质量不稳定。Netflix / YouTube 机场节点选择的重点是：流媒体解锁能力、持续带宽、晚高峰稳定性和地区匹配。视频用户不要只看延迟，更要实测播放体验。</p>
`;

const templateFile = fs.readFileSync(path.join(__dirname, 'clash-airport-tutorial.html'), 'utf8');

let newHtml = templateFile.replace(/<title>.*?<\/title>/, '<title>' + title + ' - 柳如烟</title>');
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="Netflix、YouTube、Disney+、TikTok 等流媒体对机场节点有不同要求。本文讲解如何选择适合流媒体解锁的机场节点，解决 YouTube 4K 卡顿、Netflix 代理错误、晚高峰速度慢等问题。">');
newHtml = newHtml.replace(/<h1 class="article-title">.*?<\/h1>/, '<h1 class="article-title">' + title + '</h1>');

const contentRegex = /<div class="article-content">[\s\S]*?<div style="margin-top: 50px; text-align: center;">/;
const replacement = '<div class="article-content">\\n' + content + '\\n                <div style="margin-top: 50px; text-align: center;">';
newHtml = newHtml.replace(contentRegex, replacement);

fs.writeFileSync(path.join(__dirname, filename), newHtml, 'utf8');
console.log('Created ' + filename);

const guidesScript = path.join(__dirname, 'update_guides.js');
let guidesCode = fs.readFileSync(guidesScript, 'utf8');

const newArticleObj = `    {
        title: "Netflix / YouTube 机场节点怎么选？流媒体解锁和 4K 播放指南",
        link: "netflix-youtube-airport-node-guide-2026.html",
        tag: "硬核评测",
        summary: "为什么网速很快，看 Netflix 却提示代理错误？手把手教你挑选真正适合 4K 晚高峰的流媒体原生解锁节点。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
