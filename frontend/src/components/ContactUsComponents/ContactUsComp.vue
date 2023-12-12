<template>
  <div class="contact-us" :class="{ 'dark-mode': darkMode }">
    <div class="text-parts">
      <div class="small-title">{{ $t("contactUsLabel") }}</div>
      <div class="big-content">
        {{ $t("contactUsBigContent") }}
      </div>
      <div class="small-content">
        {{ $t("contactUsSmallContent") }}
      </div>
    </div>
    <div class="full-form">
      <div class="form">
        <div class="name-part">
          <div class="last-name">
            <label for="lastName">{{ $t("lastName") }}</label>
            <input
              type="text"
              id="lastName"
              class="transparent-input"
              v-model="lastName"
            />
          </div>
          <div class="first-name">
            <label for="firstName">{{ $t("firstName") }}</label>
            <input
              type="text"
              id="firstName"
              class="transparent-input"
              v-model="firstName"
            />
          </div>
        </div>
        <div class="email-part">
          <div class="email">
            <label for="email">Email</label>
            <input
              type="text"
              id="email"
              class="transparent-input"
              v-model="email"
            />
          </div>
          <div class="subject">
            <label for="subject">{{ $t("contactUsSubject") }}</label>
            <input
              type="text"
              id="subject"
              class="transparent-input"
              v-model="subject"
            />
          </div>
        </div>
        <div class="message-part">
          <div class="message">
            <label for="message">{{ $t("contactUsLeaveMessage") }}</label>
            <textarea
              class="message-format"
              id="message"
              v-model="message"
            ></textarea>
          </div>
        </div>
        <div class="submit">
          <button class="submit-button" @click="submitForm">
            {{ $t("submit") }}
          </button>
        </div>
      </div>
      <div class="showcase-img">
        <img src="@/assets/99r9c.jpg" alt="Image" />
      </div>
    </div>
    <!-- Visszajelzés a sikeres elküldésről -->
    <!-- Sikeres elküldés -->
    <div v-if="isSent" class="overlay">
      <div class="popup">
        <div class="content">
          <div class="popup-result">
            {{ $t("contactUsPopupSuccess") }}
          </div>
        </div>
        <div class="popup-button">
          <button @click="cancelPopup" class="cancel-button">OK</button>
        </div>
      </div>
    </div>
    <!-- Sikertelen elküldés -->
    <div v-if="notSent" class="overlay">
      <div class="popup">
        <div class="content">
          <div class="popup-result">{{ $t("contactUsPopupError") }}</div>
          <div v-if="notComplete" class="popup-message">
            {{ $t("contactUsPopupFillAll") }}
          </div>
          <div v-if="isError" class="popup-message">
            {{ $t("contactUsPopupServerError") }}
          </div>
        </div>
        <div class="popup-button">
          <button @click="cancelPopup" class="cancel-button">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import axios from "axios";

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

/* Felugró ablak a sikerességről */
// Adatok inicializálása
const isSent = ref(false);
const notSent = ref(true);
const notComplete = ref(false);
const isError = ref(true);

// Ablak bezárása
const cancelPopup = () => {
  isSent.value = false;
  notSent.value = false;
  notComplete.value = false;
  isError.value = false;
};

// Form adatok
const lastName = ref("");
const firstName = ref("");
const email = ref("");
const subject = ref("");
const message = ref("");

// Form elküldése
const submitForm = async () => {
  try {
    // Vizsgálás, hogy az összes adat ki van töltve
    if (
      !lastName.value ||
      !firstName.value ||
      !email.value ||
      !subject.value ||
      !message.value
    ) {
      // Hibakezelés, ha nincs kitöltve a form
      notSent.value = true;
      notComplete.value = true;
      return;
    }
    // Form elküldése backendnek
    const response = await axios.post("http://localhost:3000/api/contactus", {
      lastName: lastName.value,
      firstName: firstName.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    });
    // Siker esetkezelés
    isSent.value = true;

    // Értékek resetelése
    lastName.value = "";
    firstName.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";
  } catch (error) {
    notSent.value = true;
    isError.value = true;
    console.error("Hiba az üzenet elküldésekor:", error.message);
  }
};
</script>

<style scoped>
.contact-us {
  display: flex;
  flex-direction: column;
  background-color: #e8e6e6;
  padding-left: 60px;
  transition: background-color 0.5s, color 0.5s;
}

.text-parts {
  display: flex;
  flex-direction: column;
  margin: 260px 0px 0px 60px;
}

.small-title {
  font-size: 22px;
  margin-bottom: 2px;
  margin-left: 4px;
}

.big-content {
  font-size: 63px;
  margin-bottom: 4px;
  font-weight: bolder;
  color: #e07076;
  max-width: 25ch;
}

.small-content {
  font-size: 18px;
  max-width: 46ch;
}

.full-form {
  display: flex;
  padding: 30px;
  justify-content: flex-start;
  align-items: center;
}

.form {
  flex: 1;
  margin: 0px 0px 100px 30px;
  max-width: 50%;
}

.name-part,
.email-part,
.message-part {
  display: flex;
}

.message-part {
  max-width: 74ch;
  width: 100%;
}

.first-name,
.last-name,
.email,
.subject,
.message,
.submit {
  display: flex;
  flex-direction: column;
  padding: 30px 30px 16px 0px;
  margin-right: 50px;
}

label {
  padding-bottom: 10px;
  font-size: 16px;
}

.transparent-input {
  background: transparent;
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  padding: 5px 0;
  font-size: 16px;
  width: 100%;
  transition: 0.3s;
}

.transparent-input:focus {
  border-bottom: 1px solid #e07076;
  transition: 0.3s;
}

.message {
  width: 100%;
}
.message textarea {
  height: 14em;
  line-height: 1.5;
  background: transparent;
  resize: none;
  outline: none;
  transition: 0.3s;
}

.message textarea:focus {
  border: 1px solid #e07076;
  transition: 0.3s;
}

.message-format {
  padding: 2px 0px 0px 4px;
  font-size: 16px;
}

.submit {
  width: 260px;
}

.submit-button {
  background-color: #e87474;
  color: black;
  padding: 24px 46px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  border: 1px solid rgba(0, 0, 0, 0);
}

.submit-button:hover {
  background-color: white;
  border: 1px solid black;
  color: black;
}

.showcase-img {
  flex: 1;
  margin-right: 30px;
  min-width: 400px;
  min-height: 640px;
}

.showcase-img img {
  max-width: 100%;
  min-height: 600px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.8);
  transition: box-shadow 0.7s;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background-color: #dfdfdf;
  padding: 40px;
  text-align: center;
  border: 1px solid black;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transition: border 0.3s;
}

.popup-result {
  font-size: 20px;
  margin-bottom: 4px;
}

.popup-message {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}

.popup-button {
  display: flex;
  justify-content: center;
}

.cancel-button {
  padding: 10px 20px;
  margin: 0 14px;
  font-size: 16px;
  border: 1px solid rgb(186, 186, 186);
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, border 0.3s;
}

.cancel-button:hover {
  background-color: lightgray;
}

/* Dark mode */
.contact-us.dark-mode {
  background-color: #1a1a1a;
  color: #ffffff;
}

.contact-us.dark-mode .transparent-input,
.contact-us.dark-mode .message textarea {
  border-bottom: 1px solid #ccc;
  color: #ccc;
}

.contact-us.dark-mode .transparent-input:focus,
.contact-us.dark-mode .message textarea:focus {
  border-bottom: 1px solid #e07076;
}

.contact-us.dark-mode button {
  background-color: #b94a50;
  color: #1a1a1a;
}

.contact-us.dark-mode button:hover {
  background-color: #d55b61;
  color: #1a1a1a;
  border: 1px solid red;
}

.contact-us.dark-mode .showcase-img img {
  box-shadow: 2px 0px 20px rgba(255, 255, 255, 0.8);
}

.contact-us.dark-mode .popup {
  background-color: #1a1a1a;
  border: 1px solid white;
}

.contact-us.dark-mode .cancel-button {
  border-color: black;
}

/* Laptop nézet */
@media screen and (max-width: 1024px) {
  .contact-us {
    padding-left: 0px;
  }
  .text-parts {
    text-align: center;
    margin: 200px 0px 0px 0px;
  }

  .big-content {
    max-width: 100%;
  }

  .small-content {
    max-width: 100%;
  }

  .showcase-img {
    display: none;
  }

  .full-form {
    justify-content: center;
    padding: 30px 0px 30px 0px;
  }

  .form {
    margin: 0px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .message-part {
    max-width: 70ch;
  }
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .big-content {
    font-size: 48px;
  }

  .message {
    margin-right: 0px;
  }

  .name-part,
  .email-part,
  .message-part {
    margin: 0px 20px;
  }

  .first-name,
  .last-name,
  .email,
  .subject,
  .message,
  .submit {
    display: flex;
    flex-direction: column;
    padding: 30px 0px 16px 0px;
  }

  .message-part {
    max-width: 60ch;
  }

  .submit {
    margin: 0px;
  }
}

/* Mobilnézet */
@media screen and (max-width: 496px) {
  .text-parts {
    text-align: center;
    margin: 200px 10px 0px 10px;
  }
  .big-content {
    font-size: 36px;
  }

  .name-part,
  .email-part {
    flex-direction: column;
    width: 100%;
  }

  .message-part {
    max-width: 65%;
  }

  .first-name,
  .last-name,
  .email,
  .subject {
    margin-right: 0px;
    align-items: center;
  }

  .transparent-input {
    max-width: 65%;
  }

  .submit {
    max-width: 220px;
  }

  .popup {
    padding: 20px;
    margin: 20px;
  }

  .popup-result {
    font-size: 18px;
    margin-bottom: 4px;
  }

  .popup-message {
    font-size: 18px;
    margin-bottom: 18px;
    font-weight: bold;
  }
}
</style>
