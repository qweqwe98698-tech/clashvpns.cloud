---
layout: ../../layouts/GuideLayout.astro
title: Clash Verge Rev 客户端订阅导入教程
platform: Windows / macOS
date: 2026-05-17
---

[Clash Verge](#) Rev 是目前 Windows 和 macOS 平台上最流行、界面最好看的 Clash 内核代理客户端之一。本文将手把手教你如何在该客户端中导入机场订阅链接并开始冲浪。

## 第一步：下载并安装客户端

<div class="step-box">
  <p>请前往项目的官方 GitHub Releases 页面下载最新版本的客户端。<br>
  <strong>Windows 用户</strong>：通常下载结尾为 <code>.exe</code> 的安装包（如 <code>Clash.Verge_x.x.x_x64_zh-CN-setup.exe</code>）。<br>
  <strong>macOS 用户</strong>：根据您的 Mac 芯片选择 <code>.dmg</code> 文件（M1/M2/M3 Apple Silicon 芯片选 <code>aarch64</code>，Intel 芯片选 <code>x64</code>）。</p>
</div>

## 第二步：获取机场订阅链接

<div class="step-box" style="background-color: #eff6ff; border-left-color: #3b82f6; color: #1e3a8a;">
  <p>1. 登录您所购买的机场后台界面。<br>
  2. 在用户中心或仪表盘（Dashboard）找到<strong>“一键订阅”</strong>或<strong>“导入到 Clash”</strong>的功能区域。<br>
  3. 点击<strong>“复制 Clash 订阅链接”</strong>（通常是一串以 <code>http</code> 或 <code>https</code> 开头的网址）。</p>
</div>

## 第三步：在 Clash Verge Rev 中导入订阅

1. 打开已经安装好的 **Clash Verge Rev** 客户端。
2. 在客户端界面左侧的导航菜单中，点击进入 **“订阅” (Profiles)** 页面。
3. 在界面顶部的输入框中，**粘贴**您刚刚复制的机场订阅链接。
4. 点击输入框右侧的 **“导入” (Import)** 按钮。
5. 等待几秒钟，客户端会自动下载配置文件。下载成功后，您会在列表中看到刚刚添加的配置项目。
6. 在列表中**单击**该配置文件（或者右键选择“使用”），当其高亮或状态显示为已选中时，说明配置已激活。

## 第四步：选择节点并开启系统代理

1. 在左侧导航栏点击进入 **“代理” (Proxies)** 页面。
2. 在顶部的代理模式选项中，建议选择 **“规则” (Rule)** 模式（这会让国内网站直连，国外网站走代理）。
3. 在下方的节点列表中，展开“节点选择”或“Proxy”，选择一个延迟较低、状态健康的节点（如香港、日本、新加坡等地的节点）。
4. 最后一步，回到左侧导航栏的 **“设置” (Settings)** 页面。
5. 找到 **“系统代理” (System Proxy)** 选项，将其右侧的开关打开。

<div class="step-box" style="background-color: #fffbeb; border-left-color: #f59e0b; color: #92400e;">
  <p><strong>🎉 恭喜完成！</strong><br>现在您已经成功配置好了 Clash Verge Rev，可以打开浏览器畅通无阻地访问国际互联网了。</p>
</div>
