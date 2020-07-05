/**
 * Used in app/app.module
 */
export function getAccessToken() {
  return sessionStorage.getItem('access_token');
}
