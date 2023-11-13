<template>
  <div class="introduction-part" :class="{ 'dark-mode': darkMode }">
    <div class="introduction-left">
      <h3>{{ $t("homeIntroductionBig") }}</h3>
      <h1>{{ $t("homeIntroductionSmall") }}</h1>
    </div>
    <div class="introduction-right">
      <button>{{ $t("homeLearnMore") }}</button>
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
.introduction-part {
  display: flex;
  background-color: #e8e6e6;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  padding: 8vh 8vw;
  padding-right: 0vw;
  transition: background-color 0.5s, color 0.5s;
}

.introduction-left {
  padding-right: 30px;
}

.introduction-left h3 {
  font-size: 22px;
  height: 26px;
}
.introduction-left h1 {
  font-size: 45px;
  width: 27ch;
  color: #e07076;
  font-weight: 550;
  padding-top: 16px;
}
.introduction-right {
  justify-self: flex-end;
  align-self: center;
  padding-top: 20px;
  margin-right: 200px;
}

.introduction-right button {
  background-color: #e87474;
  color: black;
  padding: 24px 46px;
  cursor: pointer;
  transition: background-color 0.5s, border-color 0.3s;
  border: 1px solid rgba(0, 0, 0, 0);
}

.introduction-right button:hover {
  background-color: white;
  border: 1px solid black;
  color: black;
}

/* Kisebb desktop nézet */
@media screen and (max-width: 1280px) {
  .introduction-left h3 {
    font-size: 22px;
    height: 14px;
  }
  .introduction-left h1 {
    font-size: 40px;
  }
  .introduction-right {
    margin-right: 140px;
  }
  .introduction-right button {
    padding: 18px 34px;
  }
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  .introduction-left h3 {
    font-size: 16px;
    height: 12px;
  }
  .introduction-left h1 {
    font-size: 28px;
  }
  .introduction-right {
    margin-right: 110px;
  }
  .introduction-right button {
    padding: 18px 27px;
  }
}

/* Tablet nézet, mobil nézet */
@media screen and (max-width: 768px) {
  .introduction-part {
    flex-direction: column;
    justify-content: center;
    padding: 7vh 0px 7vh 0px;
    text-align: center;
  }
  .introduction-left {
    padding: 0px;
  }
  .introduction-left h1 {
    width: 100%;
  }
  .introduction-left h3 {
    width: 100%;
    padding-bottom: 20px;
  }
  .introduction-right {
    margin: 0px;
    text-wrap: wrap;
  }
}
/* Külön mobilnézet nem szükséges */

/* Dark mode */
.introduction-part.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

.introduction-part.dark-mode button {
  background-color: #b94a50;
  color: #1a1a1a;
}

.introduction-part.dark-mode button:hover {
  background-color: #d55b61;
  color: #1a1a1a;
  border: 1px solid red;
}
</style>
