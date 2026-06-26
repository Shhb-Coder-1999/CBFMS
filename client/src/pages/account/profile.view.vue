<template>
  <q-page class="profile-view">
    <q-card>
      <q-inner-loading :showing="false" class="inner-loading">
        <q-spinner-gears size="50px" color="primary" />
        <p>getting your last data ...</p>
      </q-inner-loading>
      <q-card-section class="profile-header">
        <div class="profile-details">
          <q-icon name="person" size="6rem" />
          <div class="text-h6">Profile</div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="profile"> </q-card-section>
    </q-card>
  </q-page>
</template>
  
  <script>
export default {
  setup() {
    return {};
  },
};
</script>
  
  <style lang="scss" scoped>
.q-card {
  box-shadow: unset;
}
.profile-details {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>