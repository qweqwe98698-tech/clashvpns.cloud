const fs = require('fs');
const path = require('path');

const title = "Shadowrocket 小火箭机场使用教程：iOS 用户订阅导入完整步骤";
const short_title = "Shadowrocket 小火箭教程";
const filename = "shadowrocket-airport-subscription-tutorial-2026.html";

const rawContent = `Shadowrocket 常被用户称为“小火箭”，是 iPhone 和 iPad 用户常见的代理客户端。它本身不是机场，也不自带稳定节点，用户需要先购买机场套餐，获得订阅链接后，再导入 Shadowrocket 使用。
第一步，准备机场订阅链接。登录机场网站后台，找到“订阅链接”“一键订阅”“Shadowrocket 订阅”“小火箭订阅”等入口，复制对应链接。不同机场按钮名称可能不同，但核心都是复制一条订阅 URL。
第二步，打开 Shadowrocket。进入主界面后，点击右上角添加按钮。根据机场提供的格式，选择从 URL 导入、订阅导入或手动添加。新手一般选择订阅 URL 导入最简单。
第三步，粘贴订阅链接。把刚才复制的机场订阅粘贴进去，名称可以填写机场名字，方便以后区分。保存后，返回主界面，点击更新订阅或等待自动拉取节点。
第四步，选择节点。订阅成功后，通常会出现香港、日本、新加坡、美国等节点。新手可以先选择延迟较低的香港或日本节点。如果主要使用 ChatGPT，可以测试美国、日本、新加坡节点；如果看 Netflix，可以选择机场标注的流媒体节点。
第五步，开启连接。选择节点后，打开 Shadowrocket 的连接开关。首次开启时，iOS 可能会提示添加 VPN 配置，点击允许，并输入设备密码确认。完成后，状态栏可能会出现 VPN 标识。
第六步，测试网络。可以打开 Safari，访问 Google、YouTube、ChatGPT 等网站。如果可以正常访问，说明基础连接成功。如果 YouTube 很慢，可以换节点；如果 ChatGPT 打不开，可以换美国或日本节点；如果所有节点都失败，可能是订阅或机场套餐问题。
Shadowrocket 使用中常见问题包括：订阅更新失败、节点连接不上、打开开关后没网络、部分 App 不走代理、流量消耗异常等。
如果订阅更新失败，先检查订阅链接是否复制完整，再检查套餐是否过期，最后尝试重新导入。如果节点连接不上，可以切换其他节点，更新订阅，或查看机场公告。如果开启后没网络，可以关闭再打开，切换规则配置，或者重启手机网络。
小火箭新手建议使用规则模式，而不是所有流量都走代理。规则模式可以让国内网站直连，海外网站走代理，日常体验更自然。全局模式适合临时测试，但长期使用可能导致国内网站变慢。
需要注意的是，Shadowrocket 是客户端，机场订阅由机场服务商提供。客户端能不能连接，取决于订阅是否有效、节点是否正常、网络环境是否支持。不要把客户端问题和机场节点问题混为一谈。
总结
iOS 用户使用 Shadowrocket 的核心步骤是：复制机场订阅链接，导入小火箭，更新订阅，选择节点，开启连接，测试访问。新手遇到问题时，优先检查订阅链接、套餐状态、节点延迟和规则模式。熟悉之后，小火箭是 iOS 上非常灵活的机场订阅客户端。`;

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
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="Shadowrocket 是 iOS 用户常用的代理客户端。本文介绍小火箭如何导入机场订阅链接、选择节点、开启代理、切换规则模式，并整理常见连接失败、节点超时、订阅更新失败的解决方法。">');
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
        summary: "手把手教 iOS 新手如何玩转 Shadowrocket（小火箭），轻松导入订阅链接，告别配置报错与连接失败。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
