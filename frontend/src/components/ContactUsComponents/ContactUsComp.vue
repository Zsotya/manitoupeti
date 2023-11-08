<template>
  <div class="contact-us">
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
          <div class="first-name">
            <label for="firstName">{{ $t("lastName") }}</label>
            <input type="text" id="firstName" class="transparent-input" />
          </div>
          <div class="last-name">
            <label for="lastName">{{ $t("firstName") }}</label>
            <input type="text" id="lastName" class="transparent-input" />
          </div>
        </div>
        <div class="email-part">
          <div class="email">
            <label for="email">Email</label>
            <input type="text" id="email" class="transparent-input" />
          </div>
          <div class="subject">
            <label for="subject">{{ $t("contactUsSubject") }}</label>
            <input type="text" id="subject" class="transparent-input" />
          </div>
        </div>
        <div class="message-part">
          <div class="message">
            <label for="message">{{ $t("contactUsLeaveMessage") }}</label>
            <textarea class="message-format" id="message"></textarea>
          </div>
        </div>
        <div class="submit">
          <button class="submit-button">{{ $t("contactUsSend") }}</button>
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
  width: 25ch;
}

.small-content {
  font-size: 18px;
  width: 46ch;
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
  box-shadow: 4.5px 4.5px 9px rgba(0, 0, 0, 0.8);
}
</style>
