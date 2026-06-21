const fs = require('fs');

try {
  const text = fs.readFileSync('C:/Users/user/.gemini/antigravity/brain/62d6374a-bf07-46d7-93cc-d007be66906e/.system_generated/steps/197/content.md', 'utf8');

  // Strip styles and scripts
  const cleanedText = text.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  const elements = [];
  
  // Extract headings
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  let match;
  while ((match = headingRegex.exec(cleanedText)) !== null) {
    const cleanHeading = match[2].replace(/<[^>]+>/g, '').trim();
    if (cleanHeading) {
      elements.push({ pos: match.index, type: 'heading', text: cleanHeading });
    }
  }

  // Extract links
  const linkRegex = /<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi;
  while ((match = linkRegex.exec(cleanedText)) !== null) {
    const url = match[1];
    const cleanLinkText = match[2].replace(/<[^>]+>/g, '').trim();
    
    if (url.includes('github.com') || url.match(/\.(apk|exe|dmg|zip|msi)$/i) || cleanLinkText.includes('下载') || cleanLinkText.includes('Download') || cleanLinkText.includes('网盘')) {
      if (cleanLinkText) {
        elements.push({ pos: match.index, type: 'link', text: cleanLinkText, url: url });
      }
    }
  }

  // Sort by position
  elements.sort((a, b) => a.pos - b.pos);

  let currentHeading = 'None';
  for (const el of elements) {
    if (el.type === 'heading') {
      currentHeading = el.text;
    } else if (el.type === 'link' && el.text.length < 50) {
      console.log(`[${currentHeading}] ${el.text} -> ${el.url}`);
    }
  }

} catch (err) {
  console.error(err);
}
