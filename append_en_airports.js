const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'en', 'recommend.html');
let content = fs.readFileSync(filePath, 'utf8');

// The new HTML for airports 4-9
const additionalAirports = `
        <div class="airport-card">
            <h2 class="airport-title">4. DaGeYun (IEPL Dedicated Line)</h2>
            <p class="airport-desc">DaGeYun is tailored for users who need extreme stability for gaming, foreign trade, or high-definition streaming. Its all-internal-network transmission means zero packet loss and ultra-low latency.</p>
            <div class="spec-grid">
                <div class="spec-item"><span class="spec-label">Language</span><span class="spec-val">🇨🇳 Chinese</span></div>
                <div class="spec-item"><span class="spec-label">Protocol</span><span class="spec-val">V2Ray / Trojan</span></div>
                <div class="spec-item"><span class="spec-label">Focus</span><span class="spec-val">Gaming / Business</span></div>
            </div>
            <a href="https://dage.dage888.com/#/register?code=tfxIgGO1" target="_blank" rel="nofollow noopener" class="btn-buy" style="background: #4B5563;">Visit DaGeYun</a>
        </div>

        <div class="airport-card">
            <h2 class="airport-title">5. QingYunTi (High Value)</h2>
            <p class="airport-desc">QingYunTi provides excellent value for long-term users. It covers a wide range of global nodes and is very easy to set up. It's one of the most cost-effective dedicated line proxies on the market.</p>
            <div class="spec-grid">
                <div class="spec-item"><span class="spec-label">Language</span><span class="spec-val">🇨🇳 Chinese</span></div>
                <div class="spec-item"><span class="spec-label">Protocol</span><span class="spec-val">Shadowsocks / Trojan</span></div>
                <div class="spec-item"><span class="spec-label">Focus</span><span class="spec-val">Budget / Annual Plans</span></div>
            </div>
            <a href="https://ivt03.qytaff.cc/register?aff=lne4MCBA" target="_blank" rel="nofollow noopener" class="btn-buy" style="background: #4B5563;">Visit QingYunTi</a>
        </div>

        <div class="airport-card">
            <h2 class="airport-title">6. FeiMaoYun (Massive Data)</h2>
            <p class="airport-desc">If you consume a lot of YouTube 4K content or download large files, FeiMaoYun is perfect. It offers huge data packages at a very low entry price, without limiting the number of connected devices.</p>
            <div class="spec-grid">
                <div class="spec-item"><span class="spec-label">Language</span><span class="spec-val">🇨🇳 Chinese</span></div>
                <div class="spec-item"><span class="spec-label">Protocol</span><span class="spec-val">V2Ray</span></div>
                <div class="spec-item"><span class="spec-label">Focus</span><span class="spec-val">High Bandwidth</span></div>
            </div>
            <a href="https://inv03.fcweba.cc/register?aff=3z3y4nRs" target="_blank" rel="nofollow noopener" class="btn-buy" style="background: #4B5563;">Visit FeiMaoYun</a>
        </div>

        <div class="airport-card">
            <h2 class="airport-title">7. YiYunTi (Privacy Focused)</h2>
            <p class="airport-desc">Using the modern Trojan protocol, YiYunTi is highly secure and difficult for the Great Firewall to detect. It is an excellent choice for users heavily reliant on AI tools and foreign enterprise software.</p>
            <div class="spec-grid">
                <div class="spec-item"><span class="spec-label">Language</span><span class="spec-val">🇨🇳 Chinese</span></div>
                <div class="spec-item"><span class="spec-label">Protocol</span><span class="spec-val">Trojan</span></div>
                <div class="spec-item"><span class="spec-label">Focus</span><span class="spec-val">Privacy / Productivity</span></div>
            </div>
            <a href="https://i03.1ytaff.com/register?aff=D619bKs7" target="_blank" rel="nofollow noopener" class="btn-buy" style="background: #4B5563;">Visit YiYunTi</a>
        </div>

        <div class="airport-card">
            <h2 class="airport-title">8. ShunYun (Backup Choice)</h2>
            <p class="airport-desc">ShunYun offers incredibly cheap annual packages. While it might not be the primary choice for heavy users, it serves as a perfect, cheap backup VPN to ensure you never lose connection during sensitive periods.</p>
            <div class="spec-grid">
                <div class="spec-item"><span class="spec-label">Language</span><span class="spec-val">🇨🇳 Chinese</span></div>
                <div class="spec-item"><span class="spec-label">Protocol</span><span class="spec-val">V2Ray</span></div>
                <div class="spec-item"><span class="spec-label">Focus</span><span class="spec-val">Backup / Cheap Annual</span></div>
            </div>
            <a href="https://aaa.jichang.best/#/register?code=AzFTicqO" target="_blank" rel="nofollow noopener" class="btn-buy" style="background: #4B5563;">Visit ShunYun</a>
        </div>
`;

// Insert the new airports right before the "How to use these Airports" block
content = content.replace(
    /<div style="background: #EFF6FF; border: 1px solid #BFDBFE; padding: 30px; border-radius: var\(--radius-md\); margin-top: 50px;">/,
    additionalAirports + '\n        <div style="background: #EFF6FF; border: 1px solid #BFDBFE; padding: 30px; border-radius: var(--radius-md); margin-top: 50px;">'
);

// Update Title to "Top 8"
content = content.replace(/Top 3 VPN Alternatives/g, 'Top 8 VPN Alternatives');
content = content.replace(/top 3/g, 'top 8');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully added the rest of the airports to the English recommendation page.");
