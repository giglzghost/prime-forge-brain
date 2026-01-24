export default function handler(req, res) {
  res.status(200).json({ brain: 'live', vercel: 'autonomous', paypal: 'ready' });
}
