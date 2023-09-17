<template>
  <div class="paragraph-section" :class="{ 'reverse-order': isEven }">
    <div class="text-part">
      <div class="paragraph-title">{{ paragraph.title }}</div>
      <div class="paragraph-content">{{ paragraph.content }}</div>
    </div>
    <div class="image-container">
      <img :src="paragraph.imageSrc" alt="image" />
    </div>
  </div>
</template>

<script setup>
const { paragraph } = defineProps(["paragraph"]);
const isEven = paragraph.id % 2 === 0;
</script>

<style scoped>
.paragraph-section {
  background-color: #e8e6e6;
  padding-bottom: 50px;
  display: flex;
}

.paragraph-section .image-container {
  justify-content: flex-end;
}

.text-part {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1.6;
  padding-left: 190px;
}

.paragraph-title {
  width: 26ch;
  font-size: 30px;
  margin-bottom: 16px;
  font-weight: bolder;
}

.paragraph-content {
  width: 46ch;
  line-height: 1.5;
  font-size: 16px;
}

.image-container {
  display: flex;
  margin-right: 140px;
}

.image-container img {
  width: 840px;
  height: 890px;
  object-fit: cover;
}

.reverse-order {
  flex-direction: row-reverse;
}

.reverse-order .text-part {
  position: relative;
  right: 0px;
}

.reverse-order .image-container {
  position: relative;
  left: 160px;
}
</style>
