<template>
  <div>
    <header><HomeLanding /></header>
    <section><HomeParagraphIntro /></section>
    <section>
      <HomeParagraph
        v-for="paragraph in paragraphs"
        :key="paragraph.id"
        :paragraph="paragraph"
      />
    </section>
    <section><HomeWhoAreWe /></section>
    <section><HomeGallery /></section>
  </div>
</template>

<script setup>
import HomeLanding from "@/components/HomeComponents/HomeLanding.vue";
import HomeParagraphIntro from "@/components/HomeComponents/HomeParagraphIntro.vue";
import HomeParagraph from "@/components/HomeComponents/HomeParagraph.vue";
import HomeWhoAreWe from "@/components/HomeComponents/HomeWhoAreWe.vue";
import HomeGallery from "@/components/HomeComponents/HomeGallery.vue";

const paragraphs = [
  {
    id: "1",
    title_hu: "Első a biztonság",
    title_en: "Safety first",
    content_hu:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam.",
    content_en:
      "LoremEN ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam.",
    imageSrc: require("@/assets/42.jpeg"),
  },
  {
    id: "2",
    title_hu: "Fontos az elégedettség",
    title_en: "Satisfaction is important",
    content_hu:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam.",
    content_en:
      "LoremEN ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam.",
    imageSrc: require("@/assets/42.jpeg"),
  },
  {
    id: "3",
    title_hu: "Professzionális gépek, professzionális gépkezelők",
    title_en: "Professional machines, professional operators",
    content_hu:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam.",
    content_en:
      "LoremEN ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam.",
    imageSrc: require("@/assets/42.jpeg"),
  },
];
</script>

<style scoped></style>
