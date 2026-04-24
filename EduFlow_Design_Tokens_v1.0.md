# EduFlow Design Tokens v1.0

> 定案日期：2026-04-19  
> 作者：Rick × Claude  
> 狀態：🔒 Locked — 除非根本方向改變，否則不再調整

---

## 一、北極星

> **為教育者打造一個安靜、自信、精準的生產力介面。**  
> 服務內容，不爭奪注意力。

---

## 二、七大視覺原則

1. **內容為王，介面退位** — 每個 UI 元素都要為老師的題目、學生、分數服務
2. **克制的色彩** — 單色底 + 一個有目的的 accent，不多不少
3. **排版扛起層次** — 用字級、字重、間距分層，不靠顏色或裝飾
4. **留白是高級感的最便宜來源** — 內容周圍要能呼吸
5. **沒有無意義的裝飾** — 不用漸層、不用幾何裝飾、不用功能性 emoji
6. **誠實的材質** — 平面 + 細線 + 微陰影，不是擬物玻璃
7. **動效傳遞資訊** — 動畫只代表狀態變化，不是裝飾

---

## 三、色彩系統

### 3.1 Light Mode（預設）

| Token | 值 | 用途 |
|-------|-----|------|
| `--bg` | `#F5F0E7` | 頁面底色（暖米） |
| `--surface` | `#F7F5F1` → `#EEE8DC` | 區塊底（卡片後方） |
| `--raised` | `#FBF7EF` | 主要卡片 / 模態（暖象牙白，非純白） |
| `--border` | `#DDD5C3` | 細線分隔 |
| `--border-strong` | `#CBC2AC` | 強調邊框 / 輸入框 |

> v1.1（2026-04-24）：原 v1.0 使用 `#FCFBF8` / `#FFFFFF` 純白，
> 老師實際使用時反應「太亮眼睛不舒服」，色值全體降 3-4%
> 亮度並加暖色調。階層對比維持不變。
| `--ink` | `#1A1918` | 主文字（近黑，不用純黑） |
| `--muted` | `#6B6862` | 次要文字 / 說明 |
| `--faint` | `#A39D95` | 三級文字 / 佔位 |
| `--accent` | `#0E4F5E` | **Deep Teal — 品牌主色** |
| `--accent-hover` | `#093E4B` | Accent 深化 |
| `--accent-soft` | `rgba(14, 79, 94, 0.08)` | Accent 背景 / hover |

### 3.2 Dark Mode

| Token | 值 |
|-------|-----|
| `--bg` | `#0E0D0B` |
| `--surface` | `#181613` |
| `--raised` | `#1C1A16` |
| `--border` | `#2A2724` |
| `--border-strong` | `#3D3934` |
| `--ink` | `#F5F3EF` |
| `--muted` | `#A39D95` |
| `--faint` | `#6B6862` |
| `--accent` | `#5EAFC1` |
| `--accent-hover` | `#78BECE` |
| `--accent-soft` | `rgba(94, 175, 193, 0.12)` |

### 3.3 ⚠️ 語義色保留區（非常重要）

Deep Teal 是品牌色，以下狀態顏色**永遠不可侵犯**，且**必須搭配 icon**（色盲友善 + 黑白列印可辨）：

| 狀態 | 顏色 | 配對 icon | 絕對規則 |
|------|------|---------|---------|
| ✅ **答對 / 正確 / 成功** | Emerald `#10B981` | ✓ check | 不能用品牌 teal 代替 |
| ❌ **答錯 / 錯誤 / 刪除** | Coral `#DC2626` | ✗ cross | 不要用純朱紅（太警示） |
| ⚠️ **待處理 / 注意** | Amber `#D97706` | ! triangle | 用量極少 |
| 📘 **提示 / 品牌資訊** | Deep Teal `#0E4F5E` | i info | 這是 accent 可以用的地方 |
| ⚪ **中性 / 未作答** | Muted `#A39D95` | — circle | 填圈的灰 |

**Dark mode 版本**：
- Emerald → `#34D399`
- Coral → `#F87171`
- Amber → `#FBBF24`

### 3.4 顏色使用鐵律

- Accent 出現比例應 ≤ **畫面的 5%**（primary CTA、focused state、data highlight、connector line）
- 不使用漸層（`linear-gradient` 幾乎不該出現在 CSS 裡）
- 不用多色 pill 區分科目；科目請用**文字 + 一條細色線**而非色塊
- 按鈕不疊陰影；陰影只在 modal / dropdown 出現
- 表格不做斑馬紋；靠 row border + hover 區分列

---

## 四、字體系統

### 4.1 字體堆疊（Strategy B：分層混搭）

```css
/* UI 層（按鈕、導覽、表格標頭、說明文字） */
--font-ui: 'Inter', 'Noto Sans TC', -apple-system, sans-serif;

/* 內容層（題幹、段落、文章、答案解析） */
--font-body: 'Source Serif 4', 'Noto Serif TC', Georgia, serif;

/* 展示層（大標、品牌字、儀表數字） */
--font-display: 'Inter', 'Noto Sans TC', sans-serif;

/* 等寬（程式碼、hex 值、版本號） */
--font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
```

### 4.2 字級表

| 名稱 | 尺寸 (px) | 字重 | 字距 | 用途 |
|------|----------|------|------|------|
| Display L | 48 | 600 | -0.025em | Hero / 品牌 wordmark |
| Display M | 32 | 600 | -0.02em | 頁首大標 |
| Heading L | 24 | 600 | -0.01em | 分區標題 |
| Heading M | 20 | 600 | 0 | 卡片內標題 |
| Heading S | 18 | 600 | 0 | 小標 |
| Body L | 17 | 400 | 0 | 文章段落（內容字體） |
| Body | 16 | 400 | 0 | 一般段落 |
| Body S | 15 | 400 | 0 | 選項、列表 |
| UI | 14 | 500 | -0.01em | 按鈕、標籤 |
| UI S | 13 | 400 | 0 | 說明文字 |
| Caption | 12 | 500 | 0.02em | 標籤、meta |
| Micro | 11 | 500 | 0.14em (uppercase) | 分區 label |

### 4.3 數學排版（KaTeX × LaTeX）

**技術**：`katex@0.16.11` 透過 CDN 載入，所有數學內容用 LaTeX 語法。

```html
<!-- 在 <head> 加入 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js"></script>
```

**語法規則**：
- 行內公式：`\( ... \)` 例如 `\( x^2 + y^2 = r^2 \)`
- 區塊公式：`\[ ... \]` 例如 `\[ \int_0^\pi \sin x \, dx = 2 \]`
- 絕對不要在前端手刻數學符號（如 "&radic;" 或特殊 unicode），一律走 LaTeX

**渲染字體**：KaTeX 自帶 `KaTeX_Main`，視覺上類似 Computer Modern（LaTeX 原生字體），與 Source Serif 4 的襯線家族天然和諧。

### 4.4 中文排版細節

- Noto Sans TC 的 400 在小字級會稍細 —— body 字距 `+0.01em` 補償
- 中英混排時，中文字重比英文高一階（英文 400 → 中文 500 視覺才平衡）
- 數字用 `font-variant-numeric: tabular-nums` 對齊小數位
- 英文部分若使用 Times/Source Serif，中文自動 fallback 到 Noto Serif TC

---

## 五、空間與佈局

### 5.1 間距系統（基於 4px）

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64 · 80 · 120`

**使用原則**：寧可用大間距也不要用小間距；留白是免費的高級感。

### 5.2 圓角

| Token | 值 | 用途 |
|-------|-----|------|
| `--r-sm` | `4px` | 輸入框、小標籤 |
| `--r-md` | `6px` | 按鈕、chip |
| `--r-lg` | `10px` | 卡片、主要面板 |

**不使用** `--r-xl`（>12px 會顯得 toy-like，違背克制原則）。

### 5.3 陰影（極度節制）

| Token | 值 | 用途 |
|-------|-----|------|
| none | — | 預設全部無陰影 |
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.04)` | 卡片 hover |
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.06)` | dropdown / popover |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,0.08)` | modal |

---

## 六、元件規範

### 6.1 按鈕

```
Primary    solid accent 底 / 白字            hover: --accent-hover
Secondary  透明底 / ink 字 / 1px border      hover: border 變 ink
Ghost      透明 / muted 字                   hover: surface 底 / ink 字
Danger     透明 / coral 字 / 透明 coral 框   hover: coral 底 + 實框
```

**通則**：
- 高度 36px（padding 8×16）
- 字重 500，字距 -0.01em
- 圓角 4px
- 無陰影
- Transition 120ms

### 6.2 卡片

- 白底 + 1px border，**預設無陰影**
- hover 時 border 加深（不加陰影）
- 圓角 10px
- Padding 28px（桌機）/ 20px（手機）

### 6.3 輸入框

- **透明底 + 底線**（非整框）
- Focus 時底線變 accent
- 不用 box-shadow 當 focus ring；用底線變色足矣
- Placeholder 用 `--faint`，不要提示灰到看不見

### 6.4 表格

- 高密度列（py-14px，不要太寬鬆）
- 標頭 11px uppercase + letter-spacing 0.1em
- Row hover 底色 surface；**不用斑馬紋**
- 數字欄右對齊 + tabular-nums

### 6.5 題目卡（EduFlow 核心元件）

- 卡片 + meta 列（題號 / 科目 tag / 分數）
- 題幹用 `--font-body`（襯線）
- 選項用襯線 + 字母標籤（A/B/C/D）用無襯線
- 正確選項：**accent border + accent-soft 底 + accent 字 + ✓ icon**
- ⚠️ 再次提醒：雖然 accent 是 teal，但當出現「批改結果」時，必須切換成 Emerald + ✓，而**不是繼續用 teal**

### 6.6 資料 Tile

- 標題 12px muted
- 數值 40px display weight 600，tabular-nums
- Delta 12px accent（正向）/ coral（負向）
- 單位（分、%、題）小於主數值 5 級，muted 色

---

## 七、動效

```css
--t-fast: 120ms cubic-bezier(0.2, 0, 0.2, 1);  /* hover / focus */
--t-med:  240ms cubic-bezier(0.2, 0, 0.2, 1);  /* theme switch / panel */
--t-slow: 480ms cubic-bezier(0.2, 0, 0.2, 1);  /* 特殊場景，很少用 */
```

**原則**：
- 所有 hover 用 120ms
- 主題切換用 240ms，顏色全體一起變才有質感
- **不做裝飾性動畫**（飄落、彈跳、發光、擺動）
- **可以做的**：fade in、位移進入、數字跳增（dashboard 數據）

---

## 八、CSS Variables 一鍵複製

把下面這段放進 index.html 的 `<style>` 開頭，全系統就建立好了：

```css
:root {
  /* Light mode */
  --bg: #FCFBF8;
  --surface: #F7F5F1;
  --raised: #FFFFFF;
  --border: #E8E5E0;
  --border-strong: #D6D2CB;
  --ink: #1A1918;
  --muted: #6B6862;
  --faint: #A39D95;

  /* Brand accent — Deep Teal */
  --accent: #0E4F5E;
  --accent-hover: #093E4B;
  --accent-soft: rgba(14, 79, 94, 0.08);

  /* Semantic (reserved) */
  --success: #10B981;
  --success-soft: rgba(16, 185, 129, 0.1);
  --danger: #DC2626;
  --danger-soft: rgba(220, 38, 38, 0.08);
  --warning: #D97706;
  --warning-soft: rgba(217, 119, 6, 0.1);

  /* Typography */
  --font-ui: 'Inter', 'Noto Sans TC', -apple-system, sans-serif;
  --font-body: 'Source Serif 4', 'Noto Serif TC', Georgia, serif;
  --font-display: 'Inter', 'Noto Sans TC', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;

  /* Motion */
  --t-fast: 120ms cubic-bezier(0.2, 0, 0.2, 1);
  --t-med: 240ms cubic-bezier(0.2, 0, 0.2, 1);
  --t-slow: 480ms cubic-bezier(0.2, 0, 0.2, 1);

  /* Radius */
  --r-sm: 4px;
  --r-md: 6px;
  --r-lg: 10px;

  /* Shadows */
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-md: 0 8px 24px rgba(0,0,0,0.08);
}

[data-theme="dark"] {
  --bg: #0E0D0B;
  --surface: #181613;
  --raised: #1C1A16;
  --border: #2A2724;
  --border-strong: #3D3934;
  --ink: #F5F3EF;
  --muted: #A39D95;
  --faint: #6B6862;

  --accent: #5EAFC1;
  --accent-hover: #78BECE;
  --accent-soft: rgba(94, 175, 193, 0.12);

  --success: #34D399;
  --success-soft: rgba(52, 211, 153, 0.12);
  --danger: #F87171;
  --danger-soft: rgba(248, 113, 113, 0.1);
  --warning: #FBBF24;
  --warning-soft: rgba(251, 191, 36, 0.12);
}
```

---

## 九、接下來怎麼走？

### 階段 2 · 去 Claude Design 探索「新畫面」

把**以下這段**當作你去 Claude Design 的標準 brief（複製貼上）：

```
我正在為 EduFlow（給台灣中學老師用的試卷與題庫管理 B2B SaaS）
設計視覺系統。已經定案以下 design tokens：

氣質：Apple/Stripe/Vercel 那種克制、自信、精準的生產力工具感
主色：Deep Teal #0E4F5E（品牌），Emerald/Coral 專門給批改狀態
字體：UI 用 Inter + Noto Sans TC；內容用 Source Serif 4 + Noto Serif TC
數學：所有公式用 KaTeX 渲染 LaTeX
風格：白底 / 暖中性 / 細線 / 無漸層 / 極節制陰影 / 排版主導層次
完整 tokens 參考我會上傳的檔案

請幫我設計以下畫面：
[在這裡列出你要的畫面，見下方建議]
```

**建議讓 Claude Design 幫你先做這五個核心畫面**：

1. **登入頁** — 門面，決定使用者第一印象
2. **老師主控台 (Dashboard)** — 今日要做什麼、最近班級、AI 額度概況
3. **題庫列表頁** — 最高使用頻率的頁面
4. **題目編輯頁** — 含 LaTeX 編輯器、AI 出題對話框
5. **試卷產生器 (setup page)** — 選題 → 設定 → 預覽流程

這五個畫面定下後，其他頁面都可以按照這套模式延伸。

### 階段 3 · 回 Claude Code 實作

Claude Design 產出視覺後，回 Claude Code 用這個流程落地：

```
1. 在 index.html 的 <style> 開頭貼入本文件第八節的 CSS variables
2. 逐區塊替換：先做 header / nav、再做題庫卡、再做按鈕、再做題目編輯
3. 每個區塊改完立刻 git commit 一次（方便回溯）
4. 改到一個段落就推部署一次，真實瀏覽器上檢查
5. 全部改完後，更新 CLAUDE.md 把舊的 liquid glass 相關段落刪掉，
   改成本文件的「七大視覺原則」
```

### 階段 4 · 對外素材

設計系統穩定後，拿 Claude Design 做：
- 給學校的**採購簡報**（PPTX）
- **教師使用手冊**（PDF）
- **產品官網 landing page**
- **家長說明單張**

所有這些都會自動沿用你的 design tokens，維持品牌一致性。

---

## 十、重要注意事項

1. **不要再回頭討論顏色** — 今天定下來的 Deep Teal 是經過系統性思考選的，未來半年內除非發現商業層級的問題，否則不改。設計靠一致性建立信任。

2. **CSS 變數是唯一真理** — 任何地方寫死 hex 值都是 bug。全部用 `var(--accent)` 之類。

3. **Accent 節制原則** — 如果你發現一個畫面有 >3 處 accent 顏色，先問「這真的每個都重要嗎？」通常會發現可以拿掉一兩個。

4. **批改狀態永遠搭配 icon** — 只用顏色會讓色盲使用者看不到、黑白列印也看不到。`--success` 永遠配 ✓，`--danger` 永遠配 ✗。

5. **中文比英文更需要留白** — 中文字體資訊密度高，line-height 至少 1.6，段落間距至少 1.2em，不要跟英文 UI 一樣緊。

---

**這份文件是活的。** 實作過程中發現任何 token 不夠用或要新增，回來更新這份文件並 commit，保持單一真理。
