require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ftp = require('basic-ftp');

// ----------------- 配置区 -----------------
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const FTP_HOST = process.env.FTP_HOST;
const FTP_USER = process.env.FTP_USER;
const FTP_PASS = process.env.FTP_PASS;
const FTP_SECURE = false; // 老薛主机一般可以用明文或显式 TLS，设为 false 兼容性最强
const REMOTE_DIR = 'public_html/clashvpns.cloud'; // 目标路径

const DATA_DIR = path.join(__dirname, '../src/data');
const ARTICLES_DIR = path.join(__dirname, '../src/content/articles');
const HISTORY_FILE = path.join(DATA_DIR, 'seo_published_history.json');
const DIST_DIR = path.join(__dirname, '../dist');

// 如果没有 API 密钥，直接报错退出
if (!DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === 'your_deepseek_api_key_here') {
  console.error("❌ 错误：请在 .env 文件中配置 DEEPSEEK_API_KEY");
  process.exit(1);
}

// ----------------- 选题引擎 -----------------
// 预设的结构化长尾词根
const topicTypes = ['机场评测', '机场推荐', 'AI客户端教程', '稳定专线避坑', '流媒体解锁指南'];
const targetAudiences = ['新手', '小白', '重度用户', '外贸电商', '留学党', '极客'];
const focusPoints = ['性价比', '晚高峰不卡', '原生IP', '防跑路', '低延迟', '全平台'];
const tools = ['Clash Verge Rev', 'Shadowrocket', 'V2Ray', 'Sing-box', 'ChatGPT', 'Netflix'];

// 生成随机组合的标题
function generateUniqueTopic(history) {
  let attempts = 0;
  while (attempts < 100) {
    const type = topicTypes[Math.floor(Math.random() * topicTypes.length)];
    const audience = targetAudiences[Math.floor(Math.random() * targetAudiences.length)];
    const focus = focusPoints[Math.floor(Math.random() * focusPoints.length)];
    const tool = tools[Math.floor(Math.random() * tools.length)];
    
    const year = new Date().getFullYear();
    const title = `【${year}最新】${audience}必看：${tool} 搭配${focus}的${type}与深度解析`;
    
    if (!history.includes(title)) {
      return title;
    }
    attempts++;
  }
  return `【${new Date().getTime()}】紧急更新：最新稳定极速科学上网深度指南`;
}

// ----------------- AI 创作引擎 -----------------
async function generateArticleContent(title) {
  console.log(`🤖 正在调用 DeepSeek API 创作文章: 《${title}》...`);
  console.log('⏳ 这可能需要 1-3 分钟，请耐心等待...');

  const systemPrompt = `你是一个拥有10年经验的资深网络安全架构师和 SEO 优化专家。
你目前的任务是为博客 "柳如烟指北" 创作一篇关于网络节点、科学上网客户端或 AI 访问的深度科普文章。

【核心要求】
1. **字数必须大于 1800 字**，内容必须极其硬核、专业、富有逻辑，杜绝车轱辘话。
2. 必须包含一个引人入胜的**独立导语**。
3. **SEO 蜘蛛网内链植入 (极度重要！)**：你必须在正文的合适语境中，自然地穿插以下 Markdown 链接（必须使用严格的绝对路径格式，不要用相对路径）：
   - 至少提及 2 次指向推荐大厅的链接：\`[高性价比机场精选大厅](/recommend)\` 或 \`[晚高峰稳定专线推荐](/recommend)\`
   - 至少提及 1 次指向储物戒的链接：\`[深入探秘储物戒防坑指南](/ring)\`
   - 至少提及 1 次指向客户端教程的链接：\`[全平台客户端保姆级配置教程](/guides)\` 或 \`[Clash Verge Rev 终极配置教程](/guides/clash-verge-rev)\`
4. 请输出纯 Markdown 格式。**不要**输出 JSON 或前后包含 \`\`\`markdown 的代码块包裹，直接输出正文内容即可。不要输出标题的 # (因为标题我会用 Frontmatter 处理)。

【文章基调】
专业、详实、“保姆级”、使用稍微带一点“二次元/手账”的活泼语气。排版使用二级标题 (##) 和三级标题 (###)，合理使用粗体和无序列表。`;

  const userPrompt = `请以《${title}》为题，写一篇高质量的长文。直接开始写导语和正文。`;

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 4000
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API 调用失败: ${response.status} ${errText}`);
  }

  const data = await response.json();
  let content = data.choices[0].message.content;
  
  // 去除可能携带的 ```markdown 标记
  content = content.replace(/^```markdown\n?/i, '').replace(/```$/i, '').trim();
  
  return content;
}

// ----------------- 自动部署引擎 -----------------
async function deployToLaoXueHost() {
  console.log(`\n🚀 开始自动部署到老薛主机...`);
  if (!FTP_HOST || FTP_HOST === 'your_laoxue_host_ip_or_domain' || !FTP_USER || !FTP_PASS) {
    console.log(`⚠️ FTP 配置未完成，跳过自动上传。如果您希望自动上传，请完善 .env 文件。`);
    return;
  }

  const client = new ftp.Client();
  client.ftp.verbose = true;
  
  try {
    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASS,
      secure: FTP_SECURE
    });
    
    console.log(`📂 已成功连接 FTP，正在跳转到目标目录: ${REMOTE_DIR}`);
    await client.ensureDir(REMOTE_DIR);
    await client.clearWorkingDir(); // 清空原有静态文件以防止多余垃圾
    
    console.log(`⬆️ 正在上传静态文件...`);
    await client.uploadFromDir(DIST_DIR);
    console.log(`✅ 自动部署完美完成！`);
    
  } catch (err) {
    console.error(`❌ FTP 部署失败:`, err);
  } finally {
    client.close();
  }
}

// ----------------- 主流程 -----------------
async function main() {
  console.log("🌸 柳如烟指北 - 全自动 SEO 日更机器人启动 🌸\n");
  
  // 1. 读取发布历史
  let history = [];
  if (fs.existsSync(HISTORY_FILE)) {
    history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  }
  
  // 2. 生成唯一标题
  const title = generateUniqueTopic(history);
  console.log(`📌 今日生成选题: ${title}`);
  
  try {
    // 3. 请求 API 生成内容
    const markdownBody = await generateArticleContent(title);
    
    // 4. 组装 Frontmatter
    const dateStr = new Date().toISOString().split('T')[0];
    const slug = \`daily-auto-\${Date.now()}\`;
    
    const tags = ['自动更新', title.includes('教程') ? '客户端教程' : (title.includes('机场') ? '机场评测' : '深度干货')];
    
    const frontmatter = \`---
title: "\${title}"
date: \${new Date().toISOString()}
description: "\${markdownBody.substring(0, 80).replace(/[\\n\\r"]/g, '')}..."
author: "柳如烟 (AI自动化引擎)"
tags: \${JSON.stringify(tags)}
---\n\n\`;

    const fullContent = frontmatter + markdownBody;
    const filePath = path.join(ARTICLES_DIR, \`\${dateStr}-\${slug}.md\`);
    
    // 5. 保存文件
    fs.writeFileSync(filePath, fullContent, 'utf8');
    console.log(\`✅ 文章已成功保存至: \${filePath}\`);
    
    // 6. 记录历史，防止重复
    history.push(title);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
    
    // 7. 自动执行打包
    console.log(\`\n🔨 正在编译静态网站 (npm run build)...\`);
    execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log(\`✅ 编译完成！Sitemap 已更新。\`);
    
    // 8. 自动 FTP 上传
    await deployToLaoXueHost();
    
    console.log(\`\n🎉 所有的日常维护工作已全自动完成！祝您今天流量爆棚！\`);
    
  } catch (error) {
    console.error("❌ 致命错误：", error);
  }
}

main();
