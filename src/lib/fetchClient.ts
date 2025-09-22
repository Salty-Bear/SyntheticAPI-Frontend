export interface FetchOptions extends RequestInit {
  timeout?: number;
}

export const fetchClient = async (
  url: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    const response = await fetch(url, {
      ...fetchOptions,
      headers: defaultHeaders,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};
