<template>
  <div>
    <!--接听框-->
    <Modal v-model="flag" width="360" :footer-hide="true">
      <p slot="header" style="color:#f60;text-align:center">视频通话</p>
      <div class="ring_con">
        <img src="static/images/avatar.png" />
        <p>报案号：{{registNo}}</p>
        <p style="margin-bottom:25px;">上次发起时间：{{ lastLaunchTime | transferGMT | date }}</p>
        <Button type="error" @click="joinCall" icon="md-call" size="large">立即接听</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "ringAnswer",
  props: ["flag"],
  data() {
    return {
      registNo:"",
      lastLaunchTime:""
    };
  },
  methods: {
    joinCall() {
      this.$emit("close");
      this.$emit("join");
    }
  },
  watch:{
    flag(val){
      if(val){
        const currentChat = JSON.parse(sessionStorage.getItem("currentChat"));
        this.registNo = currentChat.registNo;
        this.lastLaunchTime = currentChat.lastLaunchTime;
      }
    }
  }
};
</script>
<style scoped>
.ring_con{
  padding:10px 0;
  text-align: center;
}
.ring_con img{
  margin-bottom: 10px;
}
.ring_con p{
  margin-top: 15px;
  font-size:15px;
}
.ring_con .ivu-btn-error i{
  font-size:18px;
}
</style>