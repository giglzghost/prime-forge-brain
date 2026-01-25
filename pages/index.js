export default () => (
  <div style={{background:'black',color:'lime',padding:40,fontFamily:'Courier'}}>
    <h1 style={{textShadow:'0 0 10px lime'}}>Prime Forge Brain - LIVE</h1>
    <p>Autonomous empire | <a href="/api/paypal" style={{color:'cyan'}}>PayPal API</a> ready.</p>
    <pre>{JSON.stringify({status:'production', paypal:'POST /api/paypal {amount:10}'},null,2)}</pre>
  </div>
);
