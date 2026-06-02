import os
import glob
import re

workspace = r"c:\Users\user\OneDrive\Desktop\博客网站\柳如烟clashvpns.cloud"
all_files = glob.glob(os.path.join(workspace, "*.html")) + \
            glob.glob(os.path.join(workspace, "*.js")) + \
            glob.glob(os.path.join(workspace, "*.ps1")) + \
            glob.glob(os.path.join(workspace, "*.py"))

nav_pattern1 = r'(<a href="recommend\.html">机场推荐</a>)'
nav_pattern2 = r'(<a href="recommend\.html" class="active">机场推荐</a>)'
footer_pattern = r'(<li><a href="recommend\.html">机场推荐</a></li>)'

for file_path in all_files:
    if os.path.basename(file_path) == "add_review_link.py":
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    if '>机场测评<' not in content:
        content = re.sub(nav_pattern1, r'\1\n                <a href="https://jichangpingce.club/" target="_blank">机场测评</a>', content)
        content = re.sub(nav_pattern2, r'\1\n                <a href="https://jichangpingce.club/" target="_blank">机场测评</a>', content)
        
        content = re.sub(footer_pattern, r'\1\n                        <li><a href="https://jichangpingce.club/" target="_blank">机场测评</a></li>', content)

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(file_path)}")

print("Done.")
