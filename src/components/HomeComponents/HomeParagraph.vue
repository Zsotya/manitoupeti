<template>
  <div class="paragraph">
    <div class="paragraph-section" :class="{ 'reverse-order': isEven }">
      <div class="text-side">
        <h1>{{ title }}</h1>
        <p>{{ content }}</p>
      </div>
      <div class="image-side">
        <img :src="imageSrc" alt="Image" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { id, title, content, imageSrc } = defineProps([
  "id",
  "title",
  "content",
  "imageSrc",
]);

const isEven = id % 2 === 0;
</script>

<style scoped>
.paragraph-section {
  background-color: #e8e6e6;
  padding: 80px;
  padding-bottom: 0px;
  display: flex;
  align-items: center;
}

.text-side {
  flex: 1.6;
  padding: 0px 75px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-self: center;
}

.image-side {
  padding: 0px 75px;
}

.text-side h1 {
  font-size: 30px;
  display: flex;
  width: 30ch;
}

.text-side p {
  font-size: 16px;
  line-height: 1.5;
  width: 50ch;
  padding: 16px 0px;
}

.image-side img {
  width: 843px;
  height: 896px;
  object-fit: cover;
  max-width: 100%;
}

.reverse-order {
  flex-direction: row-reverse;
}

.reverse-order .text-side {
  flex: 2;
  padding: 0px 0px 0px 75px;
}

.reverse-order .image-side {
  flex: 3;
  padding-left: 40px;
}
</style>
