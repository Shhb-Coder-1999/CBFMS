<template>
  <q-page class="users-view">
    <q-card>
      <q-inner-loading :showing="false" class="inner-loading">
        <q-spinner-gears size="50px" color="primary" />
        <p>getting your last data ...</p>
      </q-inner-loading>
      <q-card-section class="statistics-header">
        <div class="statistics-details">
          <div class="text-h6">users</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="users">
        <q-card
          v-for="user in users"
          :key="user._id"
          class="user-card text-white"
          style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
        >
          <q-card-section>
            <div class="text-h6">{{ user.username }}</div>
            <div class="text-subtitle2">role : {{ user.role }}</div>
          </q-card-section>

          <q-card-actions>
            <q-btn flat
              ><q-icon
                color="negative"
                @click="
                  showModal = true;
                  selectedUserName = user.username;
                "
                :name="matDelete"
            /></q-btn>
            <!-- <q-btn flat>
              <q-icon class="" :name="matEdit" @click="editAlgo(name)"
            /></q-btn> -->
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
        <q-btn
          flat
          label="OK"
          class="text-negative"
          @click="removeUser()"
          :loading="removeUserLoading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
      
      <script>
import { useAuthStore } from "src/stores";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { matDelete, matEdit } from "@quasar/extras/material-icons";
import { useConcreteState } from "src/composables";

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const selectedUserName = ref("");
    const users = useConcreteState(authStore, "users");
    const removeUserLoading = ref(false);
    const showModal = ref(false);
    const redirect = (routeName) => {
      router.push({ name: routeName });
    };

    const removeUser = async () => {
      try {
        removeUserLoading.value = true;
        await authStore.removeUser(selectedUserName.value);
      } catch (error) {
        console.error(error);
      } finally {
        removeUserLoading.value = false;
        showModal.value = false;
        selectedUserName.value = "";
      }
    };

    onMounted(async () => {
      try {
        const allUsers = await authStore.getAllUsers();
        users.value = allUsers.filter((user) => user.role != "admin");
      } catch (error) {
        console.error(error);
      }
    });
    return {
      redirect,
      removeUser,
      users,
      matDelete,
      matEdit,
      showModal,
      selectedUserName,
      removeUserLoading,
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