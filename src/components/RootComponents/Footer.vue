<template>
  <footer class="footer">
    <div class="horizontal-line"></div>
    <div class="footer-content">
      <div class="footer-item">
        <div class="name">ManitouPeti</div>
        <div class="location">2890 Tata, Derítő-tó</div>
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
      <div class="footer-item">
        <router-link to="/elerhetoseg" class="contactus-button"
          >Kapcsolat űrlap</router-link
        >
        <router-link to="/berelheto-gepeink" class="quote-button"
          >Árajánlat kérése</router-link
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
  justify-content: space-between;
  padding: 20px 10%;
}

.footer-item {
  flex: 1;
  padding: 0 10px;
  color: #333;
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
}

.contactus-button,
.quote-button {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #e87474;
  color: #000;
  text-decoration: none;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
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
</style>
