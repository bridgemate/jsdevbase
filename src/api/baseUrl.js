//this is the logic that points the api to either the mock api or the real one served by express

export default function getBaseUrl() {
  // const inDev = window.location.hostname === 'localhost';
  // return inDev ? 'http://localhost:3001/' : '/';
  return getQueryStringParameterByName('useMockApi') ? 'http://localhost:3001/' : 'https://thawing-hollows-79136.herokuapp.com/';
}

function getQueryStringParameterByName(name, url) {
  if(!url) url = window.location.href;
   name = name.replace(/[\[\]]/g, "\\$&");
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
   results = regex.exec(url);
   if(!results) return null;
   if(!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// type /?useMockApi=true after http://localhost:3000 and mock api data will show
