<template>
  <div id="all_container">
    <div id="top_box" class="top_container layout_box" :class="{'high':currentVideo==1}">
      <video-all :id="1"></video-all>
    </div>
    <div id="bottom_box" class="bottom_container layout_box" :class="{'high':currentVideo==2}">
      <video-all :id="2"></video-all>
    </div>
  </div>
</template>

<script>
import videoAll from "@/views/videoAll";
export default {
  name: "mainFrame",
  components: {
    videoAll
  },
  data() {
    return {
    };
  },
  mounted() {
    
  },
  computed: {
    currentVideo() {
      return this.$store.state.videoBody.currentVideo;
    },
    data1(){
      return this.$store.state.videoBody.data1;
    },
    data2(){
      return this.$store.state.videoBody.data2;
    }
  },
  methods:{
  }
};
</script>

<style scoped>
.layout_box {
  position: fixed;
  width: 100%;
  height: 50%;
  left: 0;
  top: 0;
  z-index: 1;
}
.bottom_container {
  top: auto;
  bottom: 0;
}
.layout_box.high {
  z-index: 2;
}
</style>
