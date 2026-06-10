const fs = require('fs');

function processRecommend(filename) {
    if (!fs.existsSync(filename)) return;
    let content = fs.readFileSync(filename, 'utf-8');

    const newCards = `
                    <!-- 机场卡片 2：二猫云 -->
                    <div class="recommendation-card">
                        <div class="rc-header">
                            <h3 class="rc-title">二猫云</h3>
                            <div class="rc-rating">推荐指数：<span class="stars">★★★★★</span></div>
                        </div>
                        <div class="rc-tags">
                            <span class="rc-tag tag-blue"><span class="dot"></span>新手友好</span>
                            <span class="rc-tag tag-green"><span class="dot"></span>多平台支持</span>
                            <span class="rc-tag tag-purple"><span class="dot"></span>稳定机场</span>
                            <span class="rc-tag tag-orange"><span class="dot"></span>流媒体解锁</span>
                        </div>
                        <div class="rc-content">
                            <div class="rc-item">
                                <span class="rc-label">套餐价格：</span>
                                <span class="rc-value">极低门槛入门，套餐分级清晰</span>
                            </div>
                            <div class="rc-item">
                                <span class="rc-label">适合人群：</span>
                                <span class="rc-value">不想折腾复杂配置的新手，快速上手</span>
                            </div>
                            <div class="rc-item">
                                <span class="rc-label">主要优势：</span>
                                <span class="rc-value">节点覆盖常用地区、适合日常访问、高清视频播放和 AI 工具使用。</span>
                            </div>
                        </div>
                        <div class="rc-actions">
                            <a href="airport-reviews.html" class="btn btn-outline" target="_blank">了解详情</a>
                            <a href="https://01.2maoyunaff.cc/#/register?code=ap0f4ZNt" class="btn btn-primary" target="_blank" rel="nofollow noopener">进入官网</a>
                        </div>
                    </div>
                    <!-- 机场卡片 3：全球云 -->
                    <div class="recommendation-card">
                        <div class="rc-header">
                            <h3 class="rc-title">全球云</h3>
                            <div class="rc-rating">推荐指数：<span class="stars">★★★★★</span></div>
                        </div>
                        <div class="rc-tags">
                            <span class="rc-tag tag-blue"><span class="dot"></span>全球节点</span>
                            <span class="rc-tag tag-green"><span class="dot"></span>多地区覆盖</span>
                            <span class="rc-tag tag-purple"><span class="dot"></span>流媒体解锁</span>
                            <span class="rc-tag tag-orange"><span class="dot"></span>商务访问</span>
                        </div>
                        <div class="rc-content">
                            <div class="rc-item">
                                <span class="rc-label">套餐价格：</span>
                                <span class="rc-value">多档套餐，适合各类使用场景</span>
                            </div>
                            <div class="rc-item">
                                <span class="rc-label">适合人群：</span>
                                <span class="rc-value">需要跨区切换、商务访问或流媒体场景的用户。</span>
                            </div>
                            <div class="rc-item">
                                <span class="rc-label">主要优势：</span>
                                <span class="rc-value">主打热门节点覆盖，配置流程简单，兼容各大主流代理客户端。</span>
                            </div>
                        </div>
                        <div class="rc-actions">
                            <a href="airport-reviews.html" class="btn btn-outline" target="_blank">了解详情</a>
                            <a href="#" class="btn btn-primary" target="_blank" rel="nofollow noopener">进入官网</a>
                        </div>
                    </div>
                    <!-- 机场卡片 4：唯兔云 -->
                    <div class="recommendation-card">
                        <div class="rc-header">
                            <h3 class="rc-title">唯兔云</h3>
                            <div class="rc-rating">推荐指数：<span class="stars">★★★★★</span></div>
                        </div>
                        <div class="rc-tags">
                            <span class="rc-tag tag-blue"><span class="dot"></span>老用户常用</span>
                            <span class="rc-tag tag-green"><span class="dot"></span>Clash 友好</span>
                            <span class="rc-tag tag-purple"><span class="dot"></span>稳定节点</span>
                            <span class="rc-tag tag-orange"><span class="dot"></span>AI 工具访问</span>
                        </div>
                        <div class="rc-content">
                            <div class="rc-item">
                                <span class="rc-label">套餐价格：</span>
                                <span class="rc-value">提供轻量长期套餐及专线选择</span>
                            </div>
                            <div class="rc-item">
                                <span class="rc-label">适合人群：</span>
                                <span class="rc-value">适合日常办公、视频观看以及多设备使用的用户。</span>
                            </div>
                            <div class="rc-item">
                                <span class="rc-label">主要优势：</span>
                                <span class="rc-value">节点稳定、客户端兼容、订阅导入流程极简，适合新手和普通用户。</span>
                            </div>
                        </div>
                        <div class="rc-actions">
                            <a href="airport-reviews.html" class="btn btn-outline" target="_blank">了解详情</a>
                            <a href="#" class="btn btn-primary" target="_blank" rel="nofollow noopener">进入官网</a>
                        </div>
                    </div>`;

    if (!content.includes('二猫云')) {
        // Find the end of the first card
        const searchStr = '<!-- 机场卡片 2 -->';
        if (content.includes(searchStr)) {
            // If the file already has numbered comments, split there
            let parts = content.split(searchStr);
            let newHtml = parts[0] + newCards + '\n                    <!-- 机场卡片 5 -->' + parts[1].replace('<!-- 机场卡片 2 -->', '');
            
            // Re-number subsequent comments if any
            // The file has "<!-- 机场卡片 2 -->", "<!-- 机场卡片 3 -->"
            for (let i = 11; i >= 2; i--) {
                newHtml = newHtml.replace(`<!-- 机场卡片 ${i} -->`, `<!-- 机场卡片 ${i+3} -->`);
            }
            
            fs.writeFileSync(filename, newHtml, 'utf-8');
            console.log(filename + " updated!");
        } else {
            // Find the end of the first card without a comment
            // The first card is for 光速云.
            let parts = content.split('<!-- 机场卡片 2 -->');
            if (parts.length === 1) {
               // We need to inject after the first recommendation-card div ends
               // Looking for the end of the first card
               let searchMarker = '<a href="https://qwerty.gsyaff.com/#/?code=keqgvT5Y" class="btn btn-primary" target="_blank" rel="nofollow noopener">进入官网</a>\n                        </div>\n                    </div>';
               if (content.includes(searchMarker)) {
                   let parts = content.split(searchMarker);
                   let newHtml = parts[0] + searchMarker + '\n' + newCards + parts[1];
                   fs.writeFileSync(filename, newHtml, 'utf-8');
                   console.log(filename + " updated using searchMarker!");
               } else {
                   console.log("Could not find the insertion point in " + filename);
               }
            }
        }
    } else {
        console.log(filename + " already contains new airports");
    }
}

processRecommend('recommend.html');
if (fs.existsSync('ready_to_upload/recommend.html')) {
    processRecommend('ready_to_upload/recommend.html');
}
