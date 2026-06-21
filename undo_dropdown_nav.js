const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const dropdownRegex = /<div class="nav-dropdown">[\s\S]*?<a href="apple-id-shared\.html" class="nav-dropdown-toggle">免费ID教程[\s\S]*?<\/svg><\/a>[\s\S]*?<div class="nav-dropdown-menu">[\s\S]*?<a href="apple-id-shared\.html">免费ID获取<\/a>[\s\S]*?<a href="apple-id-tutorial\.html">无痛换区教程<\/a>[\s\S]*?<\/div>[\s\S]*?<\/div>/g;

let updatedCount = 0;

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.match(dropdownRegex)) {
        content = content.replace(dropdownRegex, '<a href="apple-id-shared.html">免费ID获取</a>');
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`Reverted nav in: ${file}`);
    }
}

console.log(`\n🎉 Nav reverted in ${updatedCount} files.`);

// Revert CSS
const cssPath = path.join(dir, 'style.css');
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8');
    const index = css.indexOf('/* ==================================\n   Navbar Dropdown');
    if (index !== -1) {
        css = css.substring(0, index).trimEnd() + '\n';
        fs.writeFileSync(cssPath, css, 'utf8');
        console.log("Reverted CSS");
    }
}

// Delete files
const tutorialPath = path.join(dir, 'apple-id-tutorial.html');
if (fs.existsSync(tutorialPath)) {
    fs.unlinkSync(tutorialPath);
    console.log("Deleted apple-id-tutorial.html");
}
