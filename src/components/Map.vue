<template>
  <div id="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      console.log(window.kakao);
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=1abe3fd9e7d01a2b5a77197772575ef3";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      // 지도를 담을 div 컨테이너 가져오기
      var mapContainer = document.getElementById("map"),
        mapOption = {
          center: new kakao.maps.LatLng(37.391801, 127.111897833), // 지도의 중심좌표
          level: 4, // 지도의 확대 레벨
        };

      // 카카오맵 api에서 제공하는 Map 메서드로 카카오맵 인스턴스 생성
      var map = new kakao.maps.Map(mapContainer, mapOption);

      // 마커 찍을 spot 설정
      var spots = [
        // 판교역, 낙생육교, 현대백화점
        {
          latlng: new kakao.maps.LatLng(37.391801, 127.111897833),
        },
        // 현대백화점 유플렉스 판교점
        {
          latlng: new kakao.maps.LatLng(37.39219604259419, 127.1117360678519),
        },
        // CGV 판교역
        {
          latlng: new kakao.maps.LatLng(37.39340512542699, 127.11230533189203),
        },
        // 그래비티 서울 판교 오토그래프 컬렉션
        {
          latlng: new kakao.maps.LatLng(37.3932990159967, 127.11016516771728),
        },
        // 라코스테 판교점
        {
          latlng: new kakao.maps.LatLng(37.392022200525936, 127.11215364029101),
        },
        // 현대백화점 판교점 주차장
        {
          latlng: new kakao.maps.LatLng(37.39292178457681, 127.1136597528251),
        },
        // 현대백화점 판교점 후문
        {
          latlng: new kakao.maps.LatLng(37.39219604259419, 127.1117360678519),
        },
        // 판교역
        {
          latlng: new kakao.maps.LatLng(37.394726159, 127.111209047),
        },
        // 판교역 맛의거리
        {
          latlng: new kakao.maps.LatLng(37.39575041751, 127.11134823329),
        },
        // 판교복합단지(판교역)
        {
          latlng: new kakao.maps.LatLng(37.410186099487, 127.142694662432),
        },
        // 백현마을 4단지 아파트
        {
          latlng: new kakao.maps.LatLng(37.39058285384754, 127.1144664583632),
        },
        // 백현마을 6단지 아파트
        {
          latlng: new kakao.maps.LatLng(37.39053051326981, 127.11028533378577),
        },
      ];

      spots.forEach((pos) => {
        var marker = new kakao.maps.Marker({
          map: map,
          position: pos.latlng,
        });
        marker.setMap(map);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

#mapContainer {
  @include center;
  width: 100%;
  height: 35%;
  // background: #42b883;

  #map {
    width: 80%;
    height: 90%;
    border-radius: 10px;
  }
}
</style>
