const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const s1 = '<section id="guides" class="guides section">';
const s2 = '<!-- 用户评价 -->'; // Or <section id="reviews"

const startIndex = indexContent.indexOf(s1);
let endIndex = indexContent.indexOf(s2);

if (endIndex === -1) {
    endIndex = indexContent.indexOf('<section id="reviews"');
}

if (startIndex !== -1 && endIndex !== -1) {
    // Find the preceding comment
    let commentIndex = indexContent.lastIndexOf('<!--', startIndex);
    if (commentIndex === -1 || startIndex - commentIndex > 100) {
        commentIndex = startIndex; // fallback
    }

    let newContent = indexContent.substring(0, commentIndex) + indexContent.substring(endIndex);
    fs.writeFileSync('index.html', newContent, 'utf8');
    console.log('✅ Removed guides section from index.html successfully using section IDs!');
} else {
    console.log('Could not find the section in index.html using section IDs.');
    console.log('startIndex:', startIndex, 'endIndex:', endIndex);
}
