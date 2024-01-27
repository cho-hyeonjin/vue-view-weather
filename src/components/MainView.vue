<template>
  <div class="leftContainer">
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
        <div class="weatherDegree">
          <p>{{ currentTemp }}&deg;</p>
        </div>
        <div class="weatherIcon">
          <!-- icon 들은 v-bind 문법 써서 서버 weather code 데이터와 동적으로 매핑할 예정 -->
          <!-- <img src="~/assets/icons/50n.svg" alt="weatherIcon" /> -->
          <img :src="currentWeatherIconSrc" alt="weatherIcon" />
        </div>
        <div class="weatherData">
          <div
            v-for="temporary in temporaryData"
            :key="temporary.title"
            class="detailData"
          >
            <p>{{ temporary.title }}</p>
            <p>{{ temporary.value }}</p>
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
        <div
          class="timelyWeather"
          v-for="(hourlyData, idx) in hourlyDatas"
          :key="idx"
        >
          <!-- <div class="icon"><img src=/icons/02d.svg alt="02d" /></div> -->
          <div class="icon">
            <img :src="hourlyWeatherIconSrcs[idx]" alt="hourlyWeatherIcon" />
          </div>
          <div class="data">
            <p class="time">{{ changeTimeFormatt(hourlyData.dt) }}</p>
            <p class="currentDegree">{{ Math.round(hourlyData.temp) }}&deg;</p>
            <div>
              <img src="~/assets/images/drop.png" alt="drop" />
              <p class="drop">{{ hourlyData.humidity }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav>
      <i class="fas fa-home"></i>
      <i class="fas fa-search-location"></i>
      <i class="fas fa-chart-line"></i>
      <i class="fas fa-cog"></i>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export default {
  data() {
    return {
      cityName: "",
      currentTime: dayjs().format("YYYY. MM. DD. ddd"),
      currentTemp: "",
      hourlyDatas: [],
      hourlyWeatherIconSrcs: [],
      temporaryData: [
        { title: "습도", value: "60%" },
        { title: "풍속", value: "10m/s" },
        { title: "체감 온도", value: "℃" },
      ],
      currentWeatherIconSrc: "",
    };
  },
  async created() {
    // OpenWeather API
    const API_KEY = "d871e7c1912d25a3ef6ea56cdb0ab074";
    let initialLat = 37.391801;
    let initialLon = 127.111897833;
    axios
      .get(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${initialLat}&lon=${initialLon}&exclude=minutely&appid=${API_KEY}&units=metric`
      )
      .then((res) => {
        this.cityName = res.data.timezone.split("/")[1]; // 대륙명 삭제
        this.currentTemp = Math.round(res.data.current.temp);
        this.temporaryData[0].value = res.data.current.humidity + "%"; // 현재 습도
        this.temporaryData[1].value = res.data.current.wind_speed + "m/s"; // 현재 풍속
        this.temporaryData[2].value =
          Math.round(res.data.current.feels_like) + "℃"; // 현재 체감온도

        // 데이터 바인딩을 위한 openWeather API Response 데이터 파싱
        for (let i = 0; i < 24; i++) {
          this.hourlyDatas[i] = res.data.hourly[i];
          this.hourlyWeatherIconSrcs[
            i
          ] = `/icons/${res.data.hourly[i].weather[0].icon}.svg`;
        }
        this.currentWeatherIconSrc = `/icons/${res.data.current.weather[0].icon}.svg`;
      })
      .catch((err) => console.log("😨에러발생:", err));
  },
  methods: {
    // unixType 타임 변경 메서드
    changeTimeFormatt(unixtime) {
      const millisec = unixtime * 1000;
      let date = new Date(millisec);
      let hour = "" + date.getHours();
      const formatted = hour.substring(-2).padStart(2, "0");
      return formatted + " 시";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
.leftContainer {
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
    height: 62.5%;

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
            background: #42b883;
            box-shadow: 0 0 10px white, 0 0 10px white;
            color: white;
          }
          &.forecastDetail {
            background: transparent;
            color: #467599;
          }
        }
      }
    }

    .weatherBox {
      width: 100%;
      height: 80%;

      .weatherDegree {
        @include center;
        width: 100%;
        height: 15%;
        margin: 0.5rem 0;

        p {
          font-size: 3.5rem;
          font-weight: 500;
          // font-family: "Be Vietnam Pro", sans-serif;
          font-family: "Pretendard Variable", Pretendard, -apple-system,
            BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
            "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
            "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
          color: white;
        }
      }
      .weatherIcon {
        @include center;
        width: 100%;
        height: 50%;

        img {
          height: 160px;
        }
      }
      .weatherData {
        display: flex;
        width: 100%;
        height: 25%;

        .detailData {
          @include c-center;
          width: 33.33%;
          height: 100%;
          &:nth-child(1) {
            margin-left: 10px;
          }
          &:nth-child(2) {
            margin-left: 0 -10px;
          }
          &:nth-child(3) {
            margin-right: 10px;
          }

          p {
            line-height: 1.5;
            color: white;

            &:first-child {
              font-size: 1rem;
              font-weight: 400;
              // font-family: "Noto Sans KR", sans-serif;
              font-family: "Pretendard Variable", Pretendard, -apple-system,
                BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue",
                "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
                "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
                "Segoe UI Symbol", sans-serif;
              color: #799ed0;
            }
            &:last-child {
              // color: #799ed0;
              color: #4b6786;
              font-size: 1rem;
              font-weight: 300;
              // font-family: "Poppins", sans-serif;
              font-family: "Pretendard Variable", Pretendard, -apple-system,
                BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue",
                "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
                "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
                "Segoe UI Symbol", sans-serif;
            }
          }
        }
      }
    }
  }

  #todayWeather {
    width: 100%;
    height: 17.5%;

    .textBox {
      @include center-sb;
      width: calc(100% - 70px);
      height: 35%;
      padding: 0 35px;
      // font-family: "Noto Sans KR", sans-serif;
      font-family: "Pretendard Variable", Pretendard, -apple-system,
        BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
        "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;

      p {
        font-weight: 600;
        font-size: 0.8rem;
        color: #4b6786;
        text-align: center;
        padding: 0.3rem;
        cursor: pointer;

        &:first-child {
          border-radius: 0.4rem;
          background: white;
          box-shadow: 0 0 15px white, 0 0 15px white, 0 0 15px white;
        }

        &:last-child {
          font-weight: 400;
          font-size: 0.8rem;
          color: #799ed0;
          margin-bottom: 2px;
        }

        &:hover {
          color: #4b6786;
          font-weight: 600;
          transition: all 0.3s;
        }
      }
    }
    .timelyWeatherBox {
      display: flex;
      align-items: center;
      width: calc(100% - 70px);
      height: 65%;
      padding: 0 30px;
      overflow: scroll;

      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }

      .timelyWeather {
        display: flex;
        width: 126px;
        min-width: 126px;
        height: 70px;
        background-color: #42b883;
        border-radius: 20px;
        margin-left: 15px;
        padding: 0 2px;

        &:first-child {
          margin-left: 0;
        }

        .icon {
          @include center;
          width: 45%;
          height: 100%;

          img {
            width: 100%;
          }
        }
        .data {
          @include c-center-se;
          width: 55%;
          height: 100%;

          p {
            color: whitesmoke;
            // font-family: "Poppins", sans-serif;
            font-family: "Pretendard Variable", Pretendard, -apple-system,
              BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue",
              "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
              "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
              sans-serif;
            text-align: center;

            &.time {
              font-size: 0.9rem;
              font-weight: 200;
              margin-top: 7.5px;
            }

            &.currentDegree {
              font-size: 1.2rem;
              margin-top: 0.2rem;
            }
          }

          div {
            @include center;
            width: 100%;
            height: 33.33%;

            img {
              height: 60%;
              margin-right: 0.2rem;
            }
            .drop {
              font-size: 0.9rem;
              margin-top: 1.5px;
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
