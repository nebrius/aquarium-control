const BASE_URL = 'http://localhost:3001';

export async function get<T>(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${String(response.status)}`);
  }
  return response.json() as Promise<T>;
}

export function put({
  endpoint,
  body,
}: {
  endpoint: string;
  body: Record<string, unknown>;
}) {
  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export function post({
  endpoint,
  body,
}: {
  endpoint: string;
  body: Record<string, unknown>;
}) {
  return fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
