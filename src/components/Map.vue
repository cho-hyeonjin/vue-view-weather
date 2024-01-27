<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

#mapContainer {
  @include center;
  width: 100%;
  height: 35%;
  background: #35495e;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>
