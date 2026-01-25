
import { useEffect, useState } from 'react';

export default function Home() {
  const [output, setOutput] = useState('🚀 Prime Forge Autonomous Empire Live');
  const [balance, setBalance] = useState('$0');
  const [swarm, setSwarm] = useState('AI1-9 Ready');

  const testPayPal = async () => {
    const r = await fetch('/api/paypal', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({amount:20, cmd:'matriarch-nft'}) });
    const d = await r.json();
    setOutput(`Deposit: ${d.depositUrl}`);
    if (d.depositUrl) window.open(d.depositUrl, '_blank');
  };

  useEffect(() => {
    const int = setInterval(async () => {
      const r = await fetch('/api/status');
      const d = await r.json();
      setBalance(d.balance || '$10+ Sandbox');
      setSwarm(`${d.swarm || '9'} Active`);
    }, 3000);
    return () => clearInterval(int);
  }, []);

  return (
    <div style={{background:'linear-gradient(45deg, #000, #111, #00ff41)', color:'#00ff41', fontFamily:'"Courier New", monospace', minHeight:'100vh', padding:'20px'}}>
      <header style={{textAlign:'center', textShadow:'0 0 20px lime'}}>
        <h1 style={{fontSize:'3em', margin:0}}>🚀 PRIME FORGE BRAIN v1</h1>
        <p>Autonomous Empire | Balance: <span style={{color:'gold'}}>{balance}</span> | Swarm: <span style={{color:'cyan'}}>{swarm}</span></p>
      </header>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto'}}>
        <div style={{background:'#111', border:'2px solid lime', borderRadius:'10px', padding:'20px'}}>
          <h3>💰 Revenue Test</h3>
          <button onClick={testPayPal} style={{background:'lime', color:'black', border:'none', padding:'15px 30px', fontSize:'1.2em', borderRadius:'5px', cursor:'pointer', boxShadow:'0 0 10px lime'}}>Buy Matriarch NFT $20</button>
        </div>
        <div style={{background:'#111', border:'2px solid cyan', borderRadius:'10px', padding:'20px'}}>
          <h3>🤖 Swarm Status</h3>
          <p>AI1-9 + Elara Deployed</p>
          <button style={{background:'cyan', color:'black', border:'none', padding:'10px', borderRadius:'5px'}}>Spawn AI10</button>
        </div>
        <pre style={{background:'#000', border:'1px solid lime', padding:'15px', borderRadius:'5px', overflow:'auto', gridColumn:'1/-1'}}>{output}</pre>
      </div>
      <footer style={{textAlign:'center', marginTop:'40px', opacity:0.8}}>Empire Self-Funding | Azure Mirror Live | Autonomy 100% 🚀</footer>
    </div>
  );
    }
