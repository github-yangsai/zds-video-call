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
            <div class="relative_router">
              <router-view></router-view>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>

    <div class="sidebtn_box">
      <router-link to="/caseDetail">工单详情</router-link>
      <router-link to="/lossOrder">电子定损单</router-link>
      <router-link to="/userInfo">用户信息</router-link>
      <!-- <a href="./caseDetail">工单详情</a>
      <a href="./lossOrder">电子定损单</a>
      <a href="./userInfo">用户信息</a> -->
      
    </div>
  </div>
</template>
<script>
import videoBody from "@/components/videoBody";
import picturesShow from "@/components/picturesShow";
import chatBody from "@/components/chatBody";
import imageModal from "@/components/imageModal";
export default {
  name: "videoAll",
  components: {
    videoBody,
    picturesShow,
    chatBody,
    imageModal
  },
  props:['id'],
  data() {
    return {
      imageModalFlag:false,
      largeImg:{attachmentPath:""},
    };
  },
  methods:{
    openImageModal(item){
      this.imageModalFlag = true;
      this.largeImg = item;
    },
    closeImageModal(){
      this.imageModalFlag = false;
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
.sidebtn_box a:hover{
  background: #419CEF;
}
.r_main{
  position: relative;
  height: calc(50vh - 50px);
  overflow: hidden;
}
</style>