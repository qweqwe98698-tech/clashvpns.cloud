import re

def process_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Define the new cards
    new_cards = """
                <!-- 机场卡片 2 -->
                <div class="airport-card">
                    <div class="airport-header">
                        <h3 class="airport-name">2. 二猫云</h3>
                    </div>
                    <div class="airport-tags">
                        <span class="airport-tag">🟦 新手友好</span>
                        <span class="airport-tag">🟩 多平台支持</span>
                        <span class="airport-tag">🟪 稳定机场</span>
                        <span class="airport-tag">🟧 流媒体解锁</span>
                        <span class="airport-tag">🟨 日常备用机场</span>
                    </div>
                    <p>二猫云的优势在于使用门槛低，用户购买套餐后，只需要复制订阅链接，再导入 Clash Verge Rev、Shadowrocket、Stash、v2rayN、v2rayNG 等客户端即可使用。对于不想折腾复杂配置的新手来说，这类机场更容易快速上手。</p>
                    <p>在线路体验方面，二猫云可以重点突出“节点覆盖常用地区、适合日常访问、高清视频播放和 AI 工具使用”。如果页面用于 SEO 推荐，可以围绕“稳定机场推荐”“新手机场推荐”“Clash 机场教程”等关键词展开内容。</p>
                    
                    <table class="feature-table">
                        <tr><th>图标</th><th>项目</th><th>说明</th></tr>
                        <tr><td>⚡</td><td>速度表现</td><td>适合日常网页浏览、高清视频和 AI 工具访问</td></tr>
                        <tr><td>🌍</td><td>节点布局</td><td>覆盖香港、日本、新加坡、美国等常用地区</td></tr>
                        <tr><td>🛡️</td><td>稳定保障</td><td>适合作为日常主力或备用机场使用</td></tr>
                        <tr><td>📱</td><td>新手体验</td><td>支持主流客户端订阅导入，配置流程简单</td></tr>
                    </table>

                    <table class="feature-table">
                        <tr><th>套餐名称</th><th>价格</th><th>流量</th><th>特性</th></tr>
                        <tr><td>白猫套餐</td><td>¥20 / 月</td><td>100GB / 月</td><td>轻度用户、备用线路用户</td></tr>
                        <tr><td>橘猫畅玩版</td><td>¥40 / 月</td><td>200GB / 月</td><td>日常社交与中度视频用户</td></tr>
                        <tr><td>牛奶猫尊享版</td><td>¥80 / 月</td><td>400GB / 月</td><td>中重度流媒体与 AI 工具用户</td></tr>
                        <tr><td>黑猫无限版</td><td>¥160 / 月</td><td>800GB / 月</td><td>高频多设备或团队协作用户</td></tr>
                    </table>
                    <a href="https://01.2maoyunaff.cc/#/register?code=ap0f4ZNt" target="_blank" class="btn-register">官网注册</a>
                </div>

                <!-- 机场卡片 3 -->
                <div class="airport-card">
                    <div class="airport-header">
                        <h3 class="airport-name">3. 全球云</h3>
                    </div>
                    <div class="airport-tags">
                        <span class="airport-tag">🟦 全球节点</span>
                        <span class="airport-tag">🟩 多地区覆盖</span>
                        <span class="airport-tag">🟪 流媒体解锁</span>
                        <span class="airport-tag">🟧 商务访问</span>
                        <span class="airport-tag">🟨 多平台兼容</span>
                    </div>
                    <p>全球云可以重点突出香港、日本、新加坡、美国、台湾、韩国、欧洲等热门节点地区，让用户根据访问需求选择合适线路。对于日常使用来说，香港、日本、新加坡节点更适合低延迟访问；美国和欧洲节点更适合部分海外服务和流媒体场景。</p>
                    <p>新手用户可以通过 Clash Verge Rev、Shadowrocket、Stash、v2rayN、v2rayNG 等客户端导入订阅链接使用，整体配置流程较简单。</p>
                    
                    <table class="feature-table">
                        <tr><th>图标</th><th>项目</th><th>说明</th></tr>
                        <tr><td>⚡</td><td>速度表现</td><td>适合多地区访问、视频播放和 AI 工具使用</td></tr>
                        <tr><td>🌍</td><td>节点布局</td><td>主打全球节点覆盖，方便跨区切换</td></tr>
                        <tr><td>🛡️</td><td>稳定保障</td><td>多地区备用节点，降低单一区域拥堵影响</td></tr>
                        <tr><td>📱</td><td>新手体验</td><td>兼容主流代理客户端，订阅导入方便</td></tr>
                    </table>

                    <table class="feature-table">
                        <tr><th>套餐名称</th><th>价格</th><th>流量</th><th>特性</th></tr>
                        <tr><td>入门套餐</td><td>¥20 / 月</td><td>120GB / 月</td><td>轻度用户，日常网页与社交使用</td></tr>
                        <tr><td>进阶套餐</td><td>¥40 / 月</td><td>300GB / 月</td><td>日常主力，适合视频和 AI 工具</td></tr>
                        <tr><td>高端套餐</td><td>¥100 / 月</td><td>700GB / 月</td><td>中重度使用，多设备适合</td></tr>
                        <tr><td>商业套餐</td><td>¥180 / 月</td><td>1.5TB / 月</td><td>大流量、团队或高频用户</td></tr>
                        <tr><td>独享私人专线</td><td>¥600 / 月</td><td>500GB / 月</td><td>独享线路，高要求场景</td></tr>
                    </table>
                    <a href="#" target="_blank" class="btn-register">官网注册</a>
                </div>

                <!-- 机场卡片 4 -->
                <div class="airport-card">
                    <div class="airport-header">
                        <h3 class="airport-name">4. 唯兔云</h3>
                    </div>
                    <div class="airport-tags">
                        <span class="airport-tag">🟦 老用户常用</span>
                        <span class="airport-tag">🟩 Clash 友好</span>
                        <span class="airport-tag">🟪 稳定节点</span>
                        <span class="airport-tag">🟧 AI 工具访问</span>
                        <span class="airport-tag">🟨 多设备使用</span>
                    </div>
                    <p>唯兔云适合搭配 Clash Verge Rev、Shadowrocket、Stash、v2rayN、v2rayNG 等客户端使用。用户复制订阅链接后，可以快速导入客户端，选择延迟较低的节点进行连接，整体操作比较适合新手和普通用户。</p>
                    <p>在内容展示上，唯兔云可以突出“节点稳定、客户端兼容、适合 AI 工具和流媒体场景”。如果用于机场推荐页面，可以将它放在“稳定日常使用机场”或“新手友好机场”分类中。</p>
                    
                    <table class="feature-table">
                        <tr><th>图标</th><th>项目</th><th>说明</th></tr>
                        <tr><td>⚡</td><td>速度表现</td><td>适合 AI 工具、视频播放和日常访问</td></tr>
                        <tr><td>🌍</td><td>节点布局</td><td>覆盖多个常用海外节点地区</td></tr>
                        <tr><td>🛡️</td><td>稳定保障</td><td>适合长期日常使用和备用切换</td></tr>
                        <tr><td>📱</td><td>新手体验</td><td>订阅导入流程简单，兼容主流客户端</td></tr>
                    </table>

                    <table class="feature-table">
                        <tr><th>套餐名称</th><th>价格</th><th>流量</th><th>特性</th></tr>
                        <tr><td>年付版</td><td>¥79.9 / 年</td><td>45GB / 月</td><td>轻量长期使用，折合价格较低</td></tr>
                        <tr><td>入门版</td><td>¥14.9 / 月</td><td>100GB / 月</td><td>IPLC 专线 / SS 协议，适合入门</td></tr>
                        <tr><td>进阶版</td><td>¥29.9 / 月</td><td>200GB / 月</td><td>全 IPLC 专线不限速，适合日常主力</td></tr>
                        <tr><td>专业版</td><td>¥59.9 / 月</td><td>500GB / 月</td><td>适合重度视频用户</td></tr>
                        <tr><td>至尊版</td><td>¥119.9 / 月</td><td>1TB / 月</td><td>顶级出口与原生 IP 池定位</td></tr>
                    </table>
                    <a href="#" target="_blank" class="btn-register">官网注册</a>
                </div>"""

    if '14 家最推荐' not in content:
        content = content.replace('11 家最推荐', '14 家最推荐')
    
    if '<!-- 机场卡片 4 -->' not in content:
        # First, shift the numbering of existing cards from 2..11 to 5..14
        for i in range(11, 1, -1):
            content = content.replace(f'<!-- 机场卡片 {i} -->', f'<!-- 机场卡片 {i+3} -->')
            content = re.sub(rf'<h3 class="airport-name">{i}\. ', f'<h3 class="airport-name">{i+3}. ', content)

        # Now split at "<!-- 机场卡片 5 -->" and insert our new cards 2,3,4
        parts = content.split('<!-- 机场卡片 5 -->')
        if len(parts) == 2:
            new_html = parts[0] + new_cards + '\n                <!-- 机场卡片 5 -->' + parts[1]
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_html)
            print(f"{filename} updated!")
        else:
            print(f"Could not split {filename} at <!-- 机场卡片 5 -->")

process_file('airport-reviews.html')

