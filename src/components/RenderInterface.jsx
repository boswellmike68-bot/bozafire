import { useState } from 'react';
import { lovesfireApi } from '../services/lovesfireApi';

export default function RenderInterface() {
  const [script, setScript] = useState('');
  const [highRes, setHighRes] = useState(false);
  const [jobStatus, setJobStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setJobStatus(null);

    try {
      const data = await lovesfireApi.render(script, highRes);
      setJobStatus(data);
      
      // Start polling for status updates
      pollJobStatus(data.jobId);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function pollJobStatus(jobId) {
    const checkStatus = async () => {
      try {
        const status = await lovesfireApi.getJobStatus(jobId);
        setJobStatus(prev => ({ ...prev, ...status }));
        
        if (status.status === 'completed' || status.status === 'failed') {
          return; // Stop polling
        }
        
        // Continue polling
        setTimeout(checkStatus, 2000);
      } catch (err) {
        console.error('Failed to get job status:', err);
      }
    };
    
    setTimeout(checkStatus, 2000);
  }

  const apiKey = lovesfireApi.getApiKey();

  if (!apiKey) {
    return (
      <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
        <div className="text-center text-cyan-400/60">
          <div className="text-4xl mb-3">🎬</div>
          <p className="font-mono text-sm">API KEY REQUIRED</p>
          <p className="text-xs text-cyan-400/40 mt-2">Create an API key to render videos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
      <h3 className="font-mono text-cyan-400/80 text-sm tracking-wider mb-4">
        VIDEO RENDERER
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-mono text-xs text-cyan-400/60 mb-2">
            SCENE SCRIPT
          </label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder={`Scene 1
Visual: A neon cityscape at dusk
Style: cyberpunk fade
Motion: slow zoom
BPM: 120
Duration: 10s`}
            rows={8}
            className="w-full bg-black/40 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 placeholder-cyan-400/20 focus:border-cyan-400 focus:outline-none font-mono text-sm resize-none"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="highRes"
            checked={highRes}
            onChange={(e) => setHighRes(e.target.checked)}
            className="w-4 h-4 rounded border-cyan-500/30 bg-black/40 text-cyan-400 focus:ring-cyan-400"
          />
          <label htmlFor="highRes" className="text-sm text-cyan-400/60">
            High Resolution (2x cost)
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !script.trim()}
          className="w-full py-3 bg-cyan-500/20 border border-cyan-500/40 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors font-mono text-sm disabled:opacity-50"
        >
          {loading ? 'QUEUING...' : 'RENDER VIDEO'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
          <p className="text-red-400/80 font-mono text-xs">{error}</p>
        </div>
      )}

      {jobStatus && (
        <div className="mt-4 p-4 bg-cyan-500/5 border border-cyan-500/20 rounded">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs text-cyan-400/60">JOB STATUS</span>
            <span className={`font-mono text-xs ${
              jobStatus.status === 'completed' ? 'text-green-400' :
              jobStatus.status === 'failed' ? 'text-red-400' :
              jobStatus.status === 'queued' ? 'text-amber-400' :
              'text-cyan-400'
            }`}>
              {jobStatus.status?.toUpperCase()}
            </span>
          </div>

          {jobStatus.creditsCharged && (
            <div className="text-xs text-cyan-400/60 mb-2">
              Credits Charged: {jobStatus.creditsCharged}
            </div>
          )}

          {jobStatus.progress !== undefined && (
            <div className="mb-3">
              <div className="w-full bg-cyan-500/10 rounded-full h-2">
                <div
                  className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${jobStatus.progress}%` }}
                />
              </div>
              <div className="text-right text-xs text-cyan-400/40 mt-1">
                {jobStatus.progress}%
              </div>
            </div>
          )}

          {jobStatus.downloadUrl && (
            <a
              href={`${import.meta.env.VITE_LOVESFIRE_API_URL || 'http://localhost:3000'}${jobStatus.downloadUrl}`}
              download
              className="block w-full py-2 bg-green-500/20 border border-green-500/40 rounded text-green-400 hover:bg-green-500/30 transition-colors font-mono text-sm text-center"
            >
              ⬇ DOWNLOAD VIDEO
            </a>
          )}

          <div className="mt-3 pt-3 border-t border-cyan-500/10">
            <div className="font-mono text-xs text-cyan-400/40 truncate">
              Job ID: {jobStatus.jobId || jobStatus.id}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
