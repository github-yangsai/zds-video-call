<template>
  <div class="case_detail">
    <div class="case_main">
      <h4 class="h4_title">基本信息</h4>
      <table class="detail_table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="field_td" width="100">报案号</td>
          <td class="content_td">{{ basicInfo.registNo }}</td>
          <td class="field_td" width="100">报案地址</td>
          <td class="content_td">{{ basicInfo.address }}</td>
        </tr>
        <tr>
          <td class="field_td" width="100">报案人</td>
          <td class="content_td">{{ basicInfo.name }}</td>
          <td class="field_td" width="100">报案时间</td>
          <td class="content_td">{{ basicInfo.isTemp?"":basicInfo.reportTime | transferGMT | date }}</td>
        </tr>
        <tr>
          <td class="field_td" width="100">手机号</td>
          <td class="content_td">{{ basicInfo.mobilePhone }}</td>
          <td class="field_td" width="100">车牌号</td>
          <td class="content_td">{{ basicInfo.carNumber }}</td>
        </tr>
        <tr>
          <td class="field_td" width="100">协赔员</td>
          <td class="content_td">{{basicInfo.bUserCode}} {{basicInfo.bUserName}}</td>
          <td class="field_td" width="100">标的车车型</td>
          <td class="content_td">{{ basicInfo.carType }}</td>
        </tr>
        <tr>
          <td class="field_td" width="100">指派的理赔员</td>
          <td class="content_td" colspan="3">{{ basicInfo.dispatchUserName }}</td>
        </tr>
        <tr>
          <td class="field_td" width="100">出险经过</td>
          <td class="content_td" colspan="3">{{ basicInfo.accidentDetail }}</td>
        </tr>
      </table>
      <h4 class="h4_title">保单信息</h4>
      <table class="detail_table" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td class="field_td" width="100">被保险人名称</td>
          <td
            class="content_td"
          >{{compulsoryInsurance.insuredName || commercialInsurance.insuredName}}</td>
          <td class="field_td" width="100">车架号</td>
          <td class="content_td">{{compulsoryInsurance.frameNo || commercialInsurance.frameNo}}</td>
        </tr>
        <tr>
          <td class="field_td" width="100">厂牌型号</td>
          <td
            class="content_td"
          >{{compulsoryInsurance.licenseTypeCodeName || commercialInsurance.licenseTypeCodeName}}</td>
          <td class="field_td" width="100">车牌号</td>
          <td
            class="content_td"
          >{{ compulsoryInsurance.licenseNo || commercialInsurance.licenseNo }}</td>
        </tr>
        <tr>
          <td class="field_td" width="140">交强险保单起始期</td>
          <td class="content_td">{{ compulsoryInsurance.startDate | transferGMT | date }}</td>
          <td class="field_td" width="140">交强险保单终止期</td>
          <td class="content_td">{{ compulsoryInsurance.endDate | transferGMT | date }}</td>
        </tr>
        <tr>
          <td class="field_td" width="140">商业险保单起始期</td>
          <td class="content_td">{{ commercialInsurance.startDate | transferGMT | date }}</td>
          <td class="field_td" width="140">商业险保单终止期</td>
          <td class="content_td">{{ commercialInsurance.endDate | transferGMT | date }}</td>
        </tr>
        <tr>
          <td class="field_td" width="140">主险险别名称</td>
          <td class="content_td" colspan="3">{{ commercialInsurance.mainInsurances }}</td>
        </tr>
        <tr>
          <td class="field_td" width="140">附加险险别名称</td>
          <td class="content_td" colspan="3">{{ commercialInsurance.subInsurances }}</td>
        </tr>
        <tr>
          <td class="field_td" width="140">保险金额</td>
          <td class="content_td">{{ commercialInsurance.sumInsured }}</td>
          <td class="field_td" width="140">使用性质</td>
          <td class="content_td">{{ commercialInsurance.useNatureCodeName }}</td>
        </tr>
        <tr>
          <td class="field_td" width="140">登记日期</td>
          <td
            class="content_td"
            colspan="3"
          >{{ commercialInsurance.singeinDate | transferGMT | date }}</td>
        </tr>
      </table>
      <div v-if="evaluationInfo.coadjusterCode">
        <h4 class="h4_title">协勘评价信息</h4>
        <table class="detail_table" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="field_td" width="100">评分等级</td>
            <td class="content_td" colspan="3">
              <Rate disabled v-model="level" /> {{ evaluationInfo.level }}分</td>
          </tr>
          <tr>
            <td class="field_td" width="100">评价内容</td>
            <td class="content_td" colspan="3">{{ evaluationInfo.comment }}</td>
          </tr>
          <tr>
            <td class="field_td" width="100">协勘人</td>
            <td class="content_td" colspan="3"> {{ evaluationInfo.coadjusterName }} ({{ evaluationInfo.coadjusterCode}})</td>
          </tr>
          <tr>
            <td class="field_td" width="100">评价人</td>
            <td
              class="content_td"
            > {{ evaluationInfo.appraiserName }} ({{ evaluationInfo.appraiserCode}})</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="detail_footer clearfix">
      <span class="status_span">状态：{{ transferStatus(basicInfo.status) }}</span>
      <div class="detail_btn">
        <Button type="primary" icon="ios-create" @click="openStatus">更改状态</Button>
        <Button type="primary" icon="md-sync">同步案件</Button>
        <Button type="primary" icon="ios-mail">发送短信</Button>
      </div>
    </div>
    <change-status :flag="statusFlag" @close="closeStatus"></change-status>
  </div>
</template>

<script>
import changeStatus from '@/components/changeStatus';
export default {
  name: "caseDetail",
  props: ["id"],
  components: {
    changeStatus
  },
  data() {
    return {
      statuss: [
        {
          id: 20,
          translateKey: "unStart",
          name: "未发起"
        },
        {
          id: 30,
          translateKey: "unConnect",
          name: "未接通"
        },
        {
          id: 40,
          translateKey: "doing",
          name: "会话中"
        },
        {
          id: 41,
          translateKey: "explored",
          name: "已查勘"
        },
        {
          id: 42,
          translateKey: "allAssessed",
          name: "全部定损"
        },
        {
          id: 43,
          translateKey: "partAssessed",
          name: "部分定损"
        },
        {
          id: 44,
          translateKey: "notDeal",
          name: "暂不处理"
        },
        {
          id: 50,
          translateKey: "underLine",
          name: "转线下"
        },
        {
          id: 60,
          translateKey: "completed",
          name: "已结案"
        }
      ],
      statusFlag:false
    };
  },
  mounted() {},
  watch: {},
  computed: {
    basicInfo() {
      let data = this.$store.state.videoBody.data;
      let _this = this;
      let result = _.find(data, item => {
        return item.id == _this.id;
      });
      return result.basicInfo ? result.basicInfo : {};
    },
    compulsoryInsurance() {
      let data = this.$store.state.videoBody.data;
      let _this = this;
      let result = _.find(data, item => {
        return item.id == _this.id;
      });
      return result.compulsoryInsurance ? result.compulsoryInsurance : {};
    },
    commercialInsurance() {
      let data = this.$store.state.videoBody.data;
      let _this = this;
      let result = _.find(data, item => {
        return item.id == _this.id;
      });
      return result.commercialInsurance ? result.commercialInsurance : {};
    },
    evaluationInfo(){
      let data = this.$store.state.videoBody.data;
      let _this = this;
      let result = _.find(data, item => {
        return item.id == _this.id;
      });
      return result.evaluationInfo ? result.evaluationInfo : {};
    },
    level(){
      return this.evaluationInfo.level!=undefined?this.evaluationInfo.level/2:0;
    }
  },
  filters: {},
  methods: {
    transferStatus(value) {
      let status = this.statuss.filter(item => {
        return item.id == value;
      });
      if (status.length) {
        return status[0].name;
      } else {
        return "";
      }
    },
    openStatus(){
      this.statusFlag = true;
    },
    closeStatus(){
       this.statusFlag = false;
    }
  }
};
</script>

<style scoped>
.case_detail {
  position: relative;
  height: calc(50vh - 50px);
}
.case_main {
  height: calc(50vh - 80px);
  overflow-y: auto;
}
.h4_title {
  height: 30px;
  line-height: 30px;
  background: #e5e5e5;
  padding: 0 10px;
  font-size: 16px;
  font-weight: normal;
  color: #333;
}
.detail_table td {
  border-bottom: 1px #e5e5e5 solid;
  height: 30px;
}
.detail_table td.field_td {
  background: #eaebf6;
  text-align: center;
}
.detail_table td.content_td {
  padding: 0 5px;
}
.detail_table tr:last-child td {
  border-bottom: none;
}
.detail_footer {
  position: absolute;
  height: 30px;
  padding: 2px 10px 0;
  background: #fff;
  border-top: 1px #d2d2d2 solid;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
}
.detail_btn {
  float: right;
}
.status_span {
  height: 30px;
  line-height: 28px;
  display: block;
  float: left;
}
</style>
<style>
.detail_btn .ivu-btn {
  height: 25px;
  border-radius: 2px;
  padding: 0 10px;
}
</style>
