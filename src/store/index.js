import { createStore } from "vuex";
import openWeatherAPI from "./openWeatherAPI.js";

export default createStore({
  modules: {
    openWeatherAPI,
  },
});
