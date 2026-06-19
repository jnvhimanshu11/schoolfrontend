import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor: attach JWT ────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('atlas_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: handle 401 ───────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('atlas_token');
      localStorage.removeItem('atlas_email');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Admission APIs ─────────────────────────────────
export const admissionApi = {
  submit:       (data)         => api.post('/admissions', data),
  getAll:       (page, status) => api.get(`/admissions?page=${page}&status=${status ?? ''}`),
  updateStatus: (id, status)   => api.put(`/admissions/${id}/status?status=${status}`),
  delete:       (id)           => api.delete(`/admissions/${id}`),
};

// ── Inquiry APIs ───────────────────────────────────
export const inquiryApi = {
  submit:  (data) => api.post('/inquiries', data),
  getAll:  (page) => api.get(`/inquiries?page=${page}`),
  update:  (id, data) => api.put(`/inquiries/${id}`, data),
  delete:  (id) => api.delete(`/inquiries/${id}`),
};

// ── Gallery APIs ───────────────────────────────────
export const galleryApi = {
  getAll:  (cat) => api.get(`/gallery${cat ? `?category=${cat}` : ''}`),
  upload:  (formData) => api.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' }}),
  delete:  (id) => api.delete(`/gallery/${id}`),
};

// ── Notice APIs ────────────────────────────────────
export const noticeApi = {
  getAll:  () => api.get('/notices'),
  create:  (data) => api.post('/notices', data),
  update:  (id, data) => api.put(`/notices/${id}`, data),
  delete:  (id) => api.delete(`/notices/${id}`),
};

// ── Faculty APIs ───────────────────────────────────
export const facultyApi = {
  getAll:  () => api.get('/faculty'),
  create:  (data) => api.post('/faculty', data),
  update:  (id, data) => api.put(`/faculty/${id}`, data),
  delete:  (id) => api.delete(`/faculty/${id}`),
};

// ── Settings APIs ──────────────────────────────────
export const settingsApi = {
  getPublic: () => api.get('/settings/public'),
  getAll:    () => api.get('/settings'),
  update:    (key, value) => api.put('/settings', { key, value }),
};
