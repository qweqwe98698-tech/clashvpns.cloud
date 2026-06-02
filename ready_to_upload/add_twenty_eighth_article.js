const fs = require('fs');
const path = require('path');

const title = "Sing-box 时代的门槛焦虑：为什么 2026 年很多新手又回去用快连？";
const short_title = "为什么很多新手又回去用快连？";
const filename = "sing-box-vs-letsvpn-2026.html";

const content = `
        <p>进入 2026 年以后，机场客户端生态出现了一个非常明显的变化：Sing-box 正在成为新一代主流客户端核心。对于技术用户来说，这是好事，Sing-box 扩展能力强，跨平台能力更统一。但对于新手用户来说，Sing-box 时代也带来了一个新问题：门槛变高了。</p>
        <p>很多用户只是想正常使用 Google、YouTube，并不想研究 JSON 配置文件，结果就是，不少人折腾了一晚上 Sing-box，最后还是回到快连这类一键连接 VPN。这也说明，2026 年机场和 VPN 工具的竞争，已经不只是速度和价格的竞争，更是技术自由度和使用门槛之间的竞争。</p>

        <h2>一、为什么 Sing-box 会成为 2026 年机场圈主流？</h2>
        <p>原因包括：Clash 原始生态红利逐渐消耗；新协议（Hysteria 2、TUIC v5 等）更适合 Sing-box 生态；跨平台需求变强；规则分流更精细。从技术角度看，Sing-box 的确强大，但从新手角度看，它也确实更难。</p>

        <h2>二、为什么 Sing-box 会让新手焦虑？</h2>
        <p>Sing-box 最大的问题是看起来太像“写配置”。新手看到一整段 JSON 配置文件，一旦复制错一个逗号，配置就可能报错，且排错困难。这就是 Sing-box 时代的新门槛：功能更强，但排错更难。</p>

        <h2>三、机场推荐贴为什么越来越“技术化”？</h2>
        <p>现在的推荐文章包含大量技术名词（是否支持 Hysteria 2、TUIC v5、rule-set 等），对新手来说信息量过载，看完反而更迷茫。这也是为什么快连这类一键连接工具仍然有市场。</p>

        <h2>四、快连为什么在 Sing-box 时代反而更有吸引力？</h2>
        <p>快连的逻辑是“帮你处理复杂问题，你只需要点击连接”，不用导入订阅，不用写 JSON。显著降低了使用门槛，很多用户愿意为“少折腾”付费。</p>

        <h2>五、Sing-box 和快连到底谁更适合新手？</h2>
        <p>Sing-box 适合愿意学习配置、需要多设备同步和复杂规则分流的进阶用户。快连更适合不懂配置、只想快速连接、短期回国的新手。</p>

        <h2>六、机场站应该如何降低 Sing-box 新手门槛？</h2>
        <p>建议用图文步骤替代纯 JSON，给出常见错误解释，提供新手模式和进阶模式，避免术语堆砌，保留图形化教程。</p>

        <h2>七、2026 年机场推荐应该把“易用性”写进去</h2>
        <p>“易用性”应该成为固定测评指标，如是否有图文教程、是否支持新手快速导入等，更贴近用户需求。</p>

        <h2>八、最现实的组合方案：机场负责主力，快连负责兜底</h2>
        <p>主力：Sing-box / Clash + 稳定专线机场；备用：快连 VPN。既能享受自由度，也能保留应急能力。</p>

        <h2>九、总结：Sing-box 提高了上限，也提高了门槛</h2>
        <p>2026 年机场全面转向 Sing-box，技术生态升级的同时也让新手感受到明显门槛。一句话总结：Sing-box 赢在自由度和技术上限，快连赢在简单和低门槛；真正适合用户的方案，是根据自己的技术能力和使用场景选择工具。</p>
`;

const templateFile = fs.readFileSync(path.join(__dirname, 'clash-airport-tutorial.html'), 'utf8');

let newHtml = templateFile.replace(/<title>.*?<\/title>/, '<title>' + title + ' - 柳如烟</title>');
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="' + title + '，提供2026年最新科学上网、机场节点、VPN 加速器相关的详细指南与评测。">');
newHtml = newHtml.replace(/<h1 class="article-title">.*?<\/h1>/, '<h1 class="article-title">' + title + '</h1>');

const contentRegex = /<div class="article-content">[\s\S]*?<div style="margin-top: 50px; text-align: center;">/;
const replacement = '<div class="article-content">\\n' + content + '\\n                <div style="margin-top: 50px; text-align: center;">';
newHtml = newHtml.replace(contentRegex, replacement);

fs.writeFileSync(path.join(__dirname, filename), newHtml, 'utf8');
console.log('Created ' + filename);

const guidesScript = path.join(__dirname, 'update_guides.js');
let guidesCode = fs.readFileSync(guidesScript, 'utf8');

const newArticleObj = `    {
        title: "Sing-box 时代的门槛焦虑：为什么 2026 年很多新手又回去用快连？",
        link: "sing-box-vs-letsvpn-2026.html",
        tag: "新手教程",
        summary: "当机场配置变成写代码，深度剖析为什么‘无脑一键连’依然是 2026 年小白的最爱。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
