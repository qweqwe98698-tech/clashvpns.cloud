const fs = require('fs');
const path = require('path');

const sourceDir = './';
const targetDir = './ready_to_upload';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

const files = fs.readdirSync(sourceDir);

let count = 0;
for (const file of files) {
    // Skip directories
    if (!fs.statSync(path.join(sourceDir, file)).isFile()) continue;
    
    // Rules for production files
    const isHtml = file.endsWith('.html');
    const isCss = file === 'style.css';
    const isFrontendJs = file === 'script.js';
    const isSeo = file === 'robots.txt' || file === 'sitemap.xml' || file === 'BingSiteAuth.xml';
    const isImage = file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.svg') || file.endsWith('.gif') || file.endsWith('.webp') || file.endsWith('.ico');
    
    if (isHtml || isCss || isFrontendJs || isSeo || isImage) {
        fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
        count++;
    }
}

console.log(`Successfully extracted ${count} production files to 'ready_to_upload' folder.`);
