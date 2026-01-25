export default function Home() {
  return (
    <div style={{background:'black', color:'lime', padding:'20px', fontFamily:'Courier New'}}>
      <h1 style={{textShadow:'0 0 10px lime'}}>Prime Forge Brain v1 - Empire Autonomous</h1>
      <p>Autonomous LIVE | Test buttons below (PayPal sandbox $10+).</p>
      <button onClick={() => window.open('/api/paypal?amount=10')}>Test PayPal $10</button>
      <pre>{JSON.stringify({status:'production', paypal:'/api/paypal POST live'}, null, 2)}</pre>
    </div>
  );
  }
