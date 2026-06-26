<script >
import { onMounted, onUnmounted, watch } from "vue";
import { init, dispose } from "klinecharts";
import { useFinancialMarket } from "src/stores";
const financialMarket = useFinancialMarket();

export default {
  props: {
    data: {
      type: Array,
      default: [],
      required: true,
    },
    subIndicators: {
      type: Array,
      default: [],
      required: true,
    },
    mainIndicators: {
      type: Array,
      default: [],
      required: true,
    },
  },

  setup(props) {
    let chart = null;
    onMounted(async () => {
      chart = init("chart");
      // const data = await financialMarket.getDigitalCurrency({
      //   func: "DIGITAL_CURRENCY_DAILY",
      //   symbol: "BTC",
      //   market: "CNY",
      // });
      // console.log(data);
      // debugger;

      chart.applyNewData(props.data);
      // chart.createIndicator("MA", true, { id: "candle_pane" });
      // initialize the chart
      // add data to the chart
    });

    onUnmounted(() => {
      dispose("chart");
    });

    watch(
      () => props.data,
      (newData) => {
        chart.applyNewData(newData);
      },
      {
        deep: true,
      }
    );

    watch(
      [() => props.mainIndicators],
      (newMainIndicators) => {
        console.log("newMainIndicators", newMainIndicators);
        const values = Object.values(newMainIndicators[0]);
        const newValues = values.reduce((accumulator, currentValue) => {
          if (!accumulator[currentValue?.name])
            accumulator[currentValue?.name] = {
              calcParams: [currentValue.value && +currentValue.value],
              ...currentValue,
            };
          else {
            if (currentValue.value)
              accumulator[currentValue.name].calcParams.push(
                +currentValue.value
              );
          }
          return accumulator;
        }, {});

        chart?.removeIndicator("candle_pane");
        Object.entries(newValues).forEach(([key, value]) =>
          chart?.createIndicator(
            { name: key, calcParams: value.calcParams },
            true,
            {
              id: "candle_pane",
              calcParams: [2],
            }
          )
        );
      },
      {
        deep: true,
        immediate: true,
      }
    );
    return {};
  },
};
</script>

<template>
  <div id="chart" style="height: 400px" />
</template>
