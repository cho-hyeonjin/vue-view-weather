<template>
  <div class="rightContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>{{ cityName }}</p>
        <p>{{ currentTime }}</p>
      </div>
    </div>
    <div id="contentsBox">
      <div class="buttonBox">
        <div class="buttonBackground">
          <button class="forecast">일기예보</button>
          <button class="forecastDetail">상세 날씨</button>
        </div>
      </div>
      <div class="weatherBox">
        <div class="airCondition">
          <p>추움</p>
        </div>
        <div class="detail">
          <div class="title">
            <p>오늘의 상세 날씨</p>
          </div>
          <div
            class="data"
            v-for="(subWeatherData, idx) in subWeatherDatas"
            :key="idx"
          >
            <div class="dataName">
              <p></p>
              <p>{{ subWeatherData.name }}</p>
            </div>
            <div class="dataValue">
              <p>
                <span>{{ subWeatherData.value }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Map />
    <nav>
      <i class="fas fa-home"></i>
      <i class="fas fa-search-location"></i>
      <i class="fas fa-chart-line"></i>
      <i class="fas fa-cog"></i>
    </nav>
  </div>
</template>

<script>
import Map from "./Map.vue";
import { ref } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export default {
  components: {
    Map,
  },

  setup() {
    let currentTime = dayjs().format("YYYY. MM. DD. ddd");
    let cityName = ref("");
    let feeling = ref(""); // 체감온도
    let subWeatherDatas = ref([]);

    // unixType 타임 변경 메서드
    const changeTimeFormatt = (unixtime) => {
      const millisec = unixtime * 1000;
      let date = new Date(millisec);
      let hour = "" + date.getHours();
      const formatted = hour.substring(-2).padStart(2, "0");
      return formatted + " 시";
    };

    // OpenWeather API
    const fetchOpenWeatherAPI = async () => {
      const API_KEY = "d871e7c1912d25a3ef6ea56cdb0ab074";
      let initialLat = 37.391801;
      let initialLon = 127.111897833;

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${initialLat}&lon=${initialLon}&exclude=minutely&appid=${API_KEY}&units=metric`
        );
        console.log(res.data, "데이탓탓타!@!@!");

        let isInitialData = res.data.current;
        let isInitialCityName = res.data.timezone;
        let isFeelLikeTemp = isInitialData.feel_like; // 체감온도
        let isTimeOfSunrise = isInitialData.sunrise;
        let isTimeOfSunset = isInitialData.sunset;
        let isLineOfSight = isInitialData.visibility; // 가시거리

        let isProcessedData = [
          { name: "일출시간", value: changeTimeFormatt(isTimeOfSunrise) },
          { name: "일몰시간", value: changeTimeFormatt(isTimeOfSunset) },
          {
            name: "가시거리",
            value:
              String(isLineOfSight).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M",
          },
        ];

        cityName.value = isInitialCityName.split("/")[1];
        feeling.value = Math.round(isFeelLikeTemp);
        subWeatherDatas.value = isProcessedData;
      } catch (err) {
        console.log("😨 에러 발생", err);
      }
    };

    fetchOpenWeatherAPI();

    return {
      currentTime,
      cityName,
      feeling,
      subWeatherDatas,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
.rightContainer {
  // width: 40%;
  // height: 100%;
  width: 324px;
  min-width: 324px;
  height: 700px;
  border-radius: 50px;
  background: linear-gradient(#42d392, #ffffff);
  box-shadow: 5px 5px 10px gray;

  #cityNameBox {
    width: 100%;
    height: 10%;

    .cityName {
      @include c-center;
      width: 100%;
      height: 100%;

      p {
        color: white;
        font-family: "Pretendard Variable", Pretendard, -apple-system,
          BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
          "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
          "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        line-height: 2.5;
        text-align: center;

        &:first-child {
          width: 241px;
          height: 33px;
          font-size: 1.35rem;
          font-weight: 400;
        }
        &:last-child {
          width: 160px;
          height: 19px;
          font-size: 0.9rem;
          font-weight: 300;
        }
      }
    }
  }

  #contentsBox {
    width: 100%;
    height: calc(45% - 16px);
    margin-top: 16px;

    .buttonBox {
      @include center;
      width: 100%;
      height: 20%;

      .buttonBackground {
        width: 224px;
        height: 35px;
        background-color: #35495e;
        border-radius: 10px;
        display: flex;

        button {
          width: 112px;
          height: 35px;
          border: 0;
          border-radius: 7.5px;
          outline: 0;
          cursor: pointer;
          &.forecast {
            background: transparent;
            color: #467599;
          }
          &.forecastDetail {
            background: #42b883;
            box-shadow: 0 0 10px white, 0 0 10px white;
            color: white;
          }
        }
      }
    }
    .weatherBox {
      width: 100%;
      height: 80%;

      .airCondition {
        @include center;
        width: 100%;
        height: 35%;

        p {
          font-size: 3rem;
          font-weight: 500;
          text-align: center;
          font-family: "Pretendard Variable", Pretendard, -apple-system,
            BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
            "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
          color: white;
        }
      }
      .detail {
        width: 100%;
        height: 65%;

        .title {
          @include center;
          width: 100%;
          height: 25%;
          color: white;

          p {
            font-family: "Pretendard Variable", Pretendard, -apple-system,
              BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue",
              "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
              sans-serif;
          }
        }
        .data {
          display: flex;
          width: 100%;
          height: 27.5%;

          .dataName {
            display: flex;
            align-items: center;
            width: 50%;
            height: 100%;
            font-family: "Pretendard Variable", Pretendard, -apple-system,
              BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue",
              "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
              sans-serif;

            p {
              background: rgba(255, 255, 255, 0.786);
              box-shadow: 0 0 10px white, 0 0 10px white;

              &:first-child {
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: #42b883;
                margin-left: 50px;
              }
              &:last-child {
                margin-left: 10px;
                color: #4b6786;
                font-weight: 400;
                font-size: 0.9rem;
                padding: 0.2rem;
                box-shadow: 0 0 10px 0 0 10px rgba(255, 255, 255, 0.786),
                  0 0 10px 0 0 10px rgba(255, 255, 255, 0.786);
                border-radius: 0.4rem;
              }
            }
          }
          .dataValue {
            display: flex;
            align-items: center;
            justify-content: right;
            width: 50%;
            height: 100%;
            font-family: "Pretendard Variable", Pretendard, -apple-system,
              BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue",
              "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
              sans-serif;

            p {
              color: white;
              font-weight: 100;
              margin-right: 50px;

              span {
                font-weight: 300;
                color: #4b6786;
                background: rgba(255, 255, 255, 0.786);
                padding: 0.2rem;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.786),
                  0 0 10px rgba(255, 255, 255, 0.786);
                border-radius: 0.4rem;
              }
            }
          }
        }
      }
    }
  }

  nav {
    @include center-sb;
    width: calc(100% - 100px);
    height: 10%;
    padding: 0 50px;

    i {
      color: #35495e;
      font-size: 1.15rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: #42b883;
      }
    }
  }
}
</style>
