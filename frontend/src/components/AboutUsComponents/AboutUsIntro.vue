<template>
  <div class="about-us-intro">
    <div class="text-part">
      <div class="title">
        {{ $t("aboutUsTitle") }}
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.about-us-intro {
  display: flex;
  background-color: #e8e6e6;
  justify-content: center;
  padding: 220px 0px 60px 0px;
}

.title {
  margin: 0 36px 0 36px;
  font-size: 44px;
  color: #e07076;
  font-weight: bolder;
  text-align: center;
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  .title {
    font-size: 36px;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .title {
    font-size: 32px;
  }
}
</style>
