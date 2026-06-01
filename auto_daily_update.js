const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ================= 配置区域 =================
// 自动读取您的正版 Gemini API 密码
const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY || 'YOUR_API_KEY_HERE';
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

// 📡 雷达探测！先让 Google 交出底牌
async function getBestModel() {
    console.log("🔍 正在连接 Google 服务器，探测您账号专属的可用模型清单...");
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`无法获取模型列表: ${response.status} ${await response.text()}`);
    }
    
    const data = await response.json();
    if (!data.models || data.models.length === 0) {
        throw new Error("🚨 严重错误：Google 服务器返回成功，但您的账号下没有任何可用模型！");
    }

    const availableModels = data.models
        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent') && m.name.includes('gemini'))
        .map(m => m.name.replace('models/', ''));

    console.log(`✅ 探测成功！您的账号目前支持 ${availableModels.length} 个模型`);

    if (availableModels.length === 0) {
        throw new Error("🚨 严重错误：您的账号没有任何支持生成文章的 Gemini 模型！");
    }

    let bestModel = availableModels.find(m => m.includes('flash'));
    if (!bestModel) bestModel = availableModels.find(m => m.includes('pro'));
    if (!bestModel) bestModel = availableModels[0];

    console.log(`🎯 最终系统为您自动选择的最优模型是: ${bestModel}，准备起飞！`);
    return bestModel;
}

async function callAI(systemPrompt, userPrompt, modelName) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
            contents: [
                { role: "user", parts: [{ text: userPrompt }] }
            ],
            generationConfig: {
                temperature: 0.7
            }
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`API 请求失败: ${response.status} ${err}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
}

// ================= 核心流程 =================
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

    for (let i = 0; i < DAILY_ARTICLE_COUNT; i++) {
        console.log(`\n--- 开始生成第 ${i + 1} 篇文章 ---`);
        const targetKeywords = getRandomKeywords(3);
        console.log(`选中关键词: ${targetKeywords}`);

        const metaPrompt = `你是一个资深的 SEO 专家和机场评测博主。请根据以下关键词：【${targetKeywords}】，构思一篇全新、专业、深度长文的元数据。
要求输出严格的 JSON 格式（不要带有 markdown 代码块，只输出纯 JSON）：
{
    "title": "文章标题（吸引人，包含关键词）",
    "filename": "english-seo-friendly-filename.html",
    "summary": "文章简介（不超过 80 个字，引人入胜）",
    "tag": "四字标签（如：硬核评测/新手教程/行业趋势/避坑指南）"
}`;
        
        let metaJsonStr = await callAI("你只输出合法的 JSON，不要输出其他任何废话。", metaPrompt, modelName);
        metaJsonStr = metaJsonStr.replace(/```json/g, '').replace(/```/g, ''); 
        const metaData = JSON.parse(metaJsonStr);
        console.log(`成功生成元数据: ${metaData.title}`);

        const articlePrompt = `你是一个化名为“柳如烟”的资深科学上网/机场评测老炮儿。请根据标题：【${metaData.title}】撰写一篇文章。
要求：
1. 【人设与语气】：你是砸钱替大家踩过无数坑的老手，语气要犀利、接地气、敢于揭露行业黑幕。
2. 【内容深度】：正文字数不少于 800 字，提供硬核干货。尽量用具体的“数字”说话，通过量化数据显得极其专业。
3. 【SEO 与结构】：合理穿插关键词：${targetKeywords}。排版必须清晰，多用 <ul><li> 列表和 <strong> 加粗重点。
4. 【内链引流】：必须在正文的某个自然段落中，极其自然地插入一句完整的 HTML 超链接引流代码：前往 <a href="recommend.html" style="color: #007bff; font-weight: bold;">柳如烟精选节点榜单</a> 看实测结果。
5. 【FAQ 板块】：在文章结尾，必须固定加一个 <h2>常见问题解答 (FAQ)</h2> 的板块。
6. 【格式规范】：只输出文章主体的 HTML 代码（只包含 <p>, <h2>, <h3>, <ul>, <li>, <strong>, <a> 等标签），绝对不要输出 <html>、<body> 或 \`\`\`html 这种代码块标记。千万不要写“结语”二字。`;
        
        console.log(`正在生成文章正文 (请稍候，可能需要 10-30 秒)...`);
        const articleHtmlContent = await callAI("你是一个专业的 HTML 文章内容生成器，只输出 HTML 代码。", articlePrompt, modelName);
        console.log(`文章正文生成完毕，字数: ${articleHtmlContent.length}`);

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
                <div style="margin-top: 50px; text-align: center;">
                    <a href="recommend.html" class="btn btn-primary" style="padding: 15px 40px; font-size: 1.2rem; border-radius: var(--radius-full); background-color: #1a1025; color: #fff;">查看柳如烟精选机场推荐</a>
                </div>
            </div>
        </article>
    </main>
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

    console.log('🎉 每日自动更新任务完成！');
}

main().catch(err => {
    console.error('执行失败:', err);
    process.exit(1);
});
