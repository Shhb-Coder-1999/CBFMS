<script setup>
import { Panel, VueFlow, useVueFlow } from "@vue-flow/core";
import { Background, BackgroundVariant } from "@vue-flow/background";
import { MiniMap } from "@vue-flow/minimap";
import { ref, reactive, watch, onUnmounted } from "vue";
import { useQuasar } from "quasar";
import { digitalCurrency, digitalCurrencyMarket, tickers } from "src/constants";
import { useFinancialMarket } from "src/stores";
import { useConcreteState } from "src/composables";

const financialMarket = useFinancialMarket();
let algoEdges = useConcreteState(financialMarket, "algo.edges");
const algoName = useConcreteState(financialMarket, "algo.name");
const algoNodes = useConcreteState(financialMarket, "algo.nodes");
const algoMode = useConcreteState(financialMarket, "algoMode");

const item = useVueFlow({
  nodes: algoNodes.value,
  edges: algoEdges.value,
});
const {
  nodes,
  edges,
  addNodes,
  addEdges,
  onConnect,
  dimensions,
  onNodeClick,
  onEdgeClick,
  removeNodes,
  removeEdges,
  getEdges,
} = item;

console.log(item);

financialMarket.algo.nodes = nodes;
financialMarket.algo.edges = edges;

const $q = useQuasar();
const selectedNode = ref(null);
const selectedEdge = ref(null);
const operatorOptions = [">", "<", "="];
const conditionsOptions = ["if", "else"];
const operandOptions = ["CCI", "MA", "Number", "EMA", "BBI"];
const condition = ref("if");

onConnect((params) => addEdges(params));

onNodeClick((event) => {
  selectedNode.value = event?.node;
});

onEdgeClick((event) => {
  selectedEdge.value = event?.edge;
});

onUnmounted(() => {
  algoMode.value = "create";
  algoName.value = "";
  algoEdges.value = [];
  algoNodes.value = [
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
  ];
  algoName.value = "";
});
// algoNodes.value = [
//   {
//     id: "start",
//     type: "input",
//     label: "start",
//     position: { x: 780, y: 25 },
//     value: {},
//   },
//   {
//     id: "end",
//     type: "output",
//     label: "end",
//     position: { x: 790, y: 300 },
//     value: {},
//   },
// ];

const removeSelectedNode = () => {
  if (selectedNode.value?.id != "start" || selectedNode.value?.id != "end") {
    algoNodes.value = algoNodes.value.filter(
      (node) => node.id != selectedNode.value?.id
    );
    removeNodes(selectedNode.value?.id);
  }
  edges.value = getEdges.value;
};
const removeSelectedEdge = () => {
  removeEdges(selectedEdge.value?.id);
};

const initConfig = {
  firstOperand: {
    name: "",
    value: "",
    candle: "",
  },
  operator: "",
  secondOperand: {
    name: "",
    value: "",
    candle: "",
  },
};

const nodeModel = ref({ ...initConfig });
const step = ref(1);
const stepper = ref("stepper");
const flowchartForm = ref(null);

const onSubmit = async () => {
  const nodeId = Date.now().toString();
  const label = `${nodeModel.value.firstOperand.name} ${
    nodeModel.value.firstOperand.value
  } ${
    nodeModel.value.firstOperand.candle &&
    "in candle" + nodeModel.value.firstOperand.candle
  } ${nodeModel.value.operator} ${nodeModel.value.secondOperand.name} ${
    nodeModel.value.secondOperand.value
  } ${
    nodeModel.value.secondOperand.candle &&
    "in candle" + nodeModel.value.secondOperand.candle
  } `;

  const newNode = {
    id: nodeId,
    label: label,
    position: {
      x: 810,
      y: Math.random() * dimensions.value.height,
    },
    data: nodeModel.value,
  };
  // algoNodes.value.push(newNode);
  addNodes([newNode]);
  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    message: "Submitted",
  });
  nodeModel.value = {
    firstOperand: {
      name: "",
      value: "",
      candle: "",
    },
    operator: "",
    secondOperand: {
      name: "",
      value: "",
      candle: "",
    },
  };
  console.log(nodeModel.value);
};

const onEdgeSubmit = async () => {
  edges.value.forEach((edge) => {
    if (edge.id === selectedEdge.value.id) edge.label = condition.value;
  });

  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    message: "Submitted",
  });
};

const formModel = reactive({
  symbol: null,
  timespan: null,
  strategyName: "",
});
const timespan = ["second", "minute", "hour", "day", "week", "month", "year"];
const tickersOptions = ref(tickers);
const filterSymbol = (val, update) => {
  update(() => {
    const needle = val.toLowerCase();
    tickersOptions.value = tickers.filter((option) => {
      return (
        option.label.toLowerCase().indexOf(needle) > -1 ||
        option.value.toLowerCase().indexOf(needle) > -1
      );
    });
  });
};

const goNextStep = async () => {
  // flowchartForm.value.validate().then(async (success) => {
  // if (success) {
  // await financialMarket.getAllAlgos();
  // await financialMarket.removeAlgo("12345");
  console.log(step.value);
  if (step.value === 1) {
    if (algoMode.value === "edit") {
      await financialMarket.editAlgo({
        name: algoName.value,
        nodes: nodes.value,
        edges: edges.value,
      });
    }
    if (algoMode.value === "create") {
      await financialMarket.createAlgo({
        name: algoName.value,
        nodes: nodes.value,
        edges: edges.value,
      });
    }
  }
  stepper.value.next();
  // yay, models are correct
  // } else {
  //   // oh no, user has filled in
  //   // at least one invalid value
  // }
};
</script>

<style lang="scss">
.flowchart {
  width: 100%;
}
.panel {
  width: 55%;
}
.taskbar {
  width: 100%;
  height: 420px;
}
.node {
  background: white;
  width: 100%;
  display: flex;
  border: 1px #0041d0 solid;
  flex-direction: row;
  align-items: center;
  color: black;
  padding-left: 15px;
  border-radius: 12px;
}
.node-text {
  width: 10%;
  text-align: start;
}
.node-input {
  width: 15%;
}
.node-operator {
  padding: 10px;
  width: 38%;
}
.q-field--error .q-field__bottom {
  display: none;
}
.q-field--with-bottom {
  padding-bottom: 0px;
}
.card-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.actions {
  display: flex;
  gap: 10px;
  width: 100%;
}
.form {
  width: 100%;
}
.edges {
  width: 100%;
}

.q-panel-parent,
.q-stepper__step-inner {
  width: 100%;
  height: 90%;
}
.q-stepper {
  box-shadow: unset;
}
.q-stepper--horizontal .q-stepper__step-inner {
  padding: 0;
}

.q-stepper__step-content {
  height: 100%;
}
.stepper {
  height: 80.5vh;
}
.q-stepper--horizontal > .q-stepper__nav {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  padding: 15px 24px;
  display: flex;
  justify-content: end;
}
.flowchart-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  width: 50%;
  padding: 20px;
}
.node-candle {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>

<template>
  <q-page class="flowchart">
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      header-nav
      class="stepper"
    >
      <q-step :name="0" title="set strategy chart" icon="code" class="step">
        <q-form ref="flowchartForm" @submit="onSubmit" class="flowchart-form">
          <p>please enter your init data of your strategy:</p>
          <q-input
            outlined
            v-model="algoName"
            label="Name"
            :rules="[(val) => val && val.length > 0]"
          />
        </q-form>
      </q-step>

      <q-step :name="1" title="build strategy" icon="code" class="step">
        <VueFlow>
          <MiniMap />

          <Background :variant="BackgroundVariant.Lines" />

          <Panel class="panel" position="top-left">
            <q-card dark bordered class="bg-grey-4 my-card taskbar">
              <q-card-section>
                <div class="text-h4 text-grey-10">Strategy</div>
              </q-card-section>

              <q-separator inset />

              <q-card-section class="card-section">
                <div class="text-h6 text-grey-10">Node Options</div>
                <q-form id="form" @submit="onSubmit" class="form node">
                  <q-select
                    outlined
                    dense
                    v-model="nodeModel.firstOperand.name"
                    :options="operandOptions"
                    label="Operand"
                    class="node-operator"
                  />
                  <span class="node-text">=</span>
                  <q-input
                    mask="###"
                    dense
                    label="value"
                    v-model="nodeModel.firstOperand.value"
                    class="node-input"
                    borderless
                    :rules="[
                      (val) => (val && Object.keys(val).length > 0) || '',
                    ]"
                  />

                  <span
                    v-if="nodeModel.firstOperand.name != 'Number'"
                    class="node-candle"
                  >
                    <span class="node-text">in</span>
                    <q-input
                      mask="###"
                      dense
                      label="candle"
                      v-model="nodeModel.firstOperand.candle"
                      borderless
                      :rules="[
                        (val) => (val && Object.keys(val).length > 0) || '',
                      ]"
                    />
                  </span>
                  <q-select
                    outlined
                    dense
                    v-model="nodeModel.operator"
                    :options="operatorOptions"
                    label="operator"
                    class="node-operator"
                  />
                  <q-select
                    outlined
                    dense
                    v-model="nodeModel.secondOperand.name"
                    :options="operandOptions"
                    label="Operand"
                    class="node-operator"
                  />
                  <span class="node-text">=</span>
                  <q-input
                    mask="###"
                    label="value"
                    class="node-input"
                    dense
                    v-model="nodeModel.secondOperand.value"
                    borderless
                    :rules="[
                      (val) => (val && Object.keys(val).length > 0) || '',
                    ]"
                  />
                  <span
                    v-if="nodeModel.secondOperand.name != 'Number'"
                    class="node-candle"
                  >
                    <span class="node-text">in</span>
                    <q-input
                      mask="###"
                      dense
                      label="candle"
                      v-model="nodeModel.secondOperand.candle"
                      borderless
                      :rules="[
                        (val) => (val && Object.keys(val).length > 0) || '',
                      ]"
                    />
                  </span>
                </q-form>
                <div class="actions">
                  <q-btn
                    label="add Node"
                    type="submit"
                    color="primary"
                    class="submit-btn"
                    form="form"
                  />
                  <q-btn
                    @click="removeSelectedNode"
                    label="Remove selected Node"
                    color="red"
                    form="form"
                  />
                </div>
              </q-card-section>
              <q-separator inset />
              <q-card-section class="card-section">
                <div class="text-h6 text-grey-10">Edge Options</div>

                <q-form id="form2" @submit="onEdgeSubmit" class="form edges">
                  <q-select
                    outlined
                    dense
                    v-model="condition"
                    :options="conditionsOptions"
                    label="condition"
                    class="node-condition"
                  />
                  <div class="actions q-mt-sm">
                    <q-btn
                      label="Update selected edge"
                      type="submit"
                      color="primary"
                      class="submit-btn"
                      form="form2"
                    />
                    <q-btn
                      @click="removeSelectedEdge"
                      label="Remove selected edge"
                      color="red"
                      form="form"
                    />
                  </div>
                </q-form>
              </q-card-section>

              <!-- <q-separator inset /> -->

              <!-- <q-card-section class="card-section">
                <q-btn @click="removeSelectedNode" label="save" color="green" />
              </q-card-section> -->
            </q-card>
            <div class="taskbar"></div>
          </Panel>
        </VueFlow>
      </q-step>
      <q-separator />
      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn
            v-if="step > 0"
            flat
            color="primary"
            @click="$refs.stepper.previous()"
            label="Back"
            class="q-ml-sm"
          />
          <q-btn
            @click="goNextStep"
            color="primary"
            type="submit"
            :label="
              step === 1
                ? algoMode === 'create'
                  ? 'Save'
                  : 'edit'
                : 'Continue'
            "
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>



