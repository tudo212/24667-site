# 24667 思无涯 · 官网

FTC 队 24667（Thinking Unlimited #3，重庆市江北巴川量子学校）的官网源码。

纯静态站点：HTML + CSS + 一点原生 JavaScript，没有构建步骤、没有框架、没有后端。下载下来双击 `index.html` 就能看。

---

## 在线预览

- 正式地址：`https://tudo212.github.io/24667-site/`（需要在仓库 Settings → Pages 里打开一次）
- 临时预览（不用配置，仓库更新即生效）：
  `https://raw.githack.com/tudo212/24667-site/main/index.html`

## 本地预览

```bash
python -m http.server 8000
# 打开 http://127.0.0.1:8000
```

直接双击 `index.html` 也能看，只是 `file://` 下个别相对路径行为不同。

---

## 目录结构

```
.
├─ index.html             首页
├─ about/                 关于我们
├─ seasons/
│  ├─ index.html          赛季档案
│  ├─ 2027/               2026–2027 BIOBUZZ（含 match-2/11/17/20/26/36 六场回放页）
│  └─ 2026/               2025–2026 DECODE
├─ resources/             资源分享
├─ downloads/             开源图纸（V1.0 / V2.0 切换 + SolidWorks 下载）
├─ sponsor/               支持我们
├─ en/                    以上所有页面的英文版
├─ assets/
│  ├─ css/site.css        基础样式
│  ├─ css/v4.css          设计层（覆盖）
│  ├─ js/site.js          动效与交互
│  ├─ js/vendor/          GSAP + ScrollTrigger（本地化）
│  ├─ img/                图片
│  ├─ video/              比赛回放（6 段，约 69 MB）
│  └─ files/              SolidWorks 装配体（约 60 MB）
└─ src/generator/         生成这站点的 Python 脚本
```

## 技术说明

- **断点**：1100 / 980 / 720，移动端到 320px 不出现横向滚动
- **动效**：GSAP + ScrollTrigger，只动 `transform` / `opacity`，尊重 `prefers-reduced-motion`，加 `?noanim` 可关闭
- **无障碍**：语义标签、`aria-current`、折叠用原生 `<details>`、目录可键盘操作
- **无 Cookie、无统计脚本、无外部字体请求**（字体全部本地化）
- **左侧目录**：每个内页自动生成，滚动时高亮当前小节

### 关于生成脚本

`src/generator/` 里是把内容写成 Python 常量再生成的脚本（`build_all.py` 是入口）。这不是必须的——直接改 HTML 也能维护，脚本只是为了让 16 个页面的导航、页脚、中英切换保持一致。

```bash
cd src/generator
python build_all.py        # 输出到 ../../24667-site/
python make_deploy.py      # 导出可上传的干净目录
```

---

## 版权与许可

- **代码**（HTML / CSS / JavaScript / Python）：MIT，见 [LICENSE](LICENSE)
- **图片、视频、队徽、文字内容**：© 2026 FTC Team 24667，保留所有权利。未经许可不要转载或商用。
- 站点与 FIRST® 无隶属关系；FIRST® 与 FIRST TECH CHALLENGE® 是 FIRST 的注册商标。

## 联系

- 邮箱：bclzftc24667@gmail.com
- 电话 / 微信：13983217481
- 抖音：量子FTC思无涯队（1471716533）
