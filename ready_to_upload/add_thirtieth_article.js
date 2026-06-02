const fs = require('fs');
const path = require('path');

const title = "晚高峰测速图大比拼：快连 vs IEPL/IPLC 真专线机场，谁才是真稳定？";
const short_title = "快连 vs 真专线机场，谁才是真稳定？";
const filename = "letsvpn-vs-iepl-speedtest-2026.html";

const content = `
        <p>进入 2026 年以后，机场圈最热闹的时间段，往往不是白天，而是晚上 21:00 - 23:00。白天速度快，不一定代表线路好；真正能证明一个机场质量的，往往是晚高峰的延迟、抖动、丢包、YouTube 4K 播放、Speedtest 下载速度，以及长时间使用时是否断流。</p>
        <p>在各类网络社区里，经常会出现“晒速图”讨论：有人晒 IEPL / IPLC 专线机场测速，有人晒快连 VPN 的连接表现。到底谁在晚高峰更稳定？我们今天就来掰扯清楚。</p>

        <h2>一、为什么晚高峰测速最有参考价值？</h2>
        <p>很多机场白天测速很好看，但一到晚上 9 点以后，用户数量暴增，线路拥堵就会明显暴露出来。晚高峰测速图才是机场测评里的硬指标，敢长期展示晚上 21:00 - 23:00 真实表现的机场，可信度远高于只发白天 Speedtest 的机场。</p>

        <h2>二、真专线机场为什么晚高峰更有优势？</h2>
        <p>真正的 IEPL / IPLC 专线机场在线路质量、带宽储备上投入更高。相比普通公网中转，真专线更容易在高峰期保持低延迟和稳定下载速度。它卖的不是单纯流量，而是高峰期体验。</p>

        <h2>三、伪专线机场为什么容易在晚高峰露馅？</h2>
        <p>市场上有很多“伪专线机场”，实际只是普通公网中转包装。白天表现不错，但晚高峰会出现 4K 缓冲、Ping 值忽高忽低、节点频繁超时等问题。判断真伪不能只看节点名字，要看晚高峰多场景表现。</p>

        <h2>四、快连测速为什么和机场测速逻辑不同？</h2>
        <p>快连更像封闭式成品 VPN，主打一键连接。快连的优势体现在网页打开快、适合手机应急。但在重度场景（多线程下载、软路由全屋代理）下，未必能打过顶级专线机场。</p>

        <h2>五、网页秒开不等于下载强</h2>
        <p>网页访问看重首次连接速度、DNS 解析；大文件下载看重持续带宽、多线程吞吐。快连偏向轻量化和省心，顶级专线机场偏向高强度、大流量场景。</p>

        <h2>六、晚高峰应该怎么测快连和专线机场？</h2>
        <ul>
            <li><strong>Ping 延迟测试：</strong>观察波动是否稳定。</li>
            <li><strong>YouTube 4K 测试：</strong>观察 Connection Speed 和缓冲情况。</li>
            <li><strong>Speedtest 测试：</strong>多次测试下载、上传和延迟。</li>
            <li><strong>大文件下载测试：</strong>测试持续吞吐。</li>
            <li><strong>AI 工具测试：</strong>测试 ChatGPT 等是否响应变慢。</li>
        </ul>

        <h2>七、快连更适合哪些测速场景？</h2>
        <p>适合手机端网页打开、Telegram 通讯、轻量 ChatGPT 使用、短期回国应急、机场备用。快连的定位更像备用保险和小白工具。</p>

        <h2>八、专线机场更适合哪些测速场景？</h2>
        <p>适合 YouTube 4K、大文件下载、软路由全屋代理、多设备在线、高频 AI 工具使用。真专线机场的定位更像长期主力和重度方案。</p>

        <h2>九、机场测评站如何写“晚高峰测速图”更可信？</h2>
        <p>不要只发最好看的结果，要标注测试时间、运营商、是否晚高峰、是否多次取平均等，并说明测速图只能代表某个时间点的体验。</p>

        <h2>十、总结：晚高峰测速图不是炫技，而是识别真假的关键</h2>
        <p>追求省心、应急，选快连；追求高峰期稳定、大流量，选真专线机场。一句话总结：2026 年看机场测评，不要只看测速图最高，而要看晚高峰、长时间、多场景下依然稳定。</p>
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
        title: "晚高峰测速图大比拼：快连 vs IEPL/IPLC 真专线机场，谁才是真稳定？",
        link: "letsvpn-vs-iepl-speedtest-2026.html",
        tag: "硬核评测",
        summary: "扒开“白天百兆，晚上断流”的测速伪装，教你用最真实的网络极限测试看清谁在裸泳。"
    },`;

guidesCode = guidesCode.replace('const articles = [', 'const articles = [\n' + newArticleObj);
fs.writeFileSync(guidesScript, guidesCode, 'utf8');
console.log('Updated update_guides.js');
