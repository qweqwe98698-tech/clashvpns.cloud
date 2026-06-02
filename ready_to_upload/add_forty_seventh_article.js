const fs = require('fs');
const path = require('path');

const title = "机场年付套餐能不能买？为什么更建议新手先月付或季付";
const short_title = "机场年付套餐能不能买？";
const filename = "airport-annual-plan-risk-analysis-2026.html";

const rawContent = `机场年付套餐能不能买？这是很多新手都会纠结的问题。年付看起来确实更划算，很多机场月付价格正常，但年付折扣很大。用户算下来会觉得：反正都要用，不如一次买一年。
但对于新手来说，不建议第一次就直接买年付。原因不是年付一定不能买，而是你还没有验证这个机场是否适合自己。
首先，你不知道线路是否稳定。机场宣传页面可以写得很好看，但真实体验要看使用过程。白天快不代表晚上快，单次测速快不代表长期稳定。只有实际用过一段时间，才能判断节点是否可靠。
其次，你不知道 ChatGPT、Netflix、YouTube 是否真的适合你。有些机场普通网页访问没问题，但 ChatGPT 经常不可用；有些机场 YouTube 能看，但 Netflix 解锁不稳定；有些机场节点很多，但常用地区体验一般。如果直接年付，后期发现不适合，就很难处理。
第三，你不知道客服是否靠谱。机场使用过程中难免遇到订阅失效、节点超时、流量异常、客户端配置问题。如果客服长期不回复，年付用户会非常被动。
第四，你不知道机场是否长期稳定运营。机场行业变化快，线路成本、服务器、支付、面板、安全、政策环境都会影响运营。如果一个机场后期节点缩水、服务下降甚至跑路，年付用户损失最大。
第五，低价年付容易隐藏风险。有些机场通过极低价格吸引用户购买长期套餐，短期获得大量现金流，但后期维护跟不上。特别是传家宝套餐、超低价多年套餐，新手要格外谨慎。
那么年付是不是完全不能买？也不是。如果一个机场你已经连续使用几个月，晚高峰稳定，ChatGPT 正常，流媒体解锁符合需求，客服回应正常，公告持续更新，节点维护及时，那么可以考虑年付。但即使如此，也不建议把所有希望押在一个机场上。
更稳妥的购买策略是：第一次购买月付，主要测试基础体验；第二阶段可以季付，观察长期稳定性；第三阶段确认可靠后，再考虑半年付或年付。对于超低价多年套餐，不建议新手购买。
如果你是重度用户，也可以准备一个备用机场。主机场用于日常使用，备用机场用于线路故障或订阅异常时临时切换。这样即使某个平台出现问题，也不会影响工作和学习。
总结
机场年付套餐不是绝对不能买，但不适合新手第一次购买。新手更建议先月付测试，再季付观察，最后根据长期体验决定是否年付。买机场最重要的不是省下那一点折扣，而是避免踩坑、减少跑路风险，确保 ChatGPT、YouTube、Netflix 和日常访问长期稳定。`;

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
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="机场年付套餐价格通常更便宜，但也伴随线路变化、节点不稳定、客服失联、机场跑路等风险。本文分析年付机场能不能买，以及为什么新手更适合先月付或季付测试。">');
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
        summary: "买一年省一半？揭秘低价年付套餐背后的资金流逻辑，告诉你为什么聪明的老手宁可月付也不接盘传家宝。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
