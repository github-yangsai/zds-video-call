<template>
  <div class="chat_box">
    <div class="chat_history" :id="'chat_history'+ id">
      <ul class="history_ul">
        <li :class="{'client':item.role=='client'}" v-for="(item,index) in list" :key="index">
          <!-- <span v-if="item.role=='client'">客户：{{item.msg}}</span> -->
          <div v-if="item.role=='me'">
            <span style="padding-right:10px;">{{item.msg}}</span>：我
          </div>
        </li>
      </ul>
      <div class="guide_box" v-show="guideFlag">
        <ul class="clearfix guide_ul" :id="'guide_ul'+id">
          <li v-for="(item,index) in guideList" :key="index">
            <img :src="item.picPath" />
            <p>{{item.name}}</p>
            <a href="javascript:void(0)" class="send_btn" @click="sendGuidePic(item)">
               <Button type="primary" shape="circle" icon="ios-send"></Button>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat_bar">
      <Row>
        <Col span="14">
          <Input v-model="sendCon" clearable @on-keyup="enterSend" />
          <!-- <input type="text" v-model.trim="sendCon" @keyup="enterSend" /> -->
        </Col>
        <Col span="10">
          <a href="javascript:void(0)" class="send_btn" @click="sendMsg">发送</a>
          <a href="javascript:void(0)" class="guide_btn" @click="toggleGuide">
            引导图
            <Icon type="ios-arrow-up" v-if="guideFlag" />
            <Icon type="ios-arrow-down" v-if="!guideFlag" />
          </a>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  name: "chatBody",
  data() {
    return {
      sendCon: "",
      guideFlag: false,
      guideList: []
    };
  },
  props: ["id"],
  computed: {
    list() {
      let data = this.$store.state.videoBody.data.filter(item => {
        return item.id == this.id;
      });
      if (data[0]) {
        return data[0].chat;
      } else {
        return {};
      }
    },
    currentChat() {
      let currentChat = sessionStorage.getItem("currentChat");
      if (currentChat) {
        return JSON.parse(currentChat);
      } else {
        return {};
      }
    },
    signalr() {
      return this.$store.state.videoBody.signalr;
    },
    currentPictureCategory() {
      let data = this.$store.state.videoBody.data;
      let _this = this;
      let result = _.find(data, item => {
        return item.id == _this.id;
      });
      return result.currentPictureCategory ? result.currentPictureCategory : 1;
    }
  },
  mounted() {
    this.queryGuidePic();
  },
  methods: {
    // 初始化分类引导图（从api获取）
    queryGuidePic() {
      this.$api.photo.queryGuidePic().then(res => {
        const fixedPathPictures = _.forEach(res.data, c => {
          c.picPath = this.$common.fixFileUrl(c.picPath);
        });
        const guidePictures = _.groupBy(fixedPathPictures, "categoryId");
        this.$store.commit("setGuidePictures", guidePictures);
        this.$store.state.videoBody;
        this.getGuidePictures(
          guidePictures,
          this.id,
          this.currentPictureCategory
        );
      });
    },
    // 向客户推送引导图
    sendGuidePic(picture) {
      const customerId = this.currentChat.customerId;
      this.signalr.send(
        "SendMessageToUserById",
        customerId,
        "GuidePic",
        picture.id
      );
      this.langService.pop(
        "success",
        { key: "MESSAGES.sendGuideSuccess" },
        { key: `GUIDE_PICTURES.${picture.id}` }
      );
    },
    getGuidePictures(guidePictures, caseId, categoryId) {
      this.guideList = (guidePictures && guidePictures[categoryId]) || [];
    },
    toggleGuide() {
      if (!this.guideFlag) {
        //打开指引图
        this.guideFlag = true;
      } else {
        //关闭指引图
        this.guideFlag = false;
      }
    },
    enterSend(e) {
      if (e.keyCode == 13) {
        this.sendMsg();
      }
    },
    sendMsg() {
      if (!this.sendCon) {
        return false;
      }
      let data = { role: "me", msg: this.sendCon };
      const message = this.sendCon;
      if (!this.sendCon) {
         this.$Message.warning("请输入内容");
        return;
      }
      this.list.push(data);
      const customerId = this.currentChat.customerId;
      const caseId = this.currentChat.caseId;
      let params = {
        caseId: caseId,
        content: message
      };
      this.signalr.send(
        "SendMessageToUserById",
        customerId,
        "Chat",
        JSON.stringify(params)
      );
      this.sendCon = "";
      this.setScrollTop();
    },
    setScrollTop() {
      let historyDiv = document.getElementById("chat_history" + this.id);
      let scrollHeight = historyDiv.scrollHeight;
      this.$nextTick(() => {
        historyDiv.scrollTo({ top: scrollHeight });
      });
    }
  }
};
</script>

<style scoped>
.chat_box {
  border-right: 1px #d2d2d2 solid;
}
.chat_history {
  overflow-y: auto;
  background: #fff;
  height: calc(50vh - 80px);
  position: relative;
}
.history_ul ul {
  padding: 20px;
}
.history_ul li {
  text-align: right;
  margin-bottom: 10px;
}
.history_ul li.client {
  text-align: left;
}
.chat_bar {
  border-top: 1px #d2d2d2 solid;
  height: 30px;
  position: relative;
}
.chat_bar input {
  /* position: absolute;
  top:0; */
  height: 30px;
  line-height: 30px;
  border: none;
  display: block;
  /* right:200px; */
  left: 0;
  padding: 0 0 0 10px;
  outline: none;
  width: 100%;
}
.chat_bar a {
  display: block;
  position: absolute;
  top: -1px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  padding: 0 6%;
  background: #419cef;
}
.chat_bar a.guide_btn {
  right: 0;
  padding-right: 25px;
}
.guide_btn i {
  position: absolute;
  right: 8px;
  top: 8px;
}
.send_btn {
  right: 80px;
}
.chat_bar a:hover {
  background: #298de8;
}
.guide_box {
  width: 100%;
  height: 120px;
  background: rgba(0, 0, 0, 0.76);
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  overflow-y: auto;
}
.guide_ul li {
  float: left;
  text-align: center;
  margin: 0 5px 5px;
  width: 120px;
  position: relative;
}
.guide_ul li img {
  width: 100%;
}
.guide_ul li p {
  color: #fff;
  font-size: 12px;
}
.send_btn{
  display:none;
  position:absolute;
  left:50%;
  top:50%;
  color:#fff;
}
.guide_ul li:hover .send_btn{
  display:block;
}
</style>
<style>
.chat_bar .ivu-input {
  border: 0 !important;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  outline: none;
}
</style>