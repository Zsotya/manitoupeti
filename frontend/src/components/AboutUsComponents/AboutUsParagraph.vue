<template>
  <div
    class="aboutus-section"
    :class="{ 'reverse-order': order === 0, 'dark-mode': darkMode }"
  >
    <div class="text-part">
      <div class="aboutus-title">
        {{ item["title_" + $i18n.locale] }}
      </div>
      <div class="aboutus-content">
        {{ item["content_" + $i18n.locale] }}
      </div>
    </div>
    <div class="image-container">
      <img :src="'http://localhost:3000' + item.image_url" alt="Image" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

// Adatok meghatározása
const { item, order } = defineProps(["item", "order"]);

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);
</script>

<style scoped>
.aboutus-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e8e6e6;
  padding: 0rem 7.2vw 4rem 7.2vw;
  transition: background-color 0.5s, color 0.5s;
}

.text-part {
  display: flex;
  flex-direction: column;
  align-self: center;
  flex-wrap: wrap;
}

.aboutus-title {
  display: flex;
  font-size: 1.875rem;
  max-width: 30ch;
  flex-wrap: wrap;
}

.aboutus-content {
  font-size: 1.1rem;
  line-height: 1.5;
  max-width: 60ch;
  width: 100%;
  padding: 0.625rem 0;
}

.image-container img {
  width: 45rem;
  height: 48rem;
  object-fit: cover;
}

.reverse-order {
  flex-direction: row-reverse;
}

.reverse-order .image-container img {
  margin-right: 3rem;
}

/* Közepes desktop nézet */
@media screen and (max-width: 1600px) {
  .image-container img {
    width: 40rem;
    height: 43rem;
  }
}

/* Kisebb desktop nézet */
@media screen and (max-width: 1440px) {
  .image-container img {
    width: 31rem;
    height: 34rem;
  }
}

/* Kicsi desktop nézet */
@media screen and (max-width: 1280px) {
  .image-container img {
    width: 25rem;
    height: 28rem;
  }
  .aboutus-content {
    font-size: 1rem;
  }

  .aboutus-title {
    font-size: 1.6rem;
  }
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  .text-part {
    padding-right: 10px;
  }
  .reverse-order .text-part {
    padding-right: 0px;
  }
  .aboutus-title {
    font-size: 1.5rem;
  }

  .aboutus-content {
    max-width: 50ch;
  }

  .image-container img {
    width: 24rem;
    height: 26rem;
  }
}

/* Tablet nézet, mobil nézet */
@media screen and (max-width: 768px) {
  .aboutus-section {
    flex-direction: column;
  }

  .text-part {
    text-align: center;
    padding-bottom: 1.5rem;
  }

  .aboutus-title {
    justify-content: center;
    max-width: 60ch;
  }

  .aboutus-content {
    max-width: 76ch;
  }

  .image-container {
    margin: 0 1rem 0 1rem;
  }

  .image-container img {
    max-height: 34rem;
    max-width: 32rem;
    height: 100%;
    width: 100%;
  }

  .reverse-order .image-container img {
    margin-right: 0;
  }
}
/* Külön mobilnézet nem szükséges */

/* Dark mode */
.aboutus-section.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>
