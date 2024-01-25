<template>
  <div class="wrap">
    <div class="container">
      <MainView />
    </div>
  </div>
</template>

<script>
import MainView from "../components/MainView.vue";

export default { components: { MainView } };
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

.wrap {
  // main.css (전역 css)의 @mixin center 객체를 상속하는 느낌
  @include center;
  width: 100%;
  height: 100vh;
  font-size: 16px;

  // scss는 html에서 태그 안에 태그를 작성하면 부모-자식 관계로 상속 관계가 성립되는 것과 같이 작동한다.
  // 아래에서처럼 .wrap 클래스 내부에 .container 클래스에 해당하는 css객체를 만들어주면
  // .container는 .wrap의 내용을 상속받는다.
  .container {
    @include center-sb;
    width: 55%;
    height: 90%;
    min-width: 1920px;
    max-height: 1354px;
  }
}
</style>
