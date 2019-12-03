<template>
  <div class="video_all">
    <div class="case_desc">
      <span>案件号：</span>
      <span>车牌号：</span>
      <span>车架号：</span>
      <span>出险时间：</span>
      <span>报案人：</span>
      <span>报案电话：</span>
    </div>
    <Row>
      <Col span="11">
        <Row>
          <Col span="15">
            <video-body :id="id"></video-body>
          </Col>
          <Col span="9">
            <pictures-show :id="id" @openImageModal="openImageModal"></pictures-show>
          </Col>
        </Row>
      </Col>
      <Col span="13" class="r_main">
      <image-modal :data="largeImg" @close="closeImageModal" v-if="imageModalFlag"></image-modal>
        <Row>
          <Col span="7">
            <chat-body :id="id"></chat-body>
          </Col>
          <Col span="17">
            <div class="info_content">
              <case-detail v-if="tabType==1" :id="id" :ref="'detail'+id"></case-detail>
              <loss-order v-if="tabType==2" :id="id" :ref="'order'+id">></loss-order>
              <user-info v-if="tabType==3" :id="id" :ref="'userinfo'+id">></user-info>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>

    <div class="sidebtn_box">
      <!-- <router-link to="/caseDetail">工单详情</router-link>
      <router-link to="/lossOrder">电子定损单</router-link>
      <router-link to="/userInfo">用户信息</router-link> -->
      <a href="javascript:void(0)" :class="{'current':tabType==1}" @click="queryCaseDetail">工单详情</a>
      <a href="javascript:void(0)" :class="{'current':tabType==2}" @click="queryOrder">电子定损单</a>
      <a href="javascript:void(0)" :class="{'current':tabType==3}" @click="tabType=3">用户信息</a>
      
    </div>
  </div>
</template>
<script>
import videoBody from "@/components/videoBody";
import picturesShow from "@/components/picturesShow";
import chatBody from "@/components/chatBody";
import imageModal from "@/components/imageModal";
import caseDetail from "@/components/caseDetail";
import lossOrder from "@/components/lossOrder";
import userInfo from "@/components/userInfo";
export default {
  name: "videoAll",
  components: {
    videoBody,
    picturesShow,
    chatBody,
    imageModal,
    caseDetail,
    lossOrder,
    userInfo
  },
  props:['id'],
  data() {
    return {
      imageModalFlag:false,
      largeImg:{attachmentPath:""},
      tabType:1
    };
  },
  mounted(){
    this.$refs[`detail${this.id}`].query();
  },
  methods:{
    openImageModal(item){
      this.imageModalFlag = true;
      this.largeImg = item;
    },
    closeImageModal(){
      this.imageModalFlag = false;
    },
    queryCaseDetail(){
      this.tabType = 1;
      this.$next(()=>{
         this.$refs[`detail${this.id}`].query();
      })
    },
    queryOrder(){
      this.tabType = 2;
    }
  }
  
};
</script>
<style scoped>
.video_all{
  position: relative;
  border-bottom:1px #d2d2d2 solid;
}
.sidebtn_box{
  position: absolute;
  right:0;
  top:50px;
}
.case_desc {
  height: 50px;
  line-height: 50px;
  background: #50536e;
  color: #fff;
  padding:0 20px;
}
.case_desc span{
  display:inline-block;
  margin-right:3%;
}
.sidebtn_box a{
  display:block;
  width:30px;
  padding:10px 8px;
  text-align: center;
  color:#fff;
  line-height:1.2;
  background: #72B8F8;
  margin-bottom: 5px;
}
.sidebtn_box a:hover,.sidebtn_box a.current{
  background: #419CEF;
}
.r_main{
  position: relative;
  height: calc(50vh - 50px);
  overflow: hidden;
}
.info_content{
  /* height: calc(50vh - 52px); */
}
</style>