const fs = require('fs');
const path = require('path');

const content = `---
import Layout from '../../layouts/Layout.astro';
import clientsData from '../../data/clients.json';

export async function getStaticPaths() {
  const clients = clientsData;
  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  return clients.map((client) => {
    const related = clients.filter(c => 
      c.name !== client.name && 
      (c.os.some(o => client.os.includes(o)) || c.protocols.some(p => client.protocols.includes(p)))
    ).slice(0, 4);

    return {
      params: { client: slugify(client.name) },
      props: { 
        client,
        relatedClients: related.map(r => ({ ...r, slug: slugify(r.name) }))
      },
    };
  });
}

const { client, relatedClients } = Astro.props;

const osText = {
  'Windows': '在 Windows 生态下，网络环境非常复杂，各种杀毒软件和防火墙可能会对代理软件的运行造成干扰。但在最新版的 Windows 10 与 Windows 11 系统中，经过优化后的内核能更好地处理底层网络分流。配置 Windows 客户端时，请确保系统时间准确，并尽量以管理员身份运行以获得最高权限，这不仅能解决 90% 的连通性问题，还能通过 TUN 模式实现真正的全局代理，让包括游戏客户端、UWP 应用在内的所有流量都能顺畅代理。',
  'macOS': '对于 macOS 用户而言，由于苹果系统的封闭性和严格的沙盒机制，选择一款优秀的代理客户端尤为重要。现代的 macOS（如 Sonoma 或更早的系统）要求软件拥有完善的系统代理权限。安装时如果遇到『不明开发者』的提示，需要在『系统设置-隐私与安全性』中手动放行。此外，macOS 的增强模式（Enhanced Mode）可以完美解决部分终端软件不走代理的痛点，给开发者带来极大的便利。',
  'Android': '安卓系统的开放性赋予了代理软件极大的自由度。无论是 VPN 模式还是直接的透明代理，安卓客户端都能轻松应对。在配置安卓手机时，强烈建议将代理软件加入系统电池优化白名单，并锁定后台，防止因为系统杀后台导致代理突然中断。此外，分应用代理（Per-App Proxy）是安卓端的一大杀器，您可以精确指定只有 Telegram 或 YouTube 走代理，而微信、支付宝保持直连，完美兼顾了隐私和日常使用的顺畅。',
  'iOS': 'iOS 系统受限于严格的沙盒和 Network Extension 框架，所有的代理软件都必须通过系统的 VPN 通道来实现全局接管。配置时需要允许添加 VPN 配置。由于 iOS 系统的后台唤醒机制非常严格，优秀的客户端都会通过精细的内存管理来确保即便在锁屏状态下，微信消息推送也能通过直连通道秒回，而外网消息也能及时送达。使用时无需刻意清理后台，保持常驻即可。',
  'Linux': 'Linux 环境下的代理配置往往被视为技术高手的专属领域。不管是 Ubuntu、Debian 还是 Arch Linux，基于命令行的核心程序配合强悍的 iptables 或 nftables 路由规则，能实现路由器级别的透明代理。对于带有 GUI 的桌面环境，虽然图形界面客户端选择不如 Windows 丰富，但其底层内核的执行效率却是所有平台中最高的。通过编写 systemd 服务脚本，可以实现开机自启、崩溃自动重启，达到极致的稳定性。',
  'Router': '将代理配置在路由器（如 OpenWrt、梅林固件）上，是实现全家设备『无痛翻墙』的终极方案。配置在路由器层面，意味着不仅是手机和电脑，连智能电视、游戏主机（PS5/Switch）甚至智能音箱都能直接享受科学上网的便利。这要求路由器拥有较强的 CPU 性能（特别是 AES 指令集硬件加速）来处理高强度的加密解密运算。设置时需仔细配置防 DNS 泄露和分流规则，确保国内流量和国外流量各行其道。'
};

const protocolText = {
  'Shadowsocks (SS)': 'Shadowsocks (SS) 作为开启了现代科学上网纪元的元老级协议，至今依然保持着极强的生命力。其基于 SOCKS5 代理方式并引入了多种加密算法（如 aes-256-gcm，chacha20-poly1305），不仅保证了数据的机密性，还在性能上达到了极高的平衡。由于其轻量化的设计，即使在性能较弱的路由器或老旧手机上也能跑出极高的带宽。尽管面临越来越复杂的封锁技术，但通过配合各类混淆插件或作为其他协议的底层支撑，SS 依然是稳定性的代名词。',
  'ShadowsocksR (SSR)': 'ShadowsocksR (SSR) 是在 SS 基础上的一次重要分支进化。它最大的革新在于引入了协议（Protocol）和混淆（Obfs）机制，能够将代理流量伪装成普通的 HTTP 访问或 TLS 握手，从而在一定程度上欺骗防火墙的深度包检测（DPI）。在特殊的网络时期，SSR 的这种伪装能力展现出了非凡的韧性。虽然近年来新型协议层出不穷，但 SSR 庞大的用户基础和极低的使用门槛，使其在很多机场和用户的工具箱中依然占有一席之地。',
  'V2Ray': 'V2Ray（Project V）不仅仅是一个协议，而是一个庞大且高度模块化的网络代理工具箱。它核心的 VMess 协议引入了基于时间的动态特征，极大地提高了抗封锁能力。更为强大的是 V2Ray 的底层传输配置（Stream Settings），支持将流量伪装成正常的 WebSocket 网页请求，并通过 Nginx 反向代理隐藏在真实的网站背后，结合 TLS 加密（即经典的 V2Ray+WS+TLS 架构），几乎做到了流量特征的完全隐形，是目前最为主流且安全的方案之一。',
  'Trojan': 'Trojan 协议的设计理念非常独特，它没有像前人一样绞尽脑汁去开发新的加密特征，而是选择『大隐隐于市』。Trojan 将整个代理过程完全模拟为正常的 HTTPS 流量，直接使用标准的 TLS 加密。在防火墙看来，Trojan 的流量与访问一个普通的加密网页毫无二致。这种极简而聪明的思路不仅大幅降低了被主动探测封锁的概率，还因为没有额外的加密/解密层，在客户端和服务端都表现出了极低的 CPU 占用和极高的传输效率。',
  'Xray': 'Xray 是从 V2Ray 衍生出的新生代王者，它完全兼容 V2Ray 的特性，但在性能和架构上进行了大刀阔斧的重构和优化。Xray 引入了革命性的 XTLS 技术，它能聪明地识别出本身就已经加密过的流量（如 HTTPS），并在传输过程中直接拼接（Direct/Splice），省去了代理协议的二次加密开销，从而让性能得到了指数级的提升。此外，Xray 的 VLESS 协议去除了传统 VMess 中复杂的时钟同步等要求，变得更加纯粹和高效。',
  'Hysteria': 'Hysteria (包括 Hysteria2) 代表了基于 UDP 协议代理的最新发展方向。传统基于 TCP 的代理在面对长距离、高丢包、高延迟的跨国网络时，往往会触发 TCP 拥塞控制，导致网速断崖式下跌。而 Hysteria 基于修改版的 QUIC 协议，通过暴力发包和自定义的拥塞控制算法，能够在恶劣的网络环境下强行抢占带宽，实现速度的极大飞跃，被许多网友戏称为『双边加速黑科技』。它极其适合用于观看 4K 视频或大文件下载。',
  'WireGuard': 'WireGuard 最初是作为一个更现代、更快速、更安全的 VPN 隧道协议被合并进 Linux 内核的。与传统的 OpenVPN 或 IPsec 相比，它的代码库极小，只使用最先进的密码学原语，因此在建立连接和数据传输时展现出了极低的延迟和惊人的吞吐量。虽然其本身并非专为突破防火墙设计（因为其 UDP 特征相对明显），但在很多专线、中转节点或者海外服务器互联的场景中，WireGuard 是构建底层隧道的首选技术。',
  'sing-box': 'sing-box 是近年来异军突起的一个通用代理平台，被称为『下一代代理工具』。它用 Go 语言重写，拥有极其紧凑的代码和出色的内存管理，支持目前市面上几乎所有主流协议（包括 VLESS, Trojan, Shadowsocks, Hysteria2, TUIC 等）。sing-box 的配置文件高度一致且逻辑严密，非常适合用作所有代理内核的替代品。它不仅在服务端表现优异，其配套的客户端在全平台上都展现出了极快的启动速度和低资源消耗。'
};

const generatedIntro = \`
欢迎来到 \${client.name} 的 2026 最新图文保姆级教程与深度解析！如果您正在寻找一款能够稳定突破网络限制、流畅访问全球互联网的代理客户端，那么支持 \${client.os.join('、')} 平台的 **\${client.name}** 绝对是您不可错过的神器。在如今复杂多变的国际网络环境下，如何选择一款适合自己的客户端，并将其配置得当，是每一位冲浪者的必修课。

本篇不仅是一份简单的下载和使用说明，更是一篇长达千字的深度剖析指南。我们将带您从 \${client.name} 的底层协议机制出发，深入探讨它为什么能在众多工具中脱颖而出，并针对 \${client.os.length > 0 ? client.os[0] : '各种'} 系统的特性，提供手把手、零基础的配置教学。无论您是需要流畅观看 4K 流媒体视频、低延迟进行外服游戏，还是进行跨国办公与学术研究，这篇包含海量 SEO 优化关键词和关联竞品对比的终极指南，都将为您解答所有疑惑。
\`;

let osSection = '';
client.os.forEach(o => {
  if (osText[o]) {
    osSection += \`\\n### 针对 \${o} 系统的深度优化与配置要点\\n\${osText[o]}\\n在 \${o} 平台上安装 \${client.name} 后，务必要注意系统防火墙或安全卫士的拦截问题，这不仅关乎连接的成功率，更直接影响到 DNS 泄露的防范。很多新手在初次配置时遇到无法访问的情况，90% 都是由于底层的网络接口权限没有正确赋予。\`;
  }
});

let protocolSection = '';
client.protocols.forEach(p => {
  if (protocolText[p]) {
    protocolSection += \`\\n### 为什么支持 \${p} 是一个巨大的优势？\\n\${protocolText[p]}\\n使用 \${client.name} 运行 \${p} 协议时，您可以明显感受到它底层的优化。当我们在配置订阅链接时，实际上就是将这些复杂的加密算法和路由规则，浓缩到了短短一行 URL 之中。\`;
  }
});

const faqSection = \`
## \${client.name} 常见问题排查与 FAQ 高级指南

即便 \${client.name} 已经做得非常易用，但在实际复杂的网络环境中，偶尔也会遇到一些连接故障。以下是我们为您整理的最常见的排查步骤：

1. **配置导入失败或解析错误**
如果您在导入机场订阅时，\${client.name} 提示解析失败，请首先检查您的订阅链接是否匹配该软件支持的协议格式（如 \${client.protocols.join(', ')}）。有些旧版本的订阅格式可能不兼容最新的解析引擎。建议尝试更新订阅或在机场后台切换为更现代的订阅格式。
2. **连接显示成功但无法打开网页（无网络）**
这是新手最常遇到的问题。请检查 \${client.name} 中的『系统代理』开关是否已正确打开。如果您开启了 TUN 模式，请尝试重启软件并赋予管理员权限。此外，检查您的节点是否已经过期或耗尽流量。
3. **部分国内网站或 App 无法访问**
这通常是因为分流规则（Routing Rules）设置错误。如果 \${client.name} 处于『全局模式』，国内网站的访问也会被绕行海外，不仅速度极慢，还可能被判定为异地登录。请确保将运行模式切换为『规则模式（Rule）』或『绕过大陆（Bypass LAN & China）』。
\`;

let spiderWebSection = \`
## 拓展阅读：构建您的专属代理蜘蛛网

如果您发现 \${client.name} 并不能完美契合您的使用习惯，不用担心。我们的网站为您准备了全网最详尽的客户端评测。基于您的需求，我们强烈推荐您深入了解以下同生态或同协议的优秀客户端，这些文章之间有着严密的关联逻辑，通过它们，您将构建起属于自己的底层网络认知体系：

\`;

relatedClients.forEach(rc => {
  const commonOs = rc.os.filter(o => client.os.includes(o));
  const commonProto = rc.protocols.filter(p => client.protocols.includes(p));
  let reason = '它们';
  if (commonOs.length > 0) reason = \`和 \${client.name} 一样都完美支持 \${commonOs.join('、')} 平台\`;
  else if (commonProto.length > 0) reason = \`在处理 \${commonProto.join('、')} 协议上有异曲同工之妙\`;
  spiderWebSection += \`- **[\${rc.name} 深度使用指南](/guides/\${rc.slug})**：\${reason}。如果您喜欢 \${client.name} 的某些特性，不妨看看 \${rc.name} 是否能带来不一样的使用体验。\\n\`;
});
---
<Layout title={\`\${client.name} 终极图文保姆教程下载与配置指南 - 柳如烟的手账本\`}>
  <div class="fixed inset-0 z-[-1] pointer-events-none" style="background-color: #FFFDF8; background-image: linear-gradient(transparent 23px, #FFD6E7 24px), linear-gradient(90deg, transparent 23px, #FFD6E7 24px); background-size: 24px 24px;">
    <div class="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]"></div>
  </div>

  <article class="max-w-4xl mx-auto px-4 py-12">
    <div class="bg-white p-8 md:p-12 shadow-[4px_6px_25px_rgba(0,0,0,0.06)] border border-sakura-secondary/30 relative">
      <div class="absolute -top-4 -left-4 w-20 h-8 bg-[#FFB6C1]/80 -rotate-6 backdrop-blur-sm shadow-sm z-10" style="mix-blend-mode: multiply;"></div>
      <div class="absolute -bottom-4 -right-4 w-20 h-8 bg-[#BFDBFE]/80 -rotate-3 backdrop-blur-sm shadow-sm z-10" style="mix-blend-mode: multiply;"></div>
      
      <header class="mb-12 pb-8 border-b-2 border-dashed border-sakura-secondary/50 text-center relative">
        <div class="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12">{client.icon}</div>
        <h1 class="text-4xl md:text-5xl font-handwriting text-sakura-primary mb-6 leading-tight">
          【2026 全面解析】{client.name} 下载与终极配置保姆级教程
        </h1>
        
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          {client.os.map(o => <span class="bg-sakura-primary/10 text-sakura-primary font-bold px-3 py-1 rounded text-sm shadow-sm">{o}</span>)}
          {client.protocols.map(p => <span class="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded text-sm border border-gray-200">{p}</span>)}
        </div>

        <a href={client.downloadLink} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-8 py-3 bg-sakura-primary text-white font-bold text-lg rounded shadow-[2px_4px_0px_#D6336C] hover:translate-y-[2px] hover:shadow-[0px_0px_0px_#D6336C] transition-all">
          📥 获取 {client.name} 官方版下载
        </a>
      </header>

      <div class="prose prose-lg prose-pink max-w-none">
        <p class="lead text-xl text-gray-700 font-medium leading-relaxed mb-10">{generatedIntro}</p>

        <div class="bg-[#FEF9C3] p-6 shadow-sm border-l-4 border-yellow-400 transform rotate-1 my-10 relative">
          <div class="absolute -top-4 left-4 text-2xl drop-shadow-sm">📌</div>
          <h2 class="text-yellow-800 font-bold mt-0 mb-2 font-handwriting text-2xl">核心信息速递</h2>
          <ul class="text-yellow-900/80 m-0">
            <li><strong>支持平台</strong>: {client.os.join(', ')}</li>
            <li><strong>核心协议</strong>: {client.protocols.join(', ')}</li>
            <li><strong>适用人群</strong>: 对网络连通性、安全性和分流策略有较高要求的进阶用户及新手入门。</li>
          </ul>
        </div>

        <h2 class="text-2xl font-bold text-sakura-text mb-4 mt-12 border-b border-sakura-secondary/20 pb-2">一、跨越系统的无缝体验：各平台环境分析</h2>
        <div class="text-gray-700 leading-relaxed" set:html={osSection.replace(/\\n/g, '<br/>')} />

        <h2 class="text-2xl font-bold text-sakura-text mb-4 mt-12 border-b border-sakura-secondary/20 pb-2">二、硬核底层揭秘：强大的协议支持库</h2>
        <div class="text-gray-700 leading-relaxed" set:html={protocolSection.replace(/\\n/g, '<br/>')} />
        
        <div class="bg-gray-50 p-6 border border-gray-200 rounded-lg my-10 shadow-inner">
          <h2 class="text-xl font-bold text-sakura-text mt-0 mb-4 flex items-center gap-2">🛠️ 通用配置与一键导入教程步骤</h2>
          <ol class="space-y-4 text-gray-700">
            <li><strong>第一步：获取节点订阅</strong> - 首先，您需要拥有一家稳定可靠的机场提供的订阅链接。如果您还没有，可以访问我们的精选机场推荐获取。</li>
            <li><strong>第二步：安装客户端</strong> - 通过我们页面上方的官方下载按钮，获取对应您系统的 {client.name} 安装包并完成安装。请注意，部分系统可能需要管理员权限。</li>
            <li><strong>第三步：导入订阅链接</strong> - 打开软件后，寻找「Profiles」、「订阅」、「配置」或类似字眼的选项。将第一步获取的链接粘贴进去，并点击「更新」或「下载」。</li>
            <li><strong>第四步：开启系统代理</strong> - 节点列表更新成功后，选中一个延迟较低的节点。然后，将软件的开关拨至「开启」，同时确保「系统代理 (System Proxy)」选项被勾选。</li>
            <li><strong>第五步：验证网络连通性</strong> - 打开您的浏览器，尝试访问 YouTube 或 Google。如果能够顺利打开，恭喜您，配置已完美成功！</li>
          </ol>
        </div>

        <div class="text-gray-700 leading-relaxed" set:html={faqSection.replace(/\\n/g, '<br/>')} />

        <div class="bg-sakura-secondary/10 p-6 rounded-xl border border-sakura-secondary/30 mt-16 mb-8 transform -rotate-1 relative">
          <div class="absolute -top-3 right-4 w-12 h-6 bg-[#A7F3D0]/80 rotate-6 shadow-sm" style="mix-blend-mode: multiply;"></div>
          <div class="text-gray-700 leading-relaxed" set:html={spiderWebSection.replace(/\\n/g, '<br/>')} />
        </div>

      </div>
      
      <div class="mt-12 pt-8 border-t border-gray-100 text-center">
        <a href="/guides" class="inline-flex items-center gap-2 text-sakura-primary font-bold hover:bg-sakura-primary/10 px-6 py-2 rounded-full transition-colors">
          &larr; 返回新手教程大全
        </a>
      </div>
    </div>
  </article>
</Layout>
`;

fs.writeFileSync(path.join(__dirname, 'src/pages/guides/[client].astro'), content, 'utf8');
console.log('File created via Node!');
