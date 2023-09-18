<template>
  <div class="who-are-we">
    <img class="background-image" src="@/assets/43.jpg" alt="image" />
    <div class="milestones">
      <ul>
        <li>
          <div class="milestone">
            <div class="number">10+</div>
            <div class="text">{{ $t("homeExperience") }}</div>
          </div>
        </li>
        <li>
          <div class="milestone">
            <div class="number">300+</div>
            <div class="text">{{ $t("homeProjects") }}</div>
          </div>
        </li>
        <li>
          <div class="milestone">
            <div class="number">12</div>
            <div class="text">{{ $t("homeOperators") }}</div>
          </div>
        </li>
        <li>
          <div class="milestone">
            <div class="number">30+</div>
            <div class="text">{{ $t("homeEmployer") }}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="info">
      <div class="question">{{ $t("homeWhoAreWe") }}</div>
      <div class="title">{{ $t("homeAboutUs") }}</div>
      <div class="paragraph">{{ $t("homeAboutUsText") }}</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.who-are-we {
  position: relative;
  height: 1000px;
  padding-top: 100px;
  background-color: #e8e6e6;
}
.background-image {
  position: absolute;
  width: 100%;
  height: 90%;
  object-fit: cover;
  z-index: 0;
}
.milestones {
  position: absolute;
  display: flex;
  list-style: none;
  padding: 0;
  bottom: 96px;
  left: 112px;
}

.milestones ul {
  display: flex;
}

.milestone {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-right: 40px;
  padding-right: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
}

.milestone :last-child {
  padding-right: 0px;
}

.number {
  font-size: 64px;
  color: white;
  font-weight: bolder;
}

.text {
  font-size: 24px;
  color: white;
}

.info {
  position: absolute;
  top: 50%;
  right: 180px;
  transform: translateY(-30%);
  text-align: left;
  color: white;
  width: 50ch;
}

.question {
  font-size: 22px;
  margin-bottom: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
}

.title {
  font-size: 63px;
  margin-bottom: 4px;
  width: 18ch;
  font-weight: bolder;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
  color: #e07076;
}

.paragraph {
  font-size: 24px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
}
</style>
