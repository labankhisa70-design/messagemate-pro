const API_BASE = 'https://bulksms.abancool.com/backend/api';

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  private async request(method: string, endpoint: string, body?: any) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, config);
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  }

  get(endpoint: string) {
    return this.request('GET', endpoint);
  }

  post(endpoint: string, body?: any) {
    return this.request('POST', endpoint, body);
  }

  put(endpoint: string, body?: any) {
    return this.request('PUT', endpoint, body);
  }

  delete(endpoint: string) {
    return this.request('DELETE', endpoint);
  }
}

const api = new ApiClient();
export default api;

// Auth API
export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login.php', data),

  register: (data: { name: string; email: string; phone: string; password: string }) =>
    api.post('/auth/register.php', data),

  verifyEmail: (data: { email: string; code: string }) =>
    api.post('/auth/verify-email.php', data),

  resendVerification: (data: { email: string }) =>
    api.post('/auth/resend-verification.php', data),

  forgotPassword: (data: { email: string }) =>
    api.post('/auth/forgot-password.php', data),

  resetPassword: (data: { token: string; password: string }) =>
    api.post('/auth/reset-password.php', data),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats.php'),
};

// Contacts API
export const contactsApi = {
  list: (params?: { page?: number; limit?: number; list_id?: number }) => {
    const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return api.get(`/contacts/list.php${query}`);
  },
  create: (data: { name: string; phone: string; list_id?: number; tags?: string }) =>
    api.post('/contacts/create.php', data),
  getLists: () => api.get('/contacts/lists.php'),
  createList: (data: { list_name: string }) =>
    api.post('/contacts/create-list.php', data),
  importCsv: (data: FormData) => {
    const token = api.getToken();
    return fetch(`${API_BASE}/contacts/import.php`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: data,
    }).then(r => r.json());
  },
};

// SMS API
export const smsApi = {
  send: (data: { phone: string; message: string; sender_id: string; schedule_at?: string }) =>
    api.post('/sms/send.php', data),
  sendBulk: (data: { phones: string[]; message: string; sender_id: string; campaign_name?: string; schedule_at?: string }) =>
    api.post('/sms/send-bulk.php', data),
};

// Campaigns API
export const campaignsApi = {
  list: (params?: { page?: number; limit?: number }) => {
    const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return api.get(`/campaigns/list.php${query}`);
  },
  get: (id: number) => api.get(`/campaigns/get.php?id=${id}`),
  create: (data: any) => api.post('/campaigns/create.php', data),
};

// Sender IDs API
export const senderIdsApi = {
  list: () => api.get('/sender-ids/list.php'),
  request: (data: { sender_name: string }) =>
    api.post('/sender-ids/request.php', data),
};

// Templates API
export const templatesApi = {
  list: () => api.get('/templates/list.php'),
  create: (data: { name: string; message: string }) =>
    api.post('/templates/create.php', data),
  delete: (id: number) => api.delete(`/templates/delete.php?id=${id}`),
};

// Reports API
export const reportsApi = {
  getDelivery: (params?: { campaign_id?: number; from?: string; to?: string }) => {
    const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return api.get(`/reports/delivery.php${query}`);
  },
  getSummary: () => api.get('/reports/summary.php'),
};

// API Keys API
export const apiKeysApi = {
  list: () => api.get('/api-keys/list.php'),
  create: (data: { name: string }) => api.post('/api-keys/create.php', data),
  revoke: (id: number) => api.delete(`/api-keys/revoke.php?id=${id}`),
};

// Billing API
export const billingApi = {
  getPackages: () => api.get('/billing/packages.php'),
  getTransactions: (params?: { page?: number; limit?: number }) => {
    const query = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return api.get(`/user/transactions.php${query}`);
  },
};

// M-Pesa API
export const mpesaApi = {
  initiate: (data: { package_id: number; phone: string }) =>
    api.post('/mpesa/initiate.php', data),
  checkStatus: (transactionId: string) =>
    api.get(`/mpesa/status.php?transaction_id=${transactionId}`),
};

// Settings API
export const settingsApi = {
  getProfile: () => api.get('/user/profile.php'),
  updateProfile: (data: any) => api.post('/user/update-profile.php', data),
  changePassword: (data: { current_password: string; new_password: string }) =>
    api.post('/user/change-password.php', data),
};
