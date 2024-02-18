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
        <img
          class="big-image"
          :src="'http://localhost:3000' + bigImageUrl"
          alt="Big Image"
        />
        <span class="arrow left" @click="showPrevImage"
          ><i class="fas fa-chevron-left"></i
        ></span>
        <span class="arrow right" @click="showNextImage"
          ><i class="fas fa-chevron-right"></i
        ></span>
        <span @click="closeBigImage" class="close"
          ><i class="fas fa-times"></i
        ></span>
      </div>
    </Transition>
    <div class="thumbnail-container">
      <div
        class="thumbnail"
        v-for="(image, index) in visibleImages"
        :key="index"
        @click="openBigImage(index)"
        ref="thumbnail"
      >
        <img
          :src="'http://localhost:3000' + image.thumbnail_url"
          alt="Thumbnail"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed, ref, nextTick } from "vue";
import { useStore } from "vuex";
import axios from "axios";

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

// Képek meghatározása
const images = ref([]);

async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/gallery");
    images.value = response.data;
  } catch (error) {
    console.error("Hiba az adatok lekérdezése közben:", error);
  }
}

// Adatok inicializálása
const showBigImage = ref(false);
const bigImageUrl = ref(null);
const currentIndex = ref(null);
const loadThreshold = 30;
const visibleImages = ref(images.value.slice(0, loadThreshold));
const lastThumbnail = ref();

// Kép megnyitás
const openBigImage = (index) => {
  showBigImage.value = true;
  currentIndex.value = index;
  bigImageUrl.value = images.value[index].big_image_url;
};

// Kép bezárás
const closeBigImage = () => {
  showBigImage.value = false;
};

// Navigáció a képek között
const showNextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
  bigImageUrl.value = images.value[currentIndex.value].big_image_url;
};

const showPrevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
  bigImageUrl.value = images.value[currentIndex.value].big_image_url;
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

// Képen kívüli kattintás esetén kép bezárás
const handleDocumentClick = (event) => {
  // Gombok meghatározása, melyeken kívül bárhova kattintva a menü bezár
  if (event.target.classList.contains("no-close")) {
    closeBigImage();
  }
};

// Thumbnail vizsgálás lazy-loadhoz
const observeLastThumbnail = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target === lastThumbnail.value) {
          loadMoreImages();
        }
      });
    },
    {
      threshold: 0.75,
    }
  );

  nextTick(() => {
    const thumbnails = document.querySelectorAll(
      ".thumbnail-container .thumbnail"
    );
    thumbnails.forEach((thumbnail) => {
      observer.observe(thumbnail);
    });
  });
};

// Új kép adag betöltés
const loadMoreImages = () => {
  if (visibleImages.value.length >= images.value.length) {
    return;
  }
  const startIndex = visibleImages.value.length;
  const endIndex = startIndex + loadThreshold;
  const newImages = images.value.slice(startIndex, endIndex);
  visibleImages.value = [...visibleImages.value, ...newImages];

  lastThumbnail.value = document.querySelector(
    ".thumbnail-container .thumbnail:last-child"
  );

  observeLastThumbnail();
};

const initializeLastThumbnail = () => {
  nextTick(() => {
    lastThumbnail.value = document.querySelector(
      ".thumbnail-container .thumbnail:last-child"
    );
  });
};

// Oldal betöltéskor inicializálás
onMounted(() => {
  // Képen kívüli kattintások figyelése
  document.addEventListener("click", handleDocumentClick);

  // Képek lekérdezése
  fetchData().then(() => {
    // Lazy-load
    visibleImages.value = images.value.slice(0, loadThreshold);
    initializeLastThumbnail();
    observeLastThumbnail();
  });
});

// Oldal bezáráskor eltávolítás
onBeforeUnmount(() => {
  // Képen kívül történő kattintás törlése
  document.removeEventListener("click", handleDocumentClick);
});
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

  .big-image {
    max-width: 95vw;
  }

  .fa-chevron-right,
  .fa-chevron-left {
    width: 28px;
    height: 28px;
    font-size: 18px;
  }

  .left {
    left: 20px;
  }

  .right {
    right: 20px;
  }
}

@media (max-width: 496px) {
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
