const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let fixedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    const hasEmptyLi = /\s*<li><\/li>/g;
    if (hasEmptyLi.test(content)) {
        content = content.replace(/\s*<li><\/li>/g, '');
        fs.writeFileSync(filePath, content, 'utf8');
        fixedCount++;
    }
}

console.log(`\n🎉 Empty <li> removed in ${fixedCount} files.`);
