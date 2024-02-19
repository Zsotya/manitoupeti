<template>
  <div class="landing-section">
    <div class="content-container">
      <Transition name="fade" appear v-if="show">
        <img
          class="landing-image"
          src="@/assets/41.jpg"
          alt="Landing Image"
          @load="onImageLoad"
      /></Transition>
      <Transition name="swim" v-if="show">
        <div class="text-parts" v-if="showText">
          <p class="big-text">{{ $t("homeBigText") }}</p>
          <p class="medium-text">
            {{ $t("homeMediumText") }}
          </p>
          <p class="small-text">- ManitouPeti</p>
        </div></Transition
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

/* Animáció változók inicializálása */
const show = ref(false);
const showText = ref(false);

/* Animáció */
onMounted(() => {
  // Kép betöltés megvárása
  const image = new Image();
  image.src = require("@/assets/41.jpg");
  // Ha betölt, animáció megkezdése
  image.onload = () => {
    show.value = true;

    // Szöveg későbbi animált megjelenítése
    setTimeout(() => {
      showText.value = true;
    }, 500);
  };
});
</script>

<style scoped>
.landing-section {
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  padding-left: 12.5rem;
  padding-top: 6.25rem;
}

.landing-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Biztosítja, hogy a kép lefedi a containert nyújtás nélkül */
  z-index: -1; /* A többi tartalom mögé helyezi (háttérkép) */
}

.text-parts {
  display: flex;
  flex-direction: column;
  color: rgb(238, 237, 250);
  text-align: left;
  font-weight: bolder;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
}

/* Landing page-n a szövegméretek beállítása */
.big-text {
  font-size: 6rem;
  margin: 0;
  width: 16ch;
}

.medium-text {
  font-size: 2.625rem;
  margin: 0;
  width: 36ch;
}

.small-text {
  font-size: 1.875rem;
  margin: 0;
}

/* Animációk */
.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter-active {
  transition: all 1s;
}

.swim-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.swim-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.swim-enter-active {
  transition: all 1s;
}

/* Közepes desktop méret */
@media screen and (max-width: 1600px) {
  .landing-section {
    padding-left: 12rem;
    padding-top: 4.25rem;
  }
  .big-text {
    font-size: 4.5rem;
    margin: 0;
    width: 16ch;
  }

  .medium-text {
    font-size: 2.125rem;
    margin: 0;
    width: 42ch;
  }

  .small-text {
    font-size: 1.575rem;
    margin: 0;
  }
}

/* Kisebb desktop méret, laptop nézet */
@media screen and (max-width: 1280px) {
  .landing-section {
    padding-left: 8rem;
    padding-top: 4.25rem;
  }
  .big-text {
    font-size: 3.8rem;
    margin: 0;
    width: 16ch;
  }

  .medium-text {
    font-size: 1.8rem;
    margin: 0;
    width: 42ch;
  }

  .small-text {
    font-size: 1.375rem;
    margin: 0;
  }
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .landing-section {
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    padding-top: 74px;
    height: 76vh;
  }
  .text-parts {
    flex-wrap: wrap;
    text-align: center;
  }

  .big-text {
    width: 100%;
    font-size: 2.8rem;
  }
  .medium-text {
    width: 100%;
    font-size: 1.5rem;
  }
  .small-text {
    font-size: 1.25rem;
  }

  .landing-image {
    width: 100vw;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .landing-image {
    min-height: 100%;
    width: auto;
    min-width: 300px;
    max-width: 100%;
  }
  .landing-section {
    height: 66vh;
  }
  .big-text {
    font-size: 1.85rem;
  }
  .medium-text {
    font-size: 1rem;
  }
  .small-text {
    font-size: 0.85rem;
  }
}
</style>
