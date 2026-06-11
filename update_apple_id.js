const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
    console.log("Starting Apple ID scraper...");
    
    // Launch puppeteer
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
    });
    
    try {
        const page = await browser.newPage();
        // Set user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        
        console.log("Navigating to https://appark.ai/cn/us-appleid-shared ...");
        await page.goto('https://appark.ai/cn/us-appleid-shared', { waitUntil: 'networkidle2', timeout: 30000 });
        
        console.log("Extracting accounts...");
        
        // Appark usually has cards or list items for accounts
        const accounts = await page.evaluate(() => {
            const results = [];
            // Look for common patterns. Often accounts have "用户名", "密码" or email formats.
            // Let's scrape the text of elements that look like emails and passwords.
            const textNodes = document.body.innerText;
            const lines = textNodes.split('\n').map(l => l.trim()).filter(l => l.length > 0);
            
            let currentEmail = '';
            let currentPassword = '';
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.includes('@') && (line.includes('.com') || line.includes('.net'))) {
                    currentEmail = line.replace(/账号|用户名|:|：/g, '').trim();
                    
                    // Look for password in the next few lines
                    for (let j = 1; j <= 3 && i + j < lines.length; j++) {
                        const nextLine = lines[i + j];
                        if (nextLine.includes('密码') || /^[A-Za-z0-9!@#\$%\^&\*\(\)_\+=\-\?]{8,20}$/.test(nextLine)) {
                            currentPassword = nextLine.replace(/密码|:|：/g, '').trim();
                            results.push({ email: currentEmail, password: currentPassword });
                            currentEmail = '';
                            currentPassword = '';
                            break;
                        }
                    }
                }
            }
            return results;
        });
        
        console.log(`Found ${accounts.length} accounts.`);
        
        if (accounts.length < 3) {
            console.error("Not enough accounts found, skipping update to prevent empty page.");
            process.exit(1);
        }
        
        // Remove duplicates
        const uniqueAccounts = [];
        const seenEmails = new Set();
        for (const acc of accounts) {
            if (!seenEmails.has(acc.email) && acc.email.length > 5 && acc.password.length > 5) {
                seenEmails.add(acc.email);
                uniqueAccounts.push(acc);
            }
        }
        
        // Now generate the HTML grid
        let newGridHtml = '';
        uniqueAccounts.slice(0, 12).forEach((acc, index) => {
            newGridHtml += `
            <div class="account-card">
                <div class="acc-region">🇺🇸 美国区 (US)</div>
                <div class="acc-row">
                    <span class="acc-label">账号 (Apple ID)</span>
                    <span class="acc-value">${acc.email}</span>
                </div>
                <div class="acc-row">
                    <span class="acc-label">密码 (Password)</span>
                    <span class="acc-value">${acc.password}</span>
                </div>
                <div class="acc-row">
                    <span class="acc-label">状态</span>
                    <span style="color: #10B981; font-weight: bold; font-size: 0.9rem;">● 正常运行 (更新于 ${new Date().toLocaleDateString('zh-CN')})</span>
                </div>
            </div>`;
        });
        
        // Update the file
        const htmlFilePath = path.join(__dirname, 'apple-id-shared.html');
        let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
        
        const gridRegex = /<div class="accounts-grid">([\s\S]*?)<\/div>\s*<div style="text-align: center; margin-bottom: 50px;">/;
        
        if (gridRegex.test(htmlContent)) {
            htmlContent = htmlContent.replace(
                gridRegex,
                `<div class="accounts-grid">${newGridHtml}\n        </div>\n\n        <div style="text-align: center; margin-bottom: 50px;">`
            );
            fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
            console.log("Successfully updated apple-id-shared.html");
        } else {
            console.error("Could not find the accounts-grid section in the HTML file.");
            process.exit(1);
        }

    } catch (err) {
        console.error("Error during scraping:", err);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
