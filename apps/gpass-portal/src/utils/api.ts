'server only';

export const toCurl = (input: RequestInfo, init?: RequestInit) => {
  const url = typeof input === 'string' ? input : input.url;
  const method = init?.method || 'GET';
  const headers = new Headers(
    init?.headers || (input instanceof Request ? input.headers : {})
  );
  const body = init?.body;

  const curl = [`curl -X ${method}`];

  headers.forEach((value, key) => {
    curl.push(`-H "${key}: ${value}"`);
  });

  if (body && typeof body === 'string') {
    curl.push(`--data '${body}'`);
  }

  curl.push(`"${url}"`);

  return {
    curl,
    curlString: curl.join(' '),
  };
};
