import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client on server-side
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API Health Check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Gemini Market Analysis & Pitch Generator API Endpoint
  app.post('/api/gemini/analyze', async (req, res) => {
    try {
      const { type, companyName, userPrompt, targetSegment, brandName } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY environment variable is not configured.',
        });
      }

      let systemInstruction = `You are a top senior tire industry trade consultant specializing in China-Europe (specifically France, Croatia, and Slovenia) tire export/import supply chains.
Your task is to provide professional, actionable, and highly analytical trade insights in Chinese (Mandarin), with technical tire industry terminology formatted clearly.
You understand EU tire labelling regulations (ECE R117, REACH, 3PMSF winter certification), FOB/CIF shipping mechanics, European tire distribution networks (Tokić, Bartog, Distri Cash, CIAAK, Euroton, Furlan, Copadex, etc.), and Chinese tire brands (Linglong, Sailun, Triangle, ZC Rubber, Doublestar, Sentury, Aeolus, Giti, etc.).`;

      let promptText = '';

      if (type === 'pitch_generator') {
        promptText = `【商务开发与对接建议生成器】
目标欧洲轮胎进口商公司: ${companyName || '欧洲轮胎进口商'}
中国出口品牌/产品线: ${brandName || '中国高质量轮胎产品线'}
主要轮胎品类: ${targetSegment || '乘用车轮胎 PCR / 卡客车轮胎 TBR'}
用户需求细节: ${userPrompt || '生成针对该进口商的专业合作开发信草稿与商务切入建议'}

请按以下格式输出:
1. 【该进口商采购偏好与背景分析】：分析其为何适合采购此类中国轮胎，及其目前货源结构与市场覆盖（法国/克罗地亚/斯洛文尼亚及亚得里亚海地区）。
2. 【核心卖点切入策略】：提炼针对该进口商最关心的3个核心利益点（如EU Label标签等级、3PMSF冬胎认证、欧洲仓储配货周转、每公里成本/CPK优势等）。
3. 【外语专业开发信草稿 (Email Pitch Draft)】：提供一份可以直接发送给该公司采购总监的正式开发信（根据公司所在国提供法文/英文或当地语言版本），语言规范专业。
4. 【沟通注意事项与履约提示】：如付款条件（L/C, OA）、品质三包（Warranty）及欧洲反倾销/反补贴关税防范提示。`;
      } else if (type === 'match_recommender') {
        promptText = `【中国轮胎出口与欧洲（法·克·斯）进口商匹配分析】
供应商轮胎规格与定位: ${userPrompt}

请结合法国、克罗地亚、斯洛文尼亚核心轮胎进口商数据：
1. 推荐最匹配的前3家进口商并说明匹配理由。
2. 分析目前这几家进口商已有采购的中国竞争品牌与市场空白。
3. 提供买家谈判时最关注的核心质规要求（如ECE、3PMSF、Wet Grip等级等）。`;
      } else {
        // General query
        promptText = `用户咨询: ${userPrompt}
针对法国排名前十采购中国轮胎的进口商，提供深刻的市场趋势分析、关税与合规指引、以及商务拓展策略。`;
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({
        analysis: response.text || '未能生成分析结果，请稍后再试。',
      });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      return res.status(500).json({
        error: error.message || 'Call to Gemini API failed.',
      });
    }
  });

  // Serve Vite in development, static build in production
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
