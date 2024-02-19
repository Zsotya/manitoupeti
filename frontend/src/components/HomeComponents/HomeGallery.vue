<template>
  <div class="gallery-carousel" :class="{ 'dark-mode': darkMode }">
    <div class="carousel">
      <Swiper
        :modules="[EffectCoverflow, Pagination, Autoplay]"
        :grabCursor="true"
        :pagination="true"
        :lazy="true"
        effect="coverflow"
        :coverflow-effect="{
          stretch: 30,
          depth: 120,
          slideShadows: true,
        }"
        :autoplay="{
          delay: 3500,
          disableOnInteraction: false,
        }"
      >
        <SwiperSlide v-for="image in images">
          <img :src="image" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useStore } from "vuex";
import { computed } from "vue";
import "swiper/css";
import "swiper/css/pagination";

// Dark mode
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

const images = [
  require("@/assets/94a.jpg"),
  require("@/assets/99q8.jpg"),
  require("@/assets/99r9c.jpg"),
  require("@/assets/99r9g.jpg"),
  require("@/assets/File00003.jpeg"),
  require("@/assets/File00007.jpeg"),
  require("@/assets/File00015.jpeg"),
  require("@/assets/File00019.jpeg"),
  require("@/assets/merlo30.jpg"),
];
</script>

<style scoped>
@import "@/swiper.css";
.gallery-carousel {
  padding-top: 60px;
  padding-bottom: 60px;
  background-color: #e8e6e6;
  height: 100%;
  overflow: hidden;
  transition: background-color 0.5s;
}

.swiper {
  display: flex;
  align-items: center;
  width: 550px;
  height: 550px;
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

.swiper-button-next {
  background-color: red;
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
.gallery-carousel.dark-mode {
  background-color: #1a1a1a;
}

.gallery-carousel.dark-mode .swiper-slide img {
  border: 1px solid white;
}
</style>
