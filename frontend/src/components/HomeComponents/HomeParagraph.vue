<template>
  <div class="paragraph" :class="{ 'dark-mode': darkMode }">
    <div class="paragraph-section" :class="{ 'reverse-order': order === 0 }">
      <div class="text-side">
        <h1>{{ paragraph["title_" + $i18n.locale] }}</h1>
        <p>{{ paragraph["content_" + $i18n.locale] }}</p>
      </div>
      <div class="image-side">
        <img :src="'http://localhost:3000' + paragraph.image_url" alt="Image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

// Adatok meghatározása
const { paragraph, order } = defineProps(["paragraph", "order"]);

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);
</script>

<style scoped>
.paragraph-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e8e6e6;
  padding: 0rem 7.2vw 4rem 7.2vw;
  transition: background-color 0.5s, color 0.5s;
}

.text-side {
  display: flex;
  flex-direction: column;
  align-self: center;
  flex-wrap: wrap;
}

.text-side h1 {
  display: flex;
  font-size: 1.875rem;
  max-width: 30ch;
  flex-wrap: wrap;
}

.text-side p {
  font-size: 1.1rem;
  line-height: 1.5;
  max-width: 60ch;
  width: 100%;
  padding: 0.625rem 0;
}

.image-side img {
  width: 45rem;
  height: 48rem;
  object-fit: cover;
}

.reverse-order {
  flex-direction: row-reverse;
}

.reverse-order .image-side img {
  margin-right: 3rem;
}

/* Közepes desktop nézet */
@media screen and (max-width: 1600px) {
  .image-side img {
    width: 40rem;
    height: 43rem;
  }
}

/* Kisebb desktop nézet */
@media screen and (max-width: 1440px) {
  .image-side img {
    width: 31rem;
    height: 34rem;
  }
}

/* Kicsi desktop nézet */
@media screen and (max-width: 1280px) {
  .image-side img {
    width: 25rem;
    height: 28rem;
  }
  .text-side p {
    font-size: 1rem;
  }

  .text-side h1 {
    font-size: 1.6rem;
  }
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  .text-side {
    padding-right: 10px;
  }
  .reverse-order .text-side {
    padding-right: 0px;
  }
  .text-side h1 {
    font-size: 1.5rem;
  }

  .text-side p {
    max-width: 50ch;
  }

  .image-side img {
    width: 24rem;
    height: 26rem;
  }
}

/* Tablet nézet, mobil nézet */
@media screen and (max-width: 768px) {
  .paragraph-section {
    flex-direction: column;
  }

  .text-side {
    text-align: center;
    padding-bottom: 1.5rem;
  }

  .text-side h1 {
    justify-content: center;
    max-width: 60ch;
  }

  .text-side p {
    max-width: 76ch;
  }

  .image-side {
    margin: 0 1rem 0 1rem;
  }

  .image-side img {
    max-height: 34rem;
    max-width: 32rem;
    height: 100%;
    width: 100%;
  }

  .reverse-order .image-side img {
    margin-right: 0;
  }
}
/* Külön mobilnézet nem szükséges */

/* Dark mode */
.paragraph.dark-mode .paragraph-section {
  background-color: #1a1a1a;
  color: #ffffff;
}
</style>
