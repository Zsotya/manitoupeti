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
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import Logo from "@/components/Logo.vue";
import OurWorksFilms from "@/components/OurWorksFilms.vue";
import Footer from "@/components/Footer.vue";

const pageTitle = ref("");
const router = useRouter();

// pageTitle komponens beállítása oldaltól függően
const route = router.currentRoute.value;
if (route.path === "/bemutatkozas") {
  pageTitle.value = "Bemutatkozás";
} else if (route.path === "/berelheto-gepeink") {
  pageTitle.value = "Bérelhető gépeink";
} else if (route.path === "/munkaink") {
  pageTitle.value = "Munkáink";
} else if (route.path === "/elerhetoseg") {
  pageTitle.value = "Elérhetőség";
} else if (route.path === "/karrier") {
  pageTitle.value = "Karrier";
}
</script>
