import axios from "axios";

const baseURL = "https://www.alphavantage.co";
// const POLY_API_KEY = "wKpoYx71II40aIXs2Z7Xz1dtfxhvCyqA";
// import { restClient } from "@polygon.io/client-js";
const polygonBaseURL = "https://api.polygon.io";
const serviceBaseUrl = "http://192.168.137.188:3000";
// const serviceBaseUrl = "http://87.236.166.45:3000";

export const getForexData = ({ func, from_symbol, to_symbol }) => {
  return axios({
    method: "GET",
    baseURL,
    url: "/query",
    headers: { "User-Agent": "request" },
    params: {
      function: func,
      from_symbol,
      to_symbol,
      apikey: "IDZ5N8610E9DQAHX",
    },
  });
};
export const getDigitalCurrency = ({ func, symbol, market }) => {
  return axios({
    method: "GET",
    baseURL,
    url: "/query",
    headers: { "User-Agent": "request" },
    params: {
      function: func,
      symbol,
      market,
      apikey: "IDZ5N8610E9DQAHX",
    },
  });
};

export const getTickers = (market) => {
  return axios({
    method: "GET",
    baseURL: polygonBaseURL,
    url: "/v3/reference/tickers",
    headers: { "User-Agent": "request" },
    params: {
      market,
      apiKey: "wKpoYx71II40aIXs2Z7Xz1dtfxhvCyqA",
    },
    cache: true,
  });
};

export const getFXBars = ({ forexTicker, timespan }) => {
  const nowTimeStamp = new Date().getTime() - 3 * 365 * 24 * 60 * 60 * 1000;
  const fromTimeStamp = new Date().getTime();
  return axios({
    method: "GET",
    baseURL: polygonBaseURL,
    url: `/v2/aggs/ticker/${forexTicker}/range/1/${timespan}/${nowTimeStamp}/${fromTimeStamp}`,
    headers: { "User-Agent": "request" },
    params: {
      apiKey: "wKpoYx71II40aIXs2Z7Xz1dtfxhvCyqA",
    },
  });
};

export const addIndicator = ({ indicators, username, symbol, timespan }) => {
  return axios({
    method: "PATCH",
    baseURL: serviceBaseUrl,
    url: `/users/${username}/charts/${symbolConverter(
      symbol
    )}-${timespan}/indicator`,
    data: {
      indicators,
    },
  });
};

export const getChartInfo = ({ username, symbol, timespan }) => {
  return axios({
    method: "GET",
    baseURL: serviceBaseUrl,
    url: `/users/${username}/charts/${symbolConverter(symbol)}-${timespan}`,
  });
};

export const createAlgo = ({ username, name, nodes, edges }) => {
  return axios({
    method: "POST",
    baseURL: serviceBaseUrl,
    url: `/users/${username}/algorithms/${name}`,
    data: {
      name,
      nodes,
      edges,
    },
  });
};
export const editAlgo = ({ username, name, nodes, edges }) => {
  return axios({
    method: "PUT",
    baseURL: serviceBaseUrl,
    url: `/users/${username}/algorithms/${name}`,
    data: {
      name,
      nodes,
      edges,
    },
  });
};
export const getAllAlgos = ({ username }) => {
  return axios({
    method: "GET",
    baseURL: serviceBaseUrl,
    url: `/users/${username}/algorithms/`,
  });
};
export const getAlgoByName = ({ username, name }) => {
  return axios({
    method: "GET",
    baseURL: serviceBaseUrl,
    url: `/users/${username}/algorithms/${name}`,
  });
};

export const removeAlgo = ({ username, name }) => {
  return axios({
    method: "DELETE",
    baseURL: serviceBaseUrl,
    url: `/users/${username}/algorithms/${name}`,
  });
};

export const runAlgos = ({ username, symbol, timespan, algo }) => {
  return axios({
    method: "PATCH",
    baseURL: serviceBaseUrl,
    url: `/users/${username}/charts/${symbolConverter(
      symbol
    )}-${timespan}/algorithm`,
    data: {
      name: algo,
    },
  });
};
export const stopAlgos = ({ username, symbol, timespan, algo }) => {
  return axios({
    method: "DELETE",
    baseURL: serviceBaseUrl,
    url: `/users/${username}/charts/${symbolConverter(
      symbol
    )}-${timespan}/algorithm`,
    data: {
      name: algo,
    },
  });
};

const symbolConverter = (symbol) =>
  symbol.split(":")[1].substring(0, symbol.length - 5) + "-USDT";
