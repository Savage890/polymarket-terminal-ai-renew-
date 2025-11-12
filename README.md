Polymarket Terminal (AI Predictor)
=================================

This is a ready-to-deploy Vite + React project with Vercel serverless functions.
It shows live Polymarket markets and a lightweight AI-style reasoning for each market.

Quick deploy (Vercel):
1. Zip this project root
2. Upload to Vercel (New Project → Import Project → Upload .zip)
3. Build command: `npm run build`
   Output dir: `dist`

Notes about sports data:
- This package includes a placeholder serverless endpoint `/api/sports` that explains how to
  connect a sports data provider (e.g., SportsData.io, TheOddsAPI, or similar).
- For true player-level reasoning (injuries, lineups), you will need to supply API keys and
  enable a sports data provider. See `api/sports.js` for details.

If you want, I can guide you to connect a specific sports API and add live explanation text.
