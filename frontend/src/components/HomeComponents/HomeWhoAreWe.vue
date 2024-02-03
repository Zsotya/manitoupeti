<template>
  <div class="who-are-we" :class="{ 'dark-mode': darkMode }">
    <img class="background-image" src="@/assets/43.jpg" alt="image" />
    <div class="milestones">
      <ul>
        <div class="twocontainer">
          <li>
            <div class="milestone">
              <div class="number">20+</div>
              <div class="text">{{ $t("homeExperience") }}</div>
            </div>
          </li>
          <li>
            <div class="milestone">
              <div class="number">90+</div>
              <div class="text">{{ $t("homeProjects") }}</div>
            </div>
          </li>
        </div>
        <div class="break"></div>
        <div class="twocontainer">
          <li>
            <div class="milestone">
              <div class="number">20+</div>
              <div class="text">{{ $t("homeMachines") }}</div>
            </div>
          </li>
          <li>
            <div class="milestone">
              <div class="number">∞</div>
              <div class="text">{{ $t("homeVocation") }}</div>
            </div>
          </li>
        </div>
      </ul>
    </div>
    <div class="info">
      <div class="question">{{ $t("homeWhoAreWe") }}</div>
      <div class="title">{{ $t("homeAboutUs") }}</div>
      <div class="paragraph">{{ $t("homeAboutUsText") }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);
</script>

<style scoped>
.who-are-we {
  position: relative;
  height: 100vh;
  padding-top: 100px;
  background-color: #e8e6e6;
  transition: background-color 0.5s;
}
.background-image {
  position: absolute;
  width: 100%;
  height: 90%;
  object-fit: cover;
  z-index: 0;
}
.milestones {
  position: absolute;
  display: flex;
  list-style: none;
  bottom: 96px;
  left: 112px;
}

.milestones ul {
  display: flex;
  list-style: none;
}

.milestone {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-right: 70px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
}

.milestone :last-child {
  margin-right: 0px;
}

.number {
  font-size: 64px;
  color: white;
  font-weight: bolder;
}

.text {
  font-size: 24px;
  color: white;
}

.info {
  position: absolute;
  top: 42%;
  right: 10vw;
  text-align: left;
  color: white;
  width: 50ch;
}

.question {
  font-size: 22px;
  margin-bottom: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
  color: #eaeaea;
}

.title {
  font-size: 63px;
  margin-bottom: 4px;
  width: 100%;
  font-weight: bolder;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
  color: #e07076;
}

.paragraph {
  font-size: 24px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
  color: #eaeaea;
}

.twocontainer {
  display: flex;
}

/* Közepes desktop nézet */
@media screen and (max-width: 1600px) {
  .info {
    right: 6vw;
  }
}

/* Kicsi desktop méret */
@media screen and (max-width: 1280px) {
  .milestone {
    margin-right: 54px;
  }
  .text {
    font-size: 22px;
  }
  .info {
    top: 45.5%;
    right: 1vw;
    width: 43ch;
  }
  .title {
    font-size: 52px;
  }

  .paragraph {
    font-size: 20px;
  }
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  .milestones {
    left: 60px;
  }
  .milestone {
    margin-right: 40px;
  }
  .number {
    font-size: 54px;
  }
  .text {
    max-width: 14ch;
  }
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .who-are-we {
    padding-top: 0px;
    height: 750px;
    overflow: hidden;
    width: 100%;
  }
  .background-image {
    max-width: 100%;
    object-fit: cover;
    min-height: 100%;
    min-width: 600px;
  }
  .milestones {
    left: 20px;
    bottom: 30px;
    max-width: 100%;
  }
  .milestone {
    margin-right: 48px;
  }
  .number {
    font-size: 40px;
  }
  .text {
    font-size: 18px;
    max-width: 8ch;
  }
  .info {
    display: flex;
    flex-direction: column;
    top: 3%;
    width: 100%;
    text-align: center;
    align-items: center;
  }
  .info .title {
    font-size: 46px;
  }
  .info .paragraph {
    max-width: 64ch;
    font-size: 18px;
  }
  .info .question {
    font-size: 20px;
    margin-bottom: 0px;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .milestones {
    left: auto;
    bottom: auto;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 40px;
    padding-left: 50px;
    width: 100%;
    height: 100%;
  }
  ul {
    flex-direction: column;
  }
  .info .paragraph {
    max-width: 40ch;
  }
}

/* Dark mode */
.who-are-we.dark-mode {
  background-color: #1a1a1a;
}
</style>
