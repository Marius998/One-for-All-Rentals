<template>
  <div>
    <GmapMap
      class="gmap"
      :center="{lat:50.946256, lng:6.897077}"
      :zoom="16"
      map-type-id="terrain"
      :options="{
   zoomControl: false,
   mapTypeControl: false,
   scaleControl: false,
   streetViewControl: false,
   rotateControl: false,
   fullscreenControl: false,
   disableDefaultUi: false
 }"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>


<script>
export default {};
</script>



<style scoped>
.gmap {
  width: 100vw;
  height: 100vh;
}
</style>


