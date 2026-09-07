const DEFAULT_API_URL = "http://localhost:3500/";

// The api service concatenates endpoints directly, so the base must end in "/".
const withTrailingSlash = (url) => (url.endsWith("/") ? url : `${url}/`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  apiEndPoint: withTrailingSlash(process.env.REACT_APP_API_URL || DEFAULT_API_URL),
};
