'use client';

export async function fetchWithAuth(url, options = {}) {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };
  return fetch(url, { ...options, headers });
}