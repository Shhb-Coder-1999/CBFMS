<template>
  <q-page class="users-view">
    <q-card>
      <q-inner-loading :showing="false" class="inner-loading">
        <q-spinner-gears size="50px" color="primary" />
        <p>getting your last data ...</p>
      </q-inner-loading>
      <q-card-section class="statistics-header">
        <div class="statistics-details">
          <div class="text-h6">strategies</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="users">
        <q-card
          v-for="algo in allAlgos"
          :key="algo._id"
          class="user-card text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">{{ algo.name }}</div>
            <div class="text-subtitle2">created by : {{ algo.username }}</div>
          </q-card-section>

          <q-card-actions>
            <!-- <q-btn flat
              ><q-icon
                color="negative"
                @click="
                  showModal = true;
                  selectedUserName = user.username;
                "
                :name="matDelete"
            /></q-btn> -->
            <!-- <q-btn flat>
                <q-icon class="" :name="matEdit" @click="editAlgo(name)"
              /></q-btn> -->
          </q-card-actions>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>
        
        <script>
import { useAuthStore } from "src/stores";
import { onMounted, ref } from "vue";
import { matDelete, matEdit } from "@quasar/extras/material-icons";
import { useConcreteState } from "src/composables";

export default {
  setup() {
    const authStore = useAuthStore();
    const allAlgos = useConcreteState(authStore, "allAlgos");

    onMounted(async () => {
      try {
        await authStore.getAllAlgos();
      } catch (error) {
        console.error(error);
      }
    });
    return {
      allAlgos,
      matDelete,
      matEdit,
    };
  },
};
</script>
        
        <style lang="scss" scoped>
.user-card {
  width: 250px;
}
.users {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

@media only screen and (max-width: 768px) {
  .user-card {
    width: 100%;
  }
}
.q-card {
  box-shadow: unset;
}
</style>