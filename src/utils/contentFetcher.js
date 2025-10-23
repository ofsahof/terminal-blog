export const fetchContent = async (path) => {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('text/html')) {
      throw new Error(`File not found at ${path} (received HTML fallback)`);
    }

    const textContent = await response.text();
    return textContent;

  } catch (error) {
    console.error(`Fetch error for path: ${path}`, error.message);
    throw error;
  }
};

