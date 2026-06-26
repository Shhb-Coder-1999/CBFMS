import axios from "axios";
import { boot } from "quasar/wrappers";
import { Notify } from "quasar";

import { loading, crypto } from "/src/services";
const marketBaseUrl = "https://api.polygon.io";
// const { decrypt, encrypt } = crypto;

import { ChainOfResponsibility, generateCacheKey } from "/src/utils";
const { createChainNode } = ChainOfResponsibility;

const showLoading = (config, key) => {
  if (!config) return;

  const { text = "در حال دریافت اطلاعات...", type = "circular" } = config;
  loading.show({ key, text, type });
};
const onRequest = (request) => {
  const { url, params, data, cache, baseURL } = request;
  const storedData = sessionStorage.getItem(
    generateCacheKey({ url, params, data })
  );

  const requestChainOfResponsibility = new ChainOfResponsibility(
    [
      createChainNode(cache && storedData, () => {
        throw new axios.Cancel({
          isCached: true,
          data: JSON.parse(storedData),
        });
      }),
      createChainNode(true, () => {
        const token = sessionStorage.getItem("access_token");
        if (token && baseURL != marketBaseUrl)
          request.headers["authorization"] = "Bearer " + token;
        return request;
      }),
    ],
    "first"
  );

  return requestChainOfResponsibility.execute();
};
const onRequestError = (error) => Promise.reject(error);

const onResponse = (response) => {
  const {
    url,
    params,
    data,
    loading: showLoading,
    showToast,
  } = response.config;

  const responseChainOfResponsibility = new ChainOfResponsibility([
    createChainNode(response.data?.data?.message && showToast, () => {
      Notify.create({
        message: response?.data?.data?.message?.fa,
        color: "success",
      });
    }),
    createChainNode(response.config.cache, () => {
      sessionStorage.setItem(
        generateCacheKey({ url, params, data: JSON.parse(data || "{}") }),
        JSON.stringify(response.data?.results) ||
          JSON.stringify(response.data?.data)
      );
    }),
    createChainNode(showLoading, () => {
      loading.hide({ key: url });
    }),
  ]);
  responseChainOfResponsibility.execute();

  return response.data;
};

const handleRetry = (error) => {
  const { retry } = error.config;
  const {
    count = 5,
    mode = "exponential",
    coefficient = 1,
    currentRetry = 1,
    delayFunction = (count, currentRetry) => currentRetry,
  } = retry;

  const delayMapper = {
    exponential: () => Math.pow(2, currentRetry) * coefficient + 1,
    logarithm: () => Math.log2(currentRetry + 1) * coefficient + 1,
    linear: () => coefficient,
    custom: () => delayFunction(count, currentRetry),
  };

  if (currentRetry < count) {
    const delay = delayMapper[mode]();
    const requestConfig = error.config;
    requestConfig.retry = {
      count,
      mode,
      coefficient,
      currentRetry: currentRetry + 1,
    };
    return new Promise((resolve) =>
      setTimeout(() => resolve(axios.request(requestConfig)), delay * 1000)
    );
  }

  error.config.retry = false;
};

const onResponseError = (error) => {
  const metaCode = error?.response?.data?.meta?.code;
  const statusCode = parseInt(error.response && error.response.status);

  const errorChainOfResponsibility = new ChainOfResponsibility([
    createChainNode(error.config?.showToast, () => {
      Notify.create({
        message: error?.response?.data?.message || "server error!",
        color: "red",
      });
    }),
    createChainNode(
      statusCode === 401 || metaCode === "tokenNotProvided",
      () => {
        // authStore[authActionsConstants.REMOVE_TOKEN]();
        // router.push(authenticationRoutes.ROOT_PATH);
      }
    ),
    createChainNode(error.config?.retry, () => handleRetry(error)),
    createChainNode(error?.message?.isCached && error?.message?.data, () =>
      Promise.resolve({
        data: error.message.data,
      })
    ),
    createChainNode(error.config?.loading, () => {
      loading.hide({ key: error.config.url });
    }),
    createChainNode(true, () => Promise.reject(error.response)),
  ]);

  return errorChainOfResponsibility.execute();
};

export default boot(({ app }) => {
  axios.defaults.showToast = true;
  axios.defaults.loading = false;
  axios.defaults.retry = false;
  axios.defaults.timeout = 3 * 60 * 1000;
  axios.interceptors.request.use(onRequest, onRequestError);
  axios.interceptors.response.use(
    (response) => onResponse(response),
    (error) => onResponseError(error)
  );
  app.config.globalProperties.$axios = axios;
});

export { axios };
