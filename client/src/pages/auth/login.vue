<template>
  <div class="login q-pa-lg">
    <h3 class="text-center">login</h3>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        outlined
        v-model="formModel.username"
        label="username *"
        :rules="[
          (val) => (val && val.length > 0) || 'this field is required',
          (val) => isValidEmail(val) || 'Invalid email address!',
        ]"
      />

      <q-input
        outlined
        v-model="formModel.password"
        label="password *"
        :type="hidePassword ? 'password' : 'text'"
        :rules="[
          (val) => (val !== null && val !== '') || 'Please type your password',
          (val) =>
            val.length >= 8 ||
            'password should be contains at least 8 character',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="hidePassword ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="hidePassword = !hidePassword"
          />
        </template>
      </q-input>

      <p class="text-center text-weight-medium">
        dont have an account?
        <span class="sign-up-link text-primary" @click="gotoSignUp"
          >Signup</span
        >
      </p>

      <p class="text-center text-weight-medium">
        <span class="sign-up-link text-primary" @click="gotoForgetPassword"
          >forget your password?</span
        >
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
    const hidePassword = ref(true);
    const authStore = useAuthStore();
    const submitBtnLoading = ref(false);

    const formModel = reactive({ username: "", password: "" });
    const accept = ref(false);

    const gotoSignUp = () => {
      router.push({ name: "signUp" });
    };

    const gotoForgetPassword = () => {
      router.push({ name: "forgetPassword" });
    };

    const isValidEmail = (email) => {
      const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return regex.test(email);
    };

    return {
      formModel,
      accept,
      hidePassword,
      gotoSignUp,
      submitBtnLoading,
      isValidEmail,
      gotoForgetPassword,

      async onSubmit() {
        try {
          const { username, password } = formModel;
          submitBtnLoading.value = true;
          await authStore.login({ username, password });
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
          router.push({ name: "charts" });
        } catch (error) {
          console.error("login-error", error);
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
.login {
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
  .login {
    width: 60%;
    align-self: center;
  }
}

@media only screen and (min-width: 992px) {
  .login {
    width: 80%;
  }
}
</style>