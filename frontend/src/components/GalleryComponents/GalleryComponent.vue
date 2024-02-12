<template>
  <div class="page-container" :class="{ 'dark-mode': darkMode }">
    <Transition name="big-image-open">
      <div
        v-if="showBigImage"
        class="big-image-container"
        :class="{ 'no-close': true }"
      >
        <span class="photo-count"
          >{{ $t("galleryImage") }}: {{ currentIndex + 1 }} /
          {{ images.length }}</span
        >
        <img class="big-image" :src="bigImageUrl" alt="Big Image" />
        <span class="arrow left"
          ><i @click="showPrevImage" class="fas fa-chevron-left"></i
        ></span>
        <span class="arrow right"
          ><i @click="showNextImage" class="fas fa-chevron-right"></i
        ></span>
        <span @click="closeBigImage" class="close"
          ><i class="fas fa-times"></i
        ></span>
      </div>
    </Transition>
    <div class="thumbnail-container">
      <div
        class="thumbnail"
        v-for="(image, index) in images"
        :key="index"
        @click="openBigImage(index)"
      >
        <img :src="image" alt="Thumbnail" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed, ref } from "vue";
import { useStore } from "vuex";

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

const images = ref([
  "https://dummyimage.com/400x300/000/fff",
  "https://dummyimage.com/300x400/111/fff",
  "https://dummyimage.com/350x250/222/fff",
  "https://dummyimage.com/250x350/333/fff",
  "https://dummyimage.com/500x200/444/fff",
  "https://dummyimage.com/200x500/555/fff",
  "https://dummyimage.com/450x300/666/fff",
  "https://dummyimage.com/300x450/777/fff",
  "https://dummyimage.com/1920x1080/888/fff",
  "https://dummyimage.com/600x400/999/fff",
  "https://dummyimage.com/350x350/000/fff",
  "https://dummyimage.com/200x200/111/fff",
  "https://dummyimage.com/400x600/222/fff",
  "https://dummyimage.com/1080x1920/333/fff",
  "https://dummyimage.com/450x450/444/fff",
  "https://dummyimage.com/3840x2160/444/fff",
]);

const showBigImage = ref(false);
const bigImageUrl = ref(null);
const currentIndex = ref(null);

// Kép megnyitás
const openBigImage = (index) => {
  showBigImage.value = true;
  currentIndex.value = index;
  bigImageUrl.value = images.value[index];
};

// Kép bezárás
const closeBigImage = () => {
  showBigImage.value = false;
};

// Navigáció a képek között
const showNextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
  bigImageUrl.value = images.value[currentIndex.value];
};

const showPrevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
  bigImageUrl.value = images.value[currentIndex.value];
};

// Billentyűzettel navigálás, bezárás
document.addEventListener("keydown", (e) => {
  if (showBigImage.value) {
    if (e.key === "Escape") {
      closeBigImage();
    } else if (e.key === "ArrowLeft") {
      showPrevImage();
    } else if (e.key === "ArrowRight") {
      showNextImage();
    }
  }
});

onMounted(() => {
  // A menün kívüli kattintások figyelése
  document.addEventListener("click", handleDocumentClick);
});

onBeforeUnmount(() => {
  // A menün kívüli kattintások figyelésének törlése
  document.removeEventListener("click", handleDocumentClick);
});

// Menün kívüli kattintás esetén menü bezárása
const handleDocumentClick = (event) => {
  // Gombok meghatározása, melyeken kívül bárhova kattintva a menü bezár
  if (event.target.classList.contains("no-close")) {
    closeBigImage();
  }
};
</script>

<style scoped>
.page-container {
  background-color: #e8e6e6;
  transition: background-color 0.5s, color 0.5s;
}

.thumbnail-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  padding: 20px 0px;
  line-height: 1.34;
}

.thumbnail {
  margin: 6px 12px;
  cursor: pointer;
}

.thumbnail img {
  height: 200px;
  width: 200px;
  object-fit: cover;
  border-radius: 20px;
  padding: 1px;
  transition: transform 0.2s;
}

.thumbnail:hover img {
  transform: scale(1.1);
}

.photo-count {
  position: absolute;
  top: 20px;
  font-size: 16px;
  background-color: #4caf50;
  padding: 8px 12px;
  color: white;
  border-radius: 10px;
}

.big-image-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10;
}

.big-image {
  max-width: 80vw;
  max-height: 95vh;
  height: auto;
}

.arrow {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  color: white;
  user-select: none;
}

.fa-chevron-right,
.fa-chevron-left {
  width: 36px;
  height: 36px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  background-color: black;
  color: white;
  transition: background-color 0.5s, color 0.5s;
}

.fa-chevron-right:hover,
.fa-chevron-left:hover {
  background-color: white;
  color: black;
}

.left {
  left: 30px;
}

.right {
  right: 30px;
}

.close {
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 24px;
  color: white;
  background-color: black;
  cursor: pointer;
  transition: 0.5s all;
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.close:hover {
  background-color: white;
  color: black;
}

@media (max-width: 768px) {
  .thumbnail img {
    height: 150px;
    width: 150px;
  }
}

@media (max-width: 496px) {
  .thumbnail img {
    height: 120px;
    width: 120px;
  }

  .left {
    left: 15px;
  }

  .right {
    right: 15px;
  }

  .close {
    top: 15px;
    right: 15px;
  }
}

/* Dark mode */
.page-container.dark-mode {
  background-color: #1a1a1a;
  color: white;
}

.page-container.dark-mode .photo-count {
  background-color: #378339;
}

.page-container.dark-mode .fa-chevron-right,
.page-container.dark-mode .fa-chevron-left {
  background-color: #fff;
  color: black;
  transition: 0.5s all;
}

.page-container.dark-mode .fa-chevron-right:hover,
.page-container.dark-mode .fa-chevron-left:hover {
  background-color: black;
  color: #fff;
}

.page-container.dark-mode .close {
  color: black;
  background-color: white;
}

.page-container.dark-mode .close:hover {
  color: white;
  background-color: black;
}

/* Animációk */
@keyframes bounce {
  0% {
    transform: scale(0);
    background-color: rgba(0, 0, 0, 0);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    background-color: rgba(0, 0, 0, 0.6);
  }
}

.big-image-open-leave-active {
  animation: bounce 0.5s reverse;
}

.big-image-open-enter-active {
  animation: bounce 0.5s;
}
</style>
