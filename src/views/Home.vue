<template>
  <div>
    <section class="first-part">
      <div class="landing-section">
        <img class="landing-image" src="@/assets/41.jpg" alt="Landing Image" />
        <img
          class="logo"
          src="@/assets/logo.png"
          alt="Logo"
          @click="goToHome"
        />
        <div class="router-container">
          <Navbar />
        </div>
        <div class="text-parts">
          <p class="big-text">
            Professzionális <br />
            Manitou gépes <br />
            szolgáltatások
          </p>
          <p class="medium-text">
            "Minden gép és eszköz annyit ér és arra képes,amennyit az azt kezelő
            személy ki tud hozni belőle."
          </p>
          <p class="small-text">- ManitouPeti</p>
        </div>
      </div>
    </section>
    <section class="second-part">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
        laboriosam magni, quidem quaerat, dicta tempore velit vel, iure aut
        voluptatum accusantium? Id culpa veritatis repellat minima, adipisci
        fugiat temporibus dolor!
      </p>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goToHome = () => {
  router.push({ path: "/" });
};
</script>

<style scoped>
.landing-section {
  position: relative;
  width: 100%;
  height: 100vh;
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
  z-index: 1; /* A kép elé helyezi a logot */
}

.router-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1; /* A kép elé helyezi a logot */
}

.text-parts {
  position: absolute;
  top: 50%;
  left: 50%; /* top+left 50%: a container közepébe helyezi a szöveget */
  transform: translate(
    -80%,
    -25%
  ); /* Mozgatás a container közepétől balra, lefele */
  color: rgb(232, 230, 252);
  text-align: left;
  font-weight: bolder;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
}

/* Landing page-n a szövegméretek beállítása */
.big-text {
  font-size: 100px;
  margin: 0;
}

.medium-text {
  font-size: 42px;
  margin: 0;
}

.small-text {
  font-size: 30px;
  margin: 0;
}

.below-image-paragraph {
  color: black; /* Example text color */
}
</style>
