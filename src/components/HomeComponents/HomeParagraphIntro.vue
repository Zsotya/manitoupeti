<template>
  <div class="introduction-part">
    <div class="introduction-left">
      <h3>A ránk bízott feladat jó kezekben van</h3>
      <h1>Mi az általunk végzett munkáért felelősséget vállalunk</h1>
    </div>
    <div class="introduction-right">
      <button>További tudnivalók</button>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.introduction-part {
  display: flex;
  background-color: #e8e6e6;
  align-items: center;
}

.introduction-left {
  flex: 2;
  padding: 70px 30px 0px 150px;
}

.introduction-left h3 {
  font-size: 22px;
  height: 26px;
}
.introduction-left h1 {
  font-size: 45px;
  width: 27ch;
  color: #e07076;
  font-weight: 550;
  padding-top: 16px;
}
.introduction-right {
  flex: 0.7;
  padding-top: 20px;
}

.introduction-right button {
  background-color: #e87474;
  color: black;
  padding: 24px 46px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  border: 1px solid rgba(0, 0, 0, 0); /* Hover-nél kap bordert, ami miatt alapból 1px-el elmozdulna. Így nem mozdul, mert alapból van egy nem látható border */
}

.introduction-right button:hover {
  background-color: white;
  border: 1px solid black;
  color: black;
}
</style>
