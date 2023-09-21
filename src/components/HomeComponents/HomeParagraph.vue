<template>
  <div class="paragraph">
    <div class="paragraph-section" :class="{ 'reverse-order': isEven }">
      <div class="text-side">
        <h1>{{ paragraph["title_" + $i18n.locale] }}</h1>
        <p>{{ paragraph["content_" + $i18n.locale] }}</p>
      </div>
      <div class="image-side">
        <img :src="paragraph.imageSrc" alt="Image" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { paragraph } = defineProps(["paragraph"]);

const isEven = paragraph.id % 2 === 0;
</script>

<style scoped>
.paragraph-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e8e6e6;
  padding: 0rem 7.2vw 4rem 7.2vw;
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
  width: 35rem;
  height: 37.5rem;
  object-fit: cover;
}

.reverse-order {
  flex-direction: row-reverse;
}

.reverse-order .image-side img {
  margin-right: 3rem;
}

/* Laptop nézet */

@media screen and (max-width: 1024px) {
  .text-side h1 {
    font-size: 1.5rem;
  }

  .text-side p {
    font-size: 1rem;
    max-width: 50ch;
  }

  .image-side img {
    width: 23rem;
    height: 25rem;
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
</style>
