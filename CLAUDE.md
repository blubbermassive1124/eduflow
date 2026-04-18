# EduFlow 專案指引

## 專案概要
- EduFlow 是一套學校教師用的試卷與題庫管理系統
- 目前版本 v4.3，單一 index.html 架構
- 使用者 Rick 非工程師，請用中文解釋你做了什麼，不要只丟程式碼
- 所有改動需要 Rick 同意後再動

## 技術架構
- 前端：單一 index.html（所有功能整合，9000+ 行）
- 後端：Supabase（auth + PostgreSQL + JSONB 欄位）
- AI 呼叫：**前端直連架構**，瀏覽器直接 fetch `https://api.anthropic.com/v1/messages`，沒有 serverless proxy
- API Key 儲存：每位使用者把自己的 Claude API Key 存在 Supabase `profiles.api_keys` JSONB 欄位，屬性名 `claudeKey`
- 部署：Netlify（自動偵測 GitHub push，純靜態托管）
- 網址：https://rickstests.netlify.app

## 編輯紀律（非常重要）
- 絕對不要把單檔架構拆分成多檔
- 小範圍修改優先用 str_replace；當 index.html 太大導致 str_replace 失敗時，改用 sed 做行範圍刪除+插入
- 改完後執行 git add . && git commit -m "訊息" && git push 觸發 Netlify 自動部署
- 每次功能改動後提醒 Rick 更新版本號（頁首/footer 的 v4.2 之類）

## 設計哲學：Liquid Glass 美學
- 近零透明度（opacity 0.02~0.045）+ 極淡模糊（blur ~3px）+ cyan/teal 色差陰影
- 不是 frosted glass 霧面高透明度效果
- SVG feTurbulence/feDisplacementMap 濾鏡只能套在 ::before 偽元素，不可套在容器上（會糊化文字）
- 下拉選單：父層有 overflow-x:auto 時，必須用 position:fixed + JS 延遲關閉（~140ms）

## 歷史踩坑清單（一定要避開）
- Claude API Key 的 JSONB 屬性名稱必須是 claudeKey（camelCase），不能含空格，空格會讓認證靜默失敗
- EmailJS 模板變數只能用 name / time / message，傳 subject / to_email 不會 render
- EmailJS 收件人路由需要在模板的 "To Email" 欄位填 {{to_email}}
- 長時間 AI 任務必須用 AbortController，signal 要貫穿整個呼叫鏈
- callAI 函式簽名：callAI(messages, maxTokens, taskType, signal)

## 資料庫 schema 快速參考
已套用的 migration：
- profiles.api_keys (JSONB)
- questions.image_data (TEXT, base64 JPEG)
- questions.figure_desc (TEXT)
- v4.2 新增：total_score, status, score, publisher, question_type, question_number, cognitive_level, shuffle_questions, shuffle_options
- 所有 migration 必須用 IF NOT EXISTS 寫法

## 工作習慣
- 大改動前先跟 Rick 說你打算怎麼做，他同意後再動
- 用中文解釋每次改動（做了什麼、為什麼這樣做）
- 不要 diff 給他看，直接講結果
- 每次 session 開始前先 git status 確認工作區乾淨
