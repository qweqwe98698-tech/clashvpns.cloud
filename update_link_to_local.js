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

const searchPattern = /<a href="https:\/\/jichangpingce\.club\/" target="_blank">机场测评<\/a>/g;
const replaceString = '<a href="airport-reviews.html">机场测评</a>';

for (const filePath of allFiles) {
    if (path.basename(filePath).startsWith('add_review') || path.basename(filePath) === 'fix_footer.js' || path.basename(filePath) === 'update_link_to_local.js') {
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    content = content.replace(searchPattern, replaceString);

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${path.basename(filePath)}`);
    }
}
console.log("Done updating link to local.");
