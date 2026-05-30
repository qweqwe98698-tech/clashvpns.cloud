const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ================= 配置区域 =================
// 请在这里填入您的 AI 服务 API Key (如 OpenAI, DeepSeek, 硅基流动 等兼容 OpenAI 格式的接口)
const API_KEY = process.env.API_KEY || 'YOUR_API_KEY_HERE';
// API Base URL, 例如 https://api.deepseek.com/v1 或 https://api.openai.com/v1
const BASE_URL = process.env.API_BASE_URL || 'https://api.openai.com/v1';
const MODEL_NAME = process.env.MODEL_NAME || 'gpt-4o'; // 推荐用 gpt-4o 或 deepseek-chat

// 每日生成文章数量
const DAILY_ARTICLE_COUNT = 2;

// 核心关键词库，AI 会根据这些关键词随机生成新主题
const KEYWORDS = [
    "机场推荐", "科学上网", "稳定梯子", "翻墙节点", "高速机场",
    "IPLC专线", "IEPL专线", "流媒体解锁", "Netflix节点", "Clash订阅",
    "Shadowrocket节点", "Trojan机场", "V2ray节点", "游戏加速节点",
    "ChatGPT节点", "AI免封号节点", "原生住宅IP"
];

// ================= 工具函数 =================

// 随机获取 N 个关键词
function getRandomKeywords(count) {
    const shuffled = KEYWORDS.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).join('、');
}

// 调用 AI 接口
async function callAI(systemPrompt, userPrompt) {
    if (API_KEY === 'YOUR_API_KEY_HERE') {
        throw new Error("请先在代码中或者环境变量中配置您的 API_KEY");
    }

    const response = await fetch(`${BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: MODEL_NAME,
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

async function main() {
    console.log(`[${new Date().toLocaleString()}] 开始执行每日自动更新任务...`);

    for (let i = 0; i < DAILY_ARTICLE_COUNT; i++) {
        console.log(`\n--- 开始生成第 ${i + 1} 篇文章 ---`);
        const targetKeywords = getRandomKeywords(3);
        console.log(`选中关键词: ${targetKeywords}`);

        // 1. 让 AI 构思标题、简介、文件名和标签
        const metaPrompt = `你是一个资深的 SEO 专家和机场评测博主。请根据以下关键词：【${targetKeywords}】，构思一篇全新、专业、深度长文的元数据。
要求输出严格的 JSON 格式（不要带有 markdown 代码块，只输出纯 JSON）：
{
    "title": "文章标题（吸引人，包含关键词）",
    "filename": "english-seo-friendly-filename.html",
    "summary": "文章简介（不超过 80 个字，引人入胜）",
    "tag": "四字标签（如：硬核评测/新手教程/行业趋势/避坑指南）"
}`;
        
        let metaJsonStr = await callAI("你只输出合法的 JSON，不要输出其他任何废话。", metaPrompt);
        metaJsonStr = metaJsonStr.replace(/```json/g, '').replace(/```/g, ''); // 容错处理
        const metaData = JSON.parse(metaJsonStr);
        console.log(`成功生成元数据: ${metaData.title}`);

        // 2. 让 AI 生成正文内容
        const articlePrompt = `你是一个资深科学上网/机场评测博主。请根据标题：【${metaData.title}】撰写一篇文章。
要求：
1. 必须有独立的导语，直接切入痛点。
2. 正文字数不少于 800 字，要求差异化、专业深度加长版，不要说废话，提供干货知识（例如延迟、丢包、专线原理、流媒体风控等）。
3. 合理穿插关键词：${targetKeywords}。
4. 适合 SEO 长期抓取，排版清晰。
5. 只输出文章主体的 HTML 代码（只包含 <p>, <h2>, <h3>, <ul>, <li>, <strong> 等标签），不要包含 <html>、<body> 或 CSS。
6. 所有的 <h2> 标题要吸引人。不要包含任何“结语”二字。`;
        
        console.log(`正在生成文章正文 (请稍候，可能需要 10-30 秒)...`);
        const articleHtmlContent = await callAI("你是一个专业的 HTML 文章内容生成器，只输出 HTML 代码。", articlePrompt);
        console.log(`文章正文生成完毕，字数: ${articleHtmlContent.length}`);

        // 3. 读取 HTML 模板并生成最终文件
        // 使用您已有的生成模板逻辑
        const template = \`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>\${metaData.title} - 柳如烟推荐机场</title>
    <meta name="description" content="\${metaData.summary}">
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
            <h1 class="article-title">\${metaData.title}</h1>
            <div class="article-meta">
                <span><i class="icon-calendar"></i> 更新时间：\${new Date().toISOString().split('T')[0]}</span>
                <span><i class="icon-user"></i> 作者：柳如烟</span>
            </div>
            <div class="article-content">
                \${articleHtmlContent}
                <div style="margin-top: 50px; text-align: center;">
                    <a href="recommend.html" class="btn btn-primary" style="padding: 15px 40px; font-size: 1.2rem; border-radius: var(--radius-full); background-color: #1a1025; color: #fff;">查看柳如烟精选机场推荐</a>
                </div>
            </div>
        </article>
    </main>
    <script src="script.js"></script>
    <script src="fix_footer.js"></script>
</body>
</html>\`;
        
        fs.writeFileSync(metaData.filename, template, 'utf8');
        console.log(`成功写入文件: ${metaData.filename}`);

        // 4. 更新 update_guides.js，将新文章注入到首页指南列表
        console.log(`正在将文章追加到 update_guides.js 中...`);
        let guidesCode = fs.readFileSync('update_guides.js', 'utf8');
        const newArticleItem = \`    {
        title: "\${metaData.title}",
        link: "\${metaData.filename}",
        tag: "\${metaData.tag}",
        summary: "\${metaData.summary}"
    },\n\`;
        
        // 插入到 const articles = [ 之后
        guidesCode = guidesCode.replace('const articles = [\\n', 'const articles = [\\n' + newArticleItem);
        fs.writeFileSync('update_guides.js', guidesCode, 'utf8');

        // 等待几秒避免触发 API 限流
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    // 5. 重新生成首页和 Sitemap
    console.log(`\\n--- 开始更新站点结构 ---`);
    console.log('执行: node update_guides.js');
    execSync('node update_guides.js');
    
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
});
