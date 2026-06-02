const fs = require('fs');
const path = require('path');

const title = "假官网与搜索引擎钓鱼陷阱：2026 年下载快连和机场客户端为什么一定要认准官方？";
const short_title = "下载快连和机场客户端为什么一定要认准官方？";
const filename = "fake-website-phishing-trap-2026.html";

const content = `
        <p>进入 2026 年以后，机场和 VPN 用户面临的风险，已经不只是“节点能不能用”，还有一个越来越严重的问题：假官网和钓鱼网站泛滥。很多新手用户遇到主力机场失效时，会临时搜索“快连官网”“快连下载”“Nexitally 官网”等关键词。结果搜索出来的页面并不一定是官方站，反而可能是仿冒站、带恶意安装包的假页面。</p>

        <h2>一、为什么假快连和钓鱼机场越来越多？</h2>
        <p>假官网泛滥的核心原因是这些品牌本身有搜索热度。只要用户搜索量足够大，就会有人利用 SEO、仿冒域名来截流。尤其是用户急着下载备用梯子或急着续费时，判断力会下降，很容易误入假官网。</p>

        <h2>二、假官网常见套路</h2>
        <ul>
            <li><strong>域名伪装得很像官方：</strong>多加字母、换后缀等。</li>
            <li><strong>页面设计高度仿冒：</strong>复制官方 Logo、配色、按钮。</li>
            <li><strong>提供篡改安装包：</strong>这是最危险的地方，可能捆绑流氓软件、窃取账号信息。</li>
            <li><strong>伪装客服诱导付款：</strong>诱导购买所谓“永久会员”，付款后无法使用。</li>
            <li><strong>仿冒 App Store 页面：</strong>高仿应用商店页面诱导下载。</li>
        </ul>

        <h2>三、钓鱼机场为什么比普通假网站更危险？</h2>
        <p>VPN 工具本身涉及网络连接，如果安装包被篡改，可能影响整个设备的网络安全。一旦误入钓鱼站，可能带来账号被盗、支付信息泄露等严重风险。</p>

        <h2>四、为什么搜索引擎第一页也不能完全相信？</h2>
        <p>搜索结果靠前不等于一定是官方。搜索排名可能受到广告投放、SEO 优化影响。热门关键词如“快连官网”“机场官网”都有商业价值，钓鱼站会刻意抢排名。</p>

        <h2>五、如何识别假快连和钓鱼机场？</h2>
        <p>看域名是否可信；不下载所谓破解版；不相信陌生客服；警惕过度夸张文案；优先官方应用商店；下载后不要急着登录。</p>

        <h2>六、误入钓鱼网站后应该怎么办？</h2>
        <p>立即停止使用可疑软件；卸载可疑安装包；修改重要账号密码；开启两步验证；检查登录记录；保留证据。</p>

        <h2>七、机场用户为什么更容易被钓鱼？</h2>
        <p>机场用户经常需要寻找最新地址，如果不提前收藏官方渠道，临时搜索最容易遇到假站。机场用户应该养成提前收藏官方入口、保存官方 TG 频道等习惯。</p>

        <h2>八、机场推荐站应该怎么写“官网安全”栏目？</h2>
        <p>建议每个品牌测评都写清楚官网入口是否容易混淆、是否存在仿冒站风险等，这不仅能提高专业度，也能覆盖大量 SEO 关键词。</p>

        <h2>九、2026 年下载 VPN 和机场客户端的安全原则</h2>
        <p>不乱搜；不贪便宜；不装来路不明安装包；不信私聊客服；不把账号密码交给陌生页面；提前准备备用入口。</p>

        <h2>十、总结：2026 年真正的机场避坑，第一步是别进假官网</h2>
        <p>2026 年下载 VPN 或机场客户端，最重要的不是谁排在搜索第一，而是谁才是真正官方；认准正版渠道，比测速和价格更重要。</p>
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
        title: "假官网与搜索引擎钓鱼陷阱：2026 年下载快连和机场客户端为什么一定要认准官方？",
        link: "fake-website-phishing-trap-2026.html",
        tag: "防骗必读",
        summary: "深度揭秘搜索引擎排名第一的“假官网”套路，手把手教你如何安全下载 VPN 客户端。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
