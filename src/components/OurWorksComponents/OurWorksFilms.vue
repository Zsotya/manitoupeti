<template>
  <main class="page-format">
    <div class="text-wrap">
      <div class="text-intro">
        <div class="small-title">Filmjeink</div>
        <div class="big-text">
          Fontosabb filmek, melyeket szakértelmünkkel támogattunk
        </div>
        <div class="small-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, fugiat
          quia ut dolores, ex delectus dolor vero, vel suscipit iste iure ea
          expedita error aliquid? Veniam vel numquam corporis aliquam.
        </div>
      </div>
    </div>
    <div class="films">
      <div class="film-cards">
        <div
          v-for="film in films"
          :key="film.id"
          class="film-card"
          @click="toggleDescription(film)"
          :class="{ flipped: film.isFlipped }"
        >
          <div class="film-front">
            <img :src="film.imageSrc" alt="Film Image" />
            <h3>{{ film.title }}</h3>
          </div>
          <div class="film-back">
            <h3>{{ film.title }}</h3>
            <p>{{ film.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  filmsData: Array,
});

const films = ref(
  props.filmsData.map((filmData, index) => ({
    ...filmData,
    id: index + 1,
    isFlipped: false,
  }))
);

const toggleDescription = (film) => {
  film.isFlipped = !film.isFlipped;
};
</script>

<style scoped>
.page-format {
  background-color: #e8e6e6;
}

.text-wrap {
  display: flex;
  justify-content: center;
  padding: 200px 0px 0px 0px;
}

.text-intro {
  display: flex;
  flex-direction: column;
}

.small-title {
  font-size: 22px;
  margin-bottom: 2px;
  padding-left: 12px;
}

.big-text {
  font-size: 63px;
  margin-bottom: 4px;
  font-weight: bolder;
  color: #e07076;
  width: 100%;
}

.small-text {
  font-size: 18px;
  width: 100%;
}

.films {
  padding: 20px 0px 20px 0px;
  text-align: center;
}

.film-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 20px;
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
  transition: transform 1s;
  background: linear-gradient(45deg, #f0f0f0, #ddd);
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 7px 10px 10px rgba(0, 0, 0, 0.25);
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
  box-shadow: 6.5px 8px 7px rgba(0, 0, 0, 0.75);
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
}

.film-back h3 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
}

.film-back p {
  font-size: 24px;
  line-height: 1.5;
  align-self: flex-start;
  padding-left: 20px;
  padding-top: 30px;
}

@media screen and (max-width: 1024px) {
  /* Tablet és laptop nézethez egyaránt */
  .text-intro {
    padding: 100px 80px 20px 80px;
  }

  .big-text {
    font-size: 36px;
    width: 100%;
  }

  .small-text {
    font-size: 16px;
    width: 100%;
  }

  .film-cards {
    align-items: center;
  }

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
</style>
