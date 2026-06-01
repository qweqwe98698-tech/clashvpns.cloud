const fs = require('fs');
const path = require('path');

const sourceDir = './';
const targetDir = './ready_to_upload';

// 1. 先彻底清理旧的上传文件夹，并重新建一个干净的
if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir);

// 2. 黑名单：过滤掉所有后台系统文件
const ignoreList = [
    '.git',
    '.github',
    'node_modules',
    'ready_to_upload',
    'package.json',
    'package-lock.json',
    '.env',
    'auto_daily_update.js',
    'prepare_upload.js',
    'update_guides.js',
    'create_sitemap_html.js'
];

// 3. 蚂蚁搬家法：遍历当前目录下的每一个文件/文件夹，一个一个搬进去
const elements = fs.readdirSync(sourceDir);

for (const element of elements) {
    // 如果在黑名单里，就跳过不搬
    if (ignoreList.includes(element)) continue;
    
    const srcPath = path.join(sourceDir, element);
    const destPath = path.join(targetDir, element);
    
    // 把允许的文件和文件夹平稳复制进 ready_to_upload 里
    fs.cpSync(srcPath, destPath, { recursive: true });
}

console.log('✅ 所有网站文件（包含最新生成的 AI 文章）已成功打包完毕，准备起飞上传 FTP！');
