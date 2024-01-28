import axios from "axios";

export default {
  // namespaced 속성은 하나의 store에서 모듈화 하여 사용될 수 있는지 없는지에 대해 명시적으로 나타내는 속성.
  namespaced: true,

  state: {
    position: {
      lat: 36.73035,
      lon: 127.967487,
    },
    cityName: "Seoul",
    currentWeather: {
      currentTemp: 0,
      currentHumidity: 0,
      currentWindSpeed: 0,
      currentFeelsLike: 0,
      currentSunrise: 0,
      currentSunset: 0,
      currentVisibility: 0,
      currentWeatherIconCodeSrc: "",
    },
    hourlyWeather: [],
    images: [],
  },

  getter: {},

  mutations: {
    SET_LATLON(state, payload) {
      state.position.lat = payload.Ma;
      state.position.lon = payload.La;
    },
    SET_CITYNAME(state, payload) {
      state.cityName = payload;
    },
    SET_CURRENT_WEATHER(state, payload) {
      state.currentWeather.currentTemp = Math.round(payload.temp); // 현재온도
      state.currentWeather.currentHumidity = payload.humidity; // 습도
      state.currentWeather.currentWindSpeed = payload.wind_speed; // 풍속
      state.currentWeather.currentFeelsLike = Math.round(payload.feels_like); // 체감온도
      state.currentWeather.currentSunrise = payload.sunrise; // 일출시간
      state.currentWeather.currentSunset = payload.sunset; // 일몰시간
      state.currentWeather.currentVisibility = payload.visibility; // 가시거리
      // state.currentWeather.currentWeatherIconCodeSrc = payload.weather[0].icon; // 날씨 아이콘 코드
      // `/icons/${res.data.current.weather[0].icon}.svg`
      // `/icons/${payload.weather[0].icon}.svg`
      state.currentWeather.currentWeatherIconCodeSrc = `/icons/${payload.weather[0].icon}.svg`; // 날씨 아이콘 코드
    },
    SET_TIMELY_WEATHER(state, payload) {
      state.hourlyWeather = payload;
    },
    SET_IMAGEPATH(state, payload) {
      state.images = payload;
    },
  },

  actions: {
    async FETCH_OPENWEATHER_API(context) {
      // OpenWeather API
      const API_KEY = "d871e7c1912d25a3ef6ea56cdb0ab074";
      let initialLat = context.state.position.lat;
      let initialLon = context.state.position.lon;

      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${initialLat}&lon=${initialLon}&exclude=minutely&appid=${API_KEY}&units=metric`
        );
        const images = new Array();
        for (let i = 0; i < 48; i++) {
          const weatherIcon = res.data.hourly[i].weather[0].icon;
          images[i] = `/icons/${weatherIcon}.svg`;
        }
        context.commit("SET_IMAGEPATH", images);
        context.commit("SET_CURRENT_WEATHER", res.data.current);
        context.commit("SET_TIMELY_WEATHER", res.data.hourly);
      } catch (error) {
        console.log("😨에러발생:", error);
      }
    },
  },
};
