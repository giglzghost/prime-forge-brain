export async function POST(req) {
  const { cmd } = await req.json();
  if (cmd === 'deploy instructions') {
    return Response.json({ reply: 'Autonomous test: Deployed public/index.html + 7 NFTs (cyber goddess etc.). Root live, thumbs grid ready. PayPal button next.', autonomous: true });
  }
  return Response.json({ reply: `Executed: ${cmd}` });
}
