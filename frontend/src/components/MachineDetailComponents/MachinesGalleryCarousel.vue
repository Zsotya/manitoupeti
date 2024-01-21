<template>
  <div
    class="page-container"
    :class="{ 'dark-mode': darkMode }"
    v-if="images.length > 0"
  >
    <div class="title-container">
      <div class="title">Nehézgép galéria</div>
    </div>
    <div class="gallery mySwiper">
      <Swiper
        :modules="[EffectFade, Pagination, Autoplay, Navigation]"
        :grabCursor="true"
        :navigation="true"
        :pagination="{
          clickable: true,
        }"
        effect="fade"
      >
        <SwiperSlide v-for="image in images">
          <img :src="'http://localhost:3000' + image.image_url" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";
import axios from "axios";

// Dark mode
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

const route = useRoute();
const machineId = route.params.id;
const images = ref([]);

// Képek lekérdezése
const fetchData = async () => {
  try {
    // Lekérdezés
    const response = await axios.get(
      `http://localhost:3000/api/machines/gallery/${machineId}`
    );
    images.value = response.data;
  } catch (error) {
    // Hibakezelés
    console.error("Hiba az adatok lekérdezése közben:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
@import "swiper/css";

.page-container {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #e8e6e6;
  transition: background-color 0.5s;
}

.title-container {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  transition: color 0.3s;
}

.swiper {
  display: flex;
  align-items: center;
  width: 750px;
  height: 750px;
  overflow: visible;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  border: 1px solid #444;
  border-radius: 20px;
  transition: border 0.5s;
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .swiper {
    width: 450px;
    height: 450px;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .swiper {
    width: 320px;
    height: 320px;
  }
}

/* Dark mode */
.page-container.dark-mode {
  background-color: #1a1a1a;
}

.page-container.dark-mode .title {
  color: #fff;
}
</style>
