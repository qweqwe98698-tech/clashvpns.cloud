const fs = require('fs');
const path = require('path');

const newNamesText = `
11.龙猫云机场 
12.大象网络 
13.WgetCloud 全球加速 
14.悠兔机场 
15.Boost Net 
16.鹿语云机场 
17.SSRDOG 
18.Viking Links 
19.Coffee Cloud 
20.YepFast 椰皮机场 
21.E-IX 云加速 
22.SpeedCAT 闪电猫机场 
23.SS-ID 机场 
24.秒秒云
25.AmyTelecom 
26.游乐园 VPN 
27.Kuromis 库洛米 
28.SkyLinX 
29.Fastlink 机场 
30.MESL 
31.次元链接机场 
32.青云梯机场 
33.Nexitally 奶昔机场 
34.Flashfox 闪狐云 
35.夜煞云机场 
36.贝贝云机场 
37.Bitz Net 
38.守候网络机场 
39.一云梯机场 
40.FATCAT 肥猫云机场 
41.FlyingBird 飞鸟机场 
42.扬帆云 
43.Web3 加速器 
44.TNT Cloud 
45.蓝帆云 
46.CyberGuard 
47.速云梯 
48.五树云机场 
49.飞天猪（Fliggy Cloud） 
50.酷酷云机场 
51.YkkCloud 机场 
52.尔湾云 
53.XFLTD 养鸡场 
54.小鸡快跑机场 
55.COCODUCK 
56.疾风云 
57.Riolu 精灵学院 
58.BigME 大米机场 
59.小旋风机场 
60.飞机云 
61.NieRCloud 
62.奈云 
63.最萌的云 
64.蛋挞云 
65.CATNET 
66.八戒机场 
67.Anyland 机场 
68.老猫云机场 
69.Bridge the Wall 
70.魔戒机场 
71.Infiniport 
72.一枝红杏 
73.iNetS 机场 
74.Naiu Network 
75.泡泡狗机场 
76.狗狗加速 
77.XX-AI 
78.ASH 微斯人 
79.OKANC 
80.GLaDOS 
81.银河云
`;

const tagsPool = ["解锁流媒体", "原生IP", "低延迟", "晚高峰稳定", "新手友好", "多协议支持", "IPLC专线", "高性价比", "大流量", "无限设备", "商务访问", "AI 工具优化", "TikTok 专线", "游戏加速"];
const pricePrefixes = ["¥9.9", "¥12", "¥15", "¥18", "¥20", "¥25", "¥29", "¥35"];
const priceSuffixes = ["起/月 (100GB)", "起/月 (150GB)", "起/月 (200GB)", "起/月 (300GB)", "起/月 (500GB)", "/年付极简套餐"];
const audiencesPool = [
  "适合追求极致性价比的学生党和轻度网页浏览用户。",
  "重度 Netflix / Disney+ 追剧达人，对 4K 缓冲速度有极高要求。",
  "外贸从业者、跨境电商运营团队以及需要原生 IP 的商务人士。",
  "ChatGPT、Midjourney 等前沿 AI 工具的高频使用者，害怕账号被封控。",
  "不想折腾的纯小白用户，喜欢一键导入、无脑冲浪的畅快感。",
  "追求低延迟的海外游戏玩家，或者是需要稳定 24 小时挂机的主播。",
  "对隐私安全极度看重的极客玩家，要求全节点加密中转。",
  "多设备同时在线的家庭用户或小型工作室，需要大流量支持。"
];
const advantagesPool = [
  "全面采用新一代 BGP 隧道中转架构，无视晚高峰阻断，全节点原生解锁当地流媒体版权限制。",
  "价格极其良心，支持多种订阅格式一键导入，无论是电脑还是手机都能在 1 分钟内完成配置起飞。",
  "拥有极其庞大的全球骨干网节点群，智能负载均衡探针技术让你永远不会遇到断流的尴尬。",
  "主打高端深港专线，延迟可媲美国内访问。客服团队 24 小时在线解答疑难杂症，保姆级服务。",
  "提供独家定制的防墙协议，即使在特殊时期也能保持坚挺。流量单价极低，大户首选。",
  "不仅提供全流媒体原生解锁，还在日本、美国等核心地区部署了纯净度极高的家宽 IP 资源。",
  "后台面板极致简洁，充值即用。无需繁琐的验证流程，保护用户隐私的同时提供无上限的带宽体验。"
];

function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const lines = newNamesText.trim().split('\n');
const newAirports = [];

let counter = 100;

for (let line of lines) {
  if (!line.trim()) continue;
  // match "11.龙猫云机场 "
  const name = line.replace(/^\\d+\\./, '').trim();
  if (!name) continue;

  let baseId = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  if (!baseId) {
    baseId = 'airport-' + counter++;
  } else {
    // ensure unique if there are duplicates
    baseId = baseId + '-' + Math.floor(Math.random() * 1000);
  }

  const tags = getRandomItems(tagsPool, 4);
  const rating = Math.random() > 0.3 ? "★★★★★" : "★★★★☆";
  const price = getRandomItem(pricePrefixes) + getRandomItem(priceSuffixes);
  const audience = getRandomItem(audiencesPool);
  const advantage = getRandomItem(advantagesPool);

  newAirports.push({
    id: baseId,
    name: name,
    rating: rating,
    tags: tags,
    price: price,
    audience: audience,
    advantage: advantage,
    url: "#"
  });
}

const dbPath = path.join(__dirname, 'src/data/airports.json');
let existing = [];
if (fs.existsSync(dbPath)) {
  existing = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

// Remove duplicates by name just in case
const existingNames = new Set(existing.map(a => a.name));
const filteredNew = newAirports.filter(a => !existingNames.has(a.name));

const merged = [...existing, ...filteredNew];

fs.writeFileSync(dbPath, JSON.stringify(merged, null, 2), 'utf8');

console.log("Successfully added " + filteredNew.length + " new airports. Total airports now: " + merged.length);
