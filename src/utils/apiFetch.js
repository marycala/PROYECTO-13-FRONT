const API_URL = import.meta.env.VITE_API_URL;

const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    ...(options.headers || {}),
  };

  if (!options.isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || `Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const get = async (url, token = '') => {
  const res = await fetch(`${API_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.statusText}`);
  }

  return res.json();
};

export const post = (url, body, isFormData = false) => {
  return apiFetch(url, {
    method: "POST",
    body: isFormData ? body : JSON.stringify(body),
    isFormData,
  });
};

export const put = (url, body) => {
  return apiFetch(url, {
    method: "PUT",
    body: JSON.stringify(body),
  });
};

export const patch = (url, body, options = {}) => {
  return apiFetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });
};

export const remove = (url) => {
  return apiFetch(url, { method: "DELETE" });
};

export const deleteEvent = (eventId) => {
  return remove(`/events/${eventId}`);
};
