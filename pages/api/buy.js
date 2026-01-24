export default function handler(req, res) {
  const {nft='matriarch', amount=20} = req.body;
  const business = 'theonlineyards@outlook.com';
  const paypalUrl = `https://sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${business}&amount=${amount}&item_name=${nft.toUpperCase()} NFT&currency_code=USD`;
  res.json({success:true, paypalUrl, nft});
}
