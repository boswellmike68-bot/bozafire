/**
 * LovesfireAI API Client
 * 
 * Handles all API communication with the monetized LovesfireAI backend.
 * Includes credit tracking, API key management, and render queue operations.
 */

const API_BASE_URL = import.meta.env.VITE_LOVESFIRE_API_URL || 'http://localhost:3000';

class LovesfireAPI {
  constructor() {
    this.apiKey = localStorage.getItem('lovesfire_api_key') || null;
  }

  // ---------------------------------------------------------------------------
  // API Key Management
  // ---------------------------------------------------------------------------

  setApiKey(key) {
    this.apiKey = key;
    localStorage.setItem('lovesfire_api_key', key);
  }

  getApiKey() {
    return this.apiKey;
  }

  clearApiKey() {
    this.apiKey = null;
    localStorage.removeItem('lovesfire_api_key');
  }

  async createApiKey(userId, initialCredits = 0) {
    const response = await fetch(`${API_BASE_URL}/api-keys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, initialCredits }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create API key: ${response.statusText}`);
    }

    const data = await response.json();
    this.setApiKey(data.apiKey);
    return data;
  }

  // ---------------------------------------------------------------------------
  // Credit Operations
  // ---------------------------------------------------------------------------

  async getCredits() {
    if (!this.apiKey) throw new Error('No API key set');

    const response = await fetch(`${API_BASE_URL}/credits`, {
      headers: { 'Authorization': `Bearer ${this.apiKey}` },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key');
      }
      throw new Error(`Failed to get credits: ${response.statusText}`);
    }

    return response.json();
  }

  async purchaseCredits(packageType) {
    if (!this.apiKey) throw new Error('No API key set');

    const response = await fetch(`${API_BASE_URL}/credits/purchase`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ package: packageType }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create payment intent: ${response.statusText}`);
    }

    return response.json();
  }

  async getPricing() {
    const response = await fetch(`${API_BASE_URL}/pricing`);
    if (!response.ok) throw new Error(`Failed to get pricing: ${response.statusText}`);
    return response.json();
  }

  // ---------------------------------------------------------------------------
  // Render Operations
  // ---------------------------------------------------------------------------

  async advisory(input) {
    if (!this.apiKey) throw new Error('No API key set');

    const response = await fetch(`${API_BASE_URL}/advisory`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      if (response.status === 402) {
        const error = await response.json();
        throw new Error(`Insufficient credits. Required: ${error.required}, Balance: ${error.balance}`);
      }
      throw new Error(`Advisory failed: ${response.statusText}`);
    }

    return response.json();
  }

  async render(script, highRes = false) {
    if (!this.apiKey) throw new Error('No API key set');

    const response = await fetch(`${API_BASE_URL}/render`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ script, highRes }),
    });

    if (!response.ok) {
      if (response.status === 402) {
        const error = await response.json();
        throw new Error(`Insufficient credits. Required: ${error.required}, Balance: ${error.balance}`);
      }
      throw new Error(`Render failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getJobStatus(jobId) {
    const response = await fetch(`${API_BASE_URL}/status/${jobId}`);
    if (!response.ok) throw new Error(`Failed to get job status: ${response.statusText}`);
    return response.json();
  }

  async downloadVideo(jobId) {
    const response = await fetch(`${API_BASE_URL}/download/${jobId}`);
    if (!response.ok) throw new Error(`Failed to download video: ${response.statusText}`);
    return response.blob();
  }

  // ---------------------------------------------------------------------------
  // Admin Operations
  // ---------------------------------------------------------------------------

  async getAdminRevenue(adminKey) {
    const response = await fetch(`${API_BASE_URL}/admin/revenue`, {
      headers: { 'x-admin-key': adminKey },
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error('Invalid admin key');
      throw new Error(`Failed to get revenue: ${response.statusText}`);
    }

    return response.json();
  }

  async getAdminKeys(adminKey) {
    const response = await fetch(`${API_BASE_URL}/admin/keys`, {
      headers: { 'x-admin-key': adminKey },
    });

    if (!response.ok) {
      if (response.status === 401) throw new Error('Invalid admin key');
      throw new Error(`Failed to get keys: ${response.statusText}`);
    }

    return response.json();
  }
}

// Export singleton instance
export const lovesfireApi = new LovesfireAPI();
export default lovesfireApi;
