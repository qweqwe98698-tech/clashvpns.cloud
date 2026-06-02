const fs = require('fs');
const path = require('path');

const title = "机场跑路前的 8 个信号：新手买机场前一定要看";
const short_title = "机场跑路前的 8 个信号";
const filename = "airport-runaway-8-signals-2026.html";

const content = `
        <p>在机场圈里，“跑路”是用户最怕遇到的问题。所谓机场跑路，通常指机场平台突然停止服务、官网打不开、客服失联、节点失效，而用户已经购买的套餐无法继续使用。对于买了月付的用户来说，损失可能还小；但如果买了年付、两年付甚至传家宝套餐，损失就会更明显。</p>
        <p>机场跑路并不一定毫无征兆。很多时候，在真正关闭之前，平台已经出现一些异常信号。新手在购买前和使用中都可以通过这些迹象判断风险。</p>

        <h2>第一个信号：突然推出极低价年付套餐</h2>
        <p>如果一个机场原本价格正常，突然开始大量促销，尤其是年付、两年付、三年付折扣极大，就要警惕。这可能是正常活动，也可能是运营方想在短时间内回收现金流。</p>

        <h2>第二个信号：客服长期不回复</h2>
        <p>稳定机场不一定 24 小时秒回，但至少应该有基本回应。如果工单长期无人处理，群组无人管理，用户问题没人解决，说明平台维护能力正在下降。</p>

        <h2>第三个信号：节点大面积不可用</h2>
        <p>单个节点维护很正常，但如果多个地区节点同时超时，而且持续很多天没有修复，就说明线路资源或维护能力出了问题。</p>

        <h2>第四个信号：官网和用户中心频繁打不开</h2>
        <p>机场官网、订阅后台、支付页面、用户中心如果经常无法访问，用户无法更新订阅、查看流量、联系客服，这就是明显风险。</p>

        <h2>第五个信号：公告长期不更新</h2>
        <p>正常运营的机场遇到线路维护、节点调整、订阅异常时，通常会发布公告。如果故障很多，但公告区长期没有任何说明，就说明运营透明度不足。</p>

        <h2>第六个信号：用户反馈突然集中变差</h2>
        <p>如果近期大量用户同时反馈节点慢、订阅失效、客服不回、官网打不开，这通常不是个别问题，而是整体运营出现异常。</p>

        <h2>第七个信号：套餐或节点突然缩水</h2>
        <p>例如原来有很多地区节点，后来只剩少数几个；原来支持 Netflix，后来无法解锁；原来速度正常，后来长期限速。这说明资源投入可能减少。</p>

        <h2>第八个信号：平台只发促销，不修问题</h2>
        <p>有些机场节点已经大面积异常，但公告只推优惠码、年付活动、限时折扣，却不说明故障原因，也不处理用户反馈，这种情况要特别谨慎。</p>

        <h2>防范指南：如何降低跑路风险？</h2>
        <p>新手要降低跑路风险，最重要的是不要盲目年付。第一次购买机场，建议优先月付。使用一段时间后，确认线路、客服、公告、订阅更新、晚高峰表现都正常，再考虑更长周期。</p>
        <p>此外，不要只看排行榜排名。很多推荐页可能带推广性质，不能完全代表真实稳定性。用户最好结合实际试用、社区反馈、节点测速、晚高峰体验一起判断。</p>

        <h2>总结</h2>
        <p>机场跑路前通常会出现异常低价、客服失联、节点失效、官网异常、公告停更、用户反馈变差等信号。新手选择机场时，不要只看便宜和宣传，更要看长期维护能力。最安全的策略是先月付测试，避免一次性购买高风险年付套餐。</p>
`;

const templateFile = fs.readFileSync(path.join(__dirname, 'clash-airport-tutorial.html'), 'utf8');

let newHtml = templateFile.replace(/<title>.*?<\/title>/, '<title>' + title + ' - 柳如烟</title>');
newHtml = newHtml.replace(/<meta name="description" content=".*?"/, '<meta name="description" content="机场跑路是新手购买 VPN 机场最担心的问题之一。本文整理机场跑路前常见的 8 个信号，包括低价年付、客服失联、节点大面积失效、官网异常、公告停更等，帮助用户提前判断风险。">');
newHtml = newHtml.replace(/<h1 class="article-title">.*?<\/h1>/, '<h1 class="article-title">' + title + '</h1>');

const contentRegex = /<div class="article-content">[\s\S]*?<div style="margin-top: 50px; text-align: center;">/;
const replacement = '<div class="article-content">\\n' + content + '\\n                <div style="margin-top: 50px; text-align: center;">';
newHtml = newHtml.replace(contentRegex, replacement);

fs.writeFileSync(path.join(__dirname, filename), newHtml, 'utf8');
console.log('Created ' + filename);

const guidesScript = path.join(__dirname, 'update_guides.js');
let guidesCode = fs.readFileSync(guidesScript, 'utf8');

const newArticleObj = `    {
        title: "机场跑路前的 8 个信号：新手买机场前一定要看",
        link: "airport-runaway-8-signals-2026.html",
        tag: "避坑指南",
        summary: "揭秘机场跑路前的蛛丝马迹，教你通过 8 个关键细节判断手里的梯子是否面临暴毙风险。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
