import { useState } from 'react';
import { lovesfireApi } from '../services/lovesfireApi';

const PACKAGES = [
  { id: 'starter', name: 'STARTER', credits: 10, price: 5, color: 'from-green-500/20 to-emerald-500/10', border: 'border-green-500/30' },
  { id: 'pro', name: 'PRO', credits: 60, price: 25, color: 'from-cyan-500/20 to-blue-500/10', border: 'border-cyan-500/30' },
  { id: 'steward', name: 'STEWARD', credits: 300, price: 100, color: 'from-amber-500/20 to-orange-500/10', border: 'border-amber-500/30' },
];

export default function CreditPurchase() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handlePurchase() {
    if (!selectedPackage) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await lovesfireApi.purchaseCredits(selectedPackage);
      setResult(data);
      
      // In real implementation, this would redirect to Stripe
      // window.location.href = `https://checkout.stripe.com/${data.clientSecret}`;
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const apiKey = lovesfireApi.getApiKey();

  if (!apiKey) {
    return (
      <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
        <div className="text-center text-cyan-400/60">
          <div className="text-4xl mb-3">💳</div>
          <p className="font-mono text-sm">API KEY REQUIRED</p>
          <p className="text-xs text-cyan-400/40 mt-2">Create an API key to purchase credits</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
      <h3 className="font-mono text-cyan-400/80 text-sm tracking-wider mb-4">
        PURCHASE CREDITS
      </h3>

      <div className="grid grid-cols-1 gap-3 mb-6">
        {PACKAGES.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={`relative p-4 rounded-lg border transition-all duration-300 text-left ${
              selectedPackage === pkg.id
                ? `bg-gradient-to-br ${pkg.color} ${pkg.border} border-opacity-100`
                : 'bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-white/90" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                  {pkg.name}
                </div>
                <div className="text-xs text-cyan-400/60 mt-1">
                  {pkg.credits} Credits
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-cyan-400">
                  ${pkg.price}
                </div>
                <div className="text-xs text-cyan-400/40">
                  ${(pkg.price / pkg.credits).toFixed(2)}/credit
                </div>
              </div>
            </div>
            
            {selectedPackage === pkg.id && (
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      <button
        onClick={handlePurchase}
        disabled={!selectedPackage || loading}
        className="w-full py-3 bg-cyan-500/20 border border-cyan-500/40 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'PROCESSING...' : selectedPackage ? 'PURCHASE CREDITS' : 'SELECT PACKAGE'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
          <p className="text-red-400/80 font-mono text-xs">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded">
          <p className="text-green-400/80 font-mono text-xs">✓ PAYMENT INTENT CREATED</p>
          <p className="text-cyan-400/60 font-mono text-xs mt-1">
            Credits: {result.credits} | Amount: ${(result.amount / 100).toFixed(2)}
          </p>
          <p className="text-amber-400/60 font-mono text-xs mt-2">
            ⚠ Stripe integration required for live payments
          </p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-cyan-500/10">
        <p className="text-xs text-cyan-400/40 font-mono text-center">
          Powered by Stripe • Secure Checkout
        </p>
      </div>
    </div>
  );
}
