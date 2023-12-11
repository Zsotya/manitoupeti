<template>
  <div class="page-container" :class="{ 'dark-mode': darkMode }">
    <form @submit.prevent="submitForm" class="styled-form">
      <div class="form-title">
        <div class="hu-apply" v-if="$i18n.locale === 'hu'">
          Jelentkezés {{ job.jobname_hu }} állásra
        </div>
        <div class="en-apply" v-if="$i18n.locale === 'en'">
          Application for {{ job.jobname_en }} position
        </div>
      </div>
      <!-- Név -->
      <div class="name-part">
        <div class="form-group">
          <label for="lastName"
            ><span class="required">*</span>{{ $t("lastName") }}:</label
          >
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            placeholder="pl. Kiss"
            required
          />
        </div>
        <div class="form-group">
          <label for="firstName"
            ><span class="required">*</span>{{ $t("firstName") }}:</label
          >
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            placeholder="pl. János"
            required
          />
        </div>
      </div>
      <!-- Születési dátum -->
      <div class="birth-part">
        <div class="form-group">
          <label for="birthDate"
            ><span class="required">*</span>{{ $t("birthDate") }}:</label
          >
          <input type="date" id="birthDate" v-model="birthDate" required />
        </div>
        <div class="form-group">
          <label for="birthLocation"
            ><span class="required">*</span>{{ $t("birthLocation") }}:</label
          >
          <input
            type="text"
            id="birthLocation"
            v-model="birthLocation"
            placeholder="pl. Győr"
            required
          />
        </div>
      </div>
      <!-- Email -->
      <div class="email-part">
        <div class="form-group">
          <label for="email"><span class="required">*</span>Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="pl. kissjanos@gmail.com"
            required
          />
        </div>
      </div>
      <!-- Telefonszám, irányítószám -->
      <div class="phone-zip-part">
        <div class="form-group">
          <label for="phoneNumber"
            ><span class="required">*</span>{{ $t("phone") }}:</label
          >
          <input
            type="tel"
            id="phoneNumber"
            v-model="phoneNumber"
            placeholder="pl. 06301234567"
            required
          />
        </div>
        <div class="form-group">
          <label for="zipCode"
            ><span class="required">*</span>{{ $t("zipCode") }}:</label
          >
          <input
            type="text"
            id="zipCode"
            v-model="zipCode"
            placeholder="pl. 1016"
            required
          />
        </div>
      </div>
      <!-- Város, kerület -->
      <div class="settlement-district-part">
        <div class="form-group">
          <label for="settlement"
            ><span class="required">*</span>{{ $t("settlement") }}:</label
          >
          <input
            type="text"
            id="settlement"
            v-model="settlement"
            placeholder="pl. Budapest"
            required
          />
        </div>
        <div class="form-group">
          <label for="district">{{ $t("district") }}:</label>
          <input
            type="text"
            id="district"
            placeholder="pl. 8"
            v-model="district"
          />
        </div>
      </div>
      <!-- Közterület típus, jelleg -->
      <div class="public-area-part">
        <div class="form-group">
          <label for="publicAreaName"
            ><span class="required">*</span>{{ $t("publicAreaName") }}:</label
          >
          <input
            type="text"
            id="publicAreaName"
            v-model="publicAreaName"
            placeholder="pl. Alsóhegy"
            required
          />
        </div>
        <div class="form-group">
          <label for="publicAreaType"
            ><span class="required">*</span>{{ $t("publicAreaType") }}:</label
          >
          <input
            type="text"
            id="publicAreaType"
            v-model="publicAreaType"
            placeholder="pl. utca"
            required
          />
        </div>
      </div>
      <!-- Ház adatok -->
      <div class="house-part">
        <div class="form-group">
          <label for="houseNumber"
            ><span class="required">*</span>{{ $t("houseNumber") }}:</label
          >
          <input
            type="text"
            id="houseNumber"
            v-model="houseNumber"
            placeholder="pl. 14"
            required
          />
        </div>
        <div class="form-group">
          <label for="building">{{ $t("building") }}:</label>
          <input
            type="text"
            id="building"
            placeholder="pl. A"
            v-model="building"
          />
        </div>
        <div class="form-group">
          <label for="stairway">{{ $t("stairway") }}:</label>
          <input
            type="text"
            id="stairway"
            placeholder="pl. B"
            v-model="stairway"
          />
        </div>
        <div class="form-group">
          <label for="floor">{{ $t("floor") }}:</label>
          <input type="text" id="floor" placeholder="pl. 3" v-model="floor" />
        </div>
        <div class="form-group">
          <label for="door">{{ $t("door") }}:</label>
          <input type="text" id="door" placeholder="pl. 1" v-model="door" />
        </div>
      </div>
      <!-- Önéletrajz -->
      <div class="form-group">
        <label for="resume"
          ><span class="required">*</span>{{ $t("resume") }}:</label
        >
        <input
          type="file"
          id="resume"
          ref="resumeInput"
          @change="handleFileChange"
          required
        />
      </div>
      <!-- Küldés -->
      <div class="button-part">
        <div class="submit-button">
          <button type="submit">{{ $t("submit") }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

/* Dark mode */
const store = useStore();
const darkMode = computed(() => store.getters.isDarkMode);

// Adatok fetchelése
const route = useRoute();
const router = useRouter();
const job = ref([]);

async function fetchData() {
  try {
    const jobId = route.params.id;
    const response = await axios.get(`http://localhost:3000/api/jobs/${jobId}`);
    // Ha létezik munka az URL-ben megadott ID-vel, 2xx státuszú response-t kapunk, ekkor job értékének feltöltése
    if (response.status >= 200 && response.status < 300) {
      job.value = response.data;
    }
    // Ha nem létezik munka ilyen ID-vel, 404 oldalra navigálás
    else {
      router.replace("/404");
    }
  } catch (error) {
    // Ha Axios-tól kapunk 404-es státuszt, szintén 404 oldalra navigálás
    if (error.response && error.response.status === 404) {
      router.replace("/404");
    }
    // Egyéb hibakódok esetén
    else {
      console.error("Hiba az adatok lekérdezése közben:", error);
    }
  }
}

onMounted(() => {
  fetchData();
});

// Form elemek inicializálása
const lastName = ref("");
const firstName = ref("");
const birthDate = ref("");
const birthLocation = ref("");
const email = ref("");
const phoneNumber = ref("");
const zipCode = ref("");
const settlement = ref("");
const district = ref("");
const publicAreaName = ref("");
const publicAreaType = ref("");
const houseNumber = ref("");
const building = ref("");
const stairway = ref("");
const floor = ref("");
const door = ref("");
const resume = ref(null);

// Önéletrajz fájl tárolása
function handleFileChange(event) {
  resume.value = event.target.files[0];
}

// Form elküldése
async function submitForm() {
  try {
    const formData = new FormData();
    formData.append("lastName", lastName.value);
    formData.append("firstName", firstName.value);
    formData.append("birthDate", birthDate.value);
    formData.append("birthLocation", birthLocation.value);
    formData.append("email", email.value);
    formData.append("phoneNumber", phoneNumber.value);
    formData.append("zipCode", zipCode.value);
    formData.append("settlement", settlement.value);
    formData.append("district", district.value);
    formData.append("publicAreaName", publicAreaName.value);
    formData.append("publicAreaType", publicAreaType.value);
    formData.append("houseNumber", houseNumber.value);
    formData.append("building", building.value);
    formData.append("stairway", stairway.value);
    formData.append("floor", floor.value);
    formData.append("door", door.value);
    formData.append("resume", resume.value);
    formData.append("jobName", job.value.jobname_hu);
    const response = await axios.post(
      `http://localhost:3000/api/job-application`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Jelentkezés sikeresen elküldve:", response.data);
  } catch (error) {
    console.error("Hiba a jelentkezés elküldésekor:", error);
  }
}
</script>

<style scoped>
.page-container {
  background-color: #e8e6e6;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-top: 150px;
  padding-bottom: 30px;
  color: #222;
  transition: background-color 0.5s, color 0.5s;
}

.styled-form {
  max-width: 840px;
  margin: 0 auto;
  min-height: 70vh;
  background-color: #f5f5f5;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.5s, border 0.5s;
}

.form-title {
  font-size: 1.5em;
  margin-bottom: 20px;
  text-align: center;
}

.name-part,
.birth-part,
.email-part,
.phone-zip-part,
.settlement-district-part,
.public-area-part,
.house-part {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.form-group {
  flex: 1;
  margin-right: 10px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.required {
  color: red;
  margin-right: 4px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: background-color 0.5s, border 0.5s;
}

.button-part {
  margin-top: 10px;
  display: flex;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

@media screen and (max-width: 496px) {
  .name-part,
  .birth-part,
  .email-part,
  .phone-zip-part,
  .settlement-district-part,
  .public-area-part,
  .house-part {
    flex-direction: column;
    margin: 0px;
  }

  .form-group {
    text-align: center;
    margin-bottom: 20px;
  }

  input {
    width: 80%;
  }
}

/* Dark mode */
.page-container.dark-mode {
  background-color: #1a1a1a;
  color: #eeeeee;
}

.page-container.dark-mode input {
  background-color: #212121;
  border: 1px solid #ffffff;
  color: white;
}

.page-container.dark-mode .styled-form {
  background-color: #303030;
  border: 1px solid #ddd;
}

.page-container.dark-mode button {
  background-color: #0056b3;
}

.page-container.dark-mode button:hover {
  background-color: #007bff;
}
</style>
