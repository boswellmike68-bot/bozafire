import { useState } from 'react';
import { lovesfireApi } from '../services/lovesfireApi';

export default function ApiKeyManager({ onKeyCreated }) {
  const [userId, setUserId] = useState('');
  const [initialCredits, setInitialCredits] = useState(10);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleCreateKey(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await lovesfireApi.createApiKey(userId, initialCredits);
      setResult(data);
      onKeyCreated?.(data.apiKey);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClearKey() {
    lovesfireApi.clearApiKey();
    setResult(null);
    onKeyCreated?.(null);
  }

  const existingKey = lovesfireApi.getApiKey();

  return (
    <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
      <h3 className="font-mono text-cyan-400/80 text-sm tracking-wider mb-4">
        {existingKey ? 'API KEY ACTIVE' : 'CREATE API KEY'}
      </h3>

      {existingKey ? (
        <div className="space-y-4">
          <div className="bg-green-500/10 border border-green-500/20 rounded p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-green-400 text-xs">KEY CONFIGURED</span>
            </div>
            <div className="font-mono text-xs text-green-400/60 break-all">
              {existingKey}
            </div>
          </div>

          <button
            onClick={handleClearKey}
            className="w-full py-2 border border-red-500/40 rounded text-red-400/80 hover:bg-red-500/10 transition-colors font-mono text-sm"
          >
            CLEAR KEY
          </button>
        </div>
      ) : (
        <form onSubmit={handleCreateKey} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-cyan-400/60 mb-2">
              USER ID / EMAIL
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-black/40 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 placeholder-cyan-400/20 focus:border-cyan-400 focus:outline-none font-mono text-sm"
              required
            />
          </div>

          <div>
            <label className="block font-mono text-xs text-cyan-400/60 mb-2">
              INITIAL CREDITS
            </label>
            <input
              type="number"
              value={initialCredits}
              onChange={(e) => setInitialCredits(parseInt(e.target.value) || 0)}
              min="0"
              className="w-full bg-black/40 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 focus:border-cyan-400 focus:outline-none font-mono text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-cyan-500/20 border border-cyan-500/40 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors font-mono text-sm disabled:opacity-50"
          >
            {loading ? 'CREATING...' : 'CREATE API KEY'}
          </button>
        </form>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
          <p className="text-red-400/80 font-mono text-xs">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded">
          <p className="text-green-400/80 font-mono text-xs mb-2">✓ KEY CREATED</p>
          <p className="text-cyan-400/60 font-mono text-xs">Credits: {result.credits}</p>
        </div>
      )}
    </div>
  );
}
