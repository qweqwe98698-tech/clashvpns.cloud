const fs = require('fs');
const path = require('path');

const title = "2026 高性价比机场推荐标准：流量、线路、延迟、客服怎么判断";
const short_title = "高性价比机场怎么选？";
const filename = "high-cost-performance-airport-standard-2026.html";

const rawContent = `很多用户搜索“高性价比机场推荐”，其实真正想找的是：价格不要太贵，速度要稳定，ChatGPT 能用，YouTube 能看，Netflix 最好能解锁，客服不要失联，机场不要跑路。
所以，高性价比机场不是最便宜的机场，而是在合理价格内提供稳定体验的机场。
判断高性价比机场，第一看流量是否符合需求。轻度用户每月几十 GB 可能够用，普通用户可能需要 100GB 到 300GB，视频用户和多设备用户则可能需要更高流量。如果你经常看 YouTube 4K、Netflix 或下载大文件，小流量套餐很快就会用完。
第二看线路质量。线路比节点数量更重要。一个机场有 100 个节点，但大多数都慢，不如一个机场只有 30 个节点但常用地区稳定。新手重点看香港、日本、新加坡、美国、台湾这些常用地区是否稳定。
第三看延迟和速度。延迟低适合网页浏览、聊天、游戏和 AI 工具；速度稳定适合视频和下载。测速不能只看一次，最好在白天和晚高峰分别测试。晚高峰表现更能说明机场真实质量。
第四看 ChatGPT 和 AI 工具支持。2026 年，OpenAI、Claude、Gemini 等工具是很多用户的刚需。一个高性价比机场，如果不能稳定访问 ChatGPT，对很多用户来说价值会大打折扣。
第五看流媒体解锁能力。如果你有 Netflix、YouTube、Disney+、TikTok 等需求，就要看机场是否有流媒体节点。不要只看“支持全球流媒体”这种宣传语，最好自己测试。
第六看客户端支持。高性价比机场应该支持主流客户端，比如 Clash Verge Rev、Shadowrocket、v2rayN、v2rayNG、Stash、sing-box，并提供清晰教程。教程完整可以大幅降低新手使用成本。
第七看客服和公告。机场不可能永远不出问题，关键是出问题后有没有人处理。客服是否回复、公告是否更新、节点维护是否透明，都是判断长期稳定性的重点。
第八看套餐周期。高性价比不等于直接买年付。新手第一次建议月付测试，确认稳定后再季付。年付只适合已经长期验证过的机场。
第九看是否有异常低价。价格合理才可持续。长期超低价可能意味着超卖严重、线路拥挤、维护不足，甚至存在跑路风险。
总结
2026 年判断高性价比机场，要综合看流量、线路、延迟、速度、AI 工具访问、流媒体解锁、客户端教程、客服和运营稳定性。真正值得推荐的机场，不是最便宜，而是长期用起来稳定、省心、问题少。`;

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
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="高性价比机场不是价格最低，而是流量、线路、速度、延迟、解锁能力、客服和稳定性之间的平衡。本文介绍 2026 年判断机场是否值得购买的核心标准。">');
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
        tag: "硬核评测",
        summary: "高性价比 ≠ 便宜！手把手教你建立 9 维度的机场评估模型，把每一分钱都花在刀刃上。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
