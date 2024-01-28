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
          <p>{{ feeling }}</p>
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
import Map from "~/components/Map.vue";
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko"); // global로 한국어 locale 사용

export default {
  components: {
    Map,
  },

  setup() {
    // 화면에서 보여질 데이터
    let currentTime = dayjs().format("YYYY. MM. DD. ddd"); // 현재 시간

    let cityName = ref(""); // 도시 이름
    let feeling = ref(""); // 현재 온도에 대한 체감을 나타내는 데이터
    let subWeatherDatas = ref([]); // 상세 날씨 데이터

    // unixType 타임 변경 메서드
    const changeTimeFormatt = (unixtime) => {
      const millisec = unixtime * 1000;
      let date = new Date(millisec);
      let hour = "" + date.getHours();
      const formatted = hour.substring(-2).padStart(2, "0");
      return formatted + " 시";
    };

    // OpenWeatherAPI 호출 함수
    const store = useStore();
    const fetchOpenWeatherAPI = async () => {
      // API 호출을 위한 필수 데이터
      try {
        await store.dispatch("openWeatherAPI/FETCH_OPENWEATHER_API");
        const {
          currentFeelsLike,
          currentSunrise,
          currentSunset,
          currentVisibility,
        } = store.state.openWeatherAPI.currentWeather;

        let isInitialCityName = store.state.openWeatherAPI.cityName; // 초기 도시이름 데이터
        let isFeelLikeTemp = computed(() => {
          return currentFeelsLike;
        }); // 초기 체감온도 데이터
        let isTimeOfSunrise = computed(() => {
          return currentSunrise;
        }); // 일출시간 데이터
        let isTimeOfSunSet = computed(() => {
          return currentSunset;
        }); // 일몰시간 데이터
        let isLineOfSight = computed(() => {
          return currentVisibility;
        }); // 가시거리 데이터

        // 기준점에 따른 Array를 하나 만들고
        // 기준에 따른 메시지에 따른 Array를 하나 만들어서
        // 체감온도 데이터가 탐색을 해서
        // 원하는 값을 뽑는 로직으로 구성

        const pivots = [0, 10, 15, 20, 25, 30];
        const labels = [
          "매우 추움",
          "추움",
          "쌀쌀함",
          "선선함",
          "보통",
          "더움",
          "매우 더움",
        ];

        let index = 0;
        for (const p of pivots) {
          if (isFeelLikeTemp.value <= p) break;
          index++;
        }
        feeling.value = labels[index];

        // 가공한 데이터를 가지고 새로운 배열 생성
        let isProcessedData = [
          { name: "일출시간", value: changeTimeFormatt(isTimeOfSunrise.value) },
          {
            name: "일몰시간",
            value: changeTimeFormatt(isTimeOfSunSet.value),
          },
          {
            name: "가시거리",
            value:
              isLineOfSight.value
                .toString()
                .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "M",
          },
        ];

        // Composition API에서 AJAX요청과 데이터 변경을 하려면 데이터.value로 접근해야한다.
        cityName.value = isInitialCityName;
        subWeatherDatas.value = isProcessedData;
      } catch (error) {
        console.log(error);
        // alert('API가 제대로 호출되지 않았습니다.');
      }
    };

    watchEffect(async () => {
      await fetchOpenWeatherAPI();
    });

    onMounted(() => {
      fetchOpenWeatherAPI();
    });

    return {
      cityName,
      currentTime,
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
          font-size: 2.5rem;
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
          font-weight: 400;

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
