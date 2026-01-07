export function getCookie(key: string): string | null {
  if (typeof document === 'undefined') return null; // Ensure it's client-side

  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [cookieKey, cookieValue] = cookie.trim().split('=');
    if (cookieKey === key && cookieValue) {
      return decodeURIComponent(cookieValue);
    }
  }

  return null;
}
