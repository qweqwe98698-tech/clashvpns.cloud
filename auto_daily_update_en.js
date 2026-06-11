const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const API_KEY = process.env.DEEPSEEK_API_KEY || process.env.GEMINI_API_KEY || process.env.API_KEY || 'YOUR_API_KEY_HERE';
const DAILY_ARTICLE_COUNT = 1;

const KEYWORDS = [
    "Best VPN for China", "ExpressVPN not working", "Astrill alternative", 
    "How to unblock Netflix in China", "Shadowrocket setup", "V2ray vs VPN", 
    "GFW bypass 2026", "Working proxy for China"
];

function getRandomKeywords(count) {
    const shuffled = KEYWORDS.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).join(', ');
}

// 📡 Radar: Use DeepSeek
async function getBestModel() {
    return 'deepseek-chat';
}

async function callAIWithRetry(systemPrompt, userPrompt, modelName, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await callAI(systemPrompt, userPrompt, modelName);
        } catch (e) {
            console.log(`⚠️ AI Error (Attempt ${i + 1}): ${e.message}`);
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
        throw new Error(`API Failed: ${response.status}`);
    }
    const data = await response.json();
    return data.choices[0].message.content.trim();
}

async function main() {
    console.log(`[${new Date().toLocaleString()}] Starting English Daily Update...`);

    if (API_KEY === 'YOUR_API_KEY_HERE' || !API_KEY) {
        console.error("🚨 Missing API_KEY!");
        process.exit(1);
    }

    let modelName = await getBestModel();
    const currentYear = new Date().getFullYear();

    for (let i = 0; i < DAILY_ARTICLE_COUNT; i++) {
        const targetKeywords = getRandomKeywords(2);
        
        const metaPrompt = `You are an SEO expert targeting expats living in China who need a working VPN to bypass the Great Firewall. The current year is ${currentYear}. Create a metadata object for a new English blog post based on these keywords: [${targetKeywords}].
Output strict JSON only:
{
    "title": "Catchy SEO Title including ${currentYear}",
    "filename": "seo-friendly-english-filename.html",
    "summary": "Short 150-char description"
}`;
        
        let metaJsonStr = await callAIWithRetry("Output only JSON.", metaPrompt, modelName);
        metaJsonStr = metaJsonStr.replace(/```json/g, '').replace(/```/g, ''); 
        const metaData = JSON.parse(metaJsonStr);
        console.log(`Generated Meta: ${metaData.title}`);

        const articlePrompt = `You are an Expat tech blogger in China. Write an SEO article titled: "${metaData.title}". The year is ${currentYear}.
Rules:
1. Target Audience: Foreigners in China frustrated with ExpressVPN/NordVPN.
2. The Secret: Introduce them to "Airports" (Shadowsocks/V2Ray/Trojan) as the modern working alternative.
3. Length & Format: ~800 words. Use <h2>, <h3>, <ul>, <li>, <p>, <strong>. Do NOT output <html> or markdown code blocks.
4. Internal Link: Naturally insert an HTML link to the best VPNs page: <a href="recommend.html" style="color: #2563EB; font-weight: bold;">Top 3 Working Proxy Providers</a>.
5. End with an FAQ section.`;
        
        let articleHtmlContent = await callAIWithRetry("Output only HTML elements.", articlePrompt, modelName);
        
        const template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${metaData.title} | VPN Guides China</title>
    <meta name="description" content="${metaData.summary}">
    <link rel="icon" href="../logo.png" type="image/png">
    <link rel="stylesheet" href="../style.css">
    <style>
        .article-container { max-width: 800px; margin: 120px auto 60px; padding: 50px; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
        .article-title { font-size: 2.2rem; margin-bottom: 15px; color: var(--text-main); font-weight: 800; }
        .article-meta { color: var(--text-light); margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid var(--border-color); }
        .article-content h2 { margin-top: 40px; margin-bottom: 20px; color: var(--text-main); font-size: 1.5rem; }
        .article-content p { margin-bottom: 16px; line-height: 1.8; color: #4B5563; }
        .article-content ul { margin-bottom: 20px; padding-left: 20px; color: #4B5563; line-height: 1.6; }
    </style>
</head>
<body style="background: #F3F4F6;">
    <header class="navbar">
        <div class="container nav-container">
            <div class="nav-logo"><a href="index.html">VPN Guides (EN)</a></div>
            <nav class="nav-links">
                <a href="index.html">Home</a>
                <a href="recommend.html">Best VPNs</a>
                <a href="../index.html" style="color: #6B7280; font-size: 0.9rem;">CN</a>
            </nav>
        </div>
    </header>

    <main>
        <article class="container article-container">
            <h1 class="article-title">${metaData.title}</h1>
            <div class="article-meta">Published: ${new Date().toISOString().split('T')[0]} | By: Expat Tech Team</div>
            <div class="article-content">
                ${articleHtmlContent}
                
                <div style="margin-top: 50px; text-align: center; background: #EFF6FF; padding: 30px; border-radius: var(--radius-md);">
                    <h3 style="color: #1E3A8A; margin-bottom: 15px;">Need a reliable connection right now?</h3>
                    <a href="recommend.html" class="btn btn-primary" style="padding: 15px 40px; border-radius: 30px;">View Our Top 3 Proxy Providers 👉</a>
                </div>
            </div>
        </article>
    </main>

    <footer class="footer text-center" style="margin-top: 60px; padding: 30px;">
        <p style="color: #9CA3AF;">&copy; ${currentYear} VPN Guides China.</p>
    </footer>
    <script src="../script.js"></script>
</body>
</html>`;
        
        const outPath = path.join(__dirname, 'en', metaData.filename);
        fs.writeFileSync(outPath, template, 'utf8');
        console.log(`Saved: ${outPath}`);

        // Update English Homepage index list
        const indexPath = path.join(__dirname, 'en', 'index.html');
        if (fs.existsSync(indexPath)) {
            let indexHtml = fs.readFileSync(indexPath, 'utf8');
            const newItem = `
                <li style="background: white; padding: 25px; border-radius: var(--radius-md); margin-bottom: 15px; border: 1px solid var(--border-color);">
                    <h3 style="margin-bottom: 10px;"><a href="${metaData.filename}" style="color: var(--primary-color);">${metaData.title}</a></h3>
                    <p style="color: var(--text-light);">${metaData.summary}</p>
                </li>`;
            indexHtml = indexHtml.replace('id="english-guides-list" style="list-style: none; padding: 0;">', 'id="english-guides-list" style="list-style: none; padding: 0;">' + newItem);
            fs.writeFileSync(indexPath, indexHtml, 'utf8');
        }
    }
    console.log('🎉 English Daily Update Complete!');
}

main().catch(err => {
    console.error('Failed:', err);
    process.exit(1);
});
