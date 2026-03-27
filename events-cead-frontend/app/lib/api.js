const API_URL = "/api";

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
};

async function handleResponse(res) {
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    const error = (data && data.message) || res.statusText;
    return Promise.reject(data || { message: error });
  }

  return data;
}

export async function getSalas() {
  const res = await fetch(`${API_URL}/salas`, { headers });
  return handleResponse(res);
}

export async function getEventos() {
  const res = await fetch(`${API_URL}/eventos`, { headers });
  return handleResponse(res);
}

export async function getPessoas(search = "") {
  const res = await fetch(`${API_URL}/pessoas?search=${search}`, { headers });
  return handleResponse(res);
}

export async function createPessoa(data) {
  const res = await fetch(`${API_URL}/pessoas`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function createEvento(data) {
  const res = await fetch(`${API_URL}/eventos`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function deleteEvento(id) {
  const res = await fetch(`${API_URL}/eventos/${id}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(res);
}
