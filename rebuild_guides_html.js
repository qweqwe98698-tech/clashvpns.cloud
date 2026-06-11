const fs = require('fs');

// Read articles from update_guides.js
const guidesCode = fs.readFileSync('update_guides.js', 'utf8');
const match = guidesCode.match(/const articles = (\[[\s\S]*?\]);/);

if (match) {
    const articles = eval(match[1]);
    
    let guidesHTML = `
        <section id="guides" class="guides section bg-gray" style="padding-top: 40px; padding-bottom: 60px;">
            <div class="container">
                <div class="section-header">
                    <h1 class="section-title" style="font-size: 2.5rem;">最新机场与翻墙指南</h1>
                    <p class="section-desc">2026 最新科学上网、VPN 评测与防封号指南汇总</p>
                </div>
                <!-- 柳如烟机场指南 -->
                <div class="guides-grid">
`;

    articles.forEach(article => {
        guidesHTML += `                    <a href="${article.link}" class="guide-card">
                        <span class="guide-tag tag-gray">${article.tag}</span>
                        <h3 class="guide-title">${article.title}</h3>
                        <p class="guide-summary">${article.summary}</p>
                        <div class="guide-footer">
                            <span class="guide-readmore">阅读全文 <span class="arrow">&rarr;</span></span>
                        </div>
                    </a>\n`;
    });

    guidesHTML += `                </div>
            </div>
        </section>
`;

    let guidesPageHtml = fs.readFileSync('guides.html', 'utf8');
    
    // Inject it into <main>
    guidesPageHtml = guidesPageHtml.replace(/<main[^>]*>[\s\S]*?<\/main>/, `<main style="padding-top: 100px;">\n${guidesHTML}</main>`);
    
    fs.writeFileSync('guides.html', guidesPageHtml, 'utf8');
    console.log('✅ Successfully rebuilt guides.html with all articles!');
} else {
    console.log('Failed to parse articles array from update_guides.js');
}
