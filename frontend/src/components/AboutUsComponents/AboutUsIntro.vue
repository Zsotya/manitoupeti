<template>
  <div class="about-us-intro" :class="{ 'dark-mode': darkMode }">
    <div class="text-part">
      <div class="title">
        {{ $t("aboutUsTitle") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);
</script>

<style scoped>
.about-us-intro {
  display: flex;
  background-color: #e8e6e6;
  justify-content: center;
  padding: 220px 0px 60px 0px;
  transition: background-color 0.5s;
}

.title {
  margin: 0 36px 0 36px;
  font-size: 44px;
  color: #e07076;
  font-weight: bolder;
  text-align: center;
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  .title {
    font-size: 36px;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .title {
    font-size: 32px;
  }
}

/* Dark mode */
.about-us-intro.dark-mode {
  background-color: #1a1a1a;
}
</style>
