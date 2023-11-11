<template>
  <div class="container">
    <div class="content">
      <h1>404</h1>
      <p>Hoppá! Az Ön által keresett oldal nem található.</p>
      <p>
        Kérjük, használja a navigációs menüt az oldalon történő navigáláshoz.
      </p>
      <router-link to="/">Navigálás a főoldalra</router-link>
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
