<template>
  <div>
    <OurWorksFilms
      :filmsData="[
        {
          id: 1,
          title_hu: 'Spectral',
          title_en: 'SpectralEN',
          description_hu: 'Leírás Spectralhoz',
          description_en: 'Description for Spectral',
          imageSrc: require('@/assets/Spectral.jpg'),
        },
        {
          id: 2,
          title_hu: 'Hercules',
          title_en: 'HerculesEN',
          description_hu: 'Leírás Herculeshez',
          description_en: 'Description for Hercules',
          imageSrc: require('@/assets/Hercules.jpg'),
        },
        {
          id: 3,
          title_hu: 'Alienist',
          title_en: 'AlienistEN',
          description_hu: 'Leírás Alienisthez',
          description_en: 'Description for Alienist',
          imageSrc: require('@/assets/Alienist.jpg'),
        },
        {
          id: 4,
          title_hu: 'Alienist',
          title_en: 'AlienistEN',
          description_hu: 'Leírás Alienisthez',
          description_en: 'Description for Alienist',
          imageSrc: require('@/assets/Alienist.jpg'),
        },
        {
          id: 5,
          title_hu: 'Alienist',
          title_en: 'AlienistEN',
          description_hu: 'Leírás alienisthez',
          description_en: 'Description for alienist',
          imageSrc: require('@/assets/Alienist.jpg'),
        },
      ]"
    ></OurWorksFilms>
  </div>
</template>

<script setup>
import OurWorksFilms from "@/components/OurWorksComponents/OurWorksFilms.vue";
</script>
