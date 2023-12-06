<template>
  <div class="films" :class="{ 'dark-mode': darkMode }">
    <div
      class="film-card"
      @click="toggleDescription(film)"
      :class="{ flipped: film.isFlipped }"
    >
      <div class="film-front">
        <img :src="'http://localhost:3000' + film.image_url" alt="Film Image" />
        <h3>{{ film["title_" + $i18n.locale] }}</h3>
      </div>
      <div class="film-back">
        <h3>{{ film["title_" + $i18n.locale] }}</h3>
        <p>{{ film["description_" + $i18n.locale] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

// Adatok importálása
const { film } = defineProps(["film"]);

// Kártya "megfordítása"
const toggleDescription = () => {
  film.isFlipped = !film.isFlipped;
};

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);
</script>

<style scoped>
.films {
  padding: 20px 0px 20px 0px;
}

.film-card {
  display: flex;
  width: 440px;
  height: 420px;
  perspective: 1000px;
  cursor: pointer;
  margin: 0px 0px 40px 0px;
  transition: transform 0.3s;
  border-radius: 8px;
}

.film-card:hover {
  transform: scale(1.08);
  transition: transform 0.3s;
}

.film-front,
.film-back {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  color: black;
  background-color: #e7e5e5;
  transition: transform 1s, background-color 0.5s, color 0.5s, border 0.5s,
    box-shadow 0.7s;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.35);
}

.film-front {
  align-items: center;
  padding: 10px;
}

.film-front img {
  max-width: 100%;
  max-height: 100%;
  width: 510px;
  height: 326px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
}

.film-back {
  transform: rotateY(180deg);
  padding: 20px;
}

.film-card.flipped .film-front {
  transform: rotateY(-180deg);
}

.film-card.flipped .film-back {
  transform: rotateY(0deg);
}

.film-front h3 {
  position: relative;
  padding: 20px;
  transition: color 0.5s;
}

.film-back h3 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
  transition: color 0.5s;
}

.film-back p {
  font-size: 24px;
  line-height: 1.5;
  align-self: flex-start;
  padding-left: 20px;
  padding-top: 30px;
  transition: color 0.5s;
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  .film-card {
    margin: 15px 0;
    width: 340px;
    height: 320px;
  }

  .film-front img {
    max-width: 100%;
    max-height: 100%;
    width: 360px;
    height: 240px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 6.5px 8px 7px rgba(0, 0, 0, 0.75);
  }
}

/* Dark mode */
.films.dark-mode .film-front,
.films.dark-mode .film-back {
  background-color: #272727;
  border: 1px solid #444444;
  box-shadow: 0px 0px 24px rgba(255, 255, 255, 0.45);
}

.films.dark-mode .film-front h3,
.films.dark-mode .film-back h3,
.films.dark-mode .film-back p {
  color: white;
}

.films.dark-mode .film-card.flipped .film-back,
.films.dark-mode .film-card.flipped .film-front {
  background-color: rgb(32, 32, 32);
}
</style>
