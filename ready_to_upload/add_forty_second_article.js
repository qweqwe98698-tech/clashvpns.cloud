const fs = require('fs');
const path = require('path');

const title = "免费机场和免费 VPN 值得用吗？新手避坑指南";
const short_title = "免费机场和免费 VPN 值得用吗？";
const filename = "free-airport-vpn-worth-it-2026.html";

const rawContent = `很多新手刚接触机场 VPN 时，都会先搜索“免费机场”“免费 VPN”“免费节点”“免费订阅”。免费服务看起来没有成本，用起来好像也方便，但它真的值得长期使用吗？
答案是：免费机场可以临时测试，但不建议长期依赖，更不建议用于重要账号、工作资料、支付场景和长期 AI 工具访问。
免费机场最大的问题是稳定性差。免费节点通常用户很多，带宽有限，节点经常被滥用。白天可能还能打开网页，晚高峰就可能严重卡顿。YouTube 可能只能看低清，ChatGPT 可能经常断，Netflix 基本很难稳定解锁。
第二个问题是安全和隐私风险。免费服务也需要成本，如果用户不付费，平台可能通过广告、流量限制、数据统计或其他方式维持运营。用户无法确认免费节点背后的运营方是否可信，也不知道流量是否被记录。因此，不建议用免费节点登录重要账号。
第三个问题是节点寿命短。免费订阅经常失效，今天能用，明天可能就不能用。很多免费节点来自公开分享，被大量用户同时使用后，很快就会超时、被封或失效。对于需要稳定使用 ChatGPT、Google、YouTube 的用户来说，这种体验很折腾。
第四个问题是 IP 质量差。免费节点容易被大量滥用，IP 可能被平台识别为高风险。用户访问 ChatGPT 时可能频繁验证，访问社交平台时可能触发安全检查，访问 Netflix 时可能提示代理错误。
那么免费机场有没有适合的场景？有，但只适合非常轻度、临时、低风险的测试。例如测试某个客户端是否安装成功，临时打开一个普通网页，或者新手学习订阅导入流程。但不建议用于长期浏览、账号登录、资料传输和工作使用。
如果预算有限，更建议选择小流量月付机场，而不是长期使用免费节点。小流量套餐价格通常不高，但至少有相对稳定的订阅、节点维护和客服支持。对于轻度用户来说，每月几十 GB 流量已经足够查资料、使用 ChatGPT 和偶尔看视频。
选择免费 VPN 或免费机场时，也要避开一些明显风险：要求安装来历不明 App、要求输入账号密码、要求关闭系统安全设置、来源不明的配置文件、过度索取权限、承诺永久免费且不限速不限量的服务。这类服务看起来诱人，但风险更高。
总结
免费机场和免费 VPN 不是完全不能用，但只适合临时测试，不适合长期稳定使用。真正重视账号安全、AI 工具访问、流媒体观看和日常办公的用户，建议选择价格合理、线路稳定、维护正常的付费机场。省小钱导致账号风险和时间成本增加，往往不划算。`;

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
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="免费机场和免费 VPN 看起来成本低，但可能存在速度慢、节点不稳定、隐私风险、广告追踪、流量限制、账号安全问题。本文从新手角度分析免费节点是否值得使用，以及什么场景不建议用免费机场。">');
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
        tag: "避坑指南",
        summary: "免费的往往是最贵的！揭秘免费节点背后的隐私风险与账号风控问题，教你为什么不要用免费梯子登录核心账号。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
