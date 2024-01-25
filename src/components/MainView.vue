<template>
  <div class="leftContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>San Fransisco</p>
        <p>Jan 25, 2024</p>
      </div>
      <div id="contentsBox">
        <div class="buttonBox">
          <div class="buttonBackground">
            <button class="forecast">Forecast</button>
            <button class="airquelity">Air Quality</button>
          </div>
        </div>
        <div class="weatherBox">
          <div class="weatherDegreee">
            <p>10&deg;</p>
          </div>
          <div class="weatherIcon">
            <img src="~/assets/images/d_sunny.png" alt="d_sunny" />
          </div>
          <div class="weatherData">
            <p></p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
    <div id="todayWeather">
      <div class="textBox">
        <p>시간대별 날씨 정보</p>
        <p>이번주 날씨 보기</p>
      </div>
      <div class="timelyWeatherBox">
        <div class="timelyWeather">
          <div class="icon">
            <img src="~/assets/images/f_rainy.png" alt="f_rainy" />
          </div>
          <div class="data">
            <p class="time">3pm</p>
            <p class="currentDegree">32&deg;</p>
          </div>
          <img src="~/assets/images/humidity_2.png" alt="humidity_2" />
          <p class="fall">30%</p>
        </div>
      </div>
    </div>
    <nav>
      <i class="fas fa-home"></i>
      <i class="fas fa-search-location"></i>
      <i class="fas fa-chart-line"></i>
      <i class="fas fa-cog"></i>
    </nav>
    <h1>야</h1>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
.leftContainer {
  width: 324px;
  height: 700px;
  border-radius: 50px;
  background: linear-gradient(#647eff, #42d392);
  box-shadow: 5px 5px 10px gray;
}
</style>
