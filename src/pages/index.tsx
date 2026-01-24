import Image from 'next/image';
export default function Home() {
  const nfts = ['matriarch','queen','armor','mountain','short-hair','lovers','fire-walker'];
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <Image src="/matriarch.png" alt="Cyber Matriarch" width={600} height={600} className="mx-auto rounded-full shadow-glow" />
        <h1 className="text-5xl font-bold text-center mt-12 mb-20 bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-transparent">Prime Forge Empire</h1>
        <div className="grid grid-cols-4 gap-6">
          {nfts.map(n => (
            <div key={n} className="bg-gray-900 p-6 rounded-xl hover:scale-105 transition-all shadow-lg">
              <Image src={`/thumbs/${n}.png`} alt={n} width={150} height={150} className="mx-auto rounded-lg" />
              <h3 className="text-xl mt-4 text-center capitalize">{n.replace('-',' ')}</h3>
              <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-orange-500 py-3 rounded-lg hover:from-purple-700 font-bold">$20 NFT</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
