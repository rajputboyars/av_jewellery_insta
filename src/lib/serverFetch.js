import { cookies } from 'next/headers';

export async function serverFetch(url, options = {}) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };
  return fetch(url, { ...options, headers });
}