<template>
  <q-page class="charts-view">
    <q-card class="my-card">
      <q-inner-loading :showing="innerLoading" class="inner-loading">
        <q-spinner-gears size="50px" color="primary" />
        <p>getting your last data ...</p>
      </q-inner-loading>
      <q-card-section class="chart-header">
        <div class="chart-details">
          <div class="text-h6">symbol: {{ formModel?.symbol?.value }}</div>
          <div class="text-subtitle2">timespan : {{ formModel?.timespan }}</div>
        </div>
        <div class="strategy-details">
          <div class="text-h7" v-if="formModel?.strategy?.length">
            <q-spinner color="grey" size="1em" />
            Active strategies: {{ formModel?.strategy }}
          </div>
          <div v-else>No active strategy on this chart!</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <baseChartVue
          :mainIndicators="formModel.indicators"
          class="chart"
          :data="data"
        />
        <div id="chart">
          <!-- <apexchart
            type="scatter"
            height="350"
            :options="chartOptions"
            :series="series"
          ></apexchart> -->
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions vertical>
        <q-form @submit="onSubmit" class="form">
          <div class="init-chart-data">
            <q-select
              filled
              v-model="formModel.symbol"
              use-input
              dense
              :rules="[
                (val) =>
                  (val && Object.keys(val).length > 0) ||
                  'this field is required',
              ]"
              input-debounce="0"
              label="symbol"
              :options="tickersOptions"
              @filter="filterSymbol"
              class="symbol"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>

              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                    <q-item-label caption>{{ scope.opt.value }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <q-select
              filled
              v-model="formModel.timespan"
              :options="timespan"
              label="timespan"
              class="timespan"
              dense
            />
          </div>

          <div class="custom-chart-data">
            <q-select
              filled
              v-model="formModel.strategy"
              :options="strategies"
              label="strategy"
              class="indicator"
              dense
              multiple
              :disable="disableFields"
            />
            <q-select
              filled
              v-model="indicator"
              :options="mainIndicators"
              label="main-indicators"
              class="indicator"
              dense
              :disable="disableFields"
            />
            <span
              class="selected-indicator"
              v-for="(indicator, i) in formModel.indicators"
              @click="selectIndicator(indicator)"
              :key="i"
            >
              {{ indicator.name }} :
              {{ indicator.value }}
            </span>
          </div>

          <!-- <q-select
            filled
            v-model="formModel.subIndicator"
            :options="subIndicators"
            multiple
            label="sub-indicators"
            class="indicator"
          /> -->

          <!-- <q-btn
            label="Submit"
            type="submit"
            color="primary"
            class="submit-btn"
            :loading="submitBtnLoading"
            dense
            :disable="disableFields"
          /> -->
        </q-form>
      </q-card-actions>
    </q-card>
  </q-page>

  <q-dialog v-model="showModal" transition-show="scale" transition-hide="scale">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-negative text-h6">
          {{ selectedIndicator.name }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="selectedIndicator.value" label="value"></q-input>
      </q-card-section>

      <q-card-actions align="right" class="bg-white">
        <q-btn flat label="edit" @click="editIndicator" v-close-popup />
        <q-btn
          flat
          label="delete"
          @click="deleteIndicator"
          class="text-negative"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
  
<script>
import { useQuasar } from "quasar";
import {
  digitalCurrency,
  digitalCurrencyMarket,
  tickers,
  crypto,
} from "src/constants";
import { ref, reactive, onMounted, watchEffect, watch } from "vue";
import predict from "/src/utils/data-mining/linear-regression.js";
import baseChartVue from "src/components/base-chart.vue";
import { useFinancialMarket } from "src/stores";

import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import VueApexCharts from "vue3-apexcharts";
import { useConcreteState } from "src/composables";

export default {
  components: {
    baseChartVue,
    apexchart: VueApexCharts,
  },
  setup() {
    const financialMarket = useFinancialMarket();
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();
    const disableFields = ref(true);
    const innerLoading = ref(false);
    const showModal = ref(false);
    const indicator = ref("");
    const strategies = ref([]);
    const selectedIndicator = ref({});
    const formModel = useConcreteState(financialMarket, "chart");
    // const formModel = reactive({
    //   symbol: null,
    //   timespan: null,
    //   indicators: [],
    //   strategy: [],
    // });

    const series = ref([
      {
        name: "prediction",
        data: [],
      },
      {
        name: "data",
        data: [],
      },
    ]);
    const chartOptions = {
      chart: {
        height: 350,
        type: "scatter",
        zoom: {
          enabled: true,
          type: "xy",
        },
      },
      xaxis: {
        tickAmount: 10,
        labels: {
          formatter: function (val) {
            return parseFloat(val).toFixed(1);
          },
        },
      },
      yaxis: {
        tickAmount: 7,
      },
    };

    const selectIndicator = (value) => {
      showModal.value = true;
      selectedIndicator.value = { ...value };
    };

    const editIndicator = async () => {
      formModel.value.indicators.forEach((indicator) => {
        if (indicator.id === selectedIndicator.value.id) {
          indicator.value = selectedIndicator.value.value;
        }
        console.log(formModel.value.indicators);
      });
      selectedIndicator.value = {};
      await financialMarket.addIndicator({
        indicators: formModel.value.indicators,
        symbol: formModel.value.symbol.value,
        timespan: formModel.value.timespan,
      });
    };

    const deleteIndicator = async () => {
      formModel.value.indicators = formModel.value.indicators.filter(
        (indicator) => indicator.id != selectedIndicator.value.id
      );
      selectedIndicator.value = {};
      await financialMarket.addIndicator({
        indicators: formModel.value.indicators,
        symbol: formModel.value.symbol.value,
        timespan: formModel.value.timespan,
      });
    };

    watch(
      () => indicator.value,
      (newMainIndicator) => {
        if (newMainIndicator) {
          formModel.value.indicators.push({
            name: newMainIndicator,
            value: "",
            id: Date.now(),
          });
          indicator.value = "";
        }
      }
    );

    watch(
      () => formModel.value.strategy,
      (newStrategies, oldStrategies) => {
        if (newStrategies.length > oldStrategies.length) {
          const differenceAlgo = newStrategies.filter(
            (strategy) => !oldStrategies.includes(strategy)
          );
          financialMarket.runAlgos(differenceAlgo[0]);
        } else if (newStrategies.length < oldStrategies.length) {
          if (newStrategies.length) {
            const differenceAlgo = oldStrategies.filter(
              (strategy) => !newStrategies.includes(strategy)
            );
            financialMarket.stopAlgos(differenceAlgo[0]);
          }
        }
      },
      {
        deep: true,
      }
    );

    const timespan = ["hour", "day", "week", "month", "year"];

    const mainIndicators = ["MA", "CCI", "EMA", "BBI"];
    const subIndicators = ["MACD", "VOL"];

    const tickersOptions = ref(crypto);
    // const digitalCurrencyMarketOptions = ref(digitalCurrencyMarket);

    const filterSymbol = (val, update) => {
      update(() => {
        const needle = val.toLowerCase();
        tickersOptions.value = crypto.filter((option) => {
          return (
            option.label.toLowerCase().indexOf(needle) > -1 ||
            option.value.toLowerCase().indexOf(needle) > -1
          );
        });
      });
    };

    const submitBtnLoading = ref(false);

    const onSubmit = async () => {};

    const data = ref([]);
    onMounted(async () => {
      // console.log(financialMarket);
      // data.value = await financialMarket.getFXBars({
      //   forexTicker: "C:EURUSD",
      //   timespan: "day",
      // });

      await financialMarket.getTickers();

      const allStrategies = await financialMarket.getAllAlgos();
      strategies.value = allStrategies.map((strategy) => strategy.name);

      // series.value[1].data = data.value.map(({ close, open }) => {
      //   return [close, open];
      // });

      // const res = await predict(data.value);
      // series.value[0].data = res.map(({ x, y }) => {
      //   return [x, y];
      // });
    });

    watchEffect(() => {
      try {
        if (formModel.value?.timespan && formModel.value?.symbol?.value) {
          innerLoading.value = true;
          setTimeout(async () => {
            data.value = await financialMarket.getFXBars({
              forexTicker: formModel.value.symbol.value,
              timespan: formModel.value.timespan,
            });
            innerLoading.value = false;
            disableFields.value = false;
            // series.value[1].data = data.value.map(({ open, close }) => {
            //   return [open, close];
            // });

            // const res = await predict(data.value);
            // series.value[0].data = res.map(({ x, y }) => {
            //   return [x, y];
            // });

            financialMarket.resetChartState();
            await financialMarket.getChartInfo({
              symbol: formModel.value.symbol.value,
              timespan: formModel.value.timespan,
            });
          }, 5000);
        }
      } catch (error) {}
    });

    return {
      digitalCurrency,
      filterSymbol,
      formModel,
      onSubmit,
      data,
      submitBtnLoading,
      tickersOptions,
      timespan,
      mainIndicators,
      subIndicators,
      strategies,
      innerLoading,
      disableFields,
      selectedIndicator,
      selectIndicator,
      showModal,
      deleteIndicator,
      editIndicator,
      indicator,
      series,
      chartOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
.charts-view {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.chart {
  display: flex;
  justify-content: center;
  width: 100%;
}
.form {
  margin-top: 15px;
  width: 100%;
  // display: flex;
  flex-wrap: nowrap;
  gap: 10px;
}

.custom-chart-data,
.init-chart-data {
  display: flex;
  gap: 10px;
}

.submit-btn {
  width: 10%;
  height: 40px;
}
.symbol {
  width: 49%;
}

.indicator,
.timespan,
.submit-btn {
  width: 32%;
}

.inner-loading {
  background-color: rgb(0 0 0 / 0.25);
  z-index: 1000;
}

.chart-header {
  display: flex;
  justify-content: space-between;
}
.strategy-details {
  border-radius: 10px;
}
.q-card {
  box-shadow: unset;
}

@media only screen and (max-width: 768px) {
  .form {
    flex-wrap: wrap;
  }

  .symbol,
  .indicator,
  .timespan,
  .submit-btn {
    width: 100%;
  }
}

.selected-indicator {
  background: gray;
  padding: 5px;
  cursor: pointer;
  border-radius: 20px;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
  


