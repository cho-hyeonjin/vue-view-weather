<template>
  <div class="leftContainer">
    <div id="cityNameBox">
      <div class="cityName">
        <p>서울</p>
        <p>2024. 01.26. 금</p>
      </div>
    </div>
    <div id="contentsBox">
      <div class="buttonBox">
        <div class="buttonBackground">
          <button class="forecast">일기예보</button>
          <button class="airquality">대기질</button>
        </div>
      </div>
      <div class="weatherBox">
        <div class="weatherDegree">
          <p>-2&deg;</p>
        </div>
        <div class="weatherIcon">
          <img src="~/assets/images/d_sunny.png" alt="d_sunny" />
        </div>
        <div class="weatherData">
          <div>
            <p>상세 데이터 타이틀</p>
            <p>상세 데이터 내용</p>
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
            <img src="~/assets/images/d_sunnycloudy.png" alt="d_sunnycloudy" />
          </div>
          <div class="data">
            <p class="time">10시</p>
            <p class="currentDegree">-2&deg;</p>
            <div>
              <img src="~/assets/images/humidity_2.png" alt="humidity_2" />
              <p class="fall">20%</p>
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
export default {};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";
.leftContainer {
  width: 324px;
  min-width: 324px;
  height: 700px;
  border-radius: 50px;
  background: linear-gradient(#647eff, #42d392);
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
        // font-family: "Poppins", sans-serif;
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
        }
        &:last-child {
          width: 160px;
          height: 19px;
          font-size: 0.9rem;
          font-weight: 100;
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
        background-color: #2d4d65;
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
            background-color: #42d392;
            color: white;
          }
          &.airquality {
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
        height: 60%;

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
          // 레이아웃이 3개이기 때문에 동일한 레이아웃을 반복시킴을 알 수 있다.
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
              font-weight: 300;
              // font-family: "Noto Sans KR", sans-serif;
              font-family: "Pretendard Variable", Pretendard, -apple-system,
                BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue",
                "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
                "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji",
                "Segoe UI Symbol", sans-serif;
              color: #799ed0;
            }
            &:last-child {
              font-size: 1rem;
              font-weight: 200;
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
        font-weight: 400;
        font-size: 0.8rem;
        color: white;
        text-align: center;

        &:last-child {
          font-weight: 400;
          font-size: 0.8rem;
          color: #2d4d65;
          cursor: pointer;
          margin-bottom: 2px;
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
        background-color: #2d4d65e3;
        border-radius: 20px;
        margin-left: 15px;

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
              font-size: 0.8rem;
              font-weight: 200;
              margin-top: 7.5px;
            }

            &.currentDegree {
              font-size: 1.2rem;
              margin-top: 7.5px;
            }
          }

          div {
            @include center;
            width: 100%;
            height: 33.33%;

            img {
              height: 55%;
            }
            .fall {
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
      color: rgb(255, 255, 255);
      font-size: 1.15rem;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: #799ed0;
      }
    }
  }
}
</style>