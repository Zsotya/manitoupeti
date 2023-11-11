<template>
  <div class="container">
    <div class="content">
      <h1>404</h1>
      <p>{{ $t("404oops") }}</p>
      <p>
        {{ $t("404navigate") }}
      </p>
      <router-link to="/">{{ $t("404goHome") }}</router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e8e6e6;
}

.content {
  text-align: center;
}

h1 {
  font-size: 72px;
  color: red;
}

p {
  font-size: 24px;
  margin: 12px 0px;
}

a {
  font-size: 24px;
  text-decoration: none;
  color: blue;
}
</style>
