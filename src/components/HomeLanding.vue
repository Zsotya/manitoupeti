<template>
  <div class="landing-section">
    <img class="landing-image" src="@/assets/41.jpg" alt="Landing Image" />
    <Logo />
    <div class="router-container">
      <Navbar />
    </div>
    <div class="text-parts">
      <p class="big-text">Professzionális Manitou gépes szolgáltatások</p>
      <p class="medium-text">
        "Minden gép és eszköz annyit ér és arra képes,amennyit az azt kezelő
        személy ki tud hozni belőle."
      </p>
      <p class="small-text">- ManitouPeti</p>
    </div>
  </div>
</template>

<script setup>
import Logo from "@/components/Logo.vue";
</script>

<style scoped>
.landing-section {
  position: relative;
  width: 100%;
  height: 1080px;
  overflow: hidden;
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

.logo {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 0; /* A kép elé helyezi a logot */
}

.router-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1; /* A kép elé helyezi a logot */
}

.text-parts {
  position: absolute;
  top: 37.5%;
  left: 12%; /* top+left 50%: a container közepébe helyezi a szöveget */
  /* transform: translate(
    -85%,
    -25%
  ); /* Mozgatás a container közepétől balra, lefele */

  color: rgb(238, 237, 250);
  text-align: left;
  font-weight: bolder;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
}

/* Landing page-n a szövegméretek beállítása */
.big-text {
  font-size: 100px;
  margin: 0;
  width: 16ch;
}

.medium-text {
  font-size: 42px;
  margin: 0;
  width: 42ch;
}

.small-text {
  font-size: 30px;
  margin: 0;
}

@media (max-width: 1536px) {
  .big-text {
    font-size: 80px;
  }
  .medium-text {
    font-size: 33.6px;
  }
  .small-text {
    font-size: 24px;
  }
}

@media (max-width: 1228px) {
  .big-text {
    font-size: 64px;
  }
  .medium-text {
    font-size: 26.88px;
  }
  .small-text {
    font-size: 19.2px;
  }
}

@media (max-width: 982px) {
  .big-text {
    font-size: 51.2px;
  }
  .medium-text {
    font-size: 21.504px;
  }
  .small-text {
    font-size: 15.36px;
  }
}

@media (max-width: 768px) {
  .big-text {
    font-size: 39.936px;
  }
  .medium-text {
    font-size: 16.773px;
  }
  .small-text {
    font-size: 11.981px;
  }
}
</style>
