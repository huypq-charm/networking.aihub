const API_URL =
  (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function request<T = any>(
  path: string,
  options: { method?: HttpMethod; body?: unknown } = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    let message = 'Request failed';
    try {
      const errorData = await response.json();
      message = errorData.error || errorData.message || message;
    } catch {
      const text = await response.text();
      message = text || message;
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export const api = {
  getTasks: () => request('/tasks'),
  saveTask: (payload: any, id?: string) =>
    id
      ? request(`/tasks/${id}`, { method: 'PUT', body: payload })
      : request('/tasks', { method: 'POST', body: payload }),
  deleteTask: (id: string) => request(`/tasks/${id}`, { method: 'DELETE' }),

  getCampaigns: () => request('/campaigns'),
  saveCampaign: (payload: any, id?: string) =>
    id
      ? request(`/campaigns/${id}`, { method: 'PUT', body: payload })
      : request('/campaigns', { method: 'POST', body: payload }),
  deleteCampaign: (id: string) =>
    request(`/campaigns/${id}`, { method: 'DELETE' }),

  getTrainings: () => request('/trainings'),
  saveTraining: (payload: any, id?: string) =>
    id
      ? request(`/trainings/${id}`, { method: 'PUT', body: payload })
      : request('/trainings', { method: 'POST', body: payload }),
  deleteTraining: (id: string) =>
    request(`/trainings/${id}`, { method: 'DELETE' }),

  submitPartnerRegistration: (payload: any) =>
    request('/partner-registrations', { method: 'POST', body: payload }),

  submitPayment: (payload: any) =>
    request('/payments', { method: 'POST', body: payload }),

  submitKyc: (payload: any) =>
    request('/kyc', {
      method: 'POST',
      body: payload,
    }),

  getPaymentSettings: () => request('/payment-settings'),
  updatePaymentSettings: (payload: any) =>
    request('/payment-settings', { method: 'PUT', body: payload }),

  getDashboardSummary: () => request('/dashboard/summary'),

  login: (payload: { username: string; password: string }) =>
    request('/login', { method: 'POST', body: payload }),

  getUsers: () => request('/users'),

  getUserPoolStatus: (userId: string) => request(`/user-pool-status/${userId}`),
  updateUserPoolStatus: (userId: string, payload: any) =>
    request(`/user-pool-status/${userId}`, { method: 'PUT', body: payload }),
};

