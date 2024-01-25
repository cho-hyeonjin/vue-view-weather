import { createRouter, createWebHashHistory } from "vue-router";
import Home from "~/pages/Home";

export default createRouter({
  // hash모드: 특정 페이지에서 새로고침 했을 때 'Not Found' 와 같은 메시지 렌더링 방지
  history: createWebHashHistory(),
  // pages: page 구분 개념
  routes: [{ path: "/", name: Home, component: Home }],
});
