const fs = require('fs');
const path = require('path');

const title = "2026 年翻墙工具选择总结：没有一劳永逸，只有主力与备用组合";
const short_title = "没有一劳永逸，只有主力与备用组合";
const filename = "vpn-airport-combo-strategy-2026.html";

const content = `
        <p>到了 2026 年，科学上网环境已经很难再用“一款工具解决所有问题”来概括。无论是快连 VPN、传统机场、专线机场，还是自建 VPS，都不再是绝对完美的方案。网络环境变化、封锁强度升级、机场跑路、支付收紧、AI 风控等因素叠加在一起，让用户必须重新思考：到底怎样的组合才更稳？</p>

        <h2>一、快连 VPN 的定位与局限</h2>
        <p>快连近期在大陆部分地区遭遇连接困难，说明即使是商业化程度很高的 VPN 工具，在面对极端网络封锁时，也不可能永远保证所有地区、所有时间都稳定可用。它的优势是省心、一键连接、适合小白和应急；但同样会受到地区网络环境、节点 IP 风控等影响。</p>

        <h2>二、传统机场的优势与风险</h2>
        <p>支持 Hysteria 2、Sing-box 等新协议的机场，在 2026 年依然是重度用户的主力选择。优势是流量更大、节点更多、价格灵活，适合 YouTube 4K、Netflix、ChatGPT、多设备和软路由。但风险也很明显：低价机场跑路、伪专线混杂、支付方式复杂、Sing-box 配置门槛高、AI 节点受 IP 洁净度影响。单靠一个机场并不稳妥。</p>

        <h2>三、2026 年最稳的翻墙策略：多层防线组合</h2>
        <p>2026 年更理性的方案不是二选一，而是组合使用：</p>
        <ul>
            <li><strong>主力方案：</strong>选择一个支持 Hysteria 2 / Sing-box 的月付稳定机场。负责日常大流量使用。优先月付测试，不建议一开始年付。</li>
            <li><strong>备用方案：</strong>手机里保留一个快连 VPN。作为应急入口，用来在主力机场失效时查看公告、联系售后或寻找备用线路。</li>
            <li><strong>进阶方案：</strong>自建一个低成本 VPS 小鸡。作为第三道防线，胜在可控、独享、不会受机场主跑路影响。</li>
        </ul>

        <h2>四、总结：日常靠机场，危机靠快连，兜底靠自建</h2>
        <p>一句话总结就是：2026 年最稳的翻墙策略，不是寻找永远不会失效的神器，而是建立“主力机场 + 快连备用 + 自建小鸡兜底”的多层防线。真正成熟的用户，不会再迷信单一工具，而是根据使用场景配置不同方案，把断联风险降到最低。</p>
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
        title: "2026 年翻墙工具选择总结：没有一劳永逸，只有主力与备用组合",
        link: "vpn-airport-combo-strategy-2026.html",
        tag: "行业趋势",
        summary: "终极避坑指南！抛弃“一个梯子走天下”的幻想，为你量身定制 2026 最稳健的翻墙组合策略。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
