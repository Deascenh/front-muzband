/**
 * Used in app/app.module
 */
export function getAccessToken() {
  return localStorage.getItem('access_token');
}
