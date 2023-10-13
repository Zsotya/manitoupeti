<template>
  <div class="page-format">
    <div class="text-wrap">
      <div class="text-intro">
        <div class="small-title">{{ $t("ourWorksSmallTitle") }}</div>
        <div class="big-text">
          {{ $t("ourWorksBigText") }}
        </div>
        <div class="small-text">
          {{ $t("ourWorksSmallText") }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-format {
  background-color: #e8e6e6;
}

.text-wrap {
  display: flex;
  justify-content: flex-start;
  padding: 200px 0px 0px 0px;
  margin-left: 80px;
}

.text-intro {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  flex-wrap: wrap;
}

.small-title {
  font-size: 22px;
  margin-bottom: 2px;
  padding-left: 6px;
  flex-wrap: wrap;
}

.big-text {
  font-size: 63px;
  margin-bottom: 4px;
  font-weight: bolder;
  color: #e07076;
  width: 100%;
  flex-wrap: wrap;
}

.small-text {
  font-size: 18px;
  width: 100%;
  flex-wrap: wrap;
}

@media screen and (max-width: 1024px) {
  .text-wrap {
    margin-left: 60px;
  }
  .text-intro {
    padding: 100px 0px 0px 0px;
  }

  .small-title {
    font-size: 20px;
    padding-left: 4px;
  }

  .big-text {
    font-size: 46px;
  }

  .small-text {
    font-size: 18px;
  }
}

/* Tablet nézet */
@media screen and (max-width: 768px) {
  .text-wrap {
    margin: 0;
    padding-top: 200px;
    width: 100%;
    /* margin: 0px 40px 0px 40px; */
    flex-wrap: wrap;
  }
  .text-intro {
    margin: 0;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
  }
  .small-title {
    font-size: 20px;
  }
  .big-text {
    font-size: 40px;
  }
  .small-text {
    font-size: 18px;
  }
}

/* Mobil nézet */
@media screen and (max-width: 496px) {
  .small-title {
    font-size: 20px;
  }
  .big-text {
    font-size: 32px;
  }
  .small-text {
    font-size: 17px;
  }
}
</style>
