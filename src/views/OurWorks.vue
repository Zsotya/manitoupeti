<template>
  <div>
    <Logo />
    <NavBar />
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
      ]"
    ></OurWorksFilms>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "@/components/RootComponents/NavBar.vue";
import Logo from "@/components/RootComponents/Logo.vue";
import OurWorksFilms from "@/components/OurWorksComponents/OurWorksFilms.vue";
import Footer from "@/components/RootComponents/Footer.vue";
</script>
