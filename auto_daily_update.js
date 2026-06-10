const fs = require('fs');

// --- 防止重复生成逻辑 ---
{
    const _fs = require('fs');
    const _path = require('path');
    const _today = new Date().toISOString().split('T')[0];
    const _marker = _path.join(__dirname, '.daily_run_date');
    if (_fs.existsSync(_marker)) {
        const _last = _fs.readFileSync(_marker, 'utf8');
        if (_last === _today) {
            console.log("检测到今日已生成过文章，跳过生成以防重复！");
            process.exit(0);
        }
    }
    _fs.writeFileSync(_marker, _today, 'utf8');
}
// ------------------------

const path = require('path');
const { execSync } = require('child_process');

// ================= 配置区域 =================
// 自动读取您的 API 密码 (支持环境变量 GEMINI_API_KEY 或 DEEPSEEK_API_KEY)
const API_KEY = process.env.DEEPSEEK_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY || 'YOUR_API_KEY_HERE';
const DAILY_ARTICLE_COUNT = 2;

const KEYWORDS = [
    "机场推荐", "科学上网", "稳定梯子", "翻墙节点", "高速机场",
    "IPLC专线", "IEPL专线", "流媒体解锁", "Netflix节点", "Clash订阅",
    "Shadowrocket节点", "Trojan机场", "V2ray节点", "游戏加速节点",
    "ChatGPT节点", "AI免封号节点", "原生住宅IP"
];

function getRandomKeywords(count) {
    const shuffled = KEYWORDS.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).join('、');
}

// ================= 新增：抓取实时热点 =================
async function getHotTopics() {
    try {
        console.log("🔥 正在抓取实时热点...");
        const res = await fetch('https://weibo.com/ajax/side/hotSearch');
        if (res.ok) {
            const data = await res.json();
            const top10 = data.data.realtime.slice(0, 10).map(item => item.word);
            console.log(`🔥 成功抓取今日热点: ${top10.slice(0,5).join('、')}`);
            return top10.join('、');
        }
    } catch (e) {
        console.log("⚠️ 实时热点抓取失败，使用备用热点库...");
    }
    return "ChatGPT大面积封号、某机场突然跑路、Telegram连接被重置、Netflix严打密码共享、iPhone新功能需要原生IP解锁";
}

// ================= 新增：IndexNow API 推送 =================
async function pushToIndexNow(urls) {
    if (!urls || urls.length === 0) return;
    const host = "clashvpns.cloud";
    const key = "1b643f8d3f5d46439f1e72607f3a9384"; 
    const keyLocation = `https://${host}/${key}.txt`;
    
    // 确保 key 文件存在
    require('fs').writeFileSync(`${key}.txt`, key, 'utf8');

    const payload = {
        host: host,
        key: key,
        keyLocation: keyLocation,
        urlList: urls.map(url => `https://${host}/${url}`)
    };

    try {
        console.log(`🚀 正在向 IndexNow 推送 ${urls.length} 个新链接以求强行秒收录...`);
        const res = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payload)
        });
        console.log(`✅ IndexNow 推送状态: ${res.status}`);
    } catch (e) {
        console.error("❌ IndexNow 推送失败:", e.message);
    }
}

// 📡 雷达探测！使用 DeepSeek 模型
async function getBestModel() {
    console.log("🔍 准备使用 DeepSeek AI...");
    return 'deepseek-chat';
}

async function callAIWithRetry(systemPrompt, userPrompt, modelName, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await callAI(systemPrompt, userPrompt, modelName);
        } catch (e) {
            console.log(`⚠️ AI 调用失败 (第 ${i + 1} 次): ${e.message}`);
            if (i === retries - 1) throw e;
            await new Promise(res => setTimeout(res, 2000 * (i + 1)));
        }
    }
}

async function callAI(systemPrompt, userPrompt, modelName) {
    const url = `https://api.deepseek.com/chat/completions`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: modelName,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            temperature: 0.7
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`API 请求失败: ${response.status} ${err}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
}

// ================= 核心流程 =================

// ================= 新增：自动智能内链引擎 =================
function autoLinkKeywords(html) {
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
    let newHtml = html;
    for (const [kw, url] of Object.entries(links)) {
        // 匹配第一次出现的词（不在 a 标签等 html 标签内的才匹配）
        const regex = new RegExp(`(?<!<[^>]*)${kw}(?![^<]*>)`, 'i');
        newHtml = newHtml.replace(regex, `<a href="${url}" style="color: #3b82f6; font-weight: 500; text-decoration: underline;" title="${kw}教程与评测">$&</a>`);
    }
    return newHtml;
}

async function main() {
    console.log(`[${new Date().toLocaleString()}] 开始执行每日自动更新任务...`);

    if (API_KEY === 'YOUR_API_KEY_HERE' || !API_KEY) {
        console.error("🚨 请先配置 API_KEY！");
        process.exit(1);
    }

    let modelName;
    try {
        modelName = await getBestModel();
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }

    const dailyHotTopics = await getHotTopics();
    const newGeneratedUrls = [];

    for (let i = 0; i < DAILY_ARTICLE_COUNT; i++) {
        console.log(`\n--- 开始生成第 ${i + 1} 篇文章 ---`);
        const targetKeywords = getRandomKeywords(3);
        console.log(`选中关键词: ${targetKeywords}`);

        const currentYear = new Date().getFullYear();
        const metaPrompt = `你是一个资深的 SEO 专家和机场评测博主。当前年份是 ${currentYear} 年。请结合今日最新热点事件：【${dailyHotTopics}】，并根据以下关键词：【${targetKeywords}】，构思一篇全新、专业、深度且带有“蹭热点”性质长文的元数据（例如《某某跑路怎么办？最新防封号稳定机场推荐》）。
要求：如果标题中出现年份，必须是 ${currentYear} 年，绝对不能使用 2025 或更早的年份！
要求输出严格的 JSON 格式（不要带有 markdown 代码块，只输出纯 JSON）：
{
    "title": "文章标题（必须自然结合热点事件和关键词，包含 ${currentYear} 年，标题要极具吸引力和煽动性）",
    "filename": "english-seo-friendly-filename.html",
    "summary": "文章简介（不超过 80 个字，直接切中热点和痛点）",
    "tag": "四字标签（如：突发热点/防坑指南/硬核评测）"
}`;
        
        let metaJsonStr = await callAIWithRetry("你只输出合法的 JSON，不要输出其他任何废话。", metaPrompt, modelName);
        metaJsonStr = metaJsonStr.replace(/```json/g, '').replace(/```/g, ''); 
        const metaData = JSON.parse(metaJsonStr);
        console.log(`成功生成元数据: ${metaData.title}`);

        const articlePrompt = `你是一个化名为“柳如烟”的资深科学上网/机场评测老炮儿。请根据标题：【${metaData.title}】撰写一篇文章。今日的实时热点是：【${dailyHotTopics}】。当前是 ${currentYear} 年！
要求：
1. 【蹭实时热点】：在正文开头巧妙且自然地提及今日的突发热点事件，借此引出“为什么需要一个稳定可靠的机场/节点”，形成极其爆炸的截流引流效果。
2. 【人设与语气】：你是砸钱替大家踩过无数坑的老手，语气要犀利、接地气、敢于揭露行业黑幕。
3. 【内容深度】：正文字数不少于 800 字，提供硬核干货。尽量用具体的“数字”说话，通过量化数据显得极其专业。文中任何提到年份的地方，必须使用 ${currentYear} 年，绝对不可以出现 2024、2025 等过期年份！
4. 【SEO 与结构】：合理穿插关键词：${targetKeywords}。排版必须清晰，多用 <ul><li> 列表和 <strong> 加粗重点。
5. 【内链引流】：必须在正文的某个自然段落中，极其自然地插入一句完整的 HTML 超链接引流代码：前往 <a href="recommend.html" style="color: #007bff; font-weight: bold;">柳如烟精选节点榜单</a> 看实测结果。
6. 【FAQ 板块】：在文章结尾，必须固定加一个 <h2>常见问题解答 (FAQ)</h2> 的板块。
7. 【格式规范】：只输出文章主体的 HTML 代码（只包含 <p>, <h2>, <h3>, <ul>, <li>, <strong>, <a> 等标签），绝对不要输出 <html>、<body> 或 \`\`\`html 这种代码块标记。千万不要写“结语”二字。`;
        
        console.log(`正在生成文章正文 (请稍候，可能需要 10-30 秒)...`);
        let articleHtmlContent = await callAIWithRetry("你是一个专业的 HTML 文章内容生成器，只输出 HTML 代码。", articlePrompt, modelName);
        articleHtmlContent = autoLinkKeywords(articleHtmlContent);
        console.log(`文章正文生成完毕，字数: ${articleHtmlContent.length}`);

        
        // --- 随机选取 3 篇相关阅读 ---
        let relatedHtml = '';
        try {
            const guidesContent = fs.readFileSync('update_guides.js', 'utf8');
            const match = guidesContent.match(/const articles = \s*\[([\s\S]*?)\];/);
            if (match) {
                // 用 eval 解析一下 (安全可控，只读自己的文件)
                const articlesData = eval('[' + match[1] + ']');
                if (articlesData && articlesData.length > 0) {
                    // 打乱随机取 3 个
                    const shuffled = articlesData.sort(() => 0.5 - Math.random()).slice(0, 3);
                    relatedHtml = `
                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                        <h3 style="font-size: 1.3rem; margin-bottom: 15px; color: var(--text-main);">相关阅读推荐：</h3>
                        <ul style="list-style: none; padding-left: 0;">
                            ${shuffled.map(item => `<li style="margin-bottom: 10px;">👉 <a href="${item.link}" style="color: var(--accent-blue); text-decoration: underline;">${item.title}</a></li>`).join('')}
                        </ul>
                    </div>`;
                }
            }
        } catch (e) {
            console.log('获取相关阅读失败: ' + e.message);
        }
        
        const stickyHtml = `
        <!-- 移动端吸底转化横幅 -->
        <div class="sticky-cta">
            <div class="sticky-cta-text">
                寻找高性价比节点？
                <span>获取 ${currentYear} 最新特惠稳定机场</span>
            </div>
            <a href="recommend.html?utm_source=article_bottom" class="btn btn-primary">立即查看</a>
        </div>
        `;

        const template = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${metaData.title} - 柳如烟推荐机场</title>
    <meta name="description" content="${metaData.summary}">
    <meta name="geo.region" content="CN" />
    <meta name="geo.placename" content="China" />
    <link rel="icon" href="logo.png" type="image/png">
    
    <meta property="og:title" content="${metaData.title}">
    <meta property="og:description" content="${metaData.summary}">
    <meta property="og:type" content="article">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${metaData.title}",
      "description": "${metaData.summary}",
      "author": {
        "@type": "Person",
        "name": "柳如烟"
      },
      "datePublished": "${new Date().toISOString().split('T')[0]}"
    }
    </script>
    <link rel="stylesheet" href="style.css">
    <style>
        .article-container { max-width: 800px; margin: 120px auto 60px; padding: 50px; background: rgba(255,255,255,0.8); backdrop-filter: blur(12px); border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.5); box-shadow: 0 10px 30px -5px rgba(0,0,0,0.02); }
        .article-title { font-size: 2.2rem; margin-bottom: 15px; color: var(--primary-color); font-weight: 800; }
        .article-meta { color: var(--text-light); margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid var(--border-color); font-size: 0.95rem; display: flex; gap: 20px; }
        .article-content h2 { margin-top: 40px; margin-bottom: 20px; color: var(--text-main); font-size: 1.5rem; position: relative; padding-left: 14px; }
        .article-content h2::before { content: ''; position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 20px; background-color: var(--accent-blue); border-radius: 2px; }
        .article-content p { margin-bottom: 16px; color: var(--text-light); line-height: 1.8; font-size: 1.05rem; }
    </style>
</head>
<body style="background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);">
    <header class="navbar">
        <div class="container nav-container">
            <div class="nav-logo">
                <a href="index.html"><img src="logo.png" alt="柳如烟推荐机场 Logo" class="logo-img">柳如烟推荐机场</a>
            </div>
            <nav class="nav-links">
                <a href="index.html#hero">首页</a>
                <a href="recommend.html">机场推荐</a>
                <a href="airport-reviews.html">机场测评</a>
            </nav>
        </div>
    </header>

    <main>
        <article class="container article-container">
            <h1 class="article-title">${metaData.title}</h1>
            <div class="article-meta">
                <span><i class="icon-calendar"></i> 更新时间：${new Date().toISOString().split('T')[0]}</span>
                <span><i class="icon-user"></i> 作者：柳如烟</span>
            </div>
            <div class="article-content">
                ${articleHtmlContent}
                ${relatedHtml}
                <div style="margin-top: 50px; text-align: center;">
                    <a href="recommend.html?utm_source=article_bottom" class="btn btn-primary" style="padding: 15px 40px; font-size: 1.2rem; border-radius: var(--radius-full); background-color: #1a1025; color: #fff;">查看柳如烟精选机场推荐</a>
                </div>
            </div>
        </article>
    </main>
    ${stickyHtml}
    <script src="script.js"></script>
    <script src="fix_footer.js"></script>
</body>
</html>`;
        
        fs.writeFileSync(metaData.filename, template, 'utf8');
        console.log(`成功写入网页文件: ${metaData.filename}`);

        console.log(`正在将文章追加到 update_guides.js 中...`);
        let guidesCode = fs.readFileSync('update_guides.js', 'utf8');
        const newArticleItem = `    {
        title: "${metaData.title}",
        link: "${metaData.filename}",
        tag: "${metaData.tag}",
        summary: "${metaData.summary}"
    },`;
        
        // 🚨 强力正则匹配：无论有几个空格换行，都能精准插入到首页列表最前面！
        if (guidesCode.match(/const\s+articles\s*=\s*\[/)) {
            guidesCode = guidesCode.replace(/const\s+articles\s*=\s*\[/, 'const articles = [\n' + newArticleItem);
            fs.writeFileSync('update_guides.js', guidesCode, 'utf8');
            console.log(`✅ 成功将【${metaData.title}】的卡片添加到首页列表中！`);
        } else {
            console.log('⚠️ 未找到 const articles = [，首页更新可能失败，请检查 update_guides.js 结构！');
        }

        newGeneratedUrls.push(metaData.filename);

        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    console.log(`\n--- 开始更新站点结构 ---`);
    console.log('执行: node update_guides.js');
    try {
        execSync('node update_guides.js');
    } catch (e) {
        console.log('update_guides.js 运行报错，请忽略');
    }
    
    console.log('执行: node create_sitemap_html.js');
    try {
        execSync('node create_sitemap_html.js');
    } catch (e) {
        console.log('create_sitemap_html.js 执行可能有误，可忽略');
    }

    console.log('执行: 全局 SEO 进阶优化 (FAQ, LazyLoad, AB Testing, SpiderWeb)');
    try {
        execSync('node build_seo_spider_web.js');
        execSync('node apply_all_optimizations.js');
    } catch (e) {
        console.log('优化脚本运行报错，请忽略: ', e.message);
    }

    if (newGeneratedUrls.length > 0) {
        await pushToIndexNow(newGeneratedUrls);
    }

    console.log('🎉 每日自动更新任务完成！');
}

main().catch(err => {
    console.error('执行失败:', err);
    process.exit(1);
});
