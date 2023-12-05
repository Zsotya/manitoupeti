<template>
  <div>
    <div id="webchat"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

const initializeWebChat = () => {
  const configScript = document.createElement("script");
  configScript.src =
    "https://mediafiles.botpress.cloud/3b3fdafb-2e84-408c-a412-ba7a469e0528/webchat/config.js";
  configScript.defer = true;
  document.body.appendChild(configScript);
};

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
  script.defer = true;
  document.body.appendChild(script);

  script.onload = () => {
    initializeWebChat();
  };
});
</script>
