export default function Home() {
  return (
    <div style={{background:'black',color:'lime',fontFamily:'monospace',padding:'20px'}}>
      <h1 style={{textAlign:'center',textShadow:'0 0 10px lime'}}>🚀 Prime Forge Brain Live</h1>
      <p>Empire autonomous | Sandbox: theonlineyards@outlook.com</p>
      <button onClick={testStatus}>API Status</button>
      <button onClick={testPayPal}>PayPal $10</button>
      <button onClick={()=>buyNFT('matriarch',20)}>Matriarch NFT $20</button>
      <pre id="output">Ready...</pre>
      <script dangerouslySetInnerHTML={{
        __html: `
          async function testStatus(){ const r=await fetch('/api/status'); document.getElementById('output').textContent=await r.text(); }
          async function testPayPal(){ const r=await fetch('/api/paypal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:10})}); document.getElementById('output').textContent=await r.text(); }
          async function buyNFT(nft,amount){ const r=await fetch('/api/buy',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nft,amount})}); const d=await r.json(); window.open(d.paypalUrl); document.getElementById('output').textContent=JSON.stringify(d,null,2); }
        `
      }} />
    </div>
  );
}
