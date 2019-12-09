<template>
  <div class="video_all">
    <div class="case_desc">
      <span>案件号：{{ basicInfo.registNo}}</span>
      <span>车牌号：{{ basicInfo.carNumber }}</span>
      <span>车架号：{{ basicInfo.registNo }}</span>
      <span>出险时间：{{ basicInfo.reportTime | transferGMT | date }}</span>
      <span>报案人：{{ basicInfo.name }}</span>
      <span>报案电话：{{ basicInfo.mobilePhone }}</span>
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
      <router-link to="/userInfo">用户信息</router-link>-->
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
  props: ["id"],
  data() {
    const COMMERCIAL_INSURANCE_RISK_CODES = [
      // 商业险
      "0802", // 机动车商业险
      "0803", // 摩托车、拖拉机商业险
      "0804", // 单程提车商业险
      "0805", // 两地机动车商业险
      "0808" // 机动车电销商业险
    ];
    const MAIN_INSURANCE_RISK_CODES = [
      "BZ", // 机动车交通事故责任强制险
      "01", //  车辆损失险
      "011", // 011
      "02", // 商业第三者责任险
      "03", // 全车盗抢险
      "041", // 车上人员责任险（司机）
      "044", // 车上人员责任险（乘客）
      "64" // 机动车损失保险(IACJQL0001)
    ];
    return {
      imageModalFlag: false,
      largeImg: { attachmentPath: "" },
      tabType: 1,
      basicInfo: {},
      commercialRiskCodes: COMMERCIAL_INSURANCE_RISK_CODES,
      mainRiskCodes: MAIN_INSURANCE_RISK_CODES,
      compulsoryInsurance: {},
      commercialInsurance: {}
    };
  },
  mounted() {
    this.queryBasicInfo();
  },
  computed: {},
  methods: {
    openImageModal(item) {
      this.imageModalFlag = true;
      this.largeImg = item;
    },
    closeImageModal() {
      this.imageModalFlag = false;
    },
    queryBasicInfo() {
      //查询基本信息
      this.$api.caseInfo.queryCaseDetail(this.id).then(res => {
        this.basicInfo = res.data;
        this.$store.commit("setBasicInfoData", {
          id: this.id,
          basicInfo: this.basicInfo
        });
      });

      //查询保单信息
      this.$api.caseInfo.queryPolicyInfo(this.id).then(res => {
        console.log(res.data);
        // this.basicInfo = res.data;
        const policy = res.data;
        const compulsoryInsurance = _.find(policy, { riskCode: "0801" }) || {
          coverages: []
        }; // 交强险
        const commercialInsurance = _.find(policy, p => {
          return _.includes(this.commercialRiskCodes, p.riskCode);
        }) || { coverages: [] };
        commercialInsurance.mainInsurances = _.map(
          _.filter(commercialInsurance.coverages, c => {
            return _.includes(this.mainRiskCodes, c.kindCode);
          }),
          "kindName"
        ).join("，");
        commercialInsurance.subInsurances = _.map(
          _.filter(commercialInsurance.coverages, c => {
            return !_.includes(this.mainRiskCodes, c.kindCode);
          }),
          "kindName"
        ).join("，");

        this.compulsoryInsurance = compulsoryInsurance;
        this.commercialInsurance = commercialInsurance;
        this.$store.commit("setPolicyInfo", {
          id: this.id,
          compulsoryInsurance: compulsoryInsurance,
          commercialInsurance: commercialInsurance
        });
      });

      //查询协勘评价信息
      this.$api.caseInfo.queryFeedback(this.id).then(res => {
        let data = res.data;
        this.$store.commit("setFeedback", { id: this.id, evaluationInfo: data });
      });
    },
    queryCaseDetail() {
      this.tabType = 1;
    },
    queryOrder() {
      this.tabType = 2;
    }
  }
};
</script>
<style scoped>
.video_all {
  position: relative;
  border-bottom: 1px #d2d2d2 solid;
}
.sidebtn_box {
  position: absolute;
  right: 0;
  top: 50px;
}
.case_desc {
  height: 50px;
  line-height: 50px;
  background: #50536e;
  color: #fff;
  padding: 0 20px;
}
.case_desc span {
  display: inline-block;
  margin-right: 3%;
}
.sidebtn_box a {
  display: block;
  width: 30px;
  padding: 10px 8px;
  text-align: center;
  color: #fff;
  line-height: 1.2;
  background: #72b8f8;
  margin-bottom: 5px;
}
.sidebtn_box a:hover,
.sidebtn_box a.current {
  background: #419cef;
}
.r_main {
  position: relative;
  height: calc(50vh - 50px);
  overflow: hidden;
}
.info_content {
  /* height: calc(50vh - 52px); */
}
</style>