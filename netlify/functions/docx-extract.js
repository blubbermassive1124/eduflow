// EduFlow / docx-extract
// 接收前端送來的 .docx (base64) → 用 mammoth 抽出 HTML（含內嵌圖片 base64）
// C2：先把骨架建起來，WMF/EMF 公式預覽圖暫時走 fallback（C4 才整合 WMF→SVG）。
//
// 請求格式：
//   POST /.netlify/functions/docx-extract
//   Content-Type: application/json
//   Body: { "docxBase64": "<file as base64, no data: prefix>" }
//
// 回應格式：
//   200 { html, warnings, stats: {svgConverted, fallbacks}, fallbacks: { "1": "<base64>", ... } }
//   400 { error }   ← 缺欄位或非 .docx
//   500 { error, stack }

const mammoth = require('mammoth');

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(), body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(),
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    let payload;
    try {
      payload = JSON.parse(event.body || '{}');
    } catch (e) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'Body 不是合法 JSON' }),
      };
    }

    const { docxBase64 } = payload;
    if (!docxBase64 || typeof docxBase64 !== 'string') {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ error: '缺少 docxBase64 欄位' }),
      };
    }

    const buffer = Buffer.from(docxBase64, 'base64');

    // 防呆：再次檢查是 .docx (ZIP magic)
    if (buffer[0] !== 0x50 || buffer[1] !== 0x4B) {
      return {
        statusCode: 400,
        headers: corsHeaders(),
        body: JSON.stringify({ error: '僅支援 .docx 格式（檔案 magic bytes 不符）' }),
      };
    }

    let svgConverted = 0;
    let fallbackCount = 0;
    const fallbacks = {};

    const result = await mammoth.convertToHtml(
      { buffer },
      {
        convertImage: mammoth.images.imgElement(async (image) => {
          const contentType = image.contentType;
          const buf = await image.read();

          if (contentType === 'image/png' || contentType === 'image/jpeg') {
            return { src: `data:${contentType};base64,${buf.toString('base64')}` };
          }

          // WMF/EMF 公式預覽圖 → C4 才會做真正轉換，先存 base64 給前端 fallback 顯示
          if (contentType === 'image/x-wmf' || contentType === 'image/x-emf') {
            const id = ++fallbackCount;
            fallbacks[id] = buf.toString('base64');
            return {
              src: '',
              alt: `[公式#${id}]`,
              class: 'formula-fallback',
            };
          }

          return { src: '', alt: '[unsupported image]' };
        }),
      }
    );

    return {
      statusCode: 200,
      headers: corsHeaders(),
      body: JSON.stringify({
        html: result.value,
        warnings: (result.messages || []).slice(0, 10),
        stats: { svgConverted, fallbacks: fallbackCount },
        fallbacks,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: e.message, stack: e.stack }),
    };
  }
};
