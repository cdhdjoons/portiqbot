require('dotenv').config();
const { Bot } = require("grammy");

// Telegram 봇 토큰
const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

// 봇 초기화
await bot.init();

// /start 명령어 처리
bot.command("start", async (ctx) => {
  const keyboard = {
    inline_keyboard: [
      [{ text: "🔘 Start Now", web_app: { url: "https://www.theportiq.com" } }],  // 게임 링크 수정
      [{ text: "💬 Community", url: "https://t.me/AI_PTIQ" }],
      [{ text: "🧵 Twitter (X)", url: "https://x.com/AI_PTIQ" }],
      [{ text: "🌐 Website", url: "https://www.theportiq.com" }],
      [{ text: "📄 Read Docs", url: "https://portiq-2.gitbook.io/portiq-docs/" }],
    ],
  };

  const message = `
😼 Mrrrow~ Welcome to Portiq - Your AI-Powered Portfolio Intelligence.

You've just entered the next layer of crypto strategy, where your Portiq AI Agent monitors assets, simulates strategies, and helps you rebalance with precision.

📌 Here's what you can do with this bot:

🧩 Connect your wallet and analyze your portfolio in real time  
📊 Get allocation reports, risk metrics, and hidden exposure alerts  
⚙️ Run strategy simulations and compare outcomes with backtests  
🔔 Set smart alerts for volatility spikes, wallet flows, and rebalance triggers  
🤖 Deploy Portiq Agents to monitor sectors, tokens, or specific risk levels  
🏆 Track your performance on leaderboards and refine your strategies  
🌐 Access a unified multi-chain dashboard directly from Telegram or Web  
📘 Learn and grow with data-driven insights instead of noise  

🚀 This isn't just a tracker.  
It's your AI co-pilot in portfolio management — always watching, adapting, and optimizing.  
  `;

  const pngUrl = 'https://portiqbot.vercel.app/portiqpic.png';  // public 폴더에 있는 이미지 파일 경로

  // ✅ GIF + 메시지 + 버튼을 한 번에 보냄
  await ctx.replyWithPhoto(pngUrl, {
    caption: message,
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
});

// ✅ Vercel 서버리스 API로 실행
export async function POST(req) {
  try {
    const body = await req.json();
    await bot.handleUpdate(body);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Bot Error:", error);
    return new Response("Error", { status: 500 });
  }
}

