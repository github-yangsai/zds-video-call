<template>
  <div id="all_container">
    <div
      id="top_box"
      class="top_container layout_box single"
      :class="{'high':currentVideo==id1}"
      v-if="videoFlag1"
      data-single
    >
      <video-all :id="id1"></video-all>
    </div>
    <div
      id="bottom_box"
      class="bottom_container layout_box"
      :class="{'high':currentVideo==id2}"
      v-if="videoFlag2"
    >
      <video-all :id="id2"></video-all>
    </div>

    <!--接听框-->
    <ring-answer :flag="ringFlag" @close="closeAnswer" @join="joinCall"></ring-answer>
    <!-- <Modal v-model="ringFlag" width="360">
      <p slot="header" style="color:#f60;text-align:center">新提醒</p>
      <div>
        <p>您有视频通话接入</p>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="error" @click="joinCall">立即接听</Button>
      </div>
    </Modal>-->
  </div>
</template>

<script>
import videoAll from "@/views/videoAll";
import ringAnswer from "@/components/ringAnswer";
import io from "socket.io-client";
export default {
  name: "mainFrame",
  components: {
    videoAll,
    ringAnswer
  },
  data() {
    return {
      ringFlag: false,
      videoFlag1: false,
      videoFlag2: false,
      id1: "",
      id2: "",
      socket: null
    };
  },
  mounted() {
    this.initSocket();
    this.seatInAsync();
  },
  computed: {
    currentVideo() {
      return this.$store.state.videoBody.currentVideo;
    }
  },
  watch: {},
  methods: {
    closeAnswer() {
      this.ringFlag = false;
    },
    initSocket() {
      if (this.socket) {
        return;
      }
      let params = "";
      const currentChat = JSON.parse(sessionStorage.getItem("currentChat"));
      // if (currentChat && currentChat.caseId) {  // 刷新页面，重连
      //   params = [
      //     `caseId=${currentChat.caseId}`,
      //     `customerId=${currentChat.customerId}`
      //   ].join('&');
      //   this.$store.dispatch(ChatActions.setCurrentChat(currentChat));
      // }
      let token = sessionStorage.getItem("token");
      this.socket = io(`http://192.168.16.90:8001?access_token=${token}`);
      this.isStartingSocket = true;
      setTimeout(() => {
        this.isStartingSocket = false;
      }, 3000);
      this.startSocket();
    },
    startSocket() {
      this.socket.on("connect", () => {
        this.$store.commit("setSocket", this.socket);
        this.$store.commit("setSocketStatus", 1);
        this.socket.on("Disconnect", () => {
          this.$Message.error("账号在其它设备登录，当前登录被踢出");
          // if (this.isReceipting) {
          //   this.messageService.publishCloseVideo();
          // } else {
          //   this.messageService.publishLogout();
          // }
        });
        this.watchSocket();
      });
    },
    watchSocket() {
      if (!this.socket._callbacks.$IncomingCall) {
        this.socket.on("IncomingCall", chat => {
          console.log("来电了", chat);
          if (!chat.videoType) {
            chat.videoType = "Agora";
          }
          this.showRing(chat);
        });
      }
      //对方结束通话或取消
      if (!this.socket._callbacks.$CancelCall) {
        this.socket.on("CancelCall", chat => {
          console.log("对方取消了", chat);
          sessionStorage.setItem("currentChat", JSON.stringify(chat));
          this.closeAnswer();
          let _this = this;
          //重新入席，进入空闲状态
          setTimeout(() => {
            _this.seatInAsync();
          }, 1000);
        });
      }
    },
    seatInAsync() {
      sessionStorage.setItem("isSeatIn", "true");
      return this.$api.common.seatIn().then(res => {});
    },
    showRing(chat) {
      const stringChat = chat ? JSON.stringify(chat) : "";
      sessionStorage.setItem("currentChat", stringChat);
      this.ringFlag = true;
    },
    joinCall() {
      const currentChat = JSON.parse(sessionStorage.getItem("currentChat"));
      //向客户发送本地ID
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      const localId = currentUser.id;
      const customerId = currentChat.customerId;
      this.socket.emit(
        "SendMessageToUserById",
        customerId,
        "InspectorId",
        localId
      );
      let randomId = Math.floor(Math.random() * 10 + 1);
      let item = {
        id: "",
        chat: [],
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
            appID: "8686a594400c46da93b0dcc34ad98a6b",
            channel: "12",
            uid: 2222,
            token: ""
          }
        }
      };

      if (!this.videoFlag1) {
        item.id = currentChat.caseId;
        item.video.option.channel = currentChat.caseId;
        item.video.option.uid = 2222;
        this.$store.commit("setData", item);
        this.id1 = item.id;
        this.videoFlag1 = true;
        return false;
      }
      if (!this.videoFlag2) {
        item.video.option.uid = 3333;
        item.id = currentChat.caseId;
        item.video.option.channel = currentChat.caseId;
        this.$store.commit("setData", item);
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
