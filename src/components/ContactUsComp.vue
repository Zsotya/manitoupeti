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
            <input type="text" id="firstName" />
          </div>
          <div class="last-name">
            <label for="lastName">Keresztnév</label>
            <input type="text" id="lastName" />
          </div>
        </div>
        <div class="email-part">
          <div class="email">
            <label for="email">Email</label>
            <input type="text" id="email" />
          </div>
          <div class="subject">
            <label for="subject">Tárgy</label>
            <input type="text" id="subject" />
          </div>
        </div>
        <div class="message-part">
          <div class="message">
            <label for="message">Hagyjon üzenetet...</label>
            <input type="text" id="message" />
          </div>
        </div>
        <div class="submit">
          <button class="submit-button">Submit</button>
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
}

.text-parts {
  display: flex;
  flex-direction: column;
  padding: 300px 0px 0px 100px;
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
  padding: 20px;
}

label {
  padding-bottom: 10px;
  font-size: 16px;
}

.showcase-img {
  align-self: flex-end;
}

.showcase-img img {
  max-width: 100%;
  width: 850px;
  height: 586px;
  object-fit: cover;
}
</style>
