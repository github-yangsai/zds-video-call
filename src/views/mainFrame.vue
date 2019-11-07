<template>
  <div id="all_container">
    <div
      id="top_box"
      class="top_container layout_box"
      :class="{'high':currentVideo==1}"
      v-if="videoFlag1"
    >
      <video-all :id="id1"></video-all>
    </div>
    <div
      id="bottom_box"
      class="bottom_container layout_box"
      :class="{'high':currentVideo==2}"
      v-if="videoFlag2"
    >
      <video-all :id="id2"></video-all>
    </div>

    <!--接听框-->
    <Modal v-model="ringFlag" width="360">
      <p slot="header" style="color:#f60;text-align:center">新提醒</p>
      <div>
        <p>您有视频通话接入</p>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="error" @click="joinCall">立即接听</Button>
      </div>
    </Modal>
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
      ringFlag: true,
      videoFlag1: false,
      videoFlag2: false,
      id1:"",
      id2:""
    };
  },
  mounted() {
  },
  computed: {
    currentVideo() {
      return this.$store.state.videoBody.currentVideo;
    }
  },
  methods: {
    joinCall() {
      let randomId = Math.floor(Math.random() * 10 + 1);
      let item = {
        id: randomId,
        chat: [{ role: "client", msg: "你好，我想问下..." }],
        photosCategory: [],
        video: {
          id: randomId,
          muteFlag: false,
          rtc: {
            client: null,
            joined: false,
            published: false,
            localStream: null,
            remoteStreams: [],
            params: {}
          },
          option: {
            mode: "rtc",
            codec: "h264",
            appID: "4f74b5716ed346c597e476932b878962",
            channel: "12",
            uid: 2222,
            token: ""
          }
        }
      };
      this.$store.commit("setData", item);
      if (!this.videoFlag1) {
        this.id1 = item.id;
        this.videoFlag1 = true;
        setTimeout(()=>{
          this.ringFlag = true;
        },5000)
        this.ringFlag = false;
        return false;
      }
      if (!this.videoFlag2) {
        this.id2 = item.id;
        this.videoFlag2 = true;
        this.ringFlag = false;
      }
    }
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
