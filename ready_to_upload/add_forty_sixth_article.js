const fs = require('fs');
const path = require('path');

const title = "VPN、机场、梯子、加速器有什么区别？科学上网新手入门指南";
const short_title = "VPN、机场、梯子的区别";
const filename = "vpn-airport-proxy-differences-2026.html";

const rawContent = `很多新手刚接触科学上网时，会看到很多词：VPN、机场、机场 VPN、梯子、魔法上网、加速器、代理节点、Clash 机场。这些词经常被混在一起使用，但它们并不完全一样。
VPN 通常指一种虚拟专用网络技术，也常用来指商业 VPN App。传统 VPN 的特点是一键连接，操作简单，适合不想折腾的用户。你安装 App，登录账号，选择地区，点击连接即可。
机场通常指提供代理节点订阅的平台。用户购买机场套餐后，会获得一个订阅链接，再导入到 Clash Verge Rev、Shadowrocket、v2rayN、Stash 等客户端中使用。机场比传统 VPN 更灵活，可以选择不同节点、不同规则、不同客户端，但对新手来说学习成本稍高。
梯子是中文互联网里的俗称，通常泛指能访问海外网络的工具。它不是严格技术名词，可能指 VPN，也可能指机场，也可能指代理节点。
科学上网也是泛称，指通过网络工具访问全球互联网资源。这个词本身比较宽泛，包含 VPN、代理、机场、加速器等不同形式。
加速器则要分情况。有些游戏加速器主要优化游戏线路，不一定能访问普通海外网站；有些所谓 VPN 加速器则接近商业 VPN；还有一些网络加速器只优化国内线路。因此，看到“加速器”时，要看它具体支持什么场景。
机场和传统 VPN 最大的区别在于灵活性。传统 VPN 更适合完全不想配置的新手，机场更适合愿意使用 Clash、Shadowrocket 等客户端的用户。机场通常节点选择更多，规则更细，适合 ChatGPT、YouTube、Netflix、Google、跨境办公等多场景。
但机场也有缺点。比如需要导入订阅，需要理解规则模式、全局模式、节点测速、订阅更新等概念。新手第一次使用可能会遇到订阅链接失效、节点超时、配置不兼容等问题。
选择哪种工具，要看你的需求。如果你只是偶尔访问海外网站，想要最简单体验，可以选择一键 VPN。如果你需要 ChatGPT、Netflix、YouTube、TikTok、Google、多个设备、不同节点地区和更灵活规则，那么机场订阅更适合。
新手不管选择哪种方式，都要注意安全和合规。不要随便使用来源不明的免费节点，不要在不可信网络里登录重要账号，不要轻易购买超低价多年套餐。
总结
VPN、机场、梯子、加速器经常被混用，但重点区别在于使用方式和灵活性。VPN 更像一键工具，机场更像节点订阅平台，梯子和科学上网是泛称，加速器要看具体用途。新手选择时，不要只看名字，要看自己需要的是简单连接、AI 工具访问、流媒体解锁还是长期稳定使用。`;

const lines = rawContent.split('\n').filter(line => line.trim() !== '');
let formattedContent = '';
lines.forEach(line => {
    if (line.length < 30 && !line.endsWith('。') && !line.endsWith('；') && !line.endsWith('？')) {
        formattedContent += '<h2>' + line + '</h2>\n';
    } else {
        formattedContent += '<p>' + line + '</p>\n';
    }
});

const templateFile = fs.readFileSync(path.join(__dirname, 'clash-airport-tutorial.html'), 'utf8');

let newHtml = templateFile.replace(/<title>.*?<\/title>/, '<title>' + title + ' - 柳如烟</title>');
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="VPN、机场、梯子、加速器、科学上网这些词经常被混用，但含义并不完全一样。本文用新手视角解释它们的区别，帮助用户选择适合自己的工具。">');
newHtml = newHtml.replace(/<h1 class="article-title">.*?<\/h1>/, '<h1 class="article-title">' + title + '</h1>');

const contentRegex = /<div class="article-content">[\s\S]*?<div style="margin-top: 50px; text-align: center;">/;
const replacement = '<div class="article-content">\n' + formattedContent + '\n                <div style="margin-top: 50px; text-align: center;">';
newHtml = newHtml.replace(contentRegex, replacement);

fs.writeFileSync(path.join(__dirname, filename), newHtml, 'utf8');
console.log('Created ' + filename);

const guidesScript = path.join(__dirname, 'update_guides.js');
let guidesCode = fs.readFileSync(guidesScript, 'utf8');

const newArticleObj = `    {
        title: "${title}",
        link: "${filename}",
        tag: "新手教程",
        summary: "一文理清各种黑话：什么是梯子、机场、魔法上网和加速器？帮你走出新手村，精准选择科学上网工具。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
