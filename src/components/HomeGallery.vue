<template>
  <div class="gallery-carousel">
    <div class="carousel">
      <div class="button-container left">
        <button @click="moveLeft" class="arrow left">&lt;</button>
      </div>
      <div class="gallery">
        <div
          v-for="(image, index) in displayedImages"
          :key="index"
          class="image"
        >
          <img :src="image" alt="Image" />
        </div>
      </div>

      <div class="button-container right">
        <button @click="moveRight" class="arrow right">&gt;</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const currentIndex = ref(0);

const images = [
  require("@/assets/94a.jpg"),
  require("@/assets/99q8.jpg"),
  require("@/assets/99r9c.jpg"),
  require("@/assets/99r9g.jpg"),
  require("@/assets/File00003.jpeg"),
  require("@/assets/File00007.jpeg"),
  require("@/assets/File00015.jpeg"),
  require("@/assets/File00019.jpeg"),
  require("@/assets/merlo30.jpg"),
];

const displayedImages = computed(() => {
  const start = currentIndex.value;
  const end = start + 1;
  const displayed = images.slice(start, end);

  const nextSet = images.slice(end, end + 2);
  return displayed.concat(nextSet);
});

const moveLeft = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    preloadImages();
  }
};

const moveRight = () => {
  if (currentIndex.value < images.length - 3) {
    currentIndex.value++;
    preloadImages();
  }
};

// Előre betölti a képeket, jobb user experience eléréséhez

const preloadImages = () => {
  for (let i = currentIndex; i < currentIndex + 5; i++) {
    if (i >= 0 && i < images.length) {
      const img = new Image();
      img.src = images[i];
    }
  }

  for (let i = currentIndex - 1; i >= currentIndex - 5; i--) {
    if (i >= 0 && i < images.length) {
      const img = new Image();
      img.src = images[i];
    }
  }
};
</script>

<style scoped>
.gallery-carousel {
  padding-top: 60px;
  padding-bottom: 60px;
  text-align: center;
  background-color: #e8e6e6;
  height: 900px;
  overflow: hidden;
}

.carousel {
  display: flex;
  align-items: center;
}

.arrow {
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  width: 40px;
  height: 40px;
}

.arrow.left,
.arrow.right {
  background-color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  width: 40px;
  height: 40px;
  position: relative;
  z-index: 1;
  transition: background-color 0.3s;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.arrow.right {
  right: 10px;
}

.arrow.left {
  left: 10px;
}

.arrow.left:hover,
.arrow.right:hover {
  background-color: #555;
  color: white;
  border-radius: 50%;
}

.button-container {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.button-container.left {
  left: 0;
}

.button-container.right {
  right: 0;
}

.gallery {
  display: flex;
  /* overflow: hidden; */
  height: 756px;
  padding: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  align-items: center;
  transition: box-shadow 0.3s;
}

.gallery:hover {
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}

.image {
  flex: 0 0 33%;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  transition: opacity 0.6s;
}

img {
  max-width: 100%;
  display: block;
}

.image img {
  max-height: 100%;
  transition: transform 0.3s ease;
}

.image:hover img {
  transform: scale(1.2);
  transition: transform 0.3s ease;
  overflow: hidden;
}
</style>
