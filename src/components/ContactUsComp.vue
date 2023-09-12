<template>
  <div class="contact-us">
    <div class="text-parts">
      <div class="small-title">Kapcsolat</div>
      <div class="big-content">
        Kérdésekkel, észrevételekkel keressen minket!
      </div>
      <div class="small-content">
        Kérjük, használja ezt az űrlapot, vagy keressen a +36 12 345-6789-es
        számon
      </div>
    </div>
    <div class="full-form">
      <div class="form">
        <div class="name-part">
          <div class="first-name">
            <label for="firstName">Vezetéknév</label>
            <input type="text" id="firstName" class="transparent-input" />
          </div>
          <div class="last-name">
            <label for="lastName">Keresztnév</label>
            <input type="text" id="lastName" class="transparent-input" />
          </div>
        </div>
        <div class="email-part">
          <div class="email">
            <label for="email">Email</label>
            <input type="text" id="email" class="transparent-input" />
          </div>
          <div class="subject">
            <label for="subject">Tárgy</label>
            <input type="text" id="subject" class="transparent-input" />
          </div>
        </div>
        <div class="message-part">
          <div class="message">
            <label for="message">Hagyjon üzenetet...</label>
            <textarea class="message-format" id="message"></textarea>
          </div>
        </div>
        <div class="submit">
          <button class="submit-button">Küldés</button>
        </div>
      </div>
      <div class="showcase-img">
        <img src="@/assets/99r9c.jpg" alt="Image" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.contact-us {
  display: flex;
  flex-direction: column;
  background-color: #e8e6e6;
  padding-left: 60px;
}

.text-parts {
  display: flex;
  flex-direction: column;
  padding: 260px 0px 0px 100px;
}

.small-title {
  font-size: 22px;
  margin-bottom: 2px;
}

.big-content {
  font-size: 63px;
  margin-bottom: 4px;
  font-weight: bolder;
  color: #e07076;
  width: 30ch;
}

.small-content {
  font-size: 18px;
  width: 46ch;
}

.full-form {
  display: flex;
  padding: 100px;
  padding-top: 60px;
  justify-content: space-between;
}

.form {
  display: flex;
  flex-direction: column;
}

.name-part,
.email-part,
.message-part {
  display: flex;
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

input {
  width: 140%;
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
  width: 120%;
  transition: 0.3s;
}

.transparent-input:focus {
  border-bottom: 1px solid #e07076;
  transition: 0.3s;
}

.message textarea {
  width: 58ch;
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
  width: 50%;
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
  align-self: flex-end;
  padding-right: 30px;
}

.showcase-img img {
  max-width: 100%;
  width: 900px;
  height: 586px;
  object-fit: cover;
}
</style>
