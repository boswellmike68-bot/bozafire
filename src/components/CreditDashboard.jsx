import { useState, useEffect } from 'react';
import { lovesfireApi } from '../services/lovesfireApi';

export default function CreditDashboard() {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = lovesfireApi.getApiKey();

  useEffect(() => {
    if (apiKey) {
      loadCredits();
    }
  }, [apiKey]);

  async function loadCredits() {
    setLoading(true);
    setError(null);
    try {
      const data = await lovesfireApi.getCredits();
      setCredits(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!apiKey) {
    return (
      <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
        <div className="text-center text-cyan-400/60">
          <div className="text-4xl mb-3">🔐</div>
          <p className="font-mono text-sm">NO API KEY CONFIGURED</p>
          <p className="text-xs text-cyan-400/40 mt-2">Create an API key to view credits</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
        <div className="flex items-center justify-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-cyan-400/60 text-sm">LOADING CREDITS...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black/60 backdrop-blur-sm border border-red-500/30 rounded-lg p-6">
        <div className="text-center text-red-400/80">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="font-mono text-sm">{error}</p>
          <button
            onClick={loadCredits}
            className="mt-3 px-4 py-2 border border-red-500/40 rounded text-xs hover:bg-red-500/10 transition-colors"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  if (!credits) return null;

  return (
    <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono text-cyan-400/80 text-sm tracking-wider">CREDIT BALANCE</h3>
        <button
          onClick={loadCredits}
          className="text-xs text-cyan-400/40 hover:text-cyan-400 transition-colors"
        >
          ↻ REFRESH
        </button>
      </div>

      <div className="text-center mb-6">
        <div className="text-5xl font-black text-cyan-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
          {credits.balance}
        </div>
        <div className="text-xs text-cyan-400/40 mt-1 font-mono">CREDITS AVAILABLE</div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-cyan-500/5 rounded p-3 text-center">
          <div className="text-lg font-bold text-cyan-300">1</div>
          <div className="text-xs text-cyan-400/40">Advisory Cost</div>
        </div>
        <div className="bg-cyan-500/5 rounded p-3 text-center">
          <div className="text-lg font-bold text-cyan-300">5+</div>
          <div className="text-xs text-cyan-400/40">Render Cost</div>
        </div>
      </div>

      {credits.recentTransactions && credits.recentTransactions.length > 0 && (
        <div className="border-t border-cyan-500/10 pt-4">
          <h4 className="font-mono text-xs text-cyan-400/60 mb-3">RECENT TRANSACTIONS</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {credits.recentTransactions.slice(0, 5).map((tx, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-cyan-400/60 font-mono">
                  {tx.type.toUpperCase()}
                </span>
                <span className={tx.amount > 0 ? 'text-green-400' : 'text-amber-400'}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-cyan-500/10">
        <div className="flex items-center gap-2 text-xs text-cyan-400/40">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono">API KEY ACTIVE</span>
        </div>
        <div className="text-xs text-cyan-400/20 font-mono mt-1 truncate">
          {credits.apiKey?.slice(0, 20)}...
        </div>
      </div>
    </div>
  );
}
