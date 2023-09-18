<template>
  <div>
    <header><HomeLanding /></header>
    <section><HomeParagraphIntro /></section>
    <section>
      <HomeParagraph
        id="1"
        title="Első a biztonság"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam."
        :imageSrc="require('@/assets/42.jpeg')"
      />
      <HomeParagraph
        id="2"
        title="Fontos az elégedettség"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam."
        :imageSrc="require('@/assets/42.jpeg')"
      />
      <HomeParagraph
        id="3"
        title="Professzionális gépek, professzionális gépkezelők"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore et adipisci sapiente tempora quisquam tempore iste. Cupiditate quo eos odit delectus quasi, numquam repellendus id facere totam natus ullam nam."
        :imageSrc="require('@/assets/42.jpeg')"
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
</script>

<style scoped></style>
