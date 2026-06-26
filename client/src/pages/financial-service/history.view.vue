<template>
  <q-page class="history-view">
    <q-card>
      <q-inner-loading :showing="false" class="inner-loading">
        <q-spinner-gears size="50px" color="primary" />
        <p>getting your last data ...</p>
      </q-inner-loading>
      <q-card-section class="history-header">
        <div class="history-details">
          <div class="text-h6">History</div>
          <div class="text-subtitle2">
            select , edit or delete your strategy.
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="history">
        <q-card
          class="strategy text-white"
          v-for="{ _id, name } in userAlgos"
          :key="_id"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">{{ name }}</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </q-card-section>

          <q-card-actions>
            <q-btn flat
              ><q-icon
                color="negative"
                @click="showModal = true"
                :name="matDelete"
            /></q-btn>
            <q-btn flat>
              <q-icon class="" :name="matEdit" @click="editAlgo(name)"
            /></q-btn>
          </q-card-actions>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>

  <q-dialog
    v-model="showModal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-negative text-h6">Delete</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Are you sure that you want to delete this item ?
      </q-card-section>

      <q-card-actions align="right" class="bg-white">
        <q-btn flat label="cancel" v-close-popup />
        <q-btn flat label="OK" class="text-negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { matDelete, matEdit } from "@quasar/extras/material-icons";
import { ref, onMounted } from "vue";
import { useFinancialMarket } from "src/stores";
import { useConcreteState } from "src/composables";
import { useRouter } from "vue-router";

export default {
  setup() {
    const showModal = ref(false);
    const router = useRouter();
    const financialMarket = useFinancialMarket();
    const userAlgos = useConcreteState(financialMarket, "userAlgos");

    const algoEdges = useConcreteState(financialMarket, "algo.edges");
    const algoName = useConcreteState(financialMarket, "algo.name");
    const algoNodes = useConcreteState(financialMarket, "algo.nodes");
    const algoMode = useConcreteState(financialMarket, "algoMode");
    const editAlgo = async (algorithmName) => {
      try {
        const { body } = await financialMarket.getAlgoByName(algorithmName);
        const { name, edges, nodes } = body;
        algoEdges.value = edges;
        algoName.value = name;
        algoNodes.value = nodes;
        algoMode.value = "edit";
        router.push({ name: "strategy" });
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(async () => {
      await financialMarket.getAllAlgos();
    });
    return { matDelete, matEdit, showModal, userAlgos, editAlgo };
  },
};
</script>

<style lang="scss" scoped>
.strategy {
  width: 250px;
}
.history {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

@media only screen and (max-width: 768px) {
  .strategy {
    width: 100%;
  }
}
.q-card {
  box-shadow: unset;
}
</style>