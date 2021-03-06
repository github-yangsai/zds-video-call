<template>
  <div class="video_container" :class="{'large':largeScreen}">
    <div class="video_box">
      <div class="video_info">
        <span>客户：{{ basicInfo.name }}</span>
        <span>ID:12222</span>
      </div>
      <div class="video_body">
        <div class="speed_info">
          <span>上行：100kb/s</span>
          <span>下行：100kb/s</span>
          <span>上次处理人：{{currentChat.lastOperator }}</span>
        </div>

        <div class="video_content">
          <div class="video-grid clearfix" :id="'video'+id">
            <div class="video-view">
              <div id="local_stream" class="video-placeholder"></div>
              <div id="local_video_info" class="video-profile hide"></div>
              <div id="video_autoplay_local" class="autoplay-fallback hide"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="video_bar clearfix">
        <div class="bar_l">
          <Button
            type="error"
            icon="md-square"
            :size="largeScreen?'default':'small'"
            @click="leave"
          >结束通话</Button>
        </div>
        <div class="bar_r clearfix">
          <a
            href="javascript:void(0)"
            class="photo_btn"
            @click="takePicture"
            :class="{'disabled':takePictureDisabled}"
          >
            <Icon type="md-camera" />
          </a>
          <a
            href="javascript:void(0)"
            class="mic_btn"
            :class="{'mute':muteFlag}"
            @click="ctrolAudio"
          >
            <Icon type="ios-mic" v-if="!muteFlag" />
            <Icon type="ios-mic-off" v-if="muteFlag" />
          </a>
          <div class="screen_btn">
            <a
              href="javascript:void(0)"
              :class="{'current':largeScreen}"
              @click="switchScreen('large')"
            >大屏</a>
            <a
              href="javascript:void(0)"
              :class="{'current':!largeScreen}"
              @click="switchScreen('small')"
            >小屏</a>
          </div>
        </div>
      </div>
    </div>
    <change-status :flag="statusFlag" @close="closeStatus" source="video"></change-status>
  </div>
</template>
<script>
import AgoraRTC from "agora-rtc-sdk";
import _ from "lodash";
import changeStatus from "@/components/changeStatus";
export default {
  name: "videoBody",
  data() {
    return {
      statusFlag:false,
      isFirstPingPang: true,
      pingPang: {
        pingInterval: null,
        checkInterval: null,
        pingCount: 0,
        pangCount: 0
      },
      muteFlag: false,
      largeScreen: false,
      isCalling: true,
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
        appID: "",
        channel: "",
        uid: 1,
        token: ""
      },
      resolutions: [
        {
          name: "default",
          value: "default"
        },
        {
          name: "480p",
          value: "480p"
        },
        {
          name: "720p",
          value: "720p"
        },
        {
          name: "1080p",
          value: "1080p"
        }
      ],
      submitStatusFlag: false
    };
  },
  components: {
    changeStatus
  },
  props: ["id"],
  computed: {
    takePictureDisabled() {
      return this.$store.state.videoBody.takePicDisabled;
    },
    video() {
      let data = this.$store.state.videoBody.data.filter(item => {
        return item.id == this.id;
      });
      if (data[0]) {
        return data[0].video;
      } else {
        return {};
      }
    },
    socket() {
      return this.$store.state.videoBody.socket;
    },
    currentChat() {
      let currentChat = sessionStorage.getItem("currentChat");
      if (currentChat) {
        return JSON.parse(currentChat);
      } else {
        return {};
      }
    },
    basicInfo() {
      let data = this.$store.state.videoBody.data;
      let _this = this;
      let result = _.find(data, item => {
        return item.id == _this.id;
      });
      return result.basicInfo ? result.basicInfo : {};
    }
  },
  created() {},
  mounted() {
    this.rtc = this.video.rtc;
    this.option = this.video.option;
    let resolutions = this.resolutions;
    this.getDevices(function(devices) {
      devices.audios.forEach(function(audio) {
        $("<option/>", {
          value: audio.value,
          text: audio.name
        }).appendTo("#microphoneId");
      });
      devices.videos.forEach(function(video) {
        $("<option/>", {
          value: video.value,
          text: video.name
        }).appendTo("#cameraId");
      });
      resolutions.forEach(function(resolution) {
        $("<option/>", {
          value: resolution.value,
          text: resolution.name
        }).appendTo("#cameraResolution");
      });
      // M.AutoInit();
    });
    this.join();
    this.notifyServerConnected();
  },
  watch: {
    socket(socket) {
      if (!socket) {
        return;
      }
      let _that = this;
      // 在视频中，意外退出，又返回，不必等待'StartPing'消息, 直接开始pingpang
      if (JSON.parse(sessionStorage.getItem("isInChannel"))) {
        if (_that.isFirstPingPang) {
          console.log("===start pingpang isInChannel");
          _that.isFirstPingPang = false;
          _that.startPingPang();
        }
        // 客户端已准备好，开始pingPang
      } else if (!this.socket._callbacks.$StartPing) {
        this.socket.on("StartPing", msg => {
          console.log("===start pingpang");
          _that.isFirstPingPang = false;
          _that.startPingPang();
        });
      }

      // 监听客户重连
      if (!this.socket._callbacks.$Reconnect) {
        this.socket.on("Reconnect", caseId => {
          console.log("------Reconnect:", caseId);
          _that.isShowLeave = false; // 隐藏更改状态modal
          if (_that.timer) {
            clearTimeout(_that.timer);
            _that.timer = null;
            sessionStorage.removeItem("hangupTimer");
          }
        });
      }

      // 监听客户断开（消息来自app端或服务端）
      if (!this.socket._callbacks.$DisconnectMe) {
        this.socket.on("DisconnectMe", () => {
          console.log("------DisconnectMe");
          if (_that.timer) {
            clearTimeout(_that.timer);
            _that.timer = null;
            sessionStorage.removeItem("hangupTimer");
          }
          _that.timer = setTimeout(() => {
            // _that.toLeave();
          }, _that.periodTime);
          sessionStorage.setItem("hangupTimer", new Date().getTime() + "");
        });
      }
    }
  },
  methods: {
    closeStatus(){
      this.statusFlag = false;
    },
    //协勘评价后再跳转页面
    evaluationAfter() {
      // sessionStorage.setItem("currentChat","{}");
      // this.store.dispatch(ChatActions.setCurrentChat({}));
      // this.store.dispatch(TaskActions.selectHistoryTask({}));

      // this.resetPictureRedux();
      // sessionStorage.removeItem("isInChannel");
      // sessionStorage.removeItem("currentChat");
      // if (!this.isRejected) {
      //   // 非异地踢出
      //   this.router.navigate(["/main/desktop/waiting/histories"], {
      //     queryParams: { page: 1, registNo: this._registNo }
      //   });
      //   this.notifyServerUnconnected();
      // }
    },
    takePicture() {
      if (this.takePictureDisabled) {
        return false;
      }
      //截图
      console.log("take a picture");
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      const localId = currentUser.id;
      const customerId = this.currentChat.customerId;
      this.socket.emit(
        "SendMessageToUserById",
        customerId,
        "TakePhoto",
        localId
      );
      this.$store.commit("setButtonDisabled", true);
      setTimeout(() => {
        this.$store.commit("setButtonDisabled", false);
      }, 3000);
    },
    ctrolAudio() {
      let rtc = this.rtc;
      let _this = this;
      if (rtc.published) {
        rtc.client.unpublish(rtc.localStream, function(err) {
          _this.$Message.error("取消发布失败");
          return false;
        });
        rtc.published = false;
        // _this.$store.commit("setVideoData",{id:_this.id,muteFlag:true});
        _this.muteFlag = true;
      } else {
        rtc.client.publish(rtc.localStream, function(err) {
          _this.$Message.error("发布失败");
          return false;
        });
        rtc.published = true;
        // _this.$store.commit("setVideoData",{id:_this.id,muteFlag:false});
        _this.muteFlag = false;
      }
    },

    switchScreen(type) {
      //切换大小屏
      this.$store.commit("setCurrentVideo", this.id);
      if (type == "large") {
        if (this.largeScreen) {
          this.$Message.info("当前已经是大屏");
          return false;
        }
        this.largeScreen = true;
      } else {
        if (!this.largeScreen) {
          this.$Message.info("当前已经是小屏");
          return false;
        }
        this.largeScreen = false;
      }
    },
    join() {
      let _this = this;
      let rtc = this.rtc;
      let option = this.option;
      if (!this.option.channel) {
        this.$Message.warning("请输入房间号");
        return false;
      }
      if (rtc.joined) {
        this.$Message.warning("您已加入");
        return;
      }

      /**
       * A class defining the properties of the config parameter in the createClient method.
       * Note:
       *    Ensure that you do not leave mode and codec as empty.
       *    Ensure that you set these properties before calling Client.join.
       *  You could find more detail here. https://docs.agora.io/en/Video/API%20Reference/web/interfaces/agorartc.clientconfig.html
       **/
      rtc.client = AgoraRTC.createClient({
        mode: option.mode,
        codec: option.codec
      });

      // 开启云代理
      // rtc.client.startProxyServer();

      rtc.params = option;

      // handle AgoraRTC client event
      this.handleEvents(rtc);

      // init client
      rtc.client.init(
        option.appID,
        function() {
          console.log("init success");
          rtc.client.join(
            option.token ? option.token : null,
            option.channel,
            option.uid ? +option.uid : null,
            function(uid) {
              _this.rtc.joined = true;
              _this.$Message.success("加入房间: " + option.channel + " 成功!");
              rtc.params.uid = uid;
              // create local stream
              rtc.localStream = AgoraRTC.createStream({
                streamID: rtc.params.uid,
                audio: true,
                video: true,
                screen: false,
                microphoneId: option.microphoneId,
                cameraId: option.cameraId
              });
              //设置视频属性
              rtc.localStream.setVideoEncoderConfiguration({
                // 视频分辨率
                resolution: {
                  width: 1280,
                  height: 720
                },
                // 视频编码帧率。通常建议是 15 帧，不超过 30 帧
                frameRate: {
                  min: 15,
                  max: 30
                },
                // 码率。我们建议参考下面的视频属性参考表进行设置
                bitrate: {
                  min: 1130,
                  max: 5000
                }
              });
              rtc.localStream.setVideoProfile("720p");
              // init local stream
              rtc.localStream.init(
                function() {
                  console.log("init local stream success");
                  // play stream with html element id "local_stream"
                  rtc.localStream.play("local_stream", { fit: "contain" });

                  rtc.localStream.disableVideo(); //禁用本地视频
                  // publish local stream
                  _this.publish(rtc);
                },
                function(err) {
                  _this.$Message.error(
                    "stream init failed, please open console see more detail"
                  );

                  console.error("init local stream failed ", err);
                }
              );
            },
            function(err) {
              _this.$Message.error(
                "client join failed, please open console see more detail"
              );
              console.error("client join failed", err);
            }
          );
        },
        err => {
          _this.$Message.error(
            "client init failed, please open console see more detail"
          );
          console.error(err);
        }
      );
    },
    leave() {
      let _this = this;
      let rtc = this.rtc;
      if (!rtc.client) {
        _this.$Message.warning("请先加入房间!");
        return;
      }
      if (!rtc.joined) {
        _this.$Message.warning("你已不在房间");
        return;
      }
      /**
       * Leaves an AgoraRTC Channel
       * This method enables a user to leave a channel.
       **/
      rtc.client.leave(
        function() {
          // stop stream
          rtc.localStream.stop();
          // close stream
          rtc.localStream.close();
          // 关闭云代理服务
          _this.stopProxyServer(rtc.client);
          while (rtc.remoteStreams.length > 0) {
            var stream = rtc.remoteStreams.shift();
            var id = stream.getId();
            stream.stop();
            _this.removeView(id);
          }
          rtc.localStream = null;
          rtc.remoteStreams = [];
          rtc.client = null;
          console.log("客户离开房间成功");
          rtc.published = false;
          _this.rtc.joined = false;
          _this.$store.commit("setVideoData", {
            id: _this.id,
            muteFlag: false
          });
          _this.muteFlag = false;
          _this.$Message.success("挂断成功");
          _this.largeScreen = false;
          _this.isCalling = false;
          _this.notifyCustomerDisconnect();
          _this.notifyServerUnconnected();
          _this.closeVideo();
        },
        function(err) {
          _this.$Message.error("离开房间失败");
          // 关闭云代理服务
          _this.stopProxyServer(rtc.client);
        }
      );
    },
    closeVideo() {
      this.$store.commit("setVideoData", { id: this.id, clear: true });
    },
    // 通知服务端，已连接客户
    notifyServerConnected() {
      let currentChat = JSON.parse(sessionStorage.getItem("currentChat"));
      const body = _.pick(currentChat, ["caseId", "customerId"]);
      this.$api.common.sessionConnected(body).then(res => {});
    },

    // 通知服务端，已与客户断开
    notifyServerUnconnected() {
      let currentChat = JSON.parse(sessionStorage.getItem("currentChat"));
      const params = [
        `caseId=${currentChat.caseId}`,
        `customerId=${currentChat.customerId}`
      ].join("&");
      this.$api.common.sessionUnConnected(params).then(res => {
        this.$common.logout(this);
      });
    },
    // 通知客户断开连接
    notifyCustomerDisconnect() {
      let currentChat = JSON.parse(sessionStorage.getItem("currentChat"));
      if (!this.socket) {
        return;
      }
      this.socket.emit(
        "SendMessageToUserById",
        currentChat.customerId,
        "Disconnect",
        ""
      );
    },
    getDevices(next) {
      AgoraRTC.getDevices(function(items) {
        items
          .filter(function(item) {
            return ["audioinput", "videoinput"].indexOf(item.kind) !== -1;
          })
          .map(function(item) {
            return {
              name: item.label,
              value: item.deviceId,
              kind: item.kind
            };
          });
        var videos = [];
        var audios = [];
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          if ("videoinput" == item.kind) {
            var name = item.label;
            var value = item.deviceId;
            if (!name) {
              name = "camera-" + videos.length;
            }
            videos.push({
              name: name,
              value: value,
              kind: item.kind
            });
          }
          if ("audioinput" == item.kind) {
            var name = item.label;
            var value = item.deviceId;
            if (!name) {
              name = "microphone-" + audios.length;
            }
            audios.push({
              name: name,
              value: value,
              kind: item.kind
            });
          }
        }
        next({
          videos: videos,
          audios: audios
        });
      });
    },
    addView(id, show) {
      if (!$("#" + id)[0]) {
        $("<div/>", {
          id: "remote_video_panel_" + id,
          class: "video-view"
        }).appendTo("#video" + this.id);

        $("<div/>", {
          id: "remote_video_" + id,
          class: "video-placeholder"
        }).appendTo("#remote_video_panel_" + id);

        $("<div/>", {
          id: "remote_video_info_" + id,
          class: "video-profile " + (show ? "" : "hide")
        }).appendTo("#remote_video_panel_" + id);

        $("<div/>", {
          id: "video_autoplay_" + id,
          class: "autoplay-fallback hide"
        }).appendTo("#remote_video_panel_" + id);
      }
    },
    removeView(id) {
      if ($("#remote_video_panel_" + id)[0]) {
        $("#remote_video_panel_" + id).remove();
      }
    },
    publish() {
      let _this = this;
      let rtc = this.rtc;
      if (!rtc.client) {
        _this.$Message.error("Please Join Room First");
        return;
      }
      if (rtc.published) {
        _this.$Message.error("Your already published");
        return;
      }
      var oldState = rtc.published;

      // publish localStream
      rtc.client.publish(rtc.localStream, function(err) {
        rtc.published = oldState;
        _this.$Message.error("publish failed");
        // console.error(err);
      });
      // this.$Message.info("publish");
      rtc.published = true;
    },
    handleEvents() {
      let rtc = this.rtc;
      let _this = this;
      // Occurs when an error message is reported and requires error handling.
      rtc.client.on("error", err => {
        console.log(err);
      });
      // Occurs when the peer user leaves the channel; for example, the peer user calls Client.leave.
      rtc.client.on("peer-leave", function(evt) {
        var id = evt.uid;
        console.log("id", evt);
        if (id != rtc.params.uid) {
          _this.removeView(id);
        }
        _this.$Message.info("对方已离开房间");
        _this.leave();
        console.log("peer-leave", id);
      });
      // Occurs when the local stream is published.
      rtc.client.on("stream-published", function(evt) {
        // _this.$Message.info("stream published success");
        // console.log("stream-published");
      });
      // Occurs when the remote stream is added.
      rtc.client.on("stream-added", function(evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        _this.$Message.info("stream-added uid: " + id);

        if (id !== rtc.params.uid) {
          rtc.client.subscribe(remoteStream, function(err) {
            console.log("stream subscribe failed", err);
          });
        }
        console.log("stream-added remote-uid: ", id);
      });
      // Occurs when a user subscribes to a remote stream.
      rtc.client.on("stream-subscribed", function(evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        rtc.remoteStreams.push(remoteStream);
        _this.addView(id);
        remoteStream.play("remote_video_" + id, { fit: "contain" });
        // _this.$Message.info("stream-subscribed remote-uid: " + id);
        _this.$Message.info("对方进入房间 remote-uid: " + id);

        console.log("stream-subscribed remote-uid: ", id);
      });
      // Occurs when the remote stream is removed; for example, a peer user calls Client.unpublish.
      rtc.client.on("stream-removed", function(evt) {
        var remoteStream = evt.stream;
        var id = remoteStream.getId();
        // _this.$Message.info("stream-removed uid: " + id);
        _this.$Message.info("远端流离开 uid: " + id);
        remoteStream.stop("remote_video_" + id);
        rtc.remoteStreams = rtc.remoteStreams.filter(function(stream) {
          return stream.getId() !== id;
        });
        _this.removeView(id);
        // console.log("stream-removed remote-uid: ", id);
      });
      rtc.client.on("onTokenPrivilegeWillExpire", function() {
        // After requesting a new token
        // rtc.client.renewToken(token);
        _this.$Message.info("onTokenPrivilegeWillExpire");
        console.log("onTokenPrivilegeWillExpire");
      });
      rtc.client.on("onTokenPrivilegeDidExpire", function() {
        // After requesting a new token
        // client.renewToken(token);
        // _this.$Message.info("onTokenPrivilegeDidExpire");
        // console.log("onTokenPrivilegeDidExpire");
      });
    },
    stopProxyServer(client) {
      // 关闭云代理服务
      // client.stopProxyServer();
    },
    // 开始心跳检查
    startPingPang() {
      let _that = this;
      sessionStorage.setItem("isInChannel", "true");
      _that.pingPang.pingCount = 0;
      _that.pingPang.pangCount = 0;
      const customerId = this.currentChat.customerId;
      // 座席端ping
      _that.pingPang.pingInterval = setInterval(() => {
        const timeStr = new Date();
        _that.pingPang.pingCount++;
        if (this.socket) {
          this.socket.send(
            "SendMessageToUserById",
            customerId,
            "Ping",
            timeStr
          );
        }
      }, this.apiService.PING_INTERVAL);

      // 验证接受包数量
      _that.pingPang.checkInterval = setInterval(() => {
        console.log(
          "pingpang",
          _that.pingPang.pingCount,
          _that.pingPang.pangCount
        );
        _that.isBadSignal =
          _that.pingPang.pingCount - _that.pingPang.pangCount > 1; // 4个包丢失超过1个，认为信号差
        _that.pingPang.pingCount = 0;
        _that.pingPang.pangCount = 0;
      }, this.apiService.PING_INTERVAL * 4);

      // 监听客户pang
      if (!this.socket._callbacks.Pang) {
        this.socket.on("Pang", timeStr => {
          _that.pingPang.pangCount++;
        });
      }
    },

    // 结束心跳检查
    stopPingPang() {
      let _that = this;
      console.log("====stop pingpang");
      _that.isBadSignal = false;
      if (_that.pingPang.pingInterval) {
        clearInterval(_that.pingPang.pingInterval);
      }
      if (_that.pingPang.checkInterval) {
        clearInterval(_that.pingPang.checkInterval);
      }
    }
  }
};
</script>
<style>
.video_container {
  height: calc(50vh - 50px);
  background: #000;
}
.video_info {
  background: #fff;
  height: 30px;
  line-height: 30px;
  padding: 0 15px;
}
.video_info span:first-child {
  margin-right: 40px;
}
.video_info span {
  color: #999;
  font-size: 14px;
}
.video_body {
  position: relative;
  height: calc(50vh - 120px);
  background: #999;
}
.speed_info {
  position: absolute;
  width: 100%;
  height: 20px;
  line-height: 20px;
  background: rgba(0, 0, 0, 0.4);
  padding: 0 15px;
  z-index: 2;
}
.speed_info span {
  color: #fff;
  display: inline-block;
  margin-right: 40px;
  font-size: 12px;
}
.speed_info span:last-child {
  margin-right: 0;
}
.video_bar {
  padding: 6px 15px;
  height: 40px;
  background: #fff;
}
.bar_l {
  float: left;
}
.bar_r {
  float: right;
}
.photo_btn {
  display: block;
  width: 28px;
  height: 28px;
  line-height: 28px;
  border-radius: 50%;
  background: #419cef;
  color: #fff;
  text-align: center;
  float: left;
  margin-right: 20px;
}
.photo_btn i {
  font-size: 16px;
}
.photo_btn.disabled {
  background: #a1d2ff;
}
.mic_btn {
  display: block;
  width: 28px;
  height: 28px;
  line-height: 31px;
  background: #419cef;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  float: left;
  margin-right: 20px;
}
.mic_btn i {
  font-size: 22px;
}
.mic_btn:hover,.photo_btn:hover{
  color:#fff;
  background: #2481d6;
}
.mic_btn.mute {
  background: #e50000;
}
.screen_btn {
  width: 84px;
  height: 28px;
  border: 1px #e3e3e3 solid;
  line-height: 27px;
  text-align: center;
  border-radius: 3px;
  float: left;
}
.screen_btn a {
  display: block;
  width: 50%;
  color: #999;
  float: left;
  cursor: pointer;
}
.screen_btn a.current {
  background: #d9d9d9;
}
.screen_btn a:hover {
  color: #419cef;
}

.video_content {
  position: relative;
}
.video-view:first-child {
  display: none;
}
.large .video_box {
  position: fixed;
  width: 1000px;
  height: 600px;
  left: 50%;
  margin-left: -500px;
  top: 50%;
  z-index: 99;
  margin-top: -300px;
}
.large::after {
  content: "";
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #000;
  opacity: 0.7;
  z-index: 98;
}
.large .video_body {
  height: 510px;
}
.large .video-view {
  height: auto;
  position: static;
}
.large .video_content,
.large .video-grid {
  position: absolute;
  width: 100%;
  height: 100%;
}
.large .video_bar {
  height: 60px;
  padding: 15px 15px 0;
}
.large .speed_info {
  height: 30px;
  line-height: 30px;
}
.large .bar_r {
  transform: scale(1.2);
  transform-origin: 100% 100%;
}
</style>