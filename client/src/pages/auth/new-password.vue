<template>
  <div class="sign-up q-pa-lg">
    <h3 class="text-center">sign-up</h3>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        outlined
        v-model="formModel.tmpPassword"
        label="temp password *"
        lazy-rules
        :type="hideReEnterPassword ? 'password' : 'text'"
        :rules="[
          (val) =>
            val.length > 4 ||
            'password should be contains at least 4 character',
          ,
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="hideReEnterPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="hideReEnterPassword = !hideReEnterPassword"
          />
        </template>
      </q-input>

      <q-input
        outlined
        v-model="formModel.newPassword"
        label="new password *"
        lazy-rules
        :type="hideReEnterNewPassword ? 'password' : 'text'"
        :rules="[
          (val) =>
            val.length >= 8 ||
            'password should be contains at least 8 character',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="hideReEnterNewPassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="hideReEnterNewPassword = !hideReEnterNewPassword"
          />
        </template>
      </q-input>

      <p class="text-center text-weight-medium">
        already have an account?
        <span class="sign-up-link text-primary" @click="gotoLogin">login</span>
      </p>

      <q-separator />
      <div>
        <q-btn
          :loading="submitBtnLoading"
          label="Submit"
          type="submit"
          color="primary"
          size="md"
          class="submit-btn q-pa-sm"
        />
      </div>
    </q-form>
  </div>
</template>
    
    <script>
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores";

export default {
  setup() {
    const router = useRouter();
    const $q = useQuasar();

    const accept = ref(false);
    const hidePassword = ref(true);
    const hideReEnterPassword = ref(true);
    const hideReEnterNewPassword = ref(true);
    const authStore = useAuthStore();
    const submitBtnLoading = ref(false);

    const formModel = reactive({
      newPassword: "",
      tmpPassword: "",
    });

    const isValidEmail = (email) => {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return regex.test(email);
    };

    const gotoLogin = () => {
      router.push({ name: "login" });
    };

    return {
      formModel,
      accept,
      hideReEnterPassword,
      hidePassword,
      submitBtnLoading,
      hideReEnterNewPassword,
      gotoLogin,
      isValidEmail,

      async onSubmit() {
        try {
          const { tmpPassword, newPassword } = formModel;
          submitBtnLoading.value = true;
          await authStore.resetPassword(newPassword, tmpPassword);
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "success",
          });
          router.push({ name: "login" });
        } catch (error) {
          console.error("signup-error", error);
        } finally {
          submitBtnLoading.value = false;
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
    };
  },
};
</script>
  
  <style lang="scss" scoped>
.sign-up {
  background: white;
  border-radius: 10px;
}

.submit-btn {
  width: 100%;
}

.sign-up-link {
  all: unset;
  cursor: pointer;
}

@media only screen and (min-width: 768px) {
  .sign-up {
    width: 60%;
    align-self: center;
  }
}

@media only screen and (min-width: 992px) {
  .sign-up {
    width: 100%;
  }
}
</style>