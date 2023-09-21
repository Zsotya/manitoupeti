<template>
  <div class="landing-section">
    <img class="landing-image" src="@/assets/41.jpg" alt="Landing Image" />
    <div class="text-parts">
      <p class="big-text">{{ $t("homeBigText") }}</p>
      <p class="medium-text">
        {{ $t("homeMediumText") }}
      </p>
      <p class="small-text">- ManitouPeti</p>
    </div>
  </div>
</template>

<script setup></script>

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
    height: 70vh;
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
  .landing-section {
    height: 50vh;
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
