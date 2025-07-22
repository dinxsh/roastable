import { NextRequest, NextResponse } from 'next/server';

// In-memory leaderboard (MVP only, resets on server restart)
let leaderboard: Array<{
  username: string;
  text: string;
  mode: 'roast' | 'hype';
  timestamp: number;
}> = [];

function isToday(ts: number) {
  const d = new Date(ts);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
}

export async function POST(req: NextRequest) {
  const { username, text, mode } = await req.json();
  leaderboard.push({ username, text, mode, timestamp: Date.now() });
  // Keep only today's cards, max 100
  leaderboard = leaderboard.filter(e => isToday(e.timestamp)).slice(-100);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  // Return top 5 for today, most recent first
  const today = leaderboard.filter(e => isToday(e.timestamp));
  const top = today.slice(-5).reverse();
  return NextResponse.json({ top });
} 