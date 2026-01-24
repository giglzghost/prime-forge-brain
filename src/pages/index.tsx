'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
export default function Home() {
  const [status, setStatus] = useState({});
  const nfts = ['matriarch', 'fiery-queen', 'purple-armor', 'mountain-tree', 'short-hair', 'arch-lovers', 'fire-walker'];
  useEffect(() => {
    fetch('/api/status').then(r => r.json()).then(setStatus);
  }, []);
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-orange-900 text-white">
      <div className="max-w-6xl mx-auto p-8">
        <Image src="/matriarch.png" alt="Cyber Matriarch" width={500} height={500} className="mx-auto rounded-full shadow-2xl shadow-purple-500/50" priority />
        <h1 className="text-6xl font-black text-center mt-12 mb-20 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-500 bg-clip-text text-transparent drop-shadow-2xl">Prime Forge Empire</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {nfts.map(n => (
            <div key={n} className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl hover:scale-105 transition-all border border-purple-500/30 hover:border-purple-400 shadow-xl">
              <Image src={`/thumbs/${n}.png`} alt={n.replace('-', ' ')} width={200} height={200} className="mx-auto rounded-xl shadow-lg" />
              <h3 className="text-2xl mt-6 text-center capitalize font-semibold text-purple-300">{n.replace('-', ' ')}</h3>
              <button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-purple-500/50 transition-all">$20 NFT Buy</button>
            </div>
          ))}
        </div>
        <div className="text-center p-12 bg-gray-900/50 rounded-2xl">
          <h2 className="text-3xl mb-4">Brain Status</h2>
          <pre className="text-green-400 font-mono bg-black p-6 rounded-xl">{JSON.stringify(status, null, 2)}</pre>
        </div>
      </div>
    </main>
  );
}
