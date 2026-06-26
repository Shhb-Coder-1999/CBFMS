<template>
  <q-page class="statistics-view">
    <q-card>
      <q-inner-loading :showing="false" class="inner-loading">
        <q-spinner-gears size="50px" color="primary" />
        <p>getting your last data ...</p>
      </q-inner-loading>
      <q-card-section class="statistics-header">
        <div class="statistics-details">
          <div class="text-h6">Statistics</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="statistics">
        <q-card
          class="statistics-item bg-indigo-5"
          v-for="item in items"
          :key="item.title"
          @click="redirect(item.disRouteName)"
        >
          <q-card-section>
            <div class="text-h6 text-white">{{ item.title }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="text-subtitle2 text-white">{{ item.subtitle }}</div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-page>
</template>
    
    <script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const redirect = (routeName) => {
      router.push({ name: routeName });
    };

    const items = [
      {
        title: "Users",
        subtitle: "View all system users",
        disRouteName: "statisticsUsers",
      },
      {
        title: "Strategies",
        subtitle:
          "Track the history of algorithm creation requests, view all existing algorithms within the system, and manage running algorithms by deleting or observing them.",
        disRouteName: "statisticsAlgorithms",
      },
    ];
    return { items, redirect };
  },
};
</script>
    
    <style lang="scss" scoped>
.q-card {
  box-shadow: unset;
}
.statistics-details {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.statistics {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.statistics-item {
  width: 50%;
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .statistics-item {
    width: 100%;
  }
}
</style>