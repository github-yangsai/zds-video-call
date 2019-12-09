<template>
  <Modal v-model="flag" title="请选择工单状态" @on-cancel="cancel" :mask-closable="false">
    <div class="change_status">
      <RadioGroup v-model="status">
        <Radio :label="50">转线下</Radio>
        <Radio :label="43">已处理</Radio>
      </RadioGroup>
      <div class="child_box">
        <CheckboxGroup v-model="dealStatus" v-if="status==43">
          <Checkbox :label="42">查勘完成</Checkbox>
          <Checkbox :label="2">标的车定损完成</Checkbox>
          <Checkbox :label="3">三者车定损完成</Checkbox>
          <Checkbox :label="4">单证收集完成</Checkbox>
        </CheckboxGroup>
      </div>
    </div>
    <div slot="footer" style="text-align:right;">
      <Button @click="cancel">暂不提交</Button>
      <Button type="primary" @click="submit" :disabled="status==43&&!isDeal">提交</Button>
    </div>
  </Modal>
</template>
<script>
export default {
  name: "changeStatus",
  props: ["flag", "source"],
  data() {
    return {
      registNo: "",
      lastLaunchTime: "",
      status: 50,
      dealStatus: []
    };
  },
  methods: {
    submit() {
      let status = this.status;
      if (this.status == 43) {
        if (
          _.find(this.dealStatus, function(item) {
            return item == 42;
          })
        ) {
          status = 42; //全部定损
        } else {
          status = 43; //部分定损
        }
      }

      this.$Message.success("提交成功");
    },
    cancel() {
      this.$emit("close");
    }
  },
  computed: {
    isDeal() {
      let len = this.dealStatus.length;
      return len ? true : false;
    }
  },
  watch: {
    status(status) {
      if (status == 50) {
        this.dealStatus = [];
      }
    }
  }
};
</script>
<style scoped>
.change_status {
  padding: 10px;
}
.child_box {
  padding-top: 20px;
}
</style>
<style>
.change_status .ivu-radio-wrapper {
  margin-right: 30px;
}
.change_status .ivu-checkbox-wrapper {
  margin-right: 30px;
  margin-bottom: 5px;
}
</style>