// Frontend API helper. All client requests to the backend pass through here.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = (token: string) => localStorage.setItem('token', token);
export const removeAuthToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
};

const request = async (endpoint: string, options: RequestInit = {}) => {
    const token = getAuthToken();
    const headers = new Headers(options.headers || {});

    // Attach token automatically for protected endpoints.
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    // JSON requests need the header, but FormData must set its own boundary.
    if (!(options.body instanceof FormData)) {
        if (!headers.has('Content-Type')) {
            headers.set('Content-Type', 'application/json');
        }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json().catch(() => ({}));

    // Keep error handling in one place for all pages.
    if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
    }

    return data;
};


export const authApi = {
    login: (data: Record<string, unknown>) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    register: (data: Record<string, unknown>) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    googleLogin: (data: { idToken: string }) => request('/auth/google', { method: 'POST', body: JSON.stringify(data) }),
    getConfig: () => request('/auth/config', { method: 'GET' }),
};

export const uploadApi = {
    uploadFile: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return request('/upload', { method: 'POST', body: formData });
    },
    uploadText: (text: string) => request('/upload', { method: 'POST', body: JSON.stringify({ text }) }),
};

export const aiApi = {
    generateQuiz: (data: Record<string, unknown>) => request('/ai/generate', { method: 'POST', body: JSON.stringify(data) }),
};

export const quizApi = {
    create: (data: Record<string, unknown>) => request('/quizzes', { method: 'POST', body: JSON.stringify(data) }),
    getAll: () => request('/quizzes'),
    getById: (id: string) => request(`/quizzes/${id}`),
    update: (id: string, data: Record<string, unknown>) => request(`/quizzes/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    publish: (id: string, data: Record<string, unknown>) => request(`/quizzes/${id}/publish`, { method: 'POST', body: JSON.stringify(data) }),
};

export const attemptApi = {
    getPublicQuiz: (shareId: string) => request(`/attempts/quiz/${shareId}`),
    submit: (shareId: string, data: Record<string, unknown>) => request(`/attempts/${shareId}`, { method: 'POST', body: JSON.stringify(data) }),
    getAnalytics: (quizId: string) => request(`/attempts/analytics/${quizId}`),
};
