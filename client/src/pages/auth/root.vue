<template>
  <router-view />
</template>

<script>
export default {
  setup() {
    sessionStorage.clear()
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>