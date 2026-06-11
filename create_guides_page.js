const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

// We want to create guides.html based on index.html, but only containing the guides section
let template = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>机场指南与最新翻墙教程 - 柳如烟推荐机场</title>
    <meta name="description" content="柳如烟精选最新翻墙教程与机场指南，解决节点被封、连接重置等问题。">
    <link rel="icon" href="logo.png" type="image/png">
    <link rel="stylesheet" href="style.css">
    <link rel="canonical" href="https://clashvpns.cloud/guides.html" />
</head>
<body style="background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);">
`;

// Extract navbar from index.html
const headerMatch = indexContent.match(/<header class="navbar">([\s\S]*?)<\/header>/);
if (headerMatch) {
    template += `<header class="navbar">${headerMatch[1]}</header>\n\n<main style="padding-top: 100px;">`;
}

// Extract guides section
const guidesMatch = indexContent.match(/<section id="guides" class="guides section bg-gray">([\s\S]*?)<\/section>/);
if (guidesMatch) {
    template += `<section id="guides" class="guides section bg-gray">${guidesMatch[1]}</section>`;
}

template += `\n</main>\n`;

// Extract footer
const footerMatch = indexContent.match(/<footer class="footer">([\s\S]*?)<\/footer>/);
if (footerMatch) {
    template += `<footer class="footer">${footerMatch[1]}</footer>`;
}

template += `\n<script src="script.js"></script>\n</body>\n</html>`;

fs.writeFileSync('guides.html', template, 'utf8');
console.log('✅ Created guides.html successfully!');
