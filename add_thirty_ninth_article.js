const fs = require('fs');
const path = require('path');

const title = "IPLC / IEPL 专线机场区别详解：普通机场和专线机场怎么选";
const short_title = "IPLC / IEPL 专线机场区别详解";
const filename = "iplc-iepl-dedicated-line-airport-guide-2026.html";

const content = `
        <p>很多新手在看机场推荐时，会看到“IPLC 专线”“IEPL 专线”“高速专线机场”“中转机场”“直连机场”等词。看起来都很专业，但到底有什么区别？普通用户有没有必要买专线？</p>

        <h2>一、直连、中转与专线的通俗解释</h2>
        <p>简单来说，机场线路可以粗略分为普通直连、中转线路和专线线路。</p>
        <ul>
            <li><strong>普通直连：</strong>用户直接连接到目标节点。价格便宜、配置简单；缺点是晚高峰可能不稳定，部分地区延迟较高。像普通道路，便宜但容易堵。</li>
            <li><strong>中转线路：</strong>在用户和目标节点之间增加中转服务器。通常比普通直连更稳。缺点是成本更高。像绕开拥堵路段的优化路线。</li>
            <li><strong>专线（IPLC / IEPL）：</strong>强调更稳定的跨境传输、更低的拥堵概率和更好的晚高峰体验。成本较高。像更稳定的专用通道，成本更高，但体验更可控。</li>
        </ul>

        <h2>二、谁适合买专线机场？</h2>
        <p>不是所有人都必须买专线，专线主要适合以下人群：</p>
        <ol>
            <li><strong>重度 ChatGPT 和 AI 工具用户：</strong>每天长时间使用 OpenAI、Claude，不希望频繁断线。</li>
            <li><strong>高清视频用户：</strong>经常看 YouTube 4K、Netflix，要求晚高峰体验。</li>
            <li><strong>跨境办公用户：</strong>需要稳定访问海外工作平台、远程服务器。</li>
            <li><strong>多设备家庭用户：</strong>多设备同时使用，普通低价节点容易崩溃。</li>
        </ol>

        <h2>三、怎么判断是不是真专线？</h2>
        <p>选择专线机场时，不能只看宣传。要看是否说明线路类型、是否有多个地区节点、是否支持晚高峰稳定、是否允许月付测试。真正靠谱的专线机场不会只靠“高速稳定”四个字，而会有相对清晰的套餐和线路说明。</p>

        <h2>总结</h2>
        <p>IPLC / IEPL 专线机场的优势在于稳定性、晚高峰体验和连接质量，但价格也更高。普通用户可以先从月付普通套餐测试，如果发现晚高峰卡顿、AI 工具不稳、流媒体经常断，再考虑升级专线套餐。选机场不是越贵越好，而是根据自己的使用场景选择合适线路。</p>
`;

const templateFile = fs.readFileSync(path.join(__dirname, 'clash-airport-tutorial.html'), 'utf8');

let newHtml = templateFile.replace(/<title>.*?<\/title>/, '<title>' + title + ' - 柳如烟</title>');
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="IPLC、IEPL、专线机场、中转机场、普通直连机场有什么区别？本文用新手能看懂的方式解释各种线路类型，帮助用户判断自己是否需要购买专线机场。">');
newHtml = newHtml.replace(/<h1 class="article-title">.*?<\/h1>/, '<h1 class="article-title">' + title + '</h1>');

const contentRegex = /<div class="article-content">[\s\S]*?<div style="margin-top: 50px; text-align: center;">/;
const replacement = '<div class="article-content">\\n' + content + '\\n                <div style="margin-top: 50px; text-align: center;">';
newHtml = newHtml.replace(contentRegex, replacement);

fs.writeFileSync(path.join(__dirname, filename), newHtml, 'utf8');
console.log('Created ' + filename);

const guidesScript = path.join(__dirname, 'update_guides.js');
let guidesCode = fs.readFileSync(guidesScript, 'utf8');

const newArticleObj = `    {
        title: "IPLC / IEPL 专线机场区别详解：普通机场和专线机场怎么选",
        link: "iplc-iepl-dedicated-line-airport-guide-2026.html",
        tag: "硬核评测",
        summary: "一文看懂直连、中转、专线（IPLC/IEPL）到底有什么区别，告别智商税，精准匹配你的真实翻墙需求。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
