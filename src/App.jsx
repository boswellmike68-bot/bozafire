import { useState } from 'react';
import StarField from './components/StarField'
import CircuitOverlay from './components/CircuitOverlay'
import ApiKeyManager from './components/ApiKeyManager'
import CreditDashboard from './components/CreditDashboard'
import CreditPurchase from './components/CreditPurchase'
import RenderInterface from './components/RenderInterface'
import SponsorPage from './components/SponsorPage'

const TABS = [
  { id: 'api', name: 'API KEY', icon: '🔐' },
  { id: 'credits', name: 'CREDITS', icon: '💎' },
  { id: 'purchase', name: 'PURCHASE', icon: '💳' },
  { id: 'render', name: 'RENDER', icon: '🎬' },
  { id: 'sponsor', name: 'SPONSOR', icon: '🫁' },
];

function TabButton({ tab, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-3 font-mono text-sm tracking-wider transition-all duration-300 ${
        isActive
          ? 'text-cyan-400'
          : 'text-cyan-400/40 hover:text-cyan-400/70'
      }`}
    >
      <span className="mr-2">{tab.icon}</span>
      {tab.name}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400 animate-pulse" />
      )}
    </button>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('api');

  const handleKeyCreated = (key) => {
    if (key) setActiveTab('credits');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'api':
        return <ApiKeyManager onKeyCreated={handleKeyCreated} />;
      case 'credits':
        return <CreditDashboard />;
      case 'purchase':
        return <CreditPurchase />;
      case 'render':
        return <RenderInterface />;
      case 'sponsor':
        return <SponsorPage />;
      default:
        return <ApiKeyManager onKeyCreated={handleKeyCreated} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <StarField />
      <CircuitOverlay />

      {/* Header */}
      <div className="relative z-10 pt-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl md:text-5xl font-black tracking-wider"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(135deg, #00e5ff 0%, #ffffff 40%, #ffab00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            LOVESFIRE AI
          </h1>
          <p className="mt-2 text-cyan-400/60 font-mono text-sm tracking-widest">
            BBnCC GOVERNANCE • PROGRAMMABLE REVENUE
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400/60 font-mono">FINANCIAL LUNGS: ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="relative z-10 mt-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center border-b border-cyan-500/20">
            {TABS.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mt-8 px-4 pb-12">
        <div className="max-w-md mx-auto">
          {renderTabContent()}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 fixed bottom-0 left-0 right-0 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 text-xs text-cyan-400/30 font-mono">
          <span>API: /v1</span>
          <span>•</span>
          <span>GOVERNANCE: BBnCC</span>
          <span>•</span>
          <span>SPECS: MommaSpec v1.0.0</span>
        </div>
      </div>

      {/* Scan Line Effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.01) 2px, rgba(0,229,255,0.01) 4px)',
        }}
      />
    </div>
  );
}

export default App
