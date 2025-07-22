import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { username, bio, topics, followerCount, mode } = await req.json();
  const prompt = mode === 'hype'
    ? `Create an inspiring, motivational hype message for this Farcaster user:\n- Username: ${username}\n- Bio: ${bio}\n- Recent cast topics: ${topics}\n- Follower count: ${followerCount}\n\nStyle: Encouraging, energetic, confidence-boosting. Maximum 50 words.`
    : `Generate a humorous, light-hearted roast based on this Farcaster user's profile:\n- Username: ${username}\n- Bio: ${bio}\n- Recent cast topics: ${topics}\n- Follower count: ${followerCount}\n\nStyle: Witty, playful, social media appropriate. Maximum 50 words.`;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a witty, viral social media copywriter.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 100,
        temperature: 0.9,
      }),
    });
    const data = await openaiRes.json();
    const text = data.choices?.[0]?.message?.content?.trim() || '';
    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate card text.' }, { status: 500 });
  }
} 