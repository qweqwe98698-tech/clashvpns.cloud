const fs = require('fs');
const path = require('path');

const title = "机场节点突然变慢怎么办？晚高峰卡顿、延迟高、丢包排查方法";
const short_title = "机场节点变慢怎么办？";
const filename = "airport-node-slow-troubleshooting-2026.html";

const rawContent = `很多用户使用机场时都会遇到一个问题：昨天还很快，今天突然变慢；白天还正常，晚上就卡；YouTube 播放一会儿就缓冲；ChatGPT 回复到一半断开；节点测速延迟突然变高。
遇到这种情况，不要第一时间判断机场跑路。节点变慢可能有很多原因，需要一步一步排查。
第一，先判断是否晚高峰。晚上 8 点到 12 点通常是网络使用高峰，很多低价机场会在这个时间段出现拥堵。如果白天正常、晚上变慢，说明机场带宽或线路承载能力可能不足。
第二，切换同地区节点。例如香港 01 慢，可以换香港 02、香港 03；日本 01 慢，可以换日本 02。单个节点异常很常见，不代表整个机场都有问题。
第三，切换不同地区。如果香港节点整体慢，可以试试日本、新加坡、美国。如果美国节点慢，可以试试日本或新加坡。不同地区线路波动不一样。
第四，更新订阅。机场可能已经更换了节点或调整了配置，但你的客户端还在使用旧订阅。Clash Verge Rev、Shadowrocket、v2rayN 都可以手动更新订阅。
第五，检查套餐流量。如果流量用完，部分机场会限速或暂停服务。登录机场后台查看剩余流量、套餐有效期和设备在线数量。
第六，检查本地网络。很多时候问题不在机场，而是本地 WiFi、路由器、宽带或手机网络异常。可以重启路由器，切换手机热点，或者换一个网络测试。
第七，检查客户端设置。确认代理模式是否正确，系统代理是否开启，是否误选了直连模式，是否有其他代理插件冲突。
第八，测试具体场景。如果只是 YouTube 慢，可能是视频带宽问题；如果只是 ChatGPT 慢，可能是 AI 节点问题；如果所有网站都慢，可能是节点或本地网络整体问题。
第九，查看机场公告。如果线路维护、节点迁移、服务器故障，机场通常会发布公告。没有公告但大量用户反馈异常，就要关注风险。
第十，避免长期只用一个节点。新手可以收藏几个稳定节点作为备用，比如香港、日本、新加坡、美国各保留一个。遇到卡顿时快速切换，体验会更好。
总结
机场节点突然变慢，常见原因包括晚高峰拥堵、单节点故障、本地网络异常、订阅未更新、流量用完和线路维护。排查顺序建议是：看时间、换节点、换地区、更新订阅、查流量、测本地网络、看公告。稳定机场的关键不是永远不出问题，而是出问题后有备用节点和及时维护。`;

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
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="机场节点突然变慢，可能是晚高峰拥堵、节点故障、本地网络问题、订阅未更新、流量用完或线路波动。本文整理节点卡顿、延迟高、丢包、YouTube 卡、ChatGPT 断连的排查方法。">');
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
        summary: "节点全红、延迟飙升、视频缓冲？教你通过 10 步神级排障法，迅速定位网络卡顿元凶！"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
