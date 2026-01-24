import { useEffect, useState } from 'react';

export default function Home() {
  const [output, setOutput] = useState('Ready for tests...');
  const [uptime, setUptime] = useState('live');

  useEffect(() => {
    const ticker = setInterval(async () => {
      try {
        const r = await fetch('/api/status');
        const d = await r.json();
        setUptime(d.uptime || 'live');
      } catch (e) {}
    }, 5000);
    return () => clearInterval(ticker);
  }, []);

  const testStatus = async () => {
    try {
      const r = await fetch('/api/status');
      setOutput(await r.text());
    } catch (e) { setOutput('Status error: ' + e.message); }
  };

  const testPayPal = async () => {
    try {
      const r = await fetch('/api/paypal', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({amount: 10, cmd: 'test'})
      });
      setOutput(await r.text());
    } catch (e) { setOutput('PayPal error: ' + e.message); }
  };

  const buyNFT = async (nft, amount) => {
    try {
      const r = await fetch('/api/buy', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nft, amount})
      });
      const d = await r.json();
      if (d.paypalUrl) window.open(d.paypalUrl, '_blank');
      setOutput(JSON.stringify(d, null, 2));
    } catch (e) { setOutput('Buy error: ' + e.message); }
  };

  return (
    <div style={{background:'black', color:'lime', fontFamily:'Courier New, monospace', padding:'20px', maxWidth:'800px', margin:'auto'}}>
      <h1 style={{textAlign:'center', textShadow:'0 0 10px lime'}}>🚀 Prime Forge Brain Live</h1>
      <p>Empire revenue autonomous | Uptime: <span style={{color:'cyan'}}>{uptime}</span> | Sandbox: theonlineyards@outlook.com</p>
      <div style={{textAlign:'center'}}>
        <button onClick={testStatus} style={{background:'#111', color:'lime', border:'1px solid lime', padding:'10px 20px', margin:'5px', cursor:'pointer', fontFamily:'inherit'}}>Test Status</button>
        <button onClick={testPayPal} style={{background:'#111', color:'lime', border:'1px solid lime', padding:'10px 20px', margin:'5px', cursor:'pointer', fontFamily:'inherit'}}>PayPal $10 Test</button>
        <button onClick={()=>buyNFT('matriarch', 20)} style={{background:'purple', color:'white', border:'1px solid lime', padding:'10px 20px', margin:'5px', cursor:'pointer', fontFamily:'inherit'}}>Buy Matriarch NFT $20</button>
      </div>
      <pre style={{background:'#111', padding:'10px', border:'1px solid lime', whiteSpace:'pre-wrap', maxHeight:'400px', overflow:'auto'}}>{output}</pre>
    </div>
  );
    }
