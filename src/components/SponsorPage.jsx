import { useState } from 'react';

const TIERS = [
  {
    id: 'bronze',
    name: 'BRONZE STEWARD',
    price: 10,
    interval: 'one-time',
    credits: 20,
    color: 'from-amber-700/20 to-amber-900/10',
    border: 'border-amber-600/40',
    glow: 'shadow-amber-500/10',
    perks: [
      '20 LovesfireAI credits',
      'Name in Steward roll',
      'Community Discord access',
    ],
  },
  {
    id: 'gold',
    name: 'GOLD STEWARD',
    price: 50,
    interval: 'one-time',
    credits: 120,
    color: 'from-yellow-500/20 to-amber-500/10',
    border: 'border-yellow-500/40',
    glow: 'shadow-yellow-500/10',
    featured: true,
    perks: [
      '120 LovesfireAI credits',
      'Priority advisory access',
      'Name in Steward roll',
      'Early feature access',
      'Community Discord access',
    ],
  },
  {
    id: 'founding',
    name: 'FOUNDING STEWARD',
    price: 150,
    interval: 'one-time',
    credits: 400,
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-400/40',
    glow: 'shadow-cyan-500/10',
    perks: [
      '400 LovesfireAI credits',
      'Lifetime Founding badge',
      'Priority advisory access',
      'Direct line to development',
      'Name in Steward roll',
      'Early feature access',
      'Community Discord access',
    ],
  },
];

const STEPS = [
  { num: '01', text: 'Choose your tier below' },
  { num: '02', text: 'Send an Interac e-Transfer to the address shown' },
  { num: '03', text: 'Include your email in the e-Transfer message' },
  { num: '04', text: 'Credits are minted to your account within 24 hours' },
];

export default function SponsorPage() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const contactEmail = 'bossbozitive@outlook.com';

  function handleCopyEmail() {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 text-center">
        <div className="text-4xl mb-3">🫁</div>
        <h2
          className="text-2xl font-black tracking-wider"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            background: 'linear-gradient(135deg, #00e5ff 0%, #ffffff 40%, #ffab00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          BECOME A STEWARD
        </h2>
        <p className="mt-3 text-cyan-400/60 font-mono text-xs leading-relaxed max-w-sm mx-auto">
          Fund sovereign AI development. No middleman fees.
          No Stripe. No corporate gatekeepers.
          Direct support via e-Transfer.
        </p>

        {/* How it works */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="p-2 bg-cyan-500/5 border border-cyan-500/10 rounded text-left"
            >
              <span className="text-cyan-400/80 font-mono text-xs font-bold">{step.num}</span>
              <p className="text-cyan-400/50 font-mono text-xs mt-1 leading-tight">{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <div className="space-y-3">
        {TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => setSelectedTier(tier.id)}
            className={`relative w-full p-5 rounded-lg border transition-all duration-300 text-left ${
              selectedTier === tier.id
                ? `bg-gradient-to-br ${tier.color} ${tier.border} shadow-lg ${tier.glow}`
                : 'bg-cyan-500/5 border-cyan-500/15 hover:border-cyan-500/30'
            }`}
          >
            {tier.featured && (
              <div className="absolute -top-2 right-4 px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/40 rounded text-yellow-400 font-mono text-xs">
                POPULAR
              </div>
            )}

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div
                  className="font-bold text-white/90 text-sm"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {tier.name}
                </div>
                <div className="mt-2 space-y-1">
                  {tier.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-cyan-400/40 text-xs">+</span>
                      <span className="text-cyan-400/60 font-mono text-xs">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-right ml-4 shrink-0">
                <div className="text-2xl font-bold text-cyan-400">${tier.price}</div>
                <div className="text-xs text-cyan-400/40 font-mono">{tier.interval}</div>
                <div className="text-xs text-cyan-400/30 font-mono mt-1">
                  {tier.credits} credits
                </div>
              </div>
            </div>

            {selectedTier === tier.id && (
              <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Payment Instructions */}
      {selectedTier && !submitted && (
        <div className="bg-black/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 space-y-4">
          <h3 className="font-mono text-cyan-400/80 text-sm tracking-wider">
            PAYMENT INSTRUCTIONS
          </h3>

          <div className="p-3 bg-cyan-500/5 border border-cyan-500/15 rounded">
            <p className="text-xs text-cyan-400/50 font-mono mb-1">Send Interac e-Transfer to:</p>
            <div className="flex items-center gap-2">
              <code className="text-cyan-400 font-mono text-sm flex-1">{contactEmail}</code>
              <button
                onClick={handleCopyEmail}
                className="px-2 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-400 font-mono text-xs hover:bg-cyan-500/30 transition-colors"
              >
                {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>

          <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded">
            <p className="text-xs text-amber-400/70 font-mono">
              Amount: <span className="text-amber-400 font-bold">
                ${TIERS.find(t => t.id === selectedTier)?.price} CAD
              </span>
            </p>
            <p className="text-xs text-amber-400/50 font-mono mt-1">
              Include your email in the e-Transfer message so we can mint your credits.
            </p>
          </div>

          {/* Confirmation Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-xs text-cyan-400/50 font-mono">
              After sending the e-Transfer, fill in your details below:
            </p>

            <div>
              <label className="block font-mono text-xs text-cyan-400/60 mb-1">YOUR NAME</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Steward name"
                className="w-full bg-black/40 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 placeholder-cyan-400/20 focus:border-cyan-400 focus:outline-none font-mono text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-cyan-400/60 mb-1">YOUR EMAIL</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="steward@example.com"
                className="w-full bg-black/40 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 placeholder-cyan-400/20 focus:border-cyan-400 focus:outline-none font-mono text-sm"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-cyan-400/60 mb-1">
                MESSAGE (optional)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="e-Transfer reference or note"
                rows={2}
                className="w-full bg-black/40 border border-cyan-500/30 rounded px-3 py-2 text-cyan-400 placeholder-cyan-400/20 focus:border-cyan-400 focus:outline-none font-mono text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-cyan-500/20 border border-cyan-500/40 rounded text-cyan-400 hover:bg-cyan-500/30 transition-colors font-mono text-sm tracking-wider"
            >
              I SENT THE E-TRANSFER
            </button>
          </form>
        </div>
      )}

      {/* Confirmation */}
      {submitted && (
        <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 text-center space-y-3">
          <div className="text-3xl">✓</div>
          <h3
            className="text-lg font-bold text-green-400"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            STEWARDSHIP RECEIVED
          </h3>
          <p className="text-cyan-400/60 font-mono text-xs leading-relaxed">
            Your {TIERS.find(t => t.id === selectedTier)?.credits} credits will be minted
            within 24 hours of e-Transfer confirmation.
          </p>
          <p className="text-cyan-400/40 font-mono text-xs">
            A confirmation will be sent to {formData.email}
          </p>
          <div className="pt-2 border-t border-cyan-500/10">
            <p className="text-xs text-cyan-400/30 font-mono">
              Sovereign treasury. Zero fees. Full audit trail.
            </p>
          </div>
        </div>
      )}

      {/* Governance Footer */}
      <div className="text-center space-y-2 pt-2">
        <p className="text-xs text-cyan-400/30 font-mono">
          Governed by BBnCC pillars: Unity, Access, Transparency
        </p>
        <p className="text-xs text-cyan-400/20 font-mono">
          Every dollar is double-entry tracked. Ledger auditable on request.
        </p>
      </div>
    </div>
  );
}
