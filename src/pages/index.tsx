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
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-orange-900 text-white p-12">
      <div className="max-w-6xl mx-auto">
        <Image src="/matriarch.png" alt="Cyber Matriarch" width={500} height={500} className="mx-auto rounded-full shadow-2xl shadow-purple-500/50 drop-shadow-4xl" priority />
        <h1 className="text-6xl md:text-7xl font-black text-center mt-16 mb-24 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-500 bg-clip-text text-transparent animate-pulse">Prime Forge Empire</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {nfts.map(n => (
            <div key={n} className="group bg-gray-900/50 backdrop-blur-md p-8 rounded-3xl hover:scale-105 transition-all duration-300 border border-purple-500/30 hover:border-purple-400/70 shadow-2xl hover:shadow-purple-500/40">
              <Image src={`/thumbs/${n}.png`} alt={n.replace('-',' ')} width={200} height={200} className="mx-auto rounded-2xl shadow-xl group-hover:rotate-3 transition-transform" />
              <h3 className="text-xl md:text-2xl mt-6 text-center capitalize font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">{n.replace('-',' ')}</h3>
              <button className="w-full mt-8 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-purple-500/50 transition-all duration-300 uppercase tracking-wide">Buy NFT $20</button>
            </div>
          ))}
        </div>
        <div className="bg-gray-900/70 backdrop-blur-lg p-12 rounded-3xl border border-gray-700/50">
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">🧠 Brain Status Live</h2>
          <pre className="text-green-400 font-mono bg-black/50 p-8 rounded-2xl overflow-auto text-sm">{JSON.stringify(status, null, 2) || 'Loading...'}</pre>
        </div>
      </div>
    </main>
  );
}
