const fs = require('fs');
const path = require('path');

// 内部蜘蛛网核心字典
const links = {
    "Clash Verge": "clash-verge-rev.html",
    "Shadowrocket": "shadowrocket.html",
    "小火箭": "shadowrocket.html",
    "v2rayN": "v2rayn.html",
    "Stash": "stash.html",
    "稳定机场": "recommend.html",
    "机场推荐": "recommend.html",
    "专线机场": "recommend.html",
    "机场测评": "airport-reviews.html",
    "快连": "letsvpn-vs-airport-ecosystem-2026.html",
    "免费节点": "cheap-airport-free-nodes-risk.html",
    "光速云": "guangsuyun.html",
    "大哥云": "dageyun.html",
    "肥猫云": "feimaoyun.html",
    "Gatern": "gatern.html",
    "龙猫云": "longmaoyun.html",
    "奈云": "naiyun.html",
    "青云梯": "qingyunti.html",
    "瞬云": "shunyun.html",
    "一云梯": "yiyunti.html"
};

function autoLinkKeywords(html) {
    let newHtml = html;
    for (const [kw, url] of Object.entries(links)) {
        // 匹配第一次出现的词（不在 a 标签等 html 标签内的才匹配）
        // 使用 (?<!<[^>]*) 和 (?![^<]*>) 来避免替换 HTML 标签属性内部的词
        const regex = new RegExp(`(?<!<[^>]*)${kw}(?![^<]*>)`, 'i');
        
        // 避免重复套娃，如果这个词已经被套在一个 a 标签里，就不替换
        // 但简单的正则很难完美避开所有的 a 标签嵌套，这里依赖上面的 (?<!<[^>]*)
        // 以及替换为带有特定标识的 a 标签。
        if (!newHtml.includes(`href="${url}"`)) {
             newHtml = newHtml.replace(regex, `<a href="${url}" style="color: #3b82f6; font-weight: 500; text-decoration: underline;" title="${kw}教程与评测">$&</a>`);
        }
    }
    return newHtml;
}

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

for (const file of files) {
    // 排除掉不适合替换正文的页面（如首页等）
    if (['index.html', 'recommend.html', 'airport-reviews.html', 'sitemap.html'].includes(file)) {
        continue;
    }

    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 找到文章正文部分
    const contentStartMatch = content.match(/<div class="article-content">/);
    if (!contentStartMatch) continue;

    const startIdx = contentStartMatch.index + contentStartMatch[0].length;
    // 粗略找到对应的闭合 div，如果是最后一个 div... 这里为了稳妥，直接替换 startIdx 之后的文本，直到遇到 <!-- 相关阅读 --> 或者 </article> 或者 footer。
    let endIdx = content.indexOf('</div>\n        </article>');
    if (endIdx === -1) endIdx = content.indexOf('</article>');
    if (endIdx === -1) endIdx = content.indexOf('<div class="sticky-cta">');
    if (endIdx === -1) endIdx = content.length;

    let preContent = content.substring(0, startIdx);
    let mainContent = content.substring(startIdx, endIdx);
    let postContent = content.substring(endIdx);

    const oldMainContent = mainContent;
    mainContent = autoLinkKeywords(mainContent);

    if (oldMainContent !== mainContent) {
        fs.writeFileSync(filePath, preContent + mainContent + postContent, 'utf8');
        console.log(`✅ 已织网: ${file}`);
        updatedCount++;
    }
}

console.log(`\n🎉 蜘蛛网织网完成！共更新 ${updatedCount} 篇文章。`);
