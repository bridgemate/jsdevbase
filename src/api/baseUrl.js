//this is the logic that points the api to either the mock api or the real one served by express

export default function getBaseUrl() {
  const inDev = window.location.hostname === 'localhost';
  return inDev ? 'http://localhost:3001/' : '/';
}
