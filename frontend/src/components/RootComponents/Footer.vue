<template>
  <footer class="footer" :class="{ 'dark-mode': darkMode }">
    <div class="horizontal-line"></div>
    <div class="footer-content">
      <div class="footer-item">
        <div class="name">ManitouPeti</div>
        <div class="location-container">
          <div class="location">
            2890 Tata,
            <div class="break"></div>
            {{ $t("footerLake") }}
          </div>
        </div>
      </div>
      <div class="footer-item">
        <div class="contacts">{{ $t("footerContact") }}</div>
        <div class="phone-numbers">
          <div>+36 30 214-1070</div>
          <div>+36 30 969-0126</div>
          <div>+36 30 286-8982</div>
        </div>
        <div class="email-addresses">
          <div>manitoupeti@me.hu</div>
          <div>orfibt@me.hu</div>
        </div>
      </div>
      <div class="footer-item">
        <div class="socials">{{ $t("footerSocials") }}</div>
        <div class="social-links">
          <a href="https://www.facebook.com/orfibt" target="_blank">Facebook</a>
          <a href="https://www.instagram.com/manitoupeti/" target="_blank"
            >Instagram</a
          >
          <a
            href="http://kosarasemelogep.hu/?fbclid=IwAR3j1vUbb51Nzmo8tWZi4aidcySxkwXIVpPERn1Xu8ezo68eCjiQddexq4M"
            target="_blank"
            >Őr-Fi Bt.</a
          >
        </div>
      </div>
      <div class="break-2"></div>
      <div class="footer-item">
        <div class="information">{{ $t("footerInquiry") }}</div>
        <div class="info-paragraph">
          {{ $t("footerInquiryContent") }}
        </div>
      </div>
      <div class="break"></div>
      <div class="footer-item">
        <div class="buttons-container">
          <router-link to="/elerhetoseg" class="contactus-button"
            ><span class="button-content">{{
              $t("footerContactForm")
            }}</span></router-link
          >
          <router-link to="/berelheto-gepeink" class="quote-button"
            ><span class="button-content">{{
              $t("machinesQuotation")
            }}</span></router-link
          >
        </div>
      </div>
    </div>
    <div class="copyright">© 2023 ManitouPeti - GoodFriend's Company</div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);
</script>

<style scoped>
.footer {
  background-color: #e8e6e6;
  padding: 0 0 20px 0;
  text-align: center;
  transition: background-color 0.5s;
}

.horizontal-line {
  background-color: black;
  height: 2px;
  width: 80%;
  margin: 0 auto;
  transition: background-color 0.5s;
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
  transition: color 0.3s;
}

.name,
.contacts,
.socials,
.information {
  font-weight: bold;
  margin-top: 10px;
  transition: color 0.3s;
}

.location-container {
  display: grid;
}

.location {
  display: flex;
  justify-self: center;
}

.phone-numbers,
.email-addresses,
.social-links {
  margin-top: 5px;
}

.location,
.phone-numbers,
.email-addresses,
.social-links a,
.info-paragraph,
.copyright {
  transition: color 0.3s;
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
  transition: color 0.3s;
}

/* 4k nézet korrekció */

@media screen and (min-width: 1920px) {
  .buttons-container {
    display: flex;
    flex-direction: column;
    max-width: 154px;
    margin-left: 78px;
  }
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  .footer-content {
    padding: 20px 5%;
  }

  /* CSS trükk line-break beszúrásához */
  /* Működése: Mivel a flex-basis-t 100%-ra állítottuk, ezáltal megmondtuk az oldalnak, hogy ennek a div-nek a container 100%-át le kell fednie, ez csak új sorban történhet meg */
  .break {
    flex-basis: 100%;
  }

  .location-container {
    display: block;
  }

  .location {
    display: block;
  }

  .contactus-button,
  .quote-button {
    margin: 10px 50px 0px 50px;
  }
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .break-2 {
    flex-basis: 100%;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .footer-content {
    flex-direction: column;
  }
  .footer-item {
    padding: 0;
  }
  .footer {
    overflow: hidden;
  }
}

/* Dark mode */
.footer.dark-mode {
  background-color: #1a1a1a;
}

.footer.dark-mode .horizontal-line {
  background-color: white;
}

.footer.dark-mode .name,
.footer.dark-mode .contacts,
.footer.dark-mode .socials,
.footer.dark-mode .information {
  color: white;
}

.footer.dark-mode .location,
.footer.dark-mode .phone-numbers,
.footer.dark-mode .email-addresses,
.footer.dark-mode .social-links a,
.footer.dark-mode .info-paragraph,
.footer.dark-mode .copyright {
  color: rgb(180, 180, 180);
}

.footer.dark-mode .social-links a:hover {
  color: #ed6969;
}

.footer.dark-mode .contactus-button,
.footer.dark-mode .quote-button {
  background-color: #b94a50;
  color: #1a1a1a;
  transition: background-color 0.5s;
}

.footer.dark-mode .contactus-button:hover,
.footer.dark-mode .quote-button:hover {
  background-color: #d55b61;
  color: #1a1a1a;
  border: 1px solid red;
  transition: background-color 0.5s, border-color 0.3s;
}
</style>
