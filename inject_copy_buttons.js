const fs = require('fs');
const path = require('path');

const htmlFilePath = path.join(__dirname, 'apple-id-shared.html');
let htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

let emailIndex = 0;
let pwdIndex = 0;

// Replace Apple ID rows
htmlContent = htmlContent.replace(/<span class="acc-label">账号 \(Apple ID\)<\/span>\s*<span class="acc-value">([^<]+)<\/span>/g, (match, email) => {
    const replacement = `<span class="acc-label">账号 (Apple ID)</span>
                    <div class="acc-value-group">
                        <span class="acc-value" id="email-${emailIndex}">${email}</span>
                        <button class="copy-btn" onclick="copyToClipboard('email-${emailIndex}')" title="复制账号">复制</button>
                    </div>`;
    emailIndex++;
    return replacement;
});

// Replace Password rows
htmlContent = htmlContent.replace(/<span class="acc-label">密码 \(Password\)<\/span>\s*<span class="acc-value">([^<]+)<\/span>/g, (match, pwd) => {
    const replacement = `<span class="acc-label">密码 (Password)</span>
                    <div class="acc-value-group">
                        <span class="acc-value" id="pwd-${pwdIndex}">${pwd}</span>
                        <button class="copy-btn" onclick="copyToClipboard('pwd-${pwdIndex}')" title="复制密码">复制</button>
                    </div>`;
    pwdIndex++;
    return replacement;
});

fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');
console.log('✅ Injected copy buttons into apple-id-shared.html!');
