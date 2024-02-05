<template>
  <div
    class="page-container"
    :class="{ 'dark-mode': darkMode }"
    v-if="images.length > 0"
  >
    <div class="title-container">
      <div class="title">Nehézgép galéria</div>
    </div>
    <div class="gallery-container">
      <Swiper
        class="main-swiper"
        :modules="[Pagination, Navigation]"
        :thumbs="{ swiper: thumbsSwiper }"
        :navigation="true"
        :pagination="{
          clickable: true,
        }"
        :slidesPerView="1"
        :spaceBetween="10"
        :loop="true"
        :watchSlidesProgress="true"
      >
        <SwiperSlide v-for="image in images" :key="image.id">
          <img
            class="main-image"
            :src="'http://localhost:3000' + image.image_url"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      <Swiper
        v-if="isWideViewport"
        @swiper="setThumbsSwiper"
        class="thumbnail-swiper"
        direction="vertical"
        :modules="[FreeMode, Navigation, Pagination, Thumbs, Mousewheel]"
        :freeMode="true"
        :slidesPerView="5"
        :spaceBetween="10"
        :mousewheel="true"
        :loop="true"
        :watchSlidesProgress="true"
      >
        <SwiperSlide v-for="image in images" :key="image.id">
          <img
            class="thumbnail-image"
            :src="'http://localhost:3000' + image.image_url"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import SwiperCore from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Pagination,
  Navigation,
  Thumbs,
  FreeMode,
  Mousewheel,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

SwiperCore.use([Thumbs]);

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

const isWideViewport = ref(window.innerWidth > 768);

const handleResize = () => {
  isWideViewport.value = window.innerWidth > 768;
};

onMounted(() => {
  fetchData();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
</script>

<style scoped>
@import "@/swiper.css";
.page-container {
  padding: 20px;
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

.gallery-container {
  display: flex;
}

.main-swiper {
  max-width: 50%;
  height: 80vh;
  overflow: hidden;
  margin-right: 30px;
}

.thumbnail-swiper {
  height: 80vh;
  width: 180px;
  margin-left: 30px;
}

.thumbnail-swiper .swiper-slide {
  opacity: 0.7;
  transition: opacity 0.3s;
}

.thumbnail-swiper .swiper-slide-thumb-active {
  opacity: 1;
}

.thumbnail-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  border: 2px solid transparent;
  border-radius: 10px;
  transition: all 0.3s;
  cursor: pointer;
}

.thumbnail-image:hover {
  border-color: #fff;
  transition: all 0.3s;
}

.swiper-slide img {
  width: 99.9%;
  height: 100%;
  object-fit: contain;
  border: 1px solid #444;
  border-radius: 20px;
  transition: border 0.5s;
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .gallery-container {
    flex-direction: column;
    align-items: center;
  }

  .main-swiper {
    margin: 0;
    max-width: 89%;
  }
}

/* Mobilnézet */
@media screen and (max-width: 496px) {
  .swiper {
    height: 50vh;
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
