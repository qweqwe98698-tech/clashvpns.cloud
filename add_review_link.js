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

const navPattern1 = /(<a href="recommend\.html">机场推荐<\/a>)/g;
const navPattern2 = /(<a href="recommend\.html" class="active">机场推荐<\/a>)/g;
const footerPattern = /(<li><a href="recommend\.html">机场推荐<\/a><\/li>)/g;

for (const filePath of allFiles) {
    if (path.basename(filePath) === 'add_review_link.js' || path.basename(filePath) === 'add_review_link.py') {
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    if (!content.includes('>机场测评<')) {
        content = content.replace(navPattern1, '$1\n                <a href="https://jichangpingce.club/" target="_blank">机场测评</a>');
        content = content.replace(navPattern2, '$1\n                <a href="https://jichangpingce.club/" target="_blank">机场测评</a>');
        content = content.replace(footerPattern, '$1\n                        <li><a href="https://jichangpingce.club/" target="_blank">机场测评</a></li>');
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${path.basename(filePath)}`);
    }
}
console.log("Done.");
