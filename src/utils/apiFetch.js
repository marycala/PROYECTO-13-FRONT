const API_URL = "https://proyecto-13-back.onrender.com";

let navigate = null;

export const setApiNavigate = (nav) => {
  navigate = nav;
};

const apiFetch = async (url, options = {}, retries = 1) => {
  const {
    isFormData = false,
    timeout = 10000,
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const token = localStorage.getItem("token");
  const headers = {
    ...(fetchOptions.headers || {}),
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (fetchOptions.body && !isFormData && typeof fetchOptions.body === "object") {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  try {
    const response = await fetch(`${API_URL}${url}`, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    let data;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        if (navigate) {
          navigate("/login");
        } else {
          window.location.href = "/login";
        }
      }
      throw new Error(data?.message || `Error: ${response.statusText}`);
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    if ((error.name === "AbortError" || error.name === "TypeError") && retries > 0) {
      console.warn(`Retrying request: ${url}`);
      return apiFetch(url, options, retries - 1);
    }

    console.error(error);
    throw error;
  }
};

// Métodos HTTP
export const get = (url, options = {}) => {
  return apiFetch(url, {
    method: "GET",
    ...options,
  });
};

export const post = (url, body, options = {}) => {
  return apiFetch(url, {
    method: "POST",
    body,
    ...options,
  });
};

export const put = (url, body, options = {}) => {
  return apiFetch(url, {
    method: "PUT",
    body,
    ...options,
  });
};

export const patch = (url, body, options = {}) => {
  return apiFetch(url, {
    method: "PATCH",
    body,
    ...options,
  });
};

export const remove = (url) => {
  return apiFetch(url, { method: "DELETE" });
};

export const deleteEvent = (eventId) => {
  return remove(`/events/${eventId}`);
};