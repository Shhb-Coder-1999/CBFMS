const generateCacheKey = ({ url = "", params = {}, data = {} }) =>
  url + JSON.stringify(params) + JSON.stringify(data);

export default generateCacheKey;
