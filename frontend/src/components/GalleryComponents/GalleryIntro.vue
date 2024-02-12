<template>
  <div class="page-format" :class="{ 'dark-mode': darkMode }">
    <Transition name="textFade" appear v-if="show">
      <div class="text-wrap">
        <div class="text-intro">
          <div class="small-title">{{ $t("gallerySmallTitle") }}</div>
          <div class="big-text">
            {{ $t("galleryBigText") }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

/* Animáció */
const show = ref(false);
onMounted(() => {
  show.value = true;
});
</script>

<style scoped>
.page-format {
  background-color: #e8e6e6;
  color: black;
  transition: background-color 0.5s, color 0.5s;
}

.text-wrap {
  display: flex;
  justify-content: flex-start;
  padding: 180px 0px 0px 30px;
  margin-left: 80px;
  margin-right: 20px;
}

.text-intro {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  flex-wrap: wrap;
}

.small-title {
  font-size: 22px;
  margin-bottom: 2px;
  padding-left: 6px;
  flex-wrap: wrap;
}

.big-text {
  font-size: 63px;
  margin-bottom: 4px;
  font-weight: bolder;
  color: #e07076;
  width: 100%;
  flex-wrap: wrap;
}

/* Animációk */
.textFade-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.textFade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.textFade-enter-active {
  transition: all 1.5s;
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  .text-wrap {
    margin-left: 60px;
    padding-top: 160px;
  }

  .small-title {
    font-size: 20px;
    padding-left: 4px;
  }

  .big-text {
    font-size: 46px;
  }
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .text-wrap {
    margin: 0;
    padding-top: 150px;
    padding-left: 0px;
    width: 100%;
    /* margin: 0px 40px 0px 40px; */
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .text-intro {
    margin: 0;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
    margin: 0px 20px 0px 20px;
  }
  .small-title {
    font-size: 20px;
  }
  .big-text {
    font-size: 40px;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .small-title {
    font-size: 20px;
  }
  .big-text {
    font-size: 32px;
  }
}

/* Dark mode */
.page-format.dark-mode {
  background-color: #1a1a1a;
  color: white;
}
</style>
