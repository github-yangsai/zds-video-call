
<template>
  <div class="evidence_bill bill_main">
    <bill-header title="机动车保险电子定损凭证"></bill-header>
    <div class="bill-neck clearfix">
      <span class="pull-right">案件号：{{currentTask.registNo}}</span>
      <span>被保险人：{{currentTask.name}}</span>
    </div>
    <div class="bill-body">
      <div class="body-top">
        <p>尊敬的客户：</p>
        <p class="indent">您好！</p>
        <p class="indent">
          车牌
          <span class="under-line">{{evidenceBill.carNumber}}</span>
          报案号为
          <span class="under-line">{{evidenceBill.registNo}}</span>
          的的案件已处理完毕，在线定损完成。
        </p>
        <p class="indent">请您保存本信息作为在线定损完成凭证。</p>
      </div>

      <div class="body-middle">
        <div v-for="(l,index) in evidenceBill.losses" :key="index">
          <p>车牌号：{{l.carNumber}}</p>
          <p>定损金额：￥{{l.lossMoney}}元</p>
          <p>损失项目：{{l.description}}</p>
          <p>定损时间：{{l.assessmentedOn | date }}</p>
        </div>
        <p>
          定损人员：姓名：
          <span class="under-line">{{evidenceBill.inspectorName}}</span>，工号：
          <span class="under-line">{{evidenceBill.inspectorCode}}</span>，联系电话：
          <span class="under-line">{{evidenceBill.inspectorPhone}}</span>。
        </p>
      </div>

      <div class="body-bottom">
        <Row>
          <Col span="16">
            用户签名：
            <img v-if="sign" class="sign" :src="sign" alt />
          </Col>
          <Col span="8" class="inscribe">
            <div>太平财产保险有限公司</div>
            <div>日期：{{evidenceBill.assessmentedOn | dateZH }}</div>
            <div class="stamp">
              <img src="static/images/stamp_evidence.png" alt />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
import billHeader from "@/components/lossOrder/lossOpinion/billHeader";
export default {
  name: "evidenceBill",
  components: {
    billHeader
  },
  props: ["id"],
  data() {
    return {
      sign:""
    };
  },
  methods: {
  },
  computed: {
    currentTask() {
      let data = this.$store.state.videoBody.data;
      let _this = this;
      let result = _.find(data, item => {
        return item.id == _this.id;
      });
      return result && result.basicInfo ? result.basicInfo : {};
    },
    evidenceBill(){
       let data = this.$store.state.videoBody.data;
      let _this = this;
      let result = _.find(data, item => {
        return item.id == _this.id;
      });
      return result && result.evidenceBill ? result.evidenceBill : {};
    }
  }
};
</script>

<style>
.bill_main img.logo {
  height: 70px;
}
.bill_main .qr {
  position: absolute;
  right: 0;
  bottom: 0;
}

.bill_main .qr > img {
  height: 80px;
}

.bill_main .bill-detail {
  display: block;
  background-color: white;
  padding: 15px;
  width: 800px;
  margin: 0 auto;
}
.bill_main .bill-neck {
  padding-top: 10px;
}

.bill_main .bill-body {
  border: 1px solid black;
}
.bill_main .body-top {
  padding: 15px;
}
.bill_main .body-middle {
  padding: 15px;
  border-top: 1px dashed black;
}
.bill_main .body-bottom {
  position: relative;
  padding: 30px 15px;
}
.bill_main .inscribe {
  position: relative;
}
.bill_main .stamp {
  position: absolute;
  right: 2px;
  top: -26px;
}
.bill_main .pull-right {
  float: right;
}
.bill_main .bill-body p {
  line-height: 2;
}
.ivu-collapse-content {
  color: #333;
}
</style>
