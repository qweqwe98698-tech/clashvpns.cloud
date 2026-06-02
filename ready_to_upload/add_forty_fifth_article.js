const fs = require('fs');
const path = require('path');

const title = "Clash 规则模式、全局模式、直连模式有什么区别？新手一看就懂";
const short_title = "Clash 规则模式怎么选？";
const filename = "clash-modes-explained-2026.html";

const rawContent = `很多新手第一次使用 Clash Verge Rev、Clash Meta 或其他 Clash 客户端时，都会看到几个模式：规则模式、全局模式、直连模式。有些用户不知道该选哪个，结果明明导入了机场订阅，却还是打不开网站，或者国内网站变得很慢。
其实这三个模式很好理解。
规则模式，是最适合日常使用的模式。它会根据规则判断哪些网站走代理，哪些网站直连。通常情况下，国内网站直连，海外网站走机场节点。比如访问国内视频、网购、银行、学校网站时直连；访问 Google、YouTube、ChatGPT、Netflix 时走代理。
规则模式的优点是体验自然，不会让所有流量都绕远路。对于大多数新手来说，日常使用选择规则模式就够了。
全局模式，是让几乎所有网络流量都走代理节点。无论访问国内网站还是海外网站，都会通过当前选择的机场节点。全局模式适合临时测试节点是否可用，或者某些特殊场景需要所有流量都走代理。
但全局模式不适合长期日常使用。因为国内网站也走海外节点，可能导致访问变慢；一些本地服务、局域网设备、银行或支付页面也可能出现异常。
直连模式，是所有流量都不走代理。你可以理解为关闭代理，只使用本地网络。直连模式适合临时停用机场，或者排查问题时使用。
新手最常见的错误，是把模式选成直连，然后以为机场不能用。另一个常见错误，是长期使用全局模式，导致国内网站变慢。还有一些用户规则配置不完整，导致本该走代理的网站没有走代理，这时可以临时切到全局模式测试。
推荐使用方法是：日常使用选规则模式；测试节点是否能打开海外网站时，可以临时用全局模式；不需要代理时，切换直连模式或关闭系统代理。
如果规则模式下 Google 打不开，但全局模式能打开，说明规则可能没有正确匹配，或者当前规则配置有问题。可以更新订阅、切换配置、使用机场推荐规则，或者重新导入订阅。
如果全局模式下国内网站很慢，这是正常现象，因为所有流量都走代理了。切回规则模式即可。
如果直连模式下海外网站打不开，也是正常现象，因为此时没有使用机场节点。
总结
Clash 三种模式可以这样记：规则模式适合日常使用，全局模式适合临时测试，直连模式等于不走代理。新手默认选择规则模式最稳，遇到问题时再用全局模式测试节点是否正常。理解这三种模式后，使用 Clash Verge Rev 会轻松很多。`;

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
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="Clash 客户端常见模式包括规则模式、全局模式和直连模式。本文用新手能看懂的方式解释三种模式区别，告诉你日常使用、测试节点、关闭代理时应该怎么选。">');
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
        summary: "为什么节点连上了还是打不开网页？一文搞懂 Clash 的核心灵魂：规则模式与全局模式的区别。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
