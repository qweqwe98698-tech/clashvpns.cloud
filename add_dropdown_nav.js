const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssToAppend = `
/* ==================================
   Navbar Dropdown
   ================================== */
.nav-dropdown {
    position: relative;
    display: inline-block;
}
.nav-dropdown-toggle {
    display: flex !important;
    align-items: center;
    gap: 4px;
}
.nav-dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--bg-main, #fff);
    min-width: 140px;
    box-shadow: var(--shadow-lg, 0 10px 15px -3px rgba(0,0,0,0.1));
    border-radius: var(--radius-md, 10px);
    padding: 8px 0;
    z-index: 1001;
    border: 1px solid var(--border-color, #e2e8f0);
    text-align: center;
}
.nav-dropdown:hover .nav-dropdown-menu {
    display: block !important;
}
.nav-dropdown-menu a {
    display: block !important;
    padding: 10px 15px !important;
    font-size: 0.95rem !important;
    font-weight: 500 !important;
}
.nav-dropdown-menu a:hover {
    color: var(--primary-color, #4f46e5) !important;
    background-color: var(--bg-gray, #f8fafc) !important;
}
`;

// Update CSS
const cssPath = path.join(dir, 'style.css');
if (fs.existsSync(cssPath)) {
    let css = fs.readFileSync(cssPath, 'utf8');
    if (!css.includes('.nav-dropdown-menu')) {
        fs.appendFileSync(cssPath, "\n" + cssToAppend, 'utf8');
        console.log("Appended CSS for nav dropdown");
    }
}

// Ensure add_to_sitemap is aware of the new page
const sitemapScriptPath = path.join(dir, 'add_to_sitemap.js');
if (fs.existsSync(sitemapScriptPath)) {
    let sitemapScript = fs.readFileSync(sitemapScriptPath, 'utf8');
    if (!sitemapScript.includes('apple-id-tutorial.html')) {
        // we can update it or just let the user run it if they want. I will skip for now or write a simple script.
    }
}

let updatedCount = 0;

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Navigation replace
    // Find: <a href="apple-id-shared.html">免费ID获取</a> (usually inside nav-links)
    const dropdownHTML = `<div class="nav-dropdown">
                    <a href="apple-id-shared.html" class="nav-dropdown-toggle">免费ID教程 <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
                    <div class="nav-dropdown-menu">
                        <a href="apple-id-shared.html">免费ID获取</a>
                        <a href="apple-id-tutorial.html">无痛换区教程</a>
                    </div>
                </div>`;

    // Replace in header: <a href="apple-id-shared.html">免费ID获取</a>
    if (content.includes('<a href="apple-id-shared.html">免费ID获取</a>') && !content.includes('nav-dropdown')) {
        // It's possible the exact structure varies slightly, but usually it's in nav-links.
        content = content.replace(
            /(<nav class="nav-links">[\s\S]*?)<a href="apple-id-shared\.html">免费ID获取<\/a>([\s\S]*?<\/nav>)/g,
            `$1${dropdownHTML}$2`
        );
        fs.writeFileSync(filePath, content, 'utf8');
        updatedCount++;
        console.log(`Updated nav dropdown in: ${file}`);
    }
}

console.log(`\n🎉 Nav dropdown added to ${updatedCount} files.`);
