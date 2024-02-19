<template>
  <section>
    <GalleryIntro />
  </section>
  <section class="gallery-wrap" :class="{ 'dark-mode': darkMode }">
    <Transition name="initialFade" appear v-if="show">
      <div class="gallery-component">
        <GalleryComponent />
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import GalleryIntro from "../../components/GalleryComponents/GalleryIntro.vue";
import GalleryComponent from "@/components/GalleryComponents/GalleryComponent.vue";
import { useStore } from "vuex";

// Adatok fetchelése, inicializálás
const show = ref(false);

// Dark mode
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

onMounted(() => {
  setInterval(() => {
    show.value = true;
  }, 500);
});
</script>

<style scoped>
.gallery-wrap {
  min-height: 60vh;
  background-color: #e8e6e6;
  transition: background-color 0.5s;
}

/* Animációk */
/* Animáció */
.initialFade-enter-active {
  transition: all 2s;
}

.initialFade-enter-from {
  opacity: 0;
}

.initialFade-enter-to {
  opacity: 1;
}

/* Dark mode */
.gallery-wrap.dark-mode {
  background-color: #1a1a1a;
}
</style>
