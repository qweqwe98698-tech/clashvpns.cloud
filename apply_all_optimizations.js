const fs = require('fs');
const path = require('path');

const directory = __dirname;
const baseUrl = 'https://clashvpns.cloud';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        let fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && !stat.isDirectory()) {
            if(file.endsWith('.html')) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const htmlFiles = walk(directory);
let updatedCount = 0;

// A/B Testing JS snippet for CTA
const abTestingScript = `
    <!-- A/B Testing CTA Script -->
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        const ctaTextElement = document.querySelector('.sticky-cta-text span');
        const ctaBtnElement = document.querySelector('.sticky-cta .btn');
        if (ctaTextElement && ctaBtnElement) {
            const variations = [
                { text: "获取 2026 最新特惠稳定机场", btn: "立即查看", utm: "cta_v1_default" },
                { text: "博主自用防失联专属推荐", btn: "获取链接", utm: "cta_v2_personal" },
                { text: "限时低价，解锁全球流媒体", btn: "抢先体验", utm: "cta_v3_urgency" }
            ];
            const randomIndex = Math.floor(Math.random() * variations.length);
            const selected = variations[randomIndex];
            ctaTextElement.innerText = selected.text;
            ctaBtnElement.innerText = selected.btn;
            
            // Update URL with UTM
            let href = ctaBtnElement.getAttribute('href');
            if (href.includes('?')) {
                href = href.replace(/utm_source=[^&]*/, 'utm_source=' + selected.utm);
            } else {
                href += '?utm_source=' + selected.utm;
            }
            ctaBtnElement.setAttribute('href', href);
        }
    });
    </script>
`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let isModified = false;

    // 1. FAQPage Schema Extraction
    if (!content.includes('FAQPage') && content.includes('Q1')) {
        // Find Q & A
        // Matches <p><strong>Q1：...</strong><br/>A：...</p>
        const regex = /<strong>(Q\d*.*?)[：:](.*?)<\/strong>.*?<br\s*\/?>\s*A[：:]([\s\S]*?)(?=<\/p>)/gi;
        let match;
        const faqs = [];
        while ((match = regex.exec(content)) !== null) {
            let question = match[2].trim().replace(/(<([^>]+)>)/gi, ""); // strip HTML
            let answer = match[3].trim().replace(/(<([^>]+)>)/gi, "");
            faqs.push({
                "@type": "Question",
                "name": question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": answer
                }
            });
        }
        
        if (faqs.length > 0) {
            const faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs
            };
            const scriptTag = `\n    <script type="application/ld+json">\n    ${JSON.stringify(faqSchema, null, 2)}\n    </script>`;
            content = content.replace('</head>', `${scriptTag}\n</head>`);
            isModified = true;
        }
    }

    // 2. Image Lazy Loading & WebP preparation (Add loading="lazy")
    if (content.includes('<img')) {
        let newContent = content.replace(/<img(?![^>]*loading=["']lazy["'])([^>]*)>/g, (match, p1) => {
            // Don't lazy load logo if it's in the header
            if (match.includes('logo.png') || match.includes('logo-img')) {
                return match;
            }
            return `<img loading="lazy" ${p1}>`;
        });
        if (newContent !== content) {
            content = newContent;
            isModified = true;
        }
    }

    // 3. Inject A/B testing script for CTA
    if (content.includes('sticky-cta') && !content.includes('A/B Testing CTA Script')) {
        content = content.replace('</body>', `${abTestingScript}\n</body>`);
        isModified = true;
    }

    // 4. Inject PBN Cross-Site link
    if (content.includes('<div class="article-content">') && !content.includes('clashhub.cloud') && !file.endsWith('index.html')) {
        const pbnHtml = `\n<div style="margin-top: 20px; padding: 15px; background: rgba(59, 130, 246, 0.05); border-left: 4px solid var(--accent-blue); border-radius: 4px;">\n    💡 <strong>跨站极速专区：</strong>如果您正在寻找专为魔法翻墙深度定制的高阶教程与客户端配置，强烈建议您访问我们的兄弟站点 <a href="https://clashhub.cloud" target="_blank" style="color: var(--primary-color); font-weight: 600; text-decoration: underline;">ClashHub 魔法VPN指南</a>，获取更多发烧友级稳定梯子评测。\n</div>\n`;
        // Insert right before "相关阅读推荐：" or at the end of article content
        if (content.includes('相关阅读推荐：')) {
            content = content.replace('<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-color);" class="spider-web-links">', pbnHtml + '\n<div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-color);" class="spider-web-links">');
        } else {
            let insertPos = content.indexOf('</div>\n        </article>');
            if (insertPos !== -1) {
                content = content.slice(0, insertPos) + pbnHtml + content.slice(insertPos);
            }
        }
        isModified = true;
    }

    if (isModified) {
        fs.writeFileSync(file, content, 'utf8');
        updatedCount++;
    }
});

console.log(`✅ 成功在 ${updatedCount} 个 HTML 文件中应用进阶优化 (FAQ Schema, LazyLoad, A/B Testing, PBN)!`);
