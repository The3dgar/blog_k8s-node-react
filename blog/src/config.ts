const { VITE_API_URL } = import.meta.env;

export const API_URL = VITE_API_URL || 'http://posts.com';
