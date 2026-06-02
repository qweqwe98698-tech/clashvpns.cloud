const fs = require('fs');
const path = require('path');

const title = "Clash Verge Rev 机场订阅导入教程：Windows / macOS 新手完整指南";
const short_title = "Clash Verge Rev 新手完整指南";
const filename = "clash-verge-rev-subscription-tutorial-2026.html";

const content = `
        <p>Clash Verge Rev 是很多 Windows 和 macOS 用户常用的代理客户端，适合导入机场订阅链接后使用。对于新手来说，最重要的是理解三个东西：机场订阅链接、客户端配置、代理模式。</p>

        <h2>第一步：下载并安装 Clash Verge Rev</h2>
        <p>新手建议从可信来源获取客户端，安装完成后打开软件。Windows 用户通常安装 exe 程序，macOS 用户根据芯片选择对应版本。</p>

        <h2>第二步：复制机场订阅链接</h2>
        <p>进入你的机场网站后台，找到“订阅链接”“一键订阅”“Clash 订阅”“复制订阅”等按钮。不同机场叫法不同，但核心都是复制一条订阅 URL。</p>

        <h2>第三步：导入订阅链接</h2>
        <p>打开 Clash Verge Rev，进入“订阅”或“配置”页面。点击新增订阅，将刚才复制的机场订阅链接粘贴进去。填写名称时可以写机场名字，方便以后区分。然后点击保存、导入或更新。</p>

        <h2>第四步：等待订阅更新成功</h2>
        <p>成功后，你应该能在代理页面看到香港、日本、新加坡、美国等节点。如果导入后没有节点，可能是订阅链接复制错误、套餐过期、流量用完、订阅格式不支持或机场后台异常。</p>

        <h2>第五步：选择节点</h2>
        <p>新手可以先选择香港、日本、新加坡等低延迟节点。如果主要使用 ChatGPT，可以测试美国、日本、新加坡等节点；如果主要看 YouTube，可以选择速度稳定的香港、日本或美国节点；如果需要 Netflix，则选择机场标注的流媒体节点。</p>

        <h2>第六步：选择代理模式</h2>
        <p>常见模式有规则模式、全局模式、直连模式。新手日常使用建议选择规则模式。规则模式下，国内网站通常直连，海外网站走代理，体验更自然。</p>

        <h2>第七步：测试是否成功</h2>
        <p>可以打开 Google、YouTube、ChatGPT 等网站测试。如果网页可以打开，说明基础代理正常。如果 YouTube 卡顿，可以换节点。如果 ChatGPT 提示不可用，可以换地区节点。</p>

        <h2>常见问题排查</h2>
        <ul>
            <li><strong>订阅导入失败：</strong>重新复制订阅链接，确认没有空格或缺失字符；检查套餐是否有效；更新客户端；更换网络环境后再导入。</li>
            <li><strong>节点全部超时：</strong>可能是机场节点异常、本地网络问题、订阅过期、流量用完或系统代理没有开启。可以先更新订阅，再切换节点，最后查看公告。</li>
            <li><strong>代理打开了但网页打不开：</strong>检查系统代理是否开启、模式是否正确、浏览器是否使用了其他代理插件、防火墙是否拦截。</li>
        </ul>

        <h2>总结</h2>
        <p>Clash Verge Rev 的使用流程并不复杂：复制机场订阅链接，导入客户端，更新订阅，选择节点，开启规则模式，再测试访问。熟悉之后，Clash Verge Rev 会比一键 VPN 更灵活，也更适合多场景使用。</p>
`;

const templateFile = fs.readFileSync(path.join(__dirname, 'clash-airport-tutorial.html'), 'utf8');

let newHtml = templateFile.replace(/<title>.*?<\/title>/, '<title>' + title + ' - 柳如烟</title>');
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="Clash Verge Rev 是 Windows、macOS 用户常用的 Clash 客户端。本文介绍机场订阅链接如何导入 Clash Verge Rev，包括下载安装、导入订阅、选择节点、切换规则模式、测速和常见问题排查。">');
newHtml = newHtml.replace(/<h1 class="article-title">.*?<\/h1>/, '<h1 class="article-title">' + title + '</h1>');

const contentRegex = /<div class="article-content">[\s\S]*?<div style="margin-top: 50px; text-align: center;">/;
const replacement = '<div class="article-content">\\n' + content + '\\n                <div style="margin-top: 50px; text-align: center;">';
newHtml = newHtml.replace(contentRegex, replacement);

fs.writeFileSync(path.join(__dirname, filename), newHtml, 'utf8');
console.log('Created ' + filename);

const guidesScript = path.join(__dirname, 'update_guides.js');
let guidesCode = fs.readFileSync(guidesScript, 'utf8');

const newArticleObj = `    {
        title: "Clash Verge Rev 机场订阅导入教程：Windows / macOS 新手完整指南",
        link: "clash-verge-rev-subscription-tutorial-2026.html",
        tag: "新手教程",
        summary: "从零开始教你玩转 2026 年最流行的 Clash 客户端，告别配置恐惧，一键开启科学上网。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
