import { defineStore } from "pinia";
import {
  getForexData,
  getDigitalCurrency,
  getTickers,
  getFXBars,
  addIndicator,
  getChartInfo,
  createAlgo,
  getAllAlgos,
  getAlgoByName,
  removeAlgo,
  editAlgo,
  runAlgos,
  stopAlgos,
} from "src/services/api/FinancialMarket.service";

import { useAuthStore } from "./";

import { digitalCurrencyMapper, FXBarsMapper } from "src/services/mappers";

const useFinancialMarket = defineStore("FinancialMarket", {
  state: () => ({
    forexData: {},
    chart: {
      symbol: null,
      timespan: null,
      indicators: [],
      strategy: [],
    },
    userAlgos: [],
    algoMode: "create",
    algo: {
      name: "",
      edges: [],
      nodes: [
        {
          id: "start",
          type: "input",
          label: "start",
          position: { x: 780, y: 25 },
          value: {},
        },
        {
          id: "end",
          type: "output",
          label: "end",
          position: { x: 790, y: 300 },
          value: {},
        },
      ],
    },
  }),
  getters: {},
  actions: {
    async getForexData({ func, from_symbol, to_symbol }) {
      const response = await getForexData({ func, from_symbol, to_symbol });
      return response;
    },
    async getDigitalCurrency({ func, symbol, market }) {
      const response = await getDigitalCurrency({ func, symbol, market });
      const Digital_Currency_Daily = response[Object.keys(response)[1]];
      const res = digitalCurrencyMapper(Digital_Currency_Daily);
      return res;
    },
    async getTickers(market = "crypto") {
      const response = await getTickers(market);
      return response;
    },
    async getFXBars({ forexTicker, timespan }) {
      const response = await getFXBars({
        forexTicker,
        timespan,
      });
      return FXBarsMapper(response?.results);
    },

    async addIndicator({ indicators, symbol, timespan }) {
      const authStore = useAuthStore();
      const username = authStore?.user?.email;
      const response = await addIndicator({
        indicators,
        username,
        symbol,
        timespan,
      });
      return response;
    },

    resetChartState() {
      this.chart.indicators = [];
      this.chart.strategy = [];
    },
    async getChartInfo({ symbol, timespan }) {
      const authStore = useAuthStore();
      const username = authStore?.user?.email;
      const response = await getChartInfo({
        username,
        symbol,
        timespan,
      });
      this.chart.indicators = response?.indicators || [];
      this.chart.strategy = Object.keys(response?.algorithms) || [];
      // Object.assign(this.chart, response);
      return response;
    },
    async createAlgo({ nodes, edges, name }) {
      const authStore = useAuthStore();
      const username = authStore?.user?.email;
      const response = await createAlgo({
        nodes,
        edges,
        name,
        username,
      });
      return response;
    },
    async editAlgo({ nodes, edges, name }) {
      const authStore = useAuthStore();
      const username = authStore?.user?.email;
      const response = await editAlgo({
        nodes,
        edges,
        name,
        username,
      });
      return response;
    },
    async getAllAlgos() {
      const authStore = useAuthStore();
      const username = authStore?.user?.email;
      const response = await getAllAlgos({
        username,
      });
      this.userAlgos = response;
      return response;
    },
    async getAlgoByName(name) {
      const authStore = useAuthStore();
      const username = authStore?.user?.email;
      const response = await getAlgoByName({
        name,
        username,
      });
      return response;
    },
    async removeAlgo(name) {
      const authStore = useAuthStore();
      const username = authStore?.user?.email;
      const response = await removeAlgo({
        name,
        username,
      });
      return response;
    },
    async runAlgos(algo) {
      const authStore = useAuthStore();
      const username = authStore?.user?.email;
      const response = await runAlgos({
        username,
        symbol: this.chart.symbol.value,
        timespan: this.chart.timespan,
        algo,
      });
      return response;
    },
    async stopAlgos(algo) {
      const authStore = useAuthStore();
      const username = authStore?.user?.email;
      const response = await stopAlgos({
        username,
        symbol: this.chart.symbol.value,
        timespan: this.chart.timespan,
        algo,
      });
      return response;
    },
  },
});

export default useFinancialMarket;
