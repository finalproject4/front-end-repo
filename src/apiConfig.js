let apiUrl;
const apiUrls = {
  production: "https://cryptic-forest-78079.herokuapp.com/",
  development: "http://localhost:3001"
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
