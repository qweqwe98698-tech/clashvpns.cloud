const fs = require('fs');

const sourceDir = './';
const targetDir = './ready_to_upload';

// 1. 先清理旧的上传文件夹，保持干净
if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
}

// 2. 设立黑名单：只过滤掉后台系统文件，剩下的网页全要！
const ignoreList = [
    '.git',
    '.github',
    'node_modules',
    'ready_to_upload', // 避免自己复制自己导致死循环
    'package.json',
    'package-lock.json',
    '.env',
    'auto_daily_update.js', // 不上传后台脚本，保护安全
    'prepare_upload.js',
    'update_guides.js',
    'create_sitemap_html.js'
];

// 3. 一键智能复制所有新生成的网页和文件
fs.cpSync(sourceDir, targetDir, {
    recursive: true,
    filter: (src, dest) => {
        // 提取当前正在处理的文件/文件夹名
        const filename = src.split('/').pop().split('\\').pop();
        // 如果在黑名单里就跳过；否则全部绿灯放行！
        if (ignoreList.includes(filename)) return false;
        return true;
    }
});

console.log('✅ 所有网站文件（包含最新生成的 AI 文章）已成功打包完毕，准备起飞上传 FTP！');
