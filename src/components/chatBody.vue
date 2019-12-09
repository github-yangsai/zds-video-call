<template>
  <div class="chat_box">
    <div class="chat_history" :id="'chat_history'+ id">
      <ul>
        <li :class="{'client':item.role=='client'}" v-for="(item,index) in list" :key="index">
          <!-- <span v-if="item.role=='client'">客户：{{item.msg}}</span> -->
          <div v-if="item.role=='me'">
              <span style="padding-right:10px;">{{item.msg}}</span>：我
          </div>
        </li>
      </ul>
    </div>
    <div class="chat_bar">
      <Row>
        <Col span="14">
          <Input v-model="sendCon" clearable @on-keyup="enterSend" />
          <!-- <input type="text" v-model.trim="sendCon" @keyup="enterSend" /> -->
        </Col>
        <Col span="10">
          <a href="javascript:void(0)" class="send_btn" @click="sendMsg">发送</a>
          <a href="javascript:void(0)" class="guide_btn">
            引导图
            <Icon type="ios-arrow-up" />
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
      sendCon: ""
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
      }else{
        return {}
      }
    },
    signalr() {
      return this.$store.state.videoBody.signalr;
    }
  },
  mounted() {},
  methods: {
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
}
.chat_history ul {
  padding: 20px;
}
.chat_history li {
  text-align: right;
  margin-bottom: 10px;
}
.chat_history li.client {
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