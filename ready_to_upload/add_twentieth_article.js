const fs = require('fs');
const path = require('path');

const title = "快连自主分流 vs 机场规则分流：2026 年中国应用分流谁更智能？";
const short_title = "中国应用分流谁更智能？";
const filename = "letsvpn-vs-airport-routing-2026.html";

const content = `
        <p>进入 2026 年以后，VPN 和机场用户越来越关注一个细节：分流是否智能。</p>
        <p>过去很多新手只关心“能不能连接”“速度快不快”。但真正长期使用之后，用户会发现，影响体验的不只是节点速度，还有一个非常关键的问题：国内 App 是否走直连，海外网站是否走代理。如果分流做得不好，就容易出现国内 App 变慢、游戏延迟升高、支付页面打不开等问题。</p>
        <p>因此，2026 年做快连测评、机场测评时，“中国应用分流”“规则模式”已经成为非常重要的测评维度。</p>

        <h2>一、什么是中国应用分流？</h2>
        <p>中国应用分流，简单理解就是：国内网站和国内 App 尽量走本地网络，海外网站和海外 App 才走代理。这样做的好处是非常明显的：国内 App 更快、支付和登录更稳定、游戏国服延迟更低、流量消耗更合理。</p>
        <p>所以，一个好用的 VPN 或机场客户端，不能只看“能不能翻出去”，还要看它能不能把国内外流量分清楚。</p>

        <h2>二、传统机场为什么更依赖 Clash / Sing-box 规则集？</h2>
        <p>传统机场通常会提供订阅链接，用户把订阅导入 Clash 等客户端后，通过规则模式实现分流。这种方式的优势是灵活度高，对于进阶用户来说非常强大。但缺点是学习成本高，新手并不懂什么是规则模式。</p>

        <h2>三、快连“仅代理海外网站”的优势在哪里？</h2>
        <p>快连自带类似“仅代理海外网站”的功能。软件会尝试自动判断哪些流量应该走代理，哪些直连。优势是不需要手动配置、新手上手简单。对小白用户来说，这种自动分流体验比传统机场更省心。</p>

        <h2>四、快连分流为什么偶尔会误伤国内 App？</h2>
        <p>到了 2026 年，国内 App 和海外服务的边界越来越复杂。这会导致快连的自动分流有时判断不准确。常见表现包括：国内 App 加载变慢、游戏国服延迟升高、国内支付页面跳转慢等。</p>

        <h2>五、机场规则分流和快连自动分流有什么区别？</h2>
        <ul>
            <li><strong>快连：简单，但可控性有限。</strong>适合不想折腾的新手，但某个 App 被误伤时，用户可调整空间有限。</li>
            <li><strong>机场：复杂，但可控性强。</strong>通过规则集和自定义规则，实现更细的控制，适合进阶用户。</li>
        </ul>

        <h2>六、为什么游戏国服最容易暴露分流问题？</h2>
        <p>国内游戏国服对延迟非常敏感。如果错误走代理，可能会出现 Ping 值升高、游戏掉线等问题。传统机场用户可以通过规则解决，快连用户则依赖软件自身智能度。</p>

        <h2>七、快连分流适合哪些用户？</h2>
        <p>适合不想配置规则的新手、主要用手机访问海外网站的人、短期回国用户、把快连当备用工具的人。</p>

        <h2>八、传统机场分流适合哪些用户？</h2>
        <p>适合多设备用户、软路由用户、流媒体用户、AI 工具重度用户、需要规则分流的人。</p>

        <h2>九、2026 年分流测评应该怎么写？</h2>
        <p>建议把“分流智能度”单独做成一个栏目。测试微信/支付宝是否直连、国服游戏延迟是否升高、ChatGPT 是否正常代理等。</p>

        <h2>十、总结：2026 年好用的 VPN，不只是能连，还要会分流</h2>
        <p>快连赢在简单，适合备用和轻量使用；机场赢在精细，适合主力方案。一句话总结：2026 年真正好用的工具，不只是能翻出去，还要让国内应用不被误伤。</p>
`;

const templateFile = fs.readFileSync(path.join(__dirname, 'clash-airport-tutorial.html'), 'utf8');

let newHtml = templateFile.replace(/<title>.*?<\/title>/, '<title>' + title + ' - 柳如烟</title>');
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="' + title + '，提供2026年最新科学上网、机场节点、VPN 加速器相关的详细指南与评测。">');
newHtml = newHtml.replace(/<h1 class="article-title">.*?<\/h1>/, '<h1 class="article-title">' + title + '</h1>');

const contentRegex = /<div class="article-content">[\s\S]*?<div style="margin-top: 50px; text-align: center;">/;
const replacement = '<div class="article-content">\\n' + content + '\\n                <div style="margin-top: 50px; text-align: center;">';
newHtml = newHtml.replace(contentRegex, replacement);

fs.writeFileSync(path.join(__dirname, filename), newHtml, 'utf8');
console.log('Created ' + filename);

const guidesScript = path.join(__dirname, 'update_guides.js');
let guidesCode = fs.readFileSync(guidesScript, 'utf8');

const newArticleObj = `    {
        title: "快连自主分流 vs 机场规则分流：2026 年中国应用分流谁更智能？",
        link: "letsvpn-vs-airport-routing-2026.html",
        tag: "新手教程",
        summary: "揭秘 VPN 误伤国内 App 的真相，教你如何选择分流更智能的科学上网工具。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
