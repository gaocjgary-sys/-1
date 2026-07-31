# 欧洲核心轮胎进口商开发与出海决策平台 (European Tire Importers Platform)

欧洲核心轮胎进口商（法、克、斯、俄、乌）数据名录、地图分布、出海分析及 AI 商务开发信智能生成平台。

---

## 🌟 核心功能模块

1. **客户信息名录 (Importers Directory)**
   - 涵盖欧洲核心轮胎进口商详细档案，按名次、采购规模、国家筛选与排序。
   - 快速浏览公司名称与地址，一键展开查看完整海关采买记录、主营品类及准入条件。

2. **交互式地图分布 (Interactive Map)**
   - 基于 OpenStreetMap / Leaflet 实现，直观标注目标进口商在欧洲各城市与物流 Hub 的地理位置。

3. **市场统计与分析图谱 (Market Insights & Analytics)**
   - 使用 Recharts 呈现年进口分销估算总量（万条/年）柱状图与采购品类渗透率饼图。

4. **克罗地亚历史公司名册 (Croatia Historical Data)**
   - 包含克罗地亚（萨格勒布、斯普利特、里耶卡等）21 家历史轮胎分销与售后服务企业档案，支持一键导出 CSV。

5. **AI 商务拓展与开发信顾问 (Gemini 3.6 Flash AI Pitch)**
   - 智能分析买家采买痛点，自动生成高回复率的法文/英文商务开发信草稿及欧标准入谈判策略。

6. **欧洲拜访行程规划 (Visit Schedule Planner)**
   - 拟定拜访日期、设定优先级与对接进度，支持一键导出 TXT 拜访行程单。

---

## 🛠️ 技术栈 (Tech Stack)

- **前端 (Frontend):** React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Recharts, Leaflet, Motion
- **后端 (Backend):** Express, ESBuild, TSX
- **AI 引擎 (AI Integration):** Google Gemini API (`@google/genai` SDK)

---

## 🚀 快速启动指引 (Quick Start)

### 1. 克隆/下载项目并安装依赖

```bash
# 安装项目依赖
npm install
```

### 2. 配置环境变量

根目录下复制 `.env.example` 并重命名为 `.env`：

```bash
cp .env.example .env
```

在 `.env` 中填写您的 Google Gemini API Key：

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. 本地开发运行

```bash
npm run dev
```

打开浏览器访问 `http://localhost:3000` 即可使用。

### 4. 项目打包与构建

```bash
# 构建前端静态文件与后端 Bundle
npm run build

# 生产环境启动
npm start
```

---

## 📂 项目结构 (Project Structure)

```
.
├── src/
│   ├── components/       # UI 页面与组件 (目录、地图、AI 顾问、详细档案等)
│   ├── data/             # 欧洲轮胎进口商核心数据与克罗地亚历史数据
│   ├── types.ts          # TypeScript 类型定义
│   ├── App.tsx           # 应用主组件
│   ├── main.tsx          # 前端入口
│   └── index.css         # Tailwind 全局样式
├── server.ts             # Express 后端服务与 Vite 中间件
├── package.json          # 项目依赖与运行脚本
└── README.md             # 项目说明文档
```

---

## 💡 如何导出并导入 GitHub

在 AI Studio 界面中，您可以通过以下方式将本项目导出并提交至 GitHub：

1. **直接导出 (AI Studio 设置菜单):**
   - 点击 AI Studio 界面右上角的菜单 / **Settings**。
   - 选择 **Export to GitHub**（导出至 GitHub）或 **Download ZIP**（下载 ZIP 源码包）。

2. **通过 Git 命令行推送到 GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit of European Tire Importers Platform"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```
