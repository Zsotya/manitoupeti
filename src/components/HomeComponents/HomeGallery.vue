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
import { ref, onMounted, onUnmounted, watch } from "vue";

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

const screenWidth = ref(window.innerWidth);

const displayedImages = ref([]);

const moveLeft = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    displayedImages.value = calculateDisplayedImages();
    preloadImages();
  }
};

const moveRight = () => {
  if (window.innerWidth <= 496 && currentIndex.value < images.length - 1) {
    currentIndex.value++;
    displayedImages.value = calculateDisplayedImages();
    preloadImages();
  } else if (
    window.innerWidth > 496 &&
    window.innerWidth < 1024 &&
    currentIndex.value < images.length - 2
  ) {
    currentIndex.value++;
    displayedImages.value = calculateDisplayedImages();
    preloadImages();
  } else if (currentIndex.value < images.length - 3) {
    currentIndex.value++;
    displayedImages.value = calculateDisplayedImages();
    preloadImages();
  }
};

// Előre betölti a képeket, jobb user experience eléréséhez

const preloadImages = () => {
  let preloadStart = currentIndex.value - 5;
  let preloadEnd = currentIndex.value + 5;

  preloadStart = Math.max(preloadStart, 0);
  preloadEnd = Math.min(preloadEnd, images.length - 1);

  for (let i = preloadStart; i <= preloadEnd; i++) {
    const img = new Image();
    img.src = images[i];
  }
};

// Kiszámolja az end értékét a képernyő szélesség alapján
const calculateEnd = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 496) {
    return currentIndex.value;
  } else if (screenWidth <= 1024) {
    return currentIndex.value + 1;
  } else {
    return currentIndex.value + 2;
  }
};

const handleResize = () => {
  screenWidth.value = window.innerWidth;
  displayedImages.value = calculateDisplayedImages();
  setGalleryHeight();
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  displayedImages.value = calculateDisplayedImages();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

watch(screenWidth, () => {
  displayedImages.value = calculateDisplayedImages();
});

const calculateDisplayedImages = () => {
  const start = currentIndex.value;
  const end = calculateEnd();
  const displayed = images.slice(start, end);

  let nextSet = ref([]);

  if (screenWidth <= 496) {
    nextSet = images.slice(end, end - 1);
  } else if (screenWidth > 496 && screenWidth < 1024) {
    nextSet = images.slice(end, end);
  } else {
    nextSet = images.slice(end, end + 1);
  }
  return displayed.concat(nextSet);
};

// A legmagasabb pixelszámú kép megkeresése
const setGalleryHeight = () => {
  const images = document.querySelectorAll(".image img");
  let maxHeight = 0;

  images.forEach((image) => {
    const imageHeight = image.clientHeight;
    if (imageHeight > maxHeight) {
      maxHeight = imageHeight;
    }
  });

  const maxHeightPercent = 70;
  const maxImageHeight = (window.innerHeight * maxHeightPercent) / 100;

  images.forEach((image) => {
    image.style.maxHeight = `${maxImageHeight}px`;
  });

  const gallery = document.querySelector(".gallery");
  gallery.style.height = `${maxHeight + 40}px`;
};

window.addEventListener("load", setGalleryHeight);
window.addEventListener("resize", setGalleryHeight);
</script>

<style scoped>
.gallery-carousel {
  padding-top: 60px;
  padding-bottom: 60px;
  text-align: center;
  background-color: #e8e6e6;
  height: 100%;
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
  z-index: 3;
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
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.3s ease;
}

.image:hover img {
  transform: scale(1.2);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.image:hover {
  z-index: 2;
}

/* Laptop és tablet nézet egyaránt */
@media screen and (max-width: 1024px) {
  .image {
    flex: 0 0 50%;
  }

  img {
    max-height: 730px;
  }

  .image:hover img {
    transform: scale(1.1);
    transition: transform 0.3s ease;
    overflow: hidden;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .image {
    flex: 0 0 100%;
  }

  .image:hover img {
    transform: none;
    overflow: hidden;
  }

  .gallery {
    overflow: hidden;
  }
}
</style>
