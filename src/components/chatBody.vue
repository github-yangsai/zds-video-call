<template>
    <div class="chat_box">
        <div class="chat_history" :id="'chat_history'+ chatId">
            <ul>
              <li :class="{'client':item.role=='client'}" v-for="(item,index) in list" :key="index">
                <span v-if="item.role=='client'">客户：{{item.msg}}</span>
                <span v-if="item.role=='me'">{{item.msg}}:我</span>
              </li>
            </ul>
        </div>
        <div class="chat_bar">
          <input type="text" v-model.trim="sendCon" />
          <a href="javascript:void(0)" class="send_btn" @click="sendMsg">发送</a>
          <a href="javascript:void(0)" class="guide_btn">引导图
            <Icon type="ios-arrow-up" />
          </a>
        </div>
    </div>
</template>
<script>
export default {
  name: 'chatBody',
  data () {
    return {
      sendCon:"",
      // list:[
      //   {role:'client',msg:"你好，我想问下..."}
      // ]
    }
  },
  props:["data","chatId"],
  computed:{
    list(){
      return this.data;
    }
  },
  methods:{
    sendMsg(){
      if(!this.sendCon){
        return false;
      }
      let data = {role:'me',msg:this.sendCon};
      this.list.push(data);
      this.setScrollTop();
    },
    setScrollTop(){
      let historyDiv = document.getElementById("chat_history"+this.chatId);
      historyDiv.scrollTo({top:historyDiv.scrollHeight});
    }
  }
}
</script>
<style scoped>
.chat_box{
  border-right:1px #D2D2D2 solid;
}
.chat_history{
  overflow-y:auto;
  background:#fff;
  height:calc(50vh - 80px);
  
}
.chat_history ul{
  padding:20px;
}
.chat_history li{
  text-align: right;
  margin-bottom: 10px;
}
.chat_history li.client{
  text-align: left;
}
.chat_bar{
  border-top:1px #D2D2D2 solid;
  height:30px;
  position: relative;
}
.chat_bar input{
  position: absolute;
  top:0;
  height:30px;
  line-height: 30px;
  border:none;
  display:block;
  right:200px;
  left:0;
  padding:0 170px 0 10px;
  outline: none;

}
.chat_bar a{
  display:block;
  position: absolute;
  top:-1px;
  height:30px;
  line-height: 30px;
  text-align: center;
  color:#fff;
  padding:0 20px;
  background: #419CEF;
}
.chat_bar a.guide_btn{
  right:0;
  padding-right:25px;
}
.guide_btn i {
  position: absolute;
  right:8px;
  top:8px;
}
.send_btn{
  right:90px;
}
.chat_bar a:hover{
  background: #298de8;
}
</style>