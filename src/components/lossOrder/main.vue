<template>
  <div class="loss_order">
    <div class="order_tab">
      <ul>
        <li @click="tabOrder(1)" :class="{'current':currentTab==1}">定损意见</li>
        <li @click="tabOrder(2)" :class="{'current':currentTab==2}">查勘单</li>
        <li @click="tabOrder(3)" :class="{'current':currentTab==3}" style="padding:5px 3px">责任协议书</li>
        <li @click="tabOrder(4)" :class="{'current':currentTab==4}" style="padding:5px 3px">
          转账
          <br />授权书
        </li>
        <li @click="tabOrder(5)" :class="{'current':currentTab==5}" style="padding:5px 3px">
          补充
          <br />资料单
        </li>
        <li
          @click="tabOrder(6)"
          :class="{'current':currentTab==6}"
          style="padding:5px 3px;height:auto"
        >
          赔款
          <br />转账
          <br />授权书
        </li>
      </ul>
    </div>
    <div class="loss_order_content">
      <div class="loss_order_main">
        <loss-opinion v-if="currentTab==1" :id="id"></loss-opinion>
      </div>
    </div>
  </div>
</template>

<script>
import lossOpinion from "@/components/lossOrder/lossOpinion";
export default {
  name: "lossOrder",
  components: {
    lossOpinion
  },
  props:["id"],
  data() {
    return {
      currentTab: 1
    };
  },
  mounted() {},
  computed: {
    currentTask() {
      let data = this.$store.state.videoBody.data;
      let _this = this;
      let result = _.find(data, item => {
        return item.id == _this.id;
      });
      return result && result.basicInfo ? result.basicInfo : {};
    }
  },
  watch: {
    currentTask() {
      // this.queryBillInfo();
    }
  },
  methods: {
    tabOrder(num) {
      this.currentTab = num;
    },
    queryBillInfo() {
      this.$api.caseInfo.getEvidenceBillAsync(this.currentTask.id).then(res => {
        let data = res.data;
        console.log(data);
      });
    }
  }
};
</script>

<style scoped>
.loss_order {
  position: relative;
}
.order_tab {
  position: absolute;
  left: 0;
  top: 0;
}
.order_tab li {
  width: 55px;
  height: 55px;
  background: #72b8f8;
  text-align: center;
  padding: 5px 10px;
  color: #fff;
  margin-bottom: 3px;
  cursor: pointer;
}
.order_tab li:hover,
.order_tab li.current {
  background: #419cef;
}
.loss_order_main {
  padding: 10px 40px 10px 65px;
}
</style>
<style>
.loss_order_content {
  height: calc(50vh - 50px);
  overflow-y: auto;
}
</style>
