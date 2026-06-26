<template>
  <component :is="Layout">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <template #default>
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </template>
      </transition>
    </router-view>
  </component>
</template>
<script src="./router-view-wrapper.component.js" />
<style lang="scss" scoped src="./router-view-wrapper.component.scss" />
