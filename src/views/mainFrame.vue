<template>
  <div id="all_container">
    <div
      id="top_box"
      class="top_container layout_box"
      :class="{'high':currentVideo==id1}"
      v-if="videoFlag1"
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
      signalr: null
    };
  },
  mounted() {
    this.initSignalr();
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
    initSignalr() {
      if (this.signalr) {
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
      // this.signalr = $.hubConnection(`http://192.168.16.90:8001/RemoteFunctionHub?${params}`)
      const signalR = require("@aspnet/signalr");
      this.signalr = new signalR.HubConnectionBuilder()
        .withUrl(`/RemoteFunctionHub?${params}`, {
          accessTokenFactory: () => {
            // 身份验证和授权
            return sessionStorage.getItem("token");
          }
        })
        .build();
      this.signalr.serverTimeoutInMilliseconds = 1000 * 3600 * 16; // 超时时间
      // 处理：刚连接signalr，就收到断开消息
      this.isStartingSignalr = true;
      setTimeout(() => {
        this.isStartingSignalr = false;
      }, 3000);
      this.startSignalr();

      this.signalr.onclose(() => {
        console.log("signalr断开了...");
        if (this.isStartingSignalr) {
          this.startSignalr();
          return;
        }
        this.$store.commit("setSignalr", null);
        this.$store.commit("setSignalrStatus", 0);
      });
    },
    startSignalr() {
      this.signalr
        .start()
        .catch(err => console.log("signalr err", err))
        .then(() => {
          console.log("----signalr is ready");
          this.signalr.send(
            "SendMessageToUserById",
            "customerId",
            "EvidenceSuggestion",
            "message"
          );
          this.signalr.on("Disconnect", () => {
            this.$Message.error("账号在其它设备登录，当前登录被踢出");
            // if (this.isReceipting) {
            //   this.messageService.publishCloseVideo();
            // } else {
            //   this.messageService.publishLogout();
            // }
          });
          this.$store.commit("setSignalr", this.signalr);
          this.$store.commit("setSignalrStatus", 1);
          this.watchSignalr();
        });
    },
    watchSignalr() {
      //来电
      this.signalr.on("IncomingCall", chat => {
        debugger;
        console.log("来电了", chat);
        if (!chat.videoType) {
          chat.videoType = "Agora";
        }
        this.showRing(chat);
      });
      //对方结束通话或取消
      this.signalr.on("CancelCall", chat => {
        console.log("对方取消了", chat);
        // this.closeAnswer();
      });
    },
    showRing(chat) {
      const stringChat = chat ? JSON.stringify(chat) : "";
      sessionStorage.setItem("currentChat", stringChat);
      this.ringFlag = true;
    },
    joinCall() {
      const currentChat = JSON.parse(sessionStorage.getItem("currentChat"));
      console.log("来电数据", currentChat);
      let randomId = Math.floor(Math.random() * 10 + 1);
      let item = {
        id: "",
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
            appID: "15d94f5f8aa445f8873c6457bae910aa",
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
        // setTimeout(() => {
        //   this.ringFlag = true;
        // }, 5000);
        // this.ringFlag = false;
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
