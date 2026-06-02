const fs = require('fs');
const path = require('path');

const title = "机场订阅链接失效怎么办？Clash、Shadowrocket、v2rayN 排查教程";
const short_title = "机场订阅链接失效怎么办？";
const filename = "airport-subscription-link-invalid-troubleshooting-2026.html";

const content = `
        <p>机场订阅链接失效，是很多新手都会遇到的问题。表现可能是 Clash 导入失败、Shadowrocket 更新订阅失败、v2rayN 节点为空、节点全部超时、订阅链接打不开等。遇到这种情况，不要急着认为机场跑路。按顺序排查通常都能找到问题。</p>

        <h2>第一步：检查套餐是否有效</h2>
        <p>登录机场后台，查看套餐是否过期、流量是否用完、账号是否被暂停。有些机场流量用完后会自动禁用订阅，需要续费或重置流量后恢复。</p>

        <h2>第二步：重新复制订阅链接</h2>
        <p>很多导入失败其实是复制不完整造成的。复制时不要漏掉前后字符，也不要混入空格。建议在机场后台点击“一键复制订阅”。</p>

        <h2>第三步：在客户端手动更新订阅</h2>
        <p>Clash Verge Rev、Shadowrocket、v2rayN 都有更新订阅或刷新配置的功能。如果机场已经更换节点，但客户端没有更新，就可能显示旧节点不可用。</p>

        <h2>第四步：检查订阅格式是否匹配</h2>
        <p>有些机场提供多个订阅入口。比如 Clash Verge Rev 优先使用 Clash 订阅，Shadowrocket 使用小火箭订阅或通用订阅。不同客户端最好选择对应格式。</p>

        <h2>第五步：删除旧配置重新导入</h2>
        <p>如果客户端缓存异常，旧配置可能影响新订阅。可以删除原来的订阅配置，然后重新添加。注意先确认自己已经保存了新的订阅链接。</p>

        <h2>第六步：检查本地网络</h2>
        <p>有时候不是机场问题，而是当前网络无法访问订阅地址。可以换手机热点、换 WiFi、重启路由器，或者稍后再试。</p>

        <h2>第七步：查看机场公告</h2>
        <p>如果机场正在维护订阅服务器、更新节点，可能会短时间无法更新订阅。正规机场通常会在公告里说明。</p>

        <h2>第八步：重置订阅链接</h2>
        <p>如果你怀疑订阅链接被别人使用，或者流量异常消耗，可以在机场后台重置订阅。重置后旧链接会失效，需要把新链接重新导入客户端。</p>

        <h2>常见客户端重点检查项</h2>
        <ul>
            <li><strong>Clash Verge Rev：</strong>重点检查配置页面是否填写正确，订阅 URL 是否完整，是否点击了更新。</li>
            <li><strong>Shadowrocket：</strong>重点检查添加类型是否正确，URL 是否粘贴完整，是否开启了配置。</li>
            <li><strong>v2rayN：</strong>重点检查是否选择了从订阅地址更新，是否使用了正确分组。</li>
        </ul>

        <h2>总结</h2>
        <p>机场订阅链接失效，新手按“查套餐、复制链接、更新订阅、换格式、删旧配置、看公告、联系客服”的顺序排查，通常可以快速定位问题。</p>
`;

const templateFile = fs.readFileSync(path.join(__dirname, 'clash-airport-tutorial.html'), 'utf8');

let newHtml = templateFile.replace(/<title>.*?<\/title>/, '<title>' + title + ' - 柳如烟</title>');
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="机场订阅链接失效是新手常见问题。本文从套餐状态、链接复制、客户端更新、流量用完、订阅被重置、节点异常等角度，讲解 Clash、Shadowrocket、v2rayN 订阅失败的排查方法。">');
newHtml = newHtml.replace(/<h1 class="article-title">.*?<\/h1>/, '<h1 class="article-title">' + title + '</h1>');

const contentRegex = /<div class="article-content">[\s\S]*?<div style="margin-top: 50px; text-align: center;">/;
const replacement = '<div class="article-content">\\n' + content + '\\n                <div style="margin-top: 50px; text-align: center;">';
newHtml = newHtml.replace(contentRegex, replacement);

fs.writeFileSync(path.join(__dirname, filename), newHtml, 'utf8');
console.log('Created ' + filename);

const guidesScript = path.join(__dirname, 'update_guides.js');
let guidesCode = fs.readFileSync(guidesScript, 'utf8');

const newArticleObj = `    {
        title: "机场订阅链接失效怎么办？Clash、Shadowrocket、v2rayN 排查教程",
        link: "airport-subscription-link-invalid-troubleshooting-2026.html",
        tag: "新手教程",
        summary: "节点全红、更新失败、导入报错？一文教你快速排查 90% 的机场订阅失效问题，拒绝盲目焦虑。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
