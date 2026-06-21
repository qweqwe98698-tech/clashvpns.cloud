import re
import sys

try:
    with open(r'C:\Users\user\.gemini\antigravity\brain\62d6374a-bf07-46d7-93cc-d007be66906e\.system_generated\steps\197\content.md', 'r', encoding='utf-8') as f:
        text = f.read()
except Exception as e:
    print('Error reading file:', e)
    sys.exit(1)

# Basic cleanup to remove scripts and styles for better matching
text = re.sub(r'<style.*?</style>', '', text, flags=re.DOTALL|re.IGNORECASE)
text = re.sub(r'<script.*?</script>', '', text, flags=re.DOTALL|re.IGNORECASE)

# Extract headings to provide context
headings = re.finditer(r'<h([1-6])[^>]*>(.*?)</h\1>', text, flags=re.IGNORECASE|re.DOTALL)
links = re.finditer(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', text, flags=re.IGNORECASE|re.DOTALL)

elements = []
for h in headings:
    clean_text = re.sub(r'<[^>]+>', '', h.group(2)).strip()
    elements.append({'pos': h.start(), 'type': 'heading', 'text': clean_text})

for l in links:
    url = l.group(1)
    clean_text = re.sub(r'<[^>]+>', '', l.group(2)).strip()
    # Filter for download-like links
    if 'github.com' in url or url.endswith(('.apk', '.exe', '.dmg', '.zip', '.msi')) or '下载' in clean_text or 'Download' in clean_text or '网盘' in clean_text:
        if clean_text:
            elements.append({'pos': l.start(), 'type': 'link', 'text': clean_text, 'url': url})

elements.sort(key=lambda x: x['pos'])

current_heading = 'None'
for e in elements:
    if e['type'] == 'heading':
        current_heading = e['text']
    elif e['type'] == 'link':
        if len(e['text']) < 50:
            print(f"[{current_heading}] {e['text']} -> {e['url']}")
