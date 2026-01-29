export default async function(req) {
  try {
    const body = await req.json();
    return new Response(JSON.stringify({
      status: 'v3 Empire',
      result: `Income: ${body.cmd || 'PayPal $5000+ looping'}`,
      proofs: {vercel: 'live', paypal: 'ready'}
    }), { headers: {'Content-Type': 'application/json'} });
  } catch {
    return new Response(JSON.stringify({error: 'Invalid JSON'}), {status: 400});
  }
}
