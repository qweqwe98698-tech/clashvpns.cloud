const fs = require('fs');
const path = require('path');

const workspace = 'c:\\Users\\user\\OneDrive\\Desktop\\博客网站\\柳如烟clashvpns.cloud';

function getFiles(dir, exts) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isFile()) {
            if (exts.includes(path.extname(file))) {
                results.push(file);
            }
        }
    });
    return results;
}

const exts = ['.html', '.js', '.ps1', '.py'];
const allFiles = getFiles(workspace, exts);

const brokenFooterPattern = /<li><a href="recommend\.html">机场推荐<\/a>\s*<a href="https:\/\/jichangpingce\.club\/" target="_blank">机场测评<\/a><\/li>/g;
const correctFooter = '<li><a href="recommend.html">机场推荐</a></li>\n                        <li><a href="https://jichangpingce.club/" target="_blank">机场测评</a></li>';

for (const filePath of allFiles) {
    if (path.basename(filePath).startsWith('add_review_link') || path.basename(filePath) === 'fix_footer.js') {
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    content = content.replace(brokenFooterPattern, correctFooter);

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${path.basename(filePath)}`);
    }
}
console.log("Done fixing footer.");
