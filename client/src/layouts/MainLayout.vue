<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> CBMFS App </q-toolbar-title>

        <div>CBMFS v1.0.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer class="drawer" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> shahabs789@gmail.com </q-item-label>

        <q-separator />

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          :visible="link.visible"
        />
      </q-list>

      <q-item clickable class="log-out" @click="showLogOutModal = true">
        <q-item-section avatar>
          <q-icon :name="matLogout" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">log-out</q-item-label>
        </q-item-section>
      </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <q-dialog
    v-model="showLogOutModal"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-negative text-h6">logout</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Are you sure that you want to logout ?
      </q-card-section>

      <q-card-actions align="right" class="bg-white">
        <q-btn flat label="cancel" v-close-popup />
        <q-btn
          flat
          label="logout"
          class="text-negative"
          v-close-popup
          @click="logout"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>



<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { matLogout, matBarChart } from "@quasar/extras/material-icons";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores";
import { useConcreteState } from "src/composables";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const router = useRouter();
    const leftDrawerOpen = ref(false);
    const showLogOutModal = ref(false);
    const authStore = useAuthStore();
    const role = useConcreteState(authStore, "user.role").value;

    const logout = () => {
      sessionStorage.clear();
      router.push({ name: "login" });
    };

    const linksList = [
      {
        title: "Charts",
        caption: "Search among thousands of charts.",
        icon: matBarChart,
        link: "/charts",
        visible: true,
      },
      {
        title: "Strategy",
        caption: "build your own strategy.",
        icon: "code",
        link: "/strategy",
        visible: true,
      },
      {
        title: "History",
        caption: "history of your strategies.",
        icon: "history",
        link: "/history",
        visible: true,
      },
      {
        title: "Profile",
        caption: "your profile details.",
        icon: "person",
        link: "/profile",
        visible: true,
      },
      {
        title: "Statistics",
        caption: "observe users and their strategies.",
        icon: "analytics",
        link: "/statistics",
        visible: role === "admin",
      },
    ];

    return {
      matLogout,
      essentialLinks: linksList,
      leftDrawerOpen,
      showLogOutModal,
      logout,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style>
.drawer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.log-out {
  color: red;
}
</style>
