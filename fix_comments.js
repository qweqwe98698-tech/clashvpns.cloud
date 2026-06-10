const fs = require('fs');

function fixRecommend(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf-8');

    // Fix the comment numbers
    content = content.replace('<!-- 机场卡片 8 -->\n                    <div class="recommendation-card">\n                        <div class="rc-header">\n                            <h3 class="rc-title">龙猫云</h3>', 
                              '<!-- 机场卡片 5 -->\n                    <div class="recommendation-card">\n                        <div class="rc-header">\n                            <h3 class="rc-title">龙猫云</h3>');
    
    // Check if there are other wrong numbers and fix them sequentially
    let match;
    let newContent = "";
    let lines = content.split('\n');
    let counter = 1;
    for (let line of lines) {
        if (line.includes('<!-- 机场卡片')) {
            newContent += line.replace(/<!-- 机场卡片 \d+.*-->/, `<!-- 机场卡片 ${counter} -->`) + '\n';
            counter++;
        } else {
            newContent += line + '\n';
        }
    }

    fs.writeFileSync(filename, newContent, 'utf-8');
    console.log(filename + " fixed!");
}

fixRecommend('recommend.html');
if (fs.existsSync('ready_to_upload/recommend.html')) {
    fixRecommend('ready_to_upload/recommend.html');
}
