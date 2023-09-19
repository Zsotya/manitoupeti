<template>
  <footer class="footer">
    <div class="horizontal-line"></div>
    <div class="footer-content">
      <div class="footer-item">
        <div class="name">ManitouPeti</div>
        <div class="location">
          2890 Tata
          <div class="break"></div>
          Derítő-tó
        </div>
      </div>
      <div class="footer-item">
        <div class="contacts">Elérhetőségeink</div>
        <div class="phone-numbers">
          <div>+123 456 789</div>
          <div>+987 654 321</div>
          <div>+567 890 123</div>
        </div>
        <div class="email-addresses">
          <div>manitoupeti@me.hu</div>
          <div>orfibt@me.hu</div>
        </div>
      </div>
      <div class="footer-item">
        <div class="socials">Socials</div>
        <div class="social-links">
          <a href="https://www.facebook.com/">Facebook</a>
          <a href="https://www.instagram.com/">Instagram</a>
          <a href="https://www.linkedin.com/">LinkedIn</a>
        </div>
      </div>
      <div class="footer-item">
        <div class="information">Tudakozó</div>
        <div class="info-paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vehicula
          auctor lorem, vel lacinia lorem vulputate vel.
        </div>
      </div>
      <div class="break"></div>
      <div class="footer-item">
        <router-link to="/elerhetoseg" class="contactus-button"
          ><span class="button-content">Kapcsolat űrlap</span></router-link
        >
        <router-link to="/berelheto-gepeink" class="quote-button"
          ><span class="button-content">Árajánlat kérése</span></router-link
        >
      </div>
    </div>
    <div class="copyright">© 2023 ManitouPeti - GoodFriend's Company</div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer {
  background-color: #e8e6e6;
  padding: 0 0 20px 0;
  text-align: center;
}

.horizontal-line {
  background-color: black;
  height: 2px;
  width: 80%;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 7.5%;
}

.footer-item {
  flex: 1;
  padding: 0 10px;
  color: #333;
  margin-top: 10px;
  text-align: center;
}

.name,
.contacts,
.socials,
.information {
  font-weight: bold;
  margin-top: 10px;
}

.phone-numbers,
.email-addresses,
.social-links {
  margin-top: 5px;
}

.social-links a {
  display: block;
  text-decoration: none;
  color: #333;
  margin-bottom: 5px;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #ed6969;
}

.info-paragraph {
  width: 30ch;
  margin: 10px auto;
  font-size: 14px;
  text-align: center;
}

.contactus-button,
.quote-button {
  display: inline-flex;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #e87474;
  color: #000;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 146px;
}

.button-content {
  width: 14ch;
}

.contactus-button:hover,
.quote-button:hover {
  background-color: white;
  border: 1px solid #000;
  color: #000;
}

.copyright {
  position: relative;
  bottom: 0px;
  padding: 5px;
  font-size: 14px;
  color: #333;
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  /* CSS trükk line-break beszúrásához */
  /* Működése: Mivel a flex-basis-t 100%-ra állítottuk, ezáltal megmondtuk az oldalnak, hogy ennek a div-nek a container 100%-át le kell fednie, ez csak új sorban történhet meg */
  .break {
    flex-basis: 100%;
  }

  .contactus-button,
  .quote-button {
    margin: 10px 50px 0px 50px;
  }
}
</style>
