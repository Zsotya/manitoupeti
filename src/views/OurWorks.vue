<template>
  <div>
    <OurWorksFilms
      :filmsData="[
        {
          title: 'Spectral',
          imageSrc: require('@/assets/Spectral.jpg'),
          description: 'Description for Spectral',
        },
        {
          title: 'Hercules',
          imageSrc: require('@/assets/Hercules.jpg'),
          description: 'Description for Hercules',
        },
        {
          title: 'Alienist',
          imageSrc: require('@/assets/Alienist.jpg'),
          description: 'Description for Alienist',
        },
        {
          title: 'Alienist',
          imageSrc: require('@/assets/Alienist.jpg'),
          description: 'Description for Alienist',
        },
        {
          title: 'Alienist',
          imageSrc: require('@/assets/Alienist.jpg'),
          description: 'Description for Alienist',
        },
      ]"
    ></OurWorksFilms>
  </div>
</template>

<script setup>
import OurWorksFilms from "@/components/OurWorksComponents/OurWorksFilms.vue";
</script>
