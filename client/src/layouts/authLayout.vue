<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="auth-layout row">
      <div class="col-12 col-md-4 view">
        <router-view />
      </div>
      <div class="image col-0 col-md-8"></div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>


<style lang="scss" scoped>
.auth-layout {
  height: 100vh;
}

.image {
  background-image: url("src/assets/images/pexels-rdne-stock-project-7947959.jpg"); /* The image used */
  height: 100%; /* You must set a specified height */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}

.view {
  background: black;
  padding: 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media only screen and (max-width: 992px) {
  .view {
    background-image: url("src/assets/images/pexels-tima-miroshnichenko-7567441.jpg"); /* The image used */
    height: 100%; /* You must set a specified height */
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
  }
}
</style>
  